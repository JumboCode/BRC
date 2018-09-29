const express = require("express");
const next = require("next");


//set up mongodb
var mongoUri = process.env.MONGODB_URI || 
               process.env.MONGOLAB_URI || 
               process.env.MONGOHQ_URL || 
               'mongodb://brcjumbocode:BRC2018@ds123971.mlab.com:23971/brc2018';

var MongoClient = require('mongodb').MongoClient, 
                  format = require('util').format;
var db = MongoClient.connect(mongoUri, { useNewUrlParser: true });


const port = parseInt(process.env.PORT, 10) || 3000
const app = next(process.env.NODE_ENV !== "production");
const handle = app.getRequestHandler();

app.prepare()
    .then(() => {
        const server = express();
        server.get("/organizations", (req, res) => {
            return {};
        });
        server.get("*", (req, res) => {
            return handle(req, res);
        });

        server.listen(port, (err) => {
            if (err) throw err;
            console.log(`Ready on http://localhost: ${port}`);
        });
    }
);


// ???.post('/test', function(request, response) {
//     console.log(request.body);
//     var input = request.body.loc;
//     //input = input.replace(/[^\w\s]/gi, ''); // remove all special chars
//     var toInsert = {
//         "loc": input,
//     };
//     db.collection('locations', function(error, coll) {
//         coll.insert(toInsert, function(error, saved) {
//             if (error) {
//                 console.log("Error: " + error);
//                 response.send(500);
//             }
//             else {
//                 response.send('<html><head><title>Thanks!</title></head><body><h2>Thanks for your submission!</h2></body></html>');
//             }
//         });
//     });
// });

// ???.get('/results', function(request, response) {
//     response.set('Content-Type', 'text/html');
//     var indexPage = '';

//     // equivalent to `db.locations` in MongoDB client shell
//     db.collection('locations', function(er, collection) {

//         // equivalent to `db.locations.find()` in MongoDB client shell
//         collection.find().toArray(function(err, results) {

//             // all results of db.locations.find() will go into...
//             // ...`results`.  `results` will be an array (or list)
//             if (!err) {
//                 indexPage += "<!DOCTYPE HTML><html><head><title>Locations</title></head><body><h1>Locations:</h1>";
//                 for (var count = 0; count < results.length; count++) {
//                     indexPage += "<p>Location " + count + ": " + results[count].loc + "</p>";
//                 }
//                 indexPage += "</body></html>"
//                 response.send(indexPage);
//             } else {
//                 response.send('<!DOCTYPE HTML><html><head><title>Locations</title></head><body><h1>Whoops, something went terribly wrong!</h1></body></html>');
//             }
//         });
//     });
// });
