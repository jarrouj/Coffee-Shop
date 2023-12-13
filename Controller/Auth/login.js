// login.js

const connect = require('../../DBcon');
// const bcrypt = require('bcrypt');

const login = (req, resp) => {
    const usernameOrEmail = req.body.usernameOrEmail;
    const password = req.body.password;

    connect.connection.query(
        "SELECT * FROM user_info WHERE username = ? OR email = ? AND password = ?",
        [usernameOrEmail, usernameOrEmail , password],
        (err, results) => {
            if (err) {
                console.error('Error querying database:', err);
                resp.status(500).send("<h1>Internal Server Error</h1>");
                return;
            }

            if (results.length > 0) {
                console.log('Logged in successfully ')
                resp.redirect('/')
            } else {
                resp.send("<h1>User not found</h1>");
            }
        }
    );
};

module.exports = login;
