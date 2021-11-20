INSERT INTO department (dept_name)
VALUES ("Finance"),
       ("Sales"),
       ("Technology"),
       ("Customer Service");

INSERT INTO roles (role_title, salary, dept_id)
VALUES ("Accountant", 65000, 1),
       ("Salesman", 55000, 2),
       ("Chief Accountant", 75000, 1),
       ("CSC Officer", 55000, 4),
       ("IT Support", 65000, 3),
       ("Network Engineer", 60000, 3),
       ("Sales Supervisor", 85000, 2);
       
INSERT INTO employee (first_name, last_name, role_id)
VALUES ("Mike", "Chan", 1),
       ("Jason", "Chan", 2),
       ("Jake", "Born", 3),
       ("Ashley", "Chantley", 4),
       ("Mac", "Bourne", 5),
       ("John", "Doe", 6),
       ("Kelly", "Mitchell", 7);

UPDATE employee SET manager_id = 3 WHERE id = 1;
UPDATE employee SET manager_id = 7 WHERE id = 2;