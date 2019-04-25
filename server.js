/* eslint-disable func-names */
const express = require('express');
const next = require('next');
const config = require('dotenv').config();
// const nodemailer = require('nodemailer');
const sgMail = require('@sendgrid/mail');
const bodyParser = require('body-parser');
// set up mongodb
// mongoClient.connect has to be called for each request? bc it's asynchronous
const mongodb = require('mongodb');

const { MongoClient } = mongodb;
const mongoURI = process.env.MONGODB_URI
               || process.env.MONGOLAB_URI
               || process.env.MONGOHQ_URL;
const port = parseInt(process.env.PORT, 10) || 3000;
const app = next(process.env.NODE_ENV !== 'production');
const handle = app.getRequestHandler();
app.prepare()
  .then(() => {
    const server = express();
    // eslint-disable-next-line prefer-arrow-callback
    server.use(bodyParser.json());
    server.listen(port, (err) => {
      if (err) throw err;
      console.log(`Ready on http://localhost:${port}`);
    });

    // list locations at /locations
    server.get('/locations', (req, res) => {
      res.set('Content-Type', 'application/json');
      res.header('Access-Control-Allow-Origin', '*');
      res.header('Access-Control-Allow-Methods', 'GET');
      // make mongodb connection
      MongoClient.connect(mongoURI, { useNewUrlParser: true }, (err, client) => {
        if (err) throw err;
        const db = client.db(process.env.DB_NAME); // database name
        // equivalent to 'db.locations' in MongoDB client shell
        db.collection('locations', (err, collection) => {
          if (err) throw err;
          else {
            // equivalent to 'db.locations.find()' in MongoDB client shell
            collection.find().toArray((err, results) => {
              // all results of db.locations.find() will go into...
              // 'results' will be an array (or list)
              if (err) throw err;
              const { states } = results[0];
              const sorted_states = Object.keys(states).sort().reduce((result, key) => {
                result[key] = states[key];
                const sorted_events = Object.keys(result[key]).sort().reduce((res, k) => {
                  res[k] = result[key][k];
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

    // // eslint-disable-next-line prefer-arrow-callback
    server.post('/sendEmail', (req, res) => {
      const groupInfo = req.body.group;
      //   const transporter = nodemailer.createTransport({
      //     host: 'smtp.gmail.com',
      //     port: 465,
      //     secure: true, // use SSL
      //     auth: {
      //       user: process.env.EMAIL,
      //       pass: process.env.EMAIL_PW,
      //     },
      //   });

      const groupName = groupInfo.Name;

      let text = 'A new group has been suggested to be added to the list of US groups: \n';
      text += `\nGroup name: ${groupInfo.Name}\n`;
      text += `\nGroup location: ${groupInfo.Location}\n`;
      text += `\nContact email: ${groupInfo.Email}\n`;
      if (groupInfo.Phone) {
        text += `\nContact phone: ${groupInfo.Phone}\n`;
      }
      text += `\nGroup website: ${groupInfo.Website}\n`;

      text += `\nBelow is the group information in json format that can be add directly under '${groupInfo.State}' in the database: \n`;
      delete groupInfo.State;
      delete groupInfo.Name;
      text += '\n';
      text += JSON.stringify({ [groupName]: groupInfo });

      sgMail.setApiKey(process.env.SENDGRID_API_KEY);
      const msg = {
        to: process.env.DESTINATION_EMAIL,
        from: process.env.EMAIL,
        subject: 'Find a Bi Group: group recommendation',
        text,
      };
      sgMail.send(msg);

      // const mailOptions = {
      //   from: process.env.EMAIL,
      //   to: process.env.DESTINATION_EMAIL,
      //   subject: 'Find a Bi Group: group recommendation',
      //   text,
      // };

      // transporter.sendMail(mailOptions, (error, info) => {
      //   if (error) console.log(error);
      //   else console.log(`Email sent: ${info.response}`);
      // });

      res.send();
    });

    server.get('*', (req, res) => handle(req, res));
  });
