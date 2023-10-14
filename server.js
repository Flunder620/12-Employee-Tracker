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
      "View all departments",
      "View all roles",
      "Add a department",
      "Add a role",
      "Add an employee",
      "Update an employee role",
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
// Add department function
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
  mainMenu();
}
//Add role function
async function addRole() {
  const departmentData = await db.promise().query("SELECT * FROM department");
  const departmentChoices = departmentData[0].map(({ id, name }) => ({
    name: name,
    value: id,
  }));
  const response = await inquirer.prompt([
    {
      type: "input",
      name: "role",
      message: "What is the name of the role you want to add?",
    },
    {
      type: "list",
      name: "roleDepartment",
      message: "What department does this role belong to?",
      choices: departmentChoices,
    },
    {
      type: "input",
      name: "roleSalary",
      message: "What is the salary for this role?",
    },
  ]);
  const data = db
    .promise()
    .query("INSERT INTO role (title, salary, department_id) VALUES (?,?,?)", [
      response.role,
      response.roleSalary,
      response.roleDepartment,
    ]);
  console.log(data);
  mainMenu();
}
//Adding employee
async function addEmployee() {
  const roleData = await db.promise().query("SELECT * FROM role");
  const roleChoices = roleData[0].map(({ id, title }) => ({
    name: title,
    value: id,
  }));
  const response = await inquirer.prompt([
    {
      type: "input",
      name: "firstName",
      message: "What is the first name of the employee you want to add?",
    },
    {
      type: "input",
      name: "lastName",
      message: "What is the last name of the employee you want to add?",
    },
    {
      type: "list",
      name: "role",
      message: "What role is this employee?",
      choices: roleChoices,
    },
    {
      type: "input",
      name: "manager",
      message: "Who is ther manager?",
    },
  ]);
  const data = db
    .promise()
    .query(
      "INSERT INTO employee(first_name, last_name, role_id, manager_id) VALUES (?,?,?,?)",
      [response.firstName, response.lastName, response.role, response.manager]
    );
  console.log(data);
  mainMenu();
}
//Update employee function
function updateEmployee(){
  
}
//Inquirer prompts
function mainMenu() {
  inquirer.prompt(questions).then((response) => {
    switch (response.choice) {
      case "View all departments":
        db.query("SELECT * FROM department", function (err, results) {
          console.table(results);
          mainMenu();
        });
        break;
      case "View all roles":
        db.query("SELECT * FROM role", function (err, results) {
          console.table(results);
          mainMenu();
        });
        break;
      case "Add a department":
        addDepartment();
        break;
      case "Add a role":
        addRole();
        break;
      case "Add an employee":
        addEmployee();
        break;
      case "Update an employee role":
        updateEmployee();
        break;
    }
  });
}

mainMenu();

app.listen(PORT, () => {
  console.log(`Server running on port ${PORT}`);
});
