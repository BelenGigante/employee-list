const inquirer = require('inquirer');
const prompt = inquirer.createPromptModule();
const mysql = require('mysql2');

const db = mysql.createConnection({
    user: 'root',
    database: 'employee_db',
});
const selectAll= async(table,display)=>{
    const results = await db.promise().query('SELECT * FROM '+table );
    if (display){
        console.table(results[0]);
        start();
    }
    return results;
};
const insert=(table,data)=>{
    db.query('INSERT INTO employee', [table,data],(err)=>{
        if (!err) console.log('\nSuccesfully created\n');
        start();
    });
}
const addEmployee = async()=>{
    const [roleData] = await selectAll('role');
    const roles =roleData.map(role => {
        return{
            name: role.title,
            value: role.id
        }
    });
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
        },
    ])
    .then((answers)=>{

        insert('employee',answers);
    });
};
//const chooseOption = (type) => selectAll(type);
const chooseOption = (type) => {
    switch (type) {
        case 'VIEW ALL EMPLOYEES': {
            selectAll('employees');
            break;
        }
        case 'VIEW ALL DEPARTMENTS': {
            selectAll('departments');
            break;
        }
        case 'VIEW ALL ROLES': {
            const data={
                first_name:'John',
                last_name:'Deer',
            }
            selectAll('roles');
            break;
        }
        case 'Add Employee':{
            addEmployee();
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
            chooseOption(answers.type);
        });
};
start();