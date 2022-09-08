// require packages and dependencies
const { response } = require('express');
const inquirer = require('inquirer');
const connection = require('./db/connection');


//present user with prompt to select choices
const dbOptions = async() => {
    try {
        let response = await inquirer.prompt({
            message: 'Where would you like to start? :',
            name: "starting_option",
            type: 'rawlist',
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
        console.log(`success, the ${newDept.dept_name} department has been added`);

        dbOptions();       
    } catch (err) {
        console.log(err);
    };
}


// function to add new role to the DB 
const addRole = async() => {
    try {
        // Get available departments
        let availableDepts  = connection.query('SELECT * FROM department');
        // console.log(typeof availableDepts);
        
        console.log(typeof availableDepts);
        // prompt user for role info
        // let response= await inquirer.prompt([
        //     {
        //         message: 'Enter Title for New Role :',
        //         name: 'title',
        //         type: 'input'
        //     },
        //     {
        //         message: 'Enter Salary for New Role :',
        //         name: 'salary',
        //         type: 'input'
        //     },
        //     {        
        //         message: 'Enter the Department ID for the New Role :',     
        //         name: 'departmentId',
        //         type: 'list',
        //         choices: availableDepts.map((departmentId) => {
        //             return {
        //                 name: departmentId.name,
        //                 value: departmentId.id
        //             }
        //         }),
               
        //     }

        // ]);

        // let newRole;
        // for(i = 0; i < availableDepts.length; i ++) {
        //     if(availableDepts[i].id === response.choice) {
        //         newRole = availableDepts[i];
        //         break;
        //     };
        // }


        // // update DB to include new role
        // connection.query("INSERT INTO role SET ?", {
        //     title: response.title,
        //     salary: response.salary,
        //     department_id: response.departmentId
        // })
        // // Print success message to the user.
        // console.log(`success, the ${response.title} role has been added.`);
        // // Present user input again

        // dbOptions();   
    
    } catch (err) {
        console.log(err);
    
    };
}


dbOptions();