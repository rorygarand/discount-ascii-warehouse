(function() {
    'use strict';

    angular
        .module('app.data')
        .service('Data', Data)
        .factory('DataStream', DataStream);

    Data.$inject = ['DataStream'];

    function Data(DataStream) {
        // the passed parameters object need to have a Url and a pattern.
        // all parameters consumed by the oboe module can be passed
        // the url needs to return a json stream. see the oboe documentation
        // the pattern contains a path which selects json objects from the stream
        function Stream (params) {
          return DataStream.get(params);
        };
        return Stream;
    }

    DataStream.$inject = ['$q'];

    function DataStream($q) {
        var stream = {
            get: getDataStream
        };
        return stream;

        function getDataStream(params) {
            var defer = $q.defer();
            var stream = oboe(params)
                            .start(begin)
                            .fail(error)
                            .node(params.pattern, stream)
                            .done(complete);

            function begin(status, headers) {
                if (typeof params.start === 'function' && status === 200) {
                    params.start(stream);
                }
            }

            function complete() {
                if (typeof params.done === 'function') {
                  params.done();
                }
                // make sure oboe cleans up memory
                return oboe.drop;
            }

            function error(err) {
                defer.reject(err);
            }

            function stream(n) {
                defer.notify(n);
                return oboe.drop;
            }

            return defer.promise;
        }
    }
})();