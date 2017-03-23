/**
 * Created by shankar pentyala on 3/17/2017.*/

var express = require('express');
var app = express();
var cors=require('cors');
var request = require('request');
app.use(cors());

app.get('/calories', function (req, res,next) {
    var result = {
"results":[]
    };
var z=req.query.name;
console.log(z);
    request("https://api.edamam.com/api/nutrition-data?app_id=254d36ea&app_key=383e71430a323ae94ec781cab4b8918a&ingr=1%20large%20"+z, function (error, response, body) {
        //Check for error
        if (error) {
            return console.log('Error:', error);
        }
        if (response.statusCode !== 200) {
            return console.log('Invalid Status Code Returned:', response.statusCode);
        }
        body = JSON.parse(body);
        result.results.push({"calories":body.calories,"quantity":body.totalWeight});

   //   res.contentType('application/json');
   //  res.write(JSON.stringify(result));
   //  res.end();
        request("https://kgsearch.googleapis.com/v1/entities:search?query="+z+"&key=AIzaSyA1Sy0t-uNoi-9pnR5ETJnTBGDNvoi6YhE&limit=1&indent=True",function (error1, response1, body1) {
            if (error1) {
                return console.log('Error:', error1);
            }
            if (response1.statusCode !== 200) {
                return console.log('Invalid Status Code Returned:', response1.statusCode);
            }
            body = JSON.parse(body1);
            result.results.push({"link": body.itemListElement[0].result.image.contentUrl,"text1":body.itemListElement[0].result.detailedDescription.articleBody})
            res.contentType('application/json');
            res.write(JSON.stringify(result));
            res.s
            res.end();
        });
    });
    console.log(result);



})
var server = app.listen(8888, function () {
    var host = server.address().address;
    var port = server.address().port;

    console.log("Example app listening at http://%s:%s", host, port);
})




