//maml-server.js

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



            var reqPost = https.request(options, function (res) {

            console.log('===reqPost()===');

            console.log('StatusCode: ', res.statusCode);

            console.log('headers: ', res.headers);



            res.on('data', function(d) {

            process.stdout.write(d);

            });

            });



            // Would need more parsing out of prediction from the result

            reqPost.write(dataString);

            reqPost.end();

            reqPost.on('error', function(e){

            console.error(e);

            });



}



//Could build feature inputs from web form or RDMS. This is the new data that needs to be passed to the web service.

function buildFeatureInput(){

        console.log('===performRequest()===');

        var data = {
        				"Inputs": {
        				    "input1": {
        				      "ColumnNames": [
        				        "Temperature",
        				        "Humidity",
        				        "WindSpeed",
        				        "Visibility",
        				        "Serial"
        				      ],
        				      "Values": [
        				        [
        				          0,
        				          0,
        				          0,
        				          0,
        				          0
        				        ]
        				      ]
        				    }
        				  },
        				  "GlobalParameters": {}
        			};

        getPred(data);

}





function send404Reponse(response) {

  response.writeHead(404, {"Context-Type": "text/plain"});

  response.write("Error 404: Page not Found!");

  response.end();

}



function onRequest(request, response) {

        if(request.method == 'GET' && request.url == '/' ){

        response.writeHead(200, {"Context-Type": "text/plain"});

        fs.createReadStream("./index.html").pipe(response);

        }else {

        send404Reponse(response);

        }

}



http.createServer(onRequest).listen(8050);

console.log("Server is now running on port 8050");

buildFeatureInput();
