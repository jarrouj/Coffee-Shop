// menu.js (Controller)

const express = require('express');
const router = express.Router();
const { connection } = require('../app');

// Display coffee shop menu
router.get('/', (req, res) => {
    // Fetch menu items from the database
    // Send menu items to the 'coffeeshop.html' template
    res.sendFile(__dirname + '/public/html/coffeeshop.html');
});

// Add a new menu item
router.post('/add', (req, res) => {
    // Process the form data and add the new item to the database
    // Redirect back to the coffee shop menu page
    // Add logic to insert into the 'menuItem' table in the database
    const { name, price, description, imageUrl } = req.body;
    const query = 'INSERT INTO menuItem (name, price, description, image_url) VALUES (?, ?, ?, ?)';
    connection.query(query, [name, price, description, imageUrl], (err, result) => {
        if (err) {
            console.error('Error adding menu item:', err);
            res.status(500).send('Error adding menu item');
            return;
        }
        console.log('Menu item added successfully');
        res.redirect('/menu');
    });
});

// Edit a menu item
router.post('/edit', (req, res) => {
    // Process the form data and update the selected item in the database
    // Redirect back to the coffee shop menu page
    // Implement logic for updating the 'menuItem' table in the database
    res.redirect('/menu');
});

// Delete a menu item
router.post('/delete', (req, res) => {
    // Process the form data and delete the selected item from the database
    // Redirect back to the coffee shop menu page
    // Implement logic for deleting from the 'menuItem' table in the database
    res.redirect('/menu');
});

module.exports = router;
