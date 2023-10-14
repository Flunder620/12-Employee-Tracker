const express = require("express");

const mysql = require("mysql2");

const inquirer = require("inquirer");

const PORT = process.env.PORT || 3001;
const app = express();

const questions = [
  {
      type: "input",
      name: "text",
      message: "Enter your text: "
  },
  {
      type: "input",
      name: "tcolor",
      message: "What color what you like your text?(Red, Green, Blue)"
  },
  {
      type: "input",
      name: "shape",
      message: "Which shape would you like?(Circle, Triangle, or Square)"
  },
  {
      type: "input",
      name: "scolor",
      message: "What color would you like your shape?(Red, Green, Blue)"
  }
];

// Express middleware
app.use(express.urlencoded({ extended: false }));
app.use(express.json());

// Database
const db = mysql.createConnection(
  {
    host: "localhost",
    user: "root",
    password: "Password1",
    database: "classlist_db",
  },
  console.log(`Connected to the classlist_db database.`)
);

// Query database
db.query("SELECT * FROM students", function (err, results) {
  console.log(results);
});

// Request, Response
app.use((req, res) => {
  res.status(404).end();
});

//Inquirer prompt
inquirer.prompt(questions)

app.listen(PORT, () => {
  console.log(`Server running on port ${PORT}`);
});
