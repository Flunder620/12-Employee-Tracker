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
    choices: [
      "view all departments",
      "View all roles",
      "Add a department",
      "Add a role",
      "add an employee",
      "update an employee role",
    ],
  },
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

function addDepartment() {
  inquirer
    .prompt([
      {
        type: "input",
        name: "department",
        message: "What is the name of the department you want to add?",
      },
    ])
    .then((response) => {
      db.query("INSERT INTO department (name) VALUES (?)", response.department);
    });
    mainMenu()
}

async function addRole(){
  const departmentData = await db.promise().query("SELECT * FROM department")
  const departmentChoices = departmentData[0].map(({id, name}) =>({name: name, value: id}))
  const response = await inquirer
    .prompt([
      {
        type: "input",
        name: "role",
        message: "What is the name of the role you want to add?",
      },
      {
        type: "list",
        name: "roleDepartment",
        message: "What department does this role belong to?",
        choices: departmentChoices
      },
      {
        type: "input",
        name: "roleSalary",
        message: "What is the salary for this role?",
      }
    ])
    const data = db.promise().query("INSERT INTO role (title, salary, department_id) VALUES (?,?,?)", [response.role, response.roleSalary, response.roleDepartment])
    console.log(data)
    mainMenu()
}
//Inquirer prompt
function mainMenu() {
  inquirer.prompt(questions).then((response) => {
    switch (response.choice) {
      case "view all departments":
        db.query("SELECT * FROM department", function (err, results) {
          console.table(results);
          mainMenu()
        });
        break;
      case "View all roles":
        db.query("SELECT * FROM role", function (err, results) {
          console.table(results);
          mainMenu()
        });
        break;
      case "Add a department":
        addDepartment();  
        break;
      case "Add a role":
        addRole()
        break;
    }
  });
}
mainMenu()

app.listen(PORT, () => {
  console.log(`Server running on port ${PORT}`);
});
