(function() {
    'use strict';

    angular
        .module('app.products')
        .controller('Products', Products);

    Products.$inject = ['Data'];

    function Products(Data) {
        
        var vm = this;

        vm.fetchProducts = fetchProducts;
        vm.finished = false;
        vm.products = [];
        vm.randomArray = [];
        vm.showAd = showAd;
        vm.sort = sort;
        vm.sortVal = 'id';

        var buffer = [];
        var dataConfig = {
            pattern: '{id size price face}',
            start: start,
            done: done
        };
        var limitVal = 20;
        var loading = false;
        var skipVal = 0;

        genRandomArray();
        
        // - oboe.js: finished loading all?, maybe not working as intended?
        // - knowing when stream completes would be preferrable
        function completed() {
            console.log('Stream Finished');
        }

        // oboe.js: finished loading an object
        function done() {
            // allow loading
            loading = false;
        }

        // oboe.js encountered an error
        function error(err) {
            console.log('Error loading products: ' + err);
        }

        // - fast loading if products have been pre-fetched in 'buffer'
        // - loads next batch and caches in 'buffer'
        function fetchProducts() {
            unloadBuffer();

            // disallow loading if finished or already loading
            if ( !vm.finished && !loading ) {
                loadMoreProducts();
            }
        }

        // - creates array of random integers where no integers are equal to their neighbors
        // - placekitten only has 16 images, so sometimes consecutive images can be the same
        //   but this wouldn't be the case if the api only provided distinct "ads"
        // - uncertain if this solution gets at the root of the requirement or not...
        function genRandomArray() {
            // this could be improved if we could get the total # of products from api
            var range = 1000;
            var size = 100;
            var iS = 0;

            vm.randomArray.push(getRandomNumber(range));

            for( var iR = range - size; iR < range && iS < size; iR++ ) {
                var r = getRandomNumber(range);

                // if 'r' was the previous value, use index 'iR' instead
                var value = r === vm.randomArray[iS - 1] ? iR : r;
                vm.randomArray.push(value);
            }
        }

        // return random integer between 1 - 'range'
        function getRandomNumber(range) {
            return Math.floor(Math.random()*range);
        }

        // checking for existing faces only to simulate an end to the catalogue
        function isExistingProduct(product) {
            var found = false;
            var i = vm.products.length;

            while( !found && i-- ) {
                found = (product.face === vm.products[i].face) ? true : false;
            }
            return found;
        }

        // get next batch from api
        function loadMoreProducts() {
            // - prevent near-continuous loading when waiting at bottom of page
            // - especially important to prevent need for redundant client-side sorting
            loading = true;

            dataConfig.url = '/api/products?limit=' + limitVal + '&skip=' + skipVal + '&sort=' + vm.sortVal;
            Data(dataConfig).then(completed, error, node);
            skipVal += limitVal;
        }

        // oboe.js: stream parsing
        function node(product) {
            // add product to buffer if it doesn't already exist, otherwise stop all
            isExistingProduct(product) ? vm.finished = true : buffer.push(product);

            // beginning of catalague
            if ( buffer.length === limitVal && vm.products.length === 0 ) {
                // - immediately unload 'buffer' into dom on a page load
                // - re-fill 'buffer' for faster loading from now on
                unloadBuffer();
                loadMoreProducts();
            }

            // end of catalogue
            if( vm.finished ) {
                // unload last batch from buffer
                unloadBuffer();
            }
        }

        // show one ad for every 20th product
        function showAd(index) {
            return index%20 === 0 ? true : false;
        }

        // sorting by 'id', 'price', or 'id'
        function sort() {
            // reset all and reload
            vm.randomArray = [];
            vm.products = [];
            vm.finished = false;
            skipVal = 0;
            genRandomArray();
        }

        // oboe.js: stream start
        function start(stream) {
            console.log('Stream Started');
        }    

        // transfer cached products into dom
        function unloadBuffer() {
            vm.products.push.apply(vm.products, buffer);
            buffer = [];
        }    
    }
})();