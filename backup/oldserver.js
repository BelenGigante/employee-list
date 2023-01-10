const inquirer = require('inquirer');
const prompt = inquirer.createPromptModule();
const mysql = require('mysql2');

const db = mysql.createConnection({
    user: 'root',
    database: 'employee_db',
});
const chooseOption = (type) => {
    switch (type) {
        case 'VIEW ALL EMPLOYEES': {
            db.query('SELECT * FROM employee', (err, employees) => {
                console.table(employees);
                start();
            });
            break;
        }
        case 'VIEW ALL DEPARTMENTS': {
            db.query('SELECT * FROM department', (err, departments) => {
                console.table(departments);
                start();
            });
            break;
        }
        case 'VIEW ALL ROLES': {
            db.query('SELECT * FROM role', (err, roles) => {
                console.table(roles);
                start();
            });
            break;
        }
        case 'QUIT':{
            break;
        }
    }
}
const start = () => {
    prompt({
        type: 'list',
        message: 'select an option',
        choices: [
            'VIEW ALL EMPLOYEES',
            'VIEW ALL DEPARTMENTS',
            'VIEW ALL ROLES',
            'QUIT',
        ],
        name: 'type',
    })
        .then((answers) => {
            chooseOption(answers.type);
        });
};
start();