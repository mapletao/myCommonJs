var express = require('express');
var fs = require('fs');
var bodyParser = require('body-parser');
var app = express();

var urlencodedParser = bodyParser.urlencoded({ extended: true })
app.use(bodyParser.json())
app.use(bodyParser.raw());
app.use(urlencodedParser)


function setHeader(res) {
    res.header("Access-Control-Allow-Origin", "*");
    res.header("Access-Control-Allow-Headers", "X-Requested-With");
    res.header("Access-Control-Allow-Methods", "PUT,POST,GET,DELETE,OPTIONS");
    res.header("X-Powered-By", ' 3.2.1')
    res.header("Content-Type", "application/json;charset=utf-8");
}
var methods = ['get', 'options', 'post', 'put', 'delete'];
methods.forEach(function(item) {
    app[item]('*', function(req, res, next) {
        setHeader(res);
        next();
    });
});
// app.get('*', function(req, res, next) {
//     setHeader(res);
//     next();
// })
// app.options('*', function(req, res, next) {
//     setHeader(res);
//     next();
// })
// app.post('*', function(req, res, next) {
//     setHeader(res);
//     next();
// })
// app.put('*', function(req, res, next) {
//     setHeader(res);
//     next();
// })
// app.delete('*', function(req, res, next) {
//     setHeader(res);
//     next();
// })

app.get('/test-list', function(req, res) {
    fs.readFile('test.json', function(err, data) {
        if (err) return res.send(err);
        var responsText = data
        res.send(responsText)
    })
})
app.delete('/test-list/:id', function(req, res) {
    res.send(req.params.id)
})
app.put('/test-list/:id', function(req, res) {
    var data = null;
    if (req.body && req.body.id) {
        data = req.body;
        res.send(data);
    } else {
        var body = '';
        req.on('data', function(chunk) {
            body += chunk; //读取参数流转化为字符串
        });
        req.on('end', function() {
            try {
                data = JSON.parse(body);
            } catch (err) {
                data = body;
            }
            res.send(data);
        })
    }
})
app.post('/test-list/:id', function(req, res) {
    var data = null;
    if (req.body && req.body.id) {
        data = req.body;
        res.send(data);
    } else {
        var body = '';
        req.on('data', function(chunk) {
            body += chunk; //读取参数流转化为字符串
        });
        req.on('end', function() {
            try {
                data = JSON.parse(body);
            } catch (err) {
                data = body;
            }
            res.send(data);
        })
    }
})

var server = app.listen(4000, function() {
    var host = server.address().address;
    var port = server.address().port;
    console.log('Example app listening at http://%s:%s', host, port);
});