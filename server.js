const inquirer = require('inquirer');
const prompt = inquirer.createPromptModule();
const mysql = require('mysql2');
//require('console.table');

const db = mysql.createConnection({
    user: 'root',
    database: 'employee_db',
});
const insert = (table, data) => {
    db.query('INSERT INTO ?? SET ?', [table, data], (err) =>{
        //if (!err) return console.error(err);
        console.log('\nSuccesfully created\n');
        start();
    });
};

const getNameValue = (table, name, value) => {
    return db.promise().query('SELECT ?? AS name, ?? AS value FROM ??', [name, value, table]);
};
// const employeeInfo = async () => {
//     const infoText = `
//     SELECT
//     employee.id,
//     employee.first_name,
//     employee.last_name,
//     role.title,
//     role.salary,
//     CONCAT(employee.first_name, ' ', employee.last_name)
//     AS manager
//     FROM employee
//     JOIN role
//     ON employee.role_id =employee.id
//     `
//     const [employees] = await db.promise().query(infoText);
//     console.table(employees);
// };

const newEmployee = async () => {
    const [roles] = await getNameValue('role', 'title', 'id');
    const [managers] = await getNameValue('employee', 'last_name', 'id');
    prompt([
        {
            name: 'first_name',
            message: 'enter name',
        },
        {
            name: 'last_name',
            message: 'enter last name',
        },
        {
            type: 'list',
            name: 'role_id',
            message: 'role :',
            choices: roles,
        },
        {
            type: 'list',
            name: 'manager_id',
            message: 'choose a manager :',
            choices: managers,
        },
    ])
    .then((answers) => {
            insert('employee', answers);
    });
};

const options = (type) => {
    switch (type) {
        case 'Show all employees': {
            db.query('SELECT * FROM employee',(err, employees)=>{
                console.table(employees);
            });
            start();
            break;
        }
        case 'Show all departments': {
            db.query('SELECT * FROM department',(err, department)=>{
                console.table(department);
            });
            start();
            break;
        }
        case 'Show all roles': {
            db.query('SELECT * FROM role',(err, role)=>{
                console.table(role);
            });
            start();
            break;
        }
        case 'Add Employee': {
            newEmployee();
            break;
        }
        case 'Quit': {
            break;
        }
    }
}
const start = () => {
    prompt({
        type: 'list',
        message: 'select an option',
        choices: [
            'Show all employees',
            'Show all departments',
            'Show all roles',
            'Add Employee',
            'QUIT',
        ],
        name: 'type',
    })
    .then((answers) => {
        options(answers.type);
    });
};
start();