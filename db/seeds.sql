INSERT INTO department (name)
VALUES ("Sales"),
       ("Engineering"),
       ("Legal");

INSERT INTO role (title, salary, department_id)
VALUES ("Accountant Manager", 110000, 1),
       ("Account", 95000, 1),
       ("Lead Engineer", 100000, 2),
       ("Engineer", 80000, 2),
       ("Legal Lead", 120000, 3),
       ("Lawyer", 100000, 3);

INSERT INTO employee(first_name, last_name, role_id, manager_id)
VALUES ("John", "Smith", 1, NULL),
       ("Jane", "Doe", 2, 1),
       ("Paul", "Buchheit", 3, NULL),
       ("Michael", "Widenius", 4, 3),
       ("Harvey", "Specter", 5, NULL),
       ("Michael", "Ross", 6, 5);