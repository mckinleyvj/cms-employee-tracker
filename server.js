const inquirer = require("inquirer");
const mysql = require("mysql2");
const consoleTable = require("console.table");

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
  mainMenu();
};

const mainMenu = () => {
  inquirer.prompt([
    {
    type: "list",
    message: "Main Menu- Select an option:",
    name: "choice",
    choices: [
              "1. View Departments", 
              "2. View Roles",
              "3. View Employees",
            ]
    },
    ])
    .then(res => {
      const selection = res.choice;
      // console.log(`${selection}`);
      switch (selection) {
        case "1. View Departments":
          viewDept();
        break;

        case "2. View Roles":
          viewRoles();
        break;

        case "3. View Employees":
          viewEmp();
        break;
      }
    })
};

const viewDept = () => {
  const sql = `SELECT * FROM department;`;
  db.query(sql, (err, res) => {
    if (err) {
      console.log(`Something went wrong. \n${err}`);
      return;
    }
    console.log(`\n=========================================`);
    console.table(res);
    viewDeptMenu();
  })
};

const viewDeptMenu = () => {
  inquirer.prompt([
    {
    type: "list",
    message: "Departments: What would you like to do?",
    name: "choice",
    choices: [
              "a. Add Department", 
              "b. Update Department",
              "c. Delete Department",
              "d. Back to Main Menu"
            ]
    },
    ])
    .then(res => {
      const selection = res.choice;
      switch (selection) {
        case "a. Add Department":
          inquirer.prompt([
            {
              name: "dept_name",
              type: "input",
              message: "Please enter new Department name:"
            }
            ]).then(function(res) {
              const ans = res.dept_name;
              const insertsql = `INSERT INTO department (dept_name) VALUE ('${ans}');`;
              db.query(insertsql, (err,res) => {
                if (err) {
                  console.log(`Something went wrong. \n${err}`);
                  return;
                }
                viewDept();
              })
            })
          break;
  
          case "b. Update Department":
            inquirer.prompt([
              {
                name: "the_id",
                type: "input",
                message: "Please select the id of department you wish to update:"
              }
              ]).then(function(res) {
                const ans_id = res.the_id;
                inquirer.prompt([
                  {
                    name: "dept_name",
                    type: "input",
                    message: "Please enter new department name:"
                  }
                  ]).then(function(res) {
                    const ans_dept_name = res.dept_name;
                    const updateSql = `UPDATE department SET dept_name = '${ans_dept_name}' WHERE id = ${ans_id};`;
                    db.query(updateSql, (err,res) => {
                        if (err) {
                          console.log(`Something went wrong. \n${err}`);
                          return;
                        }
                        viewDept();
                      })
                    })
                  })
          break;
  
          case "c. Delete Department":
            inquirer.prompt([
              {
                name: "the_id",
                type: "input",
                message: "Please select the id of department you wish to delete:"
              }
              ]).then(function(res) {
                const ans = res.the_id;
                const deleteSql = `DELETE FROM department WHERE id = ${ans};`;
                db.query(deleteSql, (err,res) => {
                  if (err) {
                    console.log(`Something went wrong. \n${err}`);
                    return;
                  }
                  viewDept();
                })
              })
          break;

          case "d. Back to Main Menu":
              mainMenu();
          break;
        }
      })
};

const viewRoles = () => {
  const sql = `SELECT * FROM roles;`;
  db.query(sql, (err, res) => {
    if (err) {
      console.log(`Something went wrong. \n${err}`);
      return;
    }
    console.log(`=========================================`);
    console.table(res);
    console.log(`=========================================`);
    mainMenu();
  });
};

const viewEmp = () => {
  const sql = `SELECT * FROM employee;`;
  db.query(sql, (err, res) => {
    if (err) {
      console.log(`Something went wrong. \n${err}`);
      return;
    }
    console.log(`=========================================`);
    console.table(res);
    console.log(`=========================================`);
    mainMenu();
  });
};