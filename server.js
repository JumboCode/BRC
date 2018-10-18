const express = require("express");
const next = require("next");
const config = require('dotenv').config()

//set up mongodb
//mongoClient.connect has to be called for each request? bc it's asynchronous
var mongodb = require('mongodb');
var MongoClient = mongodb.MongoClient;
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
            //make mongodb connection
            MongoClient.connect(mongoURI, { useNewUrlParser: true }, function (err, client) {
                if (err) throw err;
                var db = client.db('brc2018');    //database name

                //equivalent to 'db.locations' in MongoDB client shell
                db.collection('locations', function(err, collection) {
                    if (err) {
                        res.send({});
                    }
                    else {
                        //equivalent to 'db.locations.find()' in MongoDB client shell
                        collection.find().toArray(function(err, results) {
                            //all results of db.locations.find() will go into...
                            //'results' will be an array (or list)
                            if (!err) {
                                res.send(results);
                            } else {
                                res.send({});
                            }
                        });
                    }
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
