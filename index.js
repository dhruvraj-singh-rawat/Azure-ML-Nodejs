var express = require('express');
var app = express();
var path = require('path');
var bodyParser = require('body-parser')
var http = require("http");
var https = require("https");
var querystring = require("querystring");
var fs = require('fs');

function getPred(data) {
    console.log('===getPred()===');
    
    var dataString = JSON.stringify(data)
    var host = 'ussouthcentral.services.azureml.net'
    var path = '/workspaces/9e3d31bd96144044b5e17022b523a47f/services/cf3b05bc4e5a43ebae5489767f6da251/execute?api-version=2.0&details=true'
    var method = 'POST'
    var api_key = 'Xbub+zDBPW0sb//q9qezDNzDBMBFsnCZW3Dyvj0fYL8E8eQhm4eLKITWNvOF3/nkwOaWUsyS0ZSTCAjmdbn+7Q=='
    var headers = {'Content-Type':'application/json', 'Authorization':'Bearer ' + api_key};
    var options = {
        host: host,
        port: 443,
        path: path,
        method: 'POST',
        headers: headers
    };

    console.log('data: ' + data);
    console.log('method: ' + method);
    console.log('api_key: ' + api_key);
    console.log('headers: ' + headers);
    console.log('options: ' + options);
    
    var result = '';

    var reqPost = https.request(options, function (res) {
        console.log('===reqPost()===');
        console.log('StatusCode: ', res.statusCode);
        console.log('headers: ', res.headers);
        res.on('data', function(d) {
            process.stdout.write(d);
            if(d) {result += d;}
        });
    });

// Would need more parsing out of prediction from the result
    function sendre(callback){
        reqPost.write(dataString);
        reqPost.end();
        reqPost.on('error', function(e){
            console.error(e);
        });
        reqPost.on('end', function(){
            return callback();
        })
    }
    function resultfn(){
        return result;
    }
    return sendre(resultfn);
}



//Could build feature inputs from web form or RDMS. This is the new data that needs to be passed to the web service.


app.use(express.static('assets'));
app.use(bodyParser.json())
app.use(bodyParser.urlencoded({ extended: true }))

app.all('/', function(req, res) {
    res.sendFile(path.join(__dirname + '/index.html'));
});

app.post('/request', function(req, res) {
    console.log(getPred(req.body));
    res.status(400).json("sss"); 
});

app.listen(4000, () => console.log('Listening on port 4000!'));