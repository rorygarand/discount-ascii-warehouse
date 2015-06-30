var faces = require('cool-ascii-faces').faces;
var getQueryParams = require('./get-query-params');

function getRandomString () {
    return (Math.random()).toString(36).substr(2);
}

function createRandomItem (i, sort) {
    var min_size = 12;
    var obj = {
        id: Math.floor(Math.random()*100000) + '-' + getRandomString(),
        size: min_size + Math.floor(Math.random()*30),
        price: Math.ceil(Math.random()*1000),
        face: faces[i % faces.length]
    };

    if (sort === 'id') {
        obj.id = i + '-' + getRandomString();
    }
    else if (sort === 'size') {
        obj.size = Math.min(42, min_size + Math.floor(i * 0.05));
    }
    else if (sort === 'price') {
        obj.price = Math.min(1000, Math.floor(i * 0.1)+1);
    }

    return obj;
}

module.exports = function (req, res) {
    var params = getQueryParams(req.url);

    // how many records to fetch
    var limit = parseInt(params.limit, 10) || 10;

    // pagination offset
    var skip = parseInt(params.skip, 10) || 0;

    // sort field
    var sort = params.sort || 'id';

    res.writeHead(200, {
        'Content-Type': 'application/x-json-stream'
    });
    
    // random delay
    setTimeout(function () {
        var i;
        for (i=0; i<limit; i+=1) {
            res.write(JSON.stringify(createRandomItem(i+skip, sort)) + '\n');
        }
        res.end();
    }, 100 + Math.floor(Math.random() * 3000));
};
