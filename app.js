// require packages and dependencies
const inquirer = require('inquirer');
const connection = require('./db/connection');



// let myTeam = [];

// // Questions for User Input
// function getTeamMemberInfo(memberRole) {
//     // collect additional info not inherited from Employee class
//     extraInfo = '';
//     if(memberRole === 'Engineer') {
//         extraInfo = 'Github Username';   
//     } else if (memberRole === 'Intern') {
//         extraInfo = 'School Name'; 
//     } else {
//         extraInfo = 'Office Number'; 
//     }


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


dbOptions();