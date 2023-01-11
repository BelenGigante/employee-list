const inquirer = require('inquirer');
const prompt = inquirer.createPromptModule();
const mysql = require('mysql2');
//const { isGeneratorFunction } = require('util/types');


const db = mysql.createConnection({
    user: 'root',
    database: 'employee_db',
});
const getNameValue=(table,name,value)=>{
     return db.promise().query('SELECT ?? AS name, ?? AS value FROM ??',[name,value,table]);
};
const insert = (table,data) =>{
    db.query('INSERT INTO employee', [table, data],(err) =>{
        if (!err) return console.error(err);
        console.log('\nSuccess\n');
        start();
    });
};

const options = (type) => {
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
        case 'ADD EMPLOYEE':{
            newEmployee();
            break;
        }
        case 'QUIT':{
            break;
        }
    }
}
const newEmployee = async () =>{
    const [roles] = await getNameValue('role','title','id');
    const [managers] = await getNameValue('employee','last_name','id');
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
        type:'list',
        name: 'role_id',
        message: 'role :',
        choices: roles,
    },
    {
        type:'list',
        name: 'manager_id',
        message: 'choose a manager :',
        choices: managers,
    },
])
.then((answers) =>{
    insert('employee',answers);
});
};
const start = () => {
    prompt({
        type: 'list',
        message: 'select an option',
        choices: [
            'VIEW ALL EMPLOYEES',
            'VIEW ALL DEPARTMENTS',
            'VIEW ALL ROLES',
            'ADD EMPLOYEE',
            'QUIT',
        ],
        name: 'type',
    })
        .then((answers) => {
            options(answers.type);
        });
};
start();