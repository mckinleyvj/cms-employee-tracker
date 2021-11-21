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
  console.clear();
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
      switch (selection) {
        case "1. View Departments":
          console.clear();
          viewDept();
        break;

        case "2. View Roles":
          console.clear();
          viewRoles();
        break;

        case "3. View Employees":
          console.clear();
          viewEmp();
        break;
      }
    })
};

//DEPARTMENT
const viewDept = () => {
  const sql = `SELECT * FROM department ORDER BY id`;
  db.query(sql, (err, res) => {
    if (err) {
      console.log(`Something went wrong. \n${err}`);
      return;
    }
    console.log(`\nDisplaying table: Department`);
    console.log(`=========================================`);
    console.table(res);
    viewDeptMenu();
  })
};

const viewDeptMenu = () => {
  inquirer.prompt([
    {
    type: "list",
    message: "Departments- What would you like to do?",
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
              message: "Add Department- Please enter new Department name:"
            }
            ]).then(function(res) {
              const ans = res.dept_name;
              const insertsql = `INSERT INTO department (dept_name) VALUE ('${ans}');`;
              db.query(insertsql, (err,res) => {
                if (err) {
                  console.log(`Something went wrong. \n${err}`);
                  return;
                }
                console.clear();
                console.log(`Successfully added new record.`);
                viewDept();
              })
            })
          break;
  
          case "b. Update Department":
            inquirer.prompt([
              {
                name: "the_id",
                type: "input",
                message: "Update Department- Please select the id of department you wish to update:"
              }
              ]).then(function(res) {
                const ans_id = res.the_id;
                inquirer.prompt([
                  {
                    name: "dept_name",
                    type: "input",
                    message: "Update Department- Please enter new department name:"
                  }
                  ]).then(function(res) {
                    const ans_dept_name = res.dept_name;
                    const updateSql = `UPDATE department SET dept_name = '${ans_dept_name}' WHERE id = ${ans_id};`;
                    db.query(updateSql, (err,res) => {
                        if (err) {
                          console.log(`Something went wrong. \n${err}`);
                          return;
                        }
                        console.clear();
                        console.log(`Successfully updated record.`);
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
                message: "Delete Department- Please select the id of department you wish to delete:"
              }
              ]).then(function(res) {
                const ans = res.the_id;
                const deleteSql = `DELETE FROM department WHERE id = ${ans};`;
                db.query(deleteSql, (err,res) => {
                  if (err) {
                    console.log(`Something went wrong. \n${err}`);
                    return;
                  }
                  console.clear();
                  console.log(`Successfully deleted record.`);
                  viewDept();
                })
              })
          break;

          case "d. Back to Main Menu":
              welcome();
          break;
        }
      })
};

//ROLES
const viewRoles = () => {
  const sql = `SELECT roles.id, roles.role_title, roles.salary, department.id AS dept_id, department.dept_name FROM department, roles WHERE department.id = roles.dept_id ORDER BY roles.id;`;
  db.query(sql, (err, res) => {
    if (err) {
      console.log(`Something went wrong. \n${err}`);
      return;
    }
    console.log(`\nDisplaying table: Roles`);
    console.log(`=========================================`);
    console.table(res);
    viewRolesMenu();
  })
};

const viewRolesMenu = () => {
  inquirer.prompt([
    {
    type: "list",
    message: "Roles- What would you like to do?",
    name: "choice",
    choices: [
              "a. Add Role", 
              "b. Update Role",
              "c. Delete Role",
              "d. Back to Main Menu"
            ]
    },
    ])
    .then(res => {
      const selection = res.choice;
      const showDeptSql = `SELECT * FROM department ORDER BY id`;
      switch (selection) {
          case "a. Add Role":
              db.query(showDeptSql, (err,res) => {
                console.log(`\nDisplaying table: Department`);
                console.log(`=========================================`);
                console.table(res);
                addRole();
              })
          break;
  
          case "b. Update Role":
              db.query(showDeptSql, (err,res) => {
                console.log(`\nDisplaying table: Department`);
                console.log(`=========================================`);
                console.table(res);
                updateRole();
              })
          break;
  
          case "c. Delete Role":
            inquirer.prompt([
              {
                name: "the_id",
                type: "input",
                message: "Please select the id of the role you wish to delete:"
              }
              ]).then(function(res) {
                const ans = res.the_id;
                const deleteSql = `DELETE FROM roles WHERE id = ${ans};`;
                db.query(deleteSql, (err,res) => {
                  if (err) {
                    console.log(`Something went wrong. \n${err}`);
                    return;
                  }
                  console.clear();
                  console.log(`Successfully deleted record.`);
                  viewRoles();
                })
              })
          break;

          case "d. Back to Main Menu":
            welcome();
          break;
        }
      })
};

const addRole = () => {
  inquirer.prompt([
    {
      name: "role_title",
      type: "input",
      message: "Add Role- Please enter new Role title:"
    },
    {
      name: "role_salary",
      type: "input",
      message: "Add Role- Please enter the salary for this role:"
    },
    {
      name: "role_dept",
      type: "input",
      message: "Add Role- Please enter the dept id for this role:"
    }
    ]).then(res => {
      const role_title = res.role_title;
      const role_salary = res.role_salary;
      const role_dept = res.role_dept;

      const insertsql = `INSERT INTO roles (role_title, salary, dept_id) VALUE ('${role_title}','${role_salary}','${role_dept}');`;
      db.query(insertsql, (err,res) => {
        if (err) {
          console.log(`Something went wrong. \n${err}`);
          return;
        }
        console.clear();
        console.log(`Successfully added new record.`);
        viewRoles();
      })
    })
};

const updateRole = () => {
  inquirer.prompt([
    {
      name: "the_id",
      type: "input",
      message: "Please select the id of the role you wish to update:"
    }
    ]).then(function(res) {
      const ans_id = res.the_id;
      inquirer.prompt([
        {
          name: "role_title",
          type: "input",
          message: "Please enter new role title:"
        },
        {
          name: "role_salary",
          type: "input",
          message: "Please enter role salary:"
        },
        {
          name: "role_dept_id",
          type: "input",
          message: "Please enter dept id for this role:"
        }
        ]).then(function(res) {
          const ans_role_title = res.role_title;
          const ans_role_salary = res.role_salary;
          const ans_role_dept_id = res.role_dept_id;

          const updateSql = `UPDATE roles SET role_title = '${ans_role_title}', salary = '${ans_role_salary}', dept_id = '${ans_role_dept_id}' WHERE id = ${ans_id};`;
          db.query(updateSql, (err,res) => {
              if (err) {
                console.log(`Something went wrong. \n${err}`);
                return;
              }
              console.clear();
              console.log(`Successfully updated record.`);
              viewRoles();
            })
          })
        })
};

//EMPLOYEES
const viewEmp = () => {
  const empSql = `SELECT e.id, e.first_name, e.last_name, e.role_id, r.role_title, e.manager_id FROM employee e, roles r WHERE e.role_id = r.id ORDER BY e.id;`;
  db.query(empSql, (err, resp) => {
    if (err) {
      console.log(`Something went wrong. \n${err}`);
      return;
    }
    console.log(`\nDisplaying table: Employees`);
    console.log(`=========================================`);
    console.table(resp);
    viewEmpMenu();
  });
};

const viewEmpMenu = () => {
  inquirer.prompt([
    {
    type: "list",
    message: "Employees- What would you like to do?",
    name: "choice",
    choices: [
              "a. Add Employee", 
              "b. Update Employee",
              "c. Delete Employee",
              "d. Back to Main Menu"
            ]
    },
    ])
    .then(res => {
      const selection = res.choice;
      switch (selection) {
        case "a. Add Employee":
          inquirer.prompt([
            {
              name: "first_name",
              type: "input",
              message: "Add Employee- Please enter New employee's first name:"
            },
            {
              name: "last_name",
              type: "input",
              message: "Add Employee- Please enter New employee's last name:"
            },
            {
              name: "role_id",
              type: "input",
              message: "Add Employee- Please enter New employee's role id:"
            },
            {
              name: "manager_id",
              type: "input",
              message: "Add Employee- Please enter New employee's manager id:",
              validate: value => {
                const valid = !isNaN(parseInt(value));

                if (valid) {
                  return valid;
                }

                if (!valid) {
                  return true;
                }
                
            },
            }

            ]).then(function(res) {
              if (res.manager_id === '') {
                const first_name = res.first_name;
                const last_name = res.last_name;
                const role_id = res.role_id;
                const insertsql = `INSERT INTO employee (first_name, last_name, role_id) VALUE ('${first_name}','${last_name}','${role_id}');`;
                db.query(insertsql, (err,res) => {
                  if (err) {
                    console.log(`Something went wrong. \n${err}`);
                    return;
                  }
                  console.clear();
                  console.log(`Successfully added new record.`);
                  viewEmp();
                })
              }else {
                const first_name = res.first_name;
                const last_name = res.last_name;
                const role_id = res.role_id;
                const manager_id = res.manager_id;
                insertsql = `INSERT INTO employee (first_name, last_name, role_id, manager_id) VALUE ('${first_name}','${last_name}','${role_id}','${manager_id}');`;
                db.query(insertsql, (err,res) => {
                  if (err) {
                    console.log(`Something went wrong. \n${err}`);
                    return;
                  }
                  console.clear();
                  console.log(`Successfully added new record.`);
                  viewEmp();
                })
              }
            })
          break;
  
          case "b. Update Employee":
          //   inquirer.prompt([
          //     {
          //       name: "the_id",
          //       type: "input",
          //       message: "Update Department- Please select the id of department you wish to update:"
          //     }
          //     ]).then(function(res) {
          //       const ans_id = res.the_id;
          //       inquirer.prompt([
          //         {
          //           name: "dept_name",
          //           type: "input",
          //           message: "Update Department- Please enter new department name:"
          //         }
          //         ]).then(function(res) {
          //           const ans_dept_name = res.dept_name;
          //           const updateSql = `UPDATE department SET dept_name = '${ans_dept_name}' WHERE id = ${ans_id};`;
          //           db.query(updateSql, (err,res) => {
          //               if (err) {
          //                 console.log(`Something went wrong. \n${err}`);
          //                 return;
          //               }
          //               console.clear();
          //               console.log(`Successfully updated record.`);
          //               viewDept();
          //             })
          //           })
          //         })
          break;
  
          case "c. Delete Employee":
            inquirer.prompt([
              {
                name: "the_id",
                type: "input",
                message: "Delete Employee- Please select the id of the employee you wish to delete:"
              }
              ]).then(function(res) {
                const ans = res.the_id;
                const deleteSql = `DELETE FROM employee WHERE id = ${ans};`;
                db.query(deleteSql, (err,res) => {
                  if (err) {
                    console.log(`Something went wrong. \n${err}`);
                    return;
                  }
                  console.clear();
                  console.log(`Successfully deleted record.`);
                  viewEmp();
                })
              })
          break;

          case "d. Back to Main Menu":
              welcome();
          break;
        }
      })
};