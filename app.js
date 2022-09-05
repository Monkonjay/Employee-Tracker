// require packages and dependencies
const inquirer = require('inquirer');
const connection = require('./db/connection');


//present user with prompt to select choices
const dbOptions = async() => {
    try {
        let response = await inquirer.prompt({
            message: 'Where would you like to start? :',
            name: "starting_option",
            type: 'list',
            choices: [
                'View Departments', 
                'View Roles', 
                'View Employees', 
                'Add Department', 
                'Add Role', 
                'Add Employee', 
                'Update Role'
                ]
        });
        // trigger user selection 
        switch(response.starting_option) {
            case 'View Departments':
                displayDept();
                break;

            case 'View Roles':
                displayRole();
                break;

            case 'View Employees':
                displayEmp();
                break;

            case 'Add Department':
                addDept();
                break;

            case 'Add Role':
                addRole();
                break;
        }
    } catch (err) {
        throw err;
    };
}

// function to display 'department' table 
const displayDept = async() => {
    try {
        // Select all columns from department.
        let sql ='SELECT * FROM department';
        connection.query(sql, function(err, res){
            if (err) throw err;
            // use console.table to display table
            console.table(res);

            dbOptions();
        });
    } catch (err) {
        console.log(err);
    };
}


// function to display 'role' table 
const displayRole = async() => {
    try {
        // Select all columns from role
        let sql ='SELECT * FROM role';
        connection.query(sql, function(err, res){
            if (err) throw err;
            // use console.table to display role table
            console.table(res);

            dbOptions();
        });
    } catch (err) {
        console.log(err);
    };
}

// function to display 'employee' table 
const displayEmp = async() => {
    try {
        // Select all columns from employee
        let sql ='SELECT * FROM employee';
        connection.query(sql, function(err, res){
            if (err) throw err;
            // use console.table to display employee table
            console.table(res);

            dbOptions();
        });
    } catch (err) {
        console.log(err);
    };
}


// function to add new department to the DB 
const addDept = async() => {
    try {
        // promt user for new department name
        let newDept = await inquirer.prompt([
            {
                message: 'Enter New Department Name :',
                name: 'dept_name',
                type: 'input'
            }
        ]);
        // save deparment name in the db
        connection.query('INSERT INTO department SET ?', {
            name: newDept.dept_name
        });
        console.table(`success, the ${newDept.dept_name} department has been added`);

        dbOptions();       
    } catch (err) {
        console.log(err);
    };
}


// function to add new department to the DB 
const addRole = async() => {
    try {
        // promt user for new role info
        let newDept = await inquirer.prompt([
            {
                message: 'Enter New Role Name :',
                name: 'dept_name',
                type: 'input'
            }
        ]);
        // save deparment name in the db
        connection.query('INSERT INTO department SET ?', {
            name: newDept.dept_name
        });
        console.table(`success, the ${newDept.dept_name} department has been added`);

        dbOptions();       
    } catch (err) {
        console.log(err);
    };
}




dbOptions();