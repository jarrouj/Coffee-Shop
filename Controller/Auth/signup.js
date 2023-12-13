const express=require('express');
const app=express();


const connect = require('../../DBcon');
const path = require('path');


const PublicPath = path.join(__dirname,'..','..', 'public' , 'html');
app.use(express.static(PublicPath));

const signup = (req, resp) => {
    const firstName = req.body.firstName;
    const lastName = req.body.lastName;
    const username = req.body.username;
    const email = req.body.email;
    const phoneNumber = req.body.phoneNumber;
    const country = req.body.country;
    const password = req.body.password;
    
    console.log(firstName);
    console.log(lastName);
    console.log(username);
    console.log(email);
    console.log(phoneNumber);
    console.log(country);
    console.log(password);

    connect.connection.query(
        "INSERT INTO user_info (firstName, lastName, username, email, phoneNumber, country,  password) VALUES (?, ?, ?, ?, ?, ?, ?)",
        [firstName, lastName, username, email, phoneNumber, country, password],
        (err, result) => {
            if (err) {
                console.error('Error inserting into database:', err);
                resp.status(500).send("<h1>Internal Server Error</h1>");
            } else {
                console.log(`${result.affectedRows} record(s) inserted`);
                // Assuming you have defined publicPath somewhere in your code
                resp.redirect('/');
            }
        }
    );
};

module.exports = signup;
