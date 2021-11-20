const inquirer = require("inquirer");
const mysql = require("mysql2");
const cons_tbl = require('console.table');

const PORT = process.env.PORT || 3006;

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
  
};