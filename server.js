const inquirer = require("inquirer");
const mysql = require("mysql2");
const cons_tbl = require('console.table');

const db = mysql.createConnection(
  {
    host: 'localhost',
    port: 3306,
    user: 'root',
    password: 'password',
    database: 'cms_employee_db'
  }
);

db.connect( (err) => {
  if (err) {
    console.log(`Connection failed. \n${err}`);
    return;
  }
  console.log(`Connection successful. \nConnected to ${db.config.database} database.\n`);
  welcome();
});

const welcome = () => {
  console.log(`-----------------------------------------`);
  console.log(`           Employee CMS System`);
  console.log(`=========================================`);
  console.log(`Main menu`);
  mainMenu();
};

const mainMenu = () => {
  inquirer.prompt([
    {
    type: "list",
    message: "- Select menu option:",
    name: "choice",
    choices: [
              "1. View Departments", 
              "2. View Roles",
              "3. View Employees"
            ]
    },
    ])
    .then(res => {
      const selection = res.choice;
      console.log(`${selection}`);
      switch (selection) {
        case "1. View Departments":

        break;

        case "2. View Roles":

        break;

        case "3. View Employees":

        break;
      }
    })
};