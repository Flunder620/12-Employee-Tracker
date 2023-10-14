const express = require("express");

const mysql = require("mysql2");

const inquirer = require("inquirer");

const PORT = process.env.PORT || 3001;
const app = express();

// Inquirer questions
const questions = [
  {
      type: "list",
      name: "choice",
      message: "What would you like to do?",
      choices: ["view all departments", "View all roles", "Add a department", "Add a role", "add an employee", "update an employee role"]
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
    database: "employees_db",
  },
  console.log(`Connected to the employees_db database.`)
);

// Query database
db.query("SELECT * FROM ", function (err, results) {
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
