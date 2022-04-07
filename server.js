const express = require('express');
const app = express();
app.use(express.json());

app.get('/', (req, res) => {
res.send('HELLO WORLD!');
});

//Connect to MySQL
var mysql = require('mysql');

//Connect to MySQL
var con = mysql.createConnection({
  host: "mysqldockerexample_mysql_1",
  port: "3306",
  user: "Dave",
  password: "password",
  database: "classicmodels"
});

//Open Connection
con.connect(function(err) {
	  if (err) throw err;
});

// create router
var router = express.Router();

// middleware to use for all requests
router.use(function(req, res, next) {
	// do logging
	console.log('Something is happening.');
	next();
});

// REGISTER  ROUTES
app.use('/api', router);

//GET
// /api/getit
router.get('/getit', function (req, res) {
	con.query("SELECT * FROM customers", function (err, result, fields) {
		if (err) throw err;
		res.end(JSON.stringify(result)); // Result in JSON format
	});
});

// POST
// /api/postit
router.post('/postit', async (req, res) => {
    var productLine = req.param('productLine');
    
      con.query("INSERT INTO productlines (productLine) VALUES (?)", productLine,function (err, result, fields) {
          if (err) throw err;
          res.end(JSON.stringify(result)); // Result in JSON format
      });
  });

// /api/postitbody
router.post('/postitbody', async (req, res) => {
	var productLine = req.body.productLine
	 con.query("INSERT INTO productlines (productLine) VALUES (?)", productLine,function (err, result, fields) {
		if (err) throw err;
		res.end(JSON.stringify(result)); // Result in JSON format
	 });
});  
  
// /api/put
router.put('/putit', async (req, res) => {
	var productLineNew = req.body.productLineNew
	var productLineOld = req.body.productLineOld

	 con.query("UPDATE productlines SET productLine = ? WHERE productline = ?", [productLineNew,productLineOld],function (err, result, fields) {
		if (err) throw err;
		res.end(JSON.stringify(result)); // Result in JSON format
	 });
});

// DELETE
// /api/deleteit
router.delete('/deleteit', async (req, res) => {
    var productLine = req.body.productLine
    
      con.query("DELETE FROM productlines WHERE productLine = ? ", productLine,function (err, result, fields) {
          if (err) throw err;
          res.end(JSON.stringify(result)); 
        });
  });  

// /api/payments  
// GET
router.get('/payments', function (req, res)  {
	con.query("SELECT * FROM payments", function (err, result, fields) {
		if (err) throw err;
		res.end(JSON.stringify(result)); // Result in JSON format
	});
});

// POST
router.post('/payments', async (req, res) => {
    var checkNumber = req.body.checkNumber
    
      con.query("INSERT INTO payments (checkNumber) VALUES (?)", checkNumber,function (err, result, fields) {
          if (err) throw err;
          res.end(JSON.stringify(result)); // Result in JSON format
      });
});

// /api/payment/{checkNumber}
// GET
router.get('/payments/:checkNumber', function (req, res)  {
	con.query("SELECT * FROM payments WHERE checkNumber = ?", checkNumber,function (err, result, fields) {
		if (err) throw err;
		res.end(JSON.stringify(result)); // Result in JSON format
	});
});

// PUT
router.put('/payments/:checkNumber', async (req, res) => {
	var checkNumberNew = req.body.checkNumberNew
	var checkNumberOld = req.body.checkNumberOld

	 con.query("UPDATE payments SET checkNumber = ? WHERE checkNumber = ?", [checkNumberNew,checkNumberOld],function (err, result, fields) {
		if (err) throw err;
		res.end(JSON.stringify(result)); // Result in JSON format
	 });
});

// DELETE
router.delete('/payments/:checkNumber', async (req, res) => {
    var checkNumber = req.body.checkNumber
    
    con.query("DELETE FROM payments WHERE checkNumber = ? ", checkNumber,function (err, result, fields) {
        if (err) throw err;
    	res.end(JSON.stringify(result)); 
    });
}); 

// /api/employees
// GET
router.get('/employees', function (req, res)  {
	con.query("SELECT * FROM employees", function (err, result, fields) {
		if (err) throw err;
		res.end(JSON.stringify(result)); // Result in JSON format
	});
});

// POST
router.post('/employees', async (req, res) => {
    var employeeNumber = req.body.employeeNumber
    
      con.query("INSERT INTO employees (employeeNumber) VALUES (?)", employeeNumber,function (err, result, fields) {
          if (err) throw err;
          res.end(JSON.stringify(result)); // Result in JSON format
      });
});

// /api/employee/{employeeNumber}
// GET
router.get('/employees/:employeeNumber', function (req, res)  {
	con.query("SELECT * FROM employees WHERE employeeNumber = ?", employeeNumber,function (err, result, fields) {
		if (err) throw err;
		res.end(JSON.stringify(result)); // Result in JSON format
	});
});

// PUT
router.put('/employees/:employeeNumber', async (req, res) => {
	var employeeNumberNew = req.body.employeeNumberNew
	var employeeNumberOld = req.body.employeeNumberOld

	 con.query("UPDATE employees SET employeeNumber = ? WHERE employeeNumber = ?", [employeeNumberNew,employeeNumberOld],function (err, result, fields) {
		if (err) throw err;
		res.end(JSON.stringify(result)); // Result in JSON format
	 });
});

// DELETE
router.delete('/employees/:employeeNumber', async (req, res) => {
    var employeeNumber = req.body.employeeNumber
    
    con.query("DELETE FROM employees WHERE employeeNumber = ? ", employeeNumber,function (err, result, fields) {
        if (err) throw err;
    	res.end(JSON.stringify(result)); 
    });
}); 
  
// PORT ENVIRONMENT VARIABLE
const port = process.env.PORT || 8080;
app.listen(port, () => console.log(`Listening on port ${port}..`));
