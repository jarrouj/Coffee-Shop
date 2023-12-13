// app.js
const express = require('express');
const app = express();
const PORT = 3000;
const mysql = require('mysql');
// const { connection } = require('./database');
const connect = require('./DBcon');

// Middleware to parse JSON data
app.use(express.json());

// Middleware to parse URL-encoded data (usually from forms)
app.use(express.urlencoded({ extended: true }));

// Serve static files from the 'public' directory
app.use(express.static(__dirname + '/public'));

// In-memory array to store user data
const users = [];

// Serve the HTML files
app.get('/register', (req, res) => {
  res.sendFile(__dirname + '/public/html/signup.html');
});

app.get('/login', (req, res) => {
  res.sendFile(__dirname + '/public/html/login.html');
});


const signup = require('./Controller/Auth/signup');
const login = require('./Controller/Auth/login');

app.post('/signup', signup);
app.post('/login', login);

app.listen(PORT, () => {
  console.log(`Server is running on http://localhost:${PORT}`);
});

//haw ana chacha zedton b2a chilon ba3deyn
app.get('/', (_, res) => {
    res.sendFile(__dirname + '/public/html/coffeeshop.html');
});


//admin

app.get('/cms',(_,res)=>{
  res.sendFile(__dirname + '/public/html/cms.html');
});

app.get('/adminlogin',(_,res)=>{
  res.sendFile(__dirname + '/public/html/adminlogin.html');

})

const adminlogin = require('./Controller/Admin/login');
app.post('/adminsignin', adminlogin);
//END ADMIN


//CRUD for my products
app.post('/addCoffee', (req, res) => {

  const { name, price, description, image_url } = req.body;
  const query = 'INSERT INTO menuitems (name, price, description, image_url) VALUES (?, ?, ?, ?)';
  connect.connection.query(query, [name, price, description, image_url], (err, result) => {
      if (err) {
          console.error('Error adding menu item:', err);
          res.status(500).send('Error adding menu item');
          return;
      }
      console.log('Menu item added successfully');
      res.redirect('/cms');
  });
});

app.get('/showCoffee', (req, res) => {
  const query = 'SELECT name, price, description, image_url FROM menuitems';
  connect.connection.query(query, (err, result) => {
    if (err) {
      console.error('Error showing your menu items:', err);
      res.status(500).send('Error retrieving menu items');
      return;
    }

    const menuItems = result.map(item => {
      return {
        name: item.name,
        price: item.price,
        description: item.description,
        image_url: item.image_url
      };
    });

    console.log(menuItems); // Verify the menuItems array in the console
    res.json(result);
  });
});

app.post('/updateCoffee/:id', (req, res) => {
  const itemId = req.params.id;
  const { name, price, description, image_url } = req.body;

  const query = 'UPDATE menuitems SET name=?, price=?, description=?, image_url=? WHERE id=?';
  connect.connection.query(query, [name, price, description, image_url, itemId], (err, result) => {
    if (err) {
      console.error('Error updating menu item:', err);
      res.status(500).send('Error updating menu item');
      return;
    }
    if (result.affectedRows > 0) {
      res.json({ message: 'Menu item updated successfully' });
    } else {
      res.status(404).json({ message: 'Menu item not found' });
    }
  });
});

app.delete('/deleteCoffee/:id', (req, res) => {
  const itemId = req.params.id;

  const query = 'DELETE FROM menuitems WHERE id=?';
  connect.connection.query(query, [itemId], (err, result) => {
    if (err) {
      console.error('Error deleting menu item:', err);
      res.status(500).send('Error deleting menu item');
      return;
    }

    if (result.affectedRows > 0) {
      res.json({ message: 'Menu item deleted successfully' });
    } else {
      res.status(404).json({ message: 'Menu item not found' });
    }
  });
});

app.get('/addpage',(req,res)=>{
  res.sendFile(__dirname + '/public/html/addproducts.html');
});

app.get('/deletepage',(req,res)=>{
  res.sendFile(__dirname + '/public/html/deleteproducts.html');
});

app.get('/updatepage',(req,res)=>{
  res.sendFile(__dirname + '/public/html/updateproducts.html');
});

app.get('/showproductspage',(req,res)=>{
  res.sendFile(__dirname + '/public/html/showproducts.html');
});

//END CRUD


// Import and use the menu routes
// const menuRoutes = require('./Controller/menu');
// app.use('/menu', menuRoutes);
