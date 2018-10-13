const express = require("express");
const next = require("next");


//set up mongodb
//mongoClient.connect has to be called for each request? bc it's asynchronous
var mongodb = require('mongodb');
var MongoClient = require('mongodb').MongoClient;
var mongoURI = process.env.MONGODB_URI || 
               process.env.MONGOLAB_URI || 
               process.env.MONGOHQ_URL || 
               'mongodb://brcjumbocode:BRC2018@ds123971.mlab.com:23971/brc2018';


const port = parseInt(process.env.PORT, 10) || 3000
const app = next(process.env.NODE_ENV !== "production");
const handle = app.getRequestHandler();

app.prepare()
    .then(() => {
        const server = express();
        server.get("/organizations", (req, res) => {
            return {};
        });

        //list locations at /locations
        server.get('/locations', function(req, res) {
            res.set('Content-Type', 'text/html');
            var indexPage = '';

            //make mongodb connection
            MongoClient.connect(mongoURI, { useNewUrlParser: true }, function (err, client) {
                if (err) throw err;
                var db = client.db('brc2018');    //database name

                //equivalent to 'db.locations' in MongoDB client shell
                db.collection('locations', function(er, collection) {

                    //equivalent to 'db.locations.find()' in MongoDB client shell
                    collection.find().toArray(function(err, results) {

                        //all results of db.locations.find() will go into...
                        //'results' will be an array (or list)
                        if (!err) {
                            indexPage += "<!DOCTYPE HTML><html><head><title>Locations</title></head><body><h1>Locations:</h1>";
                            for (var count = 0; count < results.length; count++) {
                                indexPage += "<p>Location " + count + ": " + results[count].loc + "</p>";
                            }
                            indexPage += "</body></html>"
                            res.send(indexPage);
                        } else {
                            res.send('<!DOCTYPE HTML><html><head><title>Locations</title></head><body><h1>Whoops, something went terribly wrong!</h1></body></html>');
                        }
                    });
                });
            });
        });


        server.get("*", (req, res) => {
            return handle(req, res);
        });

        server.listen(port, (err) => {
            if (err) throw err;
            console.log(`Ready on http://localhost:${port}`);
        });
    }
);
