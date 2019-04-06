const express = require("express");
const next = require("next");
const config = require('dotenv').config();
var nodemailer = require('nodemailer');

//set up mongodb
//mongoClient.connect has to be called for each request? bc it's asynchronous
var mongodb = require('mongodb');
var MongoClient = mongodb.MongoClient;
var mongoURI = process.env.MONGODB_URI || 
               process.env.MONGOLAB_URI || 
               process.env.MONGOHQ_URL;
const port = parseInt(process.env.PORT, 10) || 3000
const app = next(process.env.NODE_ENV !== "production");
const handle = app.getRequestHandler();

app.prepare()
    .then(() => {
        const server = express();
        server.get("/organizations", (req, res) => {
            res.set('Content-Type', 'application/json');
            res.header("Access-Control-Allow-Origin", process.env.APP_URL || `http://localhost:${port}`);
            res.header("Access-Control-Allow-Methods", "GET");
            res.header("Access-Control-Allow-Headers", "Authorization");
            return {};
        });

        //list locations at /locations
        server.get('/locations', function(req, res) {
            res.set('Content-Type', 'application/json');
            res.header("Access-Control-Allow-Origin", "*");
			res.header("Access-Control-Allow-Methods", "GET");
            //make mongodb connection
            MongoClient.connect(mongoURI, { useNewUrlParser: true }, function (err, client) {
                if (err) throw err;
                var db = client.db(process.env.DB_NAME);    //database name
                //equivalent to 'db.locations' in MongoDB client shell
                db.collection('locations', function(err, collection) {
                    if (err) throw err;
                    else {
                        //equivalent to 'db.locations.find()' in MongoDB client shell
                        collection.find().toArray(function(err, results) {
                            //all results of db.locations.find() will go into...
                            //'results' will be an array (or list)
                            if (err) throw err;
                            states = results[0].states;
                            let sorted_states = Object.keys(states).sort().reduce(function (result, key) {
                                result[key] = states[key];
                                let sorted_events = Object.keys(result[key]).sort().reduce(function (res, k) {
                                    res[k] = result[key][k]
                                    return res;
                                }, {});
                                result[key] = sorted_events;
                                return result;
                            }, {});
                            results[0].states = sorted_states;
                            res.send(results);
                        });
                    }
                });
            });
        });

        server.post('/sendEmail', function(req, res) {

            let transporter = nodemailer.createTransport({
                service: 'gmail',
                auth: {
                    user: 'brcjumbocode2018@gmail.com',
                    pass: 'BRC@2018'
                }
            });

            let mailOptions = {
                from: 'brcjumbocode2018@gmail.com',
                to: 'jqyang1998@gmail.com',
                subject: 'brc contact us',
                // text: req.body.body
                text: 'testing...1 2 3'
            };

            transporter.sendMail(mailOptions, function(error, info) {
                if (error)
                console.log(error);
                else
                console.log('Email sent: ' + info.response);
            });

            res.send();
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
