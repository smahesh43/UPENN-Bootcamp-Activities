var express = require("express");
var app = express();
var mysql      = require('mysql');
var PORT = 3030;
var connection = mysql.createConnection({
  host     : 'localhost',
  user     : 'root',
  password : 'root',
  database : 'seinfeld_db'
});
 
// Initiate MySQL Connection.
connection.connect(function(err) {
    if (err) {
      console.error("error connecting: " + err.stack);
      return;
    }
    console.log("connected as id " + connection.threadId);
  });
  
  // Routes
  app.get("/cast", function(req, res) {
  
    // If the main route is hit, then we initiate a SQL query to grab all records.
    // All of the resulting records are stored in the variable "result."
    connection.query("SELECT * FROM actors", function(err, result) {
  
      // We then begin building out HTML elements for the page.
      var html = "<h1>Actors List </h1>";
  
      // Here we begin an unordered list.
      html += "<ul>";
  
      // We then use the retrieved records from the database to populate our HTML file.
      for (var i = 0; i < result.length; i++) {
        html += "<li><p> ID: " + result[i].id + "</p>";
        html += "<p>Name: " + result[i].name + " </p></li>";
        html += "<p>Coolness Points: " + result[i].coolness_points + " </p></li>";
        html += "<p>Attitude: " + result[i].attitude + " </p></li>";
      }
      // We close our unordered list.
      html += "</ul>";
      // Finally we send the user the HTML file we dynamically created.
      res.send(html);
    });
  });

   // Routes
   app.get("/coolness-chart", function(req, res) {
  
    // If the main route is hit, then we initiate a SQL query to grab all records.
    // All of the resulting records are stored in the variable "result."
    connection.query("SELECT * FROM actors GROUP BY coolness_points", function(err, result) {
  
      // We then begin building out HTML elements for the page.
      var html = "<h1>Actors List </h1>";
  
      // Here we begin an unordered list.
      html += "<ul>";
  
      // We then use the retrieved records from the database to populate our HTML file.
      for (var i = 0; i < result.length; i++) {
        html += "<li><p> ID: " + result[i].id + "</p>";
        html += "<p>Name: " + result[i].name + " </p></li>";
        html += "<p>Coolness Points: " + result[i].coolness_points + " </p></li>";
        html += "<p>Attitude: " + result[i].attitude + " </p></li>";
      }
  
      // We close our unordered list.
      html += "</ul>";
  
      // Finally we send the user the HTML file we dynamically created.
      res.send(html);
    });
  });

    // Routes
    app.get("/attitude-chart/:att", function(req, res) {
  
        // If the main route is hit, then we initiate a SQL query to grab all records.
        // All of the resulting records are stored in the variable "result."
        var att = req.params.att;
        connection.query("SELECT * FROM actors WHERE attitude =? ", [att], function(err, result) {
      
          // We then begin building out HTML elements for the page.
          var html = "<h1>Actors List </h1>";
      
          // Here we begin an unordered list.
          html += "<ul>";
      
          // We then use the retrieved records from the database to populate our HTML file.
          for (var i = 0; i < result.length; i++) {
            html += "<li><p> ID: " + result[i].id + "</p>";
            html += "<p>Name: " + result[i].name + " </p></li>";
            html += "<p>Coolness Points: " + result[i].coolness_points + " </p></li>";
            html += "<p>Attitude: " + result[i].attitude + " </p></li>";
          }
      
          // We close our unordered list.
          html += "</ul>";
      
          // Finally we send the user the HTML file we dynamically created.
          res.send(html);
        });
      });
    

  
  // Start our server so that it can begin listening to client requests.
  app.listen(PORT, function() {
    // Log (server-side) when our server has started
    console.log("Server listening on: http://localhost:" + PORT);
  });
  