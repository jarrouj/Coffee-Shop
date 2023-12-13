// login.js

const connect = require('../../DBcon');
// const bcrypt = require('bcrypt');

const adminlogin = (req, resp) => {
    const name = req.body.name;
    const password = req.body.password;

    connect.connection.query(
        "SELECT * FROM admin WHERE name = ? AND password = ?",
        [name, password],
        (err, results) => {
            if (err) {
                console.error('Error querying database:', err);
                resp.status(500).send("<h1>Internal Server Error</h1>");
                return;
            }

            if (results.length > 0) {
                console.log('Logged in successfully ')
                resp.redirect('/cms')
            } else {
                resp.send("<h1>User not found</h1>");
            }
        }
    );
};

module.exports = adminlogin;
