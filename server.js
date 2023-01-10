const inquirer = require('inquirer');
const prompt = inquirer.createPromptModule();
const mysql = require('mysql2');
require('console.table');

const db = mysql.createConnection({
    user: 'root',
    database: 'employee_db',
});
const selectAll= async(table,display)=>{
    const results = await db.promise().query('SELECT * FROM '+table );
    if (display){
        console.table(results[0]);
        return start();
    }
    return results;
};
const insert=(table,data)=>{
    db.query('INSERT INTO ?? SET ?', [table,data],(err)=>{
        if (!err) return console.error(err); 
        console.log('\nSuccesfully created\n');
        start();
    });
};

const getNameValue = (table, name,value) => {
    return db.promise().query('SELECT ?? AS name, ?? AS name FROM ??', [name, value, table]);
};
const employeeInfo = async () => {
    const infoText = `
    SELECT
    employee.id,
    employee.first_name,
    employee.last_name,
    role.title,
    role.salary,
    CONCAT(manager.first_name, ' ', manager.last_name)
    AS manager
    FROM employee
    JOIN role
    ON employee.role_id =manager.id
    `
    const [employees] = await db.promise().query(infoText);
    console.table(employees);
};

const newEmployee = async()=>{
    const [roles] = await getNameValue('role', 'title', 'id');
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
            type: 'list',
            name: 'role_id',
            message: 'role :',
            choices: roles,
        },
        {
            type: 'list',
            name: 'manager_id',
            message: 'choose a manager :',
            choices: managers ,
        }
    ])
    .then((answers)=>{

        insert('employee',answers);
    });
};
//const chooseOption = (type) => selectAll(type);
const options = (type) => {
    switch (type) {
        case 'Show all employees': {
            employeeInfo();
            break;
        }
        case 'Show all departments': {
            selectAll('department', true);
            break;
        }
        case 'Show all roles': {
            selectAll('role',true);
            break;
        }
        case 'Add Employee':{
            newEmployee();
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
            {name:'VIEW ALL EMPLOYEES', value: 'employee'},
            {name:'VIEW ALL DEPARTMENTS',value:'departments'},
            {name:'VIEW ALL ROLES', value: "role"},
            //{'QUIT'},
        ],
        name: 'type',
    })
        .then((answers) => {
            options(answers.type);
        });
};
start();