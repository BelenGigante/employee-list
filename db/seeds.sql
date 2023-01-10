INSERT INTO department(name);
VALUES
('Executive'),--1--
('I.T'),--2--
('Operations'),--3--
('Helpdesk'),--4--
('Web Development and Database'),--5--
('App Software Development'),--6--
INSERT INTO role(title,salary,department_id)
VALUES
('Vice President COO',100000,1),
('Director',100000,2),
('Executive Asistant',80000,3),
('Director of Operations',80000,3),
('Network Administrator',70000,4),
('Helpdesk Supervisor',70000,4),
('Director of Web Development',80000,5),
('Web Designer',60000,5),
('Advertising Manager',60000,5),
('Application Software Development Manager',80000,6),
('Sr. Programmer',70000,6),
('Jr. Programmer',70000,6),

INSERT INTO employee(first_name,last_name,role_id,manager_id)
VALUES
('James','Miller',1,NULL),
('Gus','Walker',2,1),
('Cor',' Hart',3,2),
('Jeff','Davis',4,2),
('Keisha','Burgess',5,2),
('Alex','Wright',6,2),
('David','Doucet',7,3),
('Reyton','Lindebergh',8,3),
('Stefanie','Stallworth',9,5),
('James','LeJeune',10,5),
('Thomas','Lawton',11,6),
('Michael','Antonio',12,6),