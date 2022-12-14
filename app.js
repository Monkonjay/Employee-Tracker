// require packages and dependencies
const { response } = require('express');
const inquirer = require('inquirer');
const connection = require('./db/connection');


//present user with prompt to select choices
const dbOptions = async() => {
    try {
        let response = await inquirer.prompt({
            message: 'I want to:',
            name: "starting_option",
            type: 'rawlist',
            choices: [
                'View Departments', 
                'View Roles', 
                'View Employees', 
                'Add Department', 
                'Add Role', 
                'Add Employee', 
                'Update Employee Role' 
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
            
            case 'Add Employee':
                addEmp();
                break;

            case 'Update Employee Role':
                updateEmpRole();
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
        // prompt user for new department name
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
        let availableDepts  = connection.query('SELECT * FROM department', async function (err, res) {
            
            // prompt user for the role attributes
            let response= await inquirer.prompt([
                {
                    message: 'Enter Title for New Role :',
                    name: 'title',
                    type: 'input'
                },
                {
                    message: 'Enter Salary for New Role :',
                    name: 'salary',
                    type: 'input'
                },
                {        
                    message: 'Select the Department to which the new role belong :',     
                    name: 'departmentId',
                    type: 'rawlist',
                    choices: res.map((departmentId) => {
                        return {
                            name: departmentId.name,
                            value: departmentId.id                          
                        }
                    })
                }

            ]);

            let newRole;
            for(i = 0; i < availableDepts.length; i ++) {
                if(availableDepts[i].id === response.choice) {
                    newRole = availableDepts[i];
                    break;
                };
            }

            // update DB to include new role
            connection.query("INSERT INTO role SET ?", {
                title: response.title,
                salary: response.salary,
                department_id: response.departmentId
            })
            // Alert user of role addition
            console.log(`success, the ${response.title} role has been added.`);

            // Present user input again
            dbOptions();   
        });
    
    
    
    } catch (err) {
        console.log(err);
    };
}

// function to add new employee to the DB 
const addEmp = async() => {
    let empResponse;
    let roleResponse;
    try {      
        // query employee table to get manager details;
        connection.query('SELECT * FROM employee', async function (err, res) {
            // prompt for manager info
            empResponse = await inquirer.prompt([    
                {               
                    message: "Select the employee's manager",
                    name: 'manager_id',
                    type: 'rawlist',
                    choices: res.map((manager) => {
                        return {
                            name: `${manager.first_name} ${manager.last_name}`,
                            value: manager.id
                        }
                    }),               
                },     
                {
                    message: 'Enter Employee First Name :',
                    name: 'first_name',
                    type: 'input'
                },
                {
                    message: 'Enter Employee Last Name :',
                    name: 'last_name',
                    type: 'input'
                },                        
            ]);

            connection.query('SELECT * FROM role', async function (err, res) {
                roleResponse = await inquirer.prompt([
                    {               
                        name: 'role_id',
                        type: 'rawlist',
                        choices: res.map((role) => {
                            return {
                                name: role.title,
                                value: role.id
                            }
                        }),
                        message: "Select the employee's role"      
                    }
                ]);
                 //save new employee in the db
                connection.query('INSERT INTO employee SET ?', {
                    first_name: empResponse.first_name,
                    last_name: empResponse.last_name,
                    role_id: roleResponse.role_id,
                    manager_id: empResponse.manager_id
                });
            })            
            
            // console.log('first name', empResponse.first_name);  
            // log success message
            console.log(`success, employee ${empResponse.first_name} ${empResponse.last_name} has been added`);

            dbOptions(); 

        });   
             
    } catch (err) {
        console.log(err);
    };
}

// function to update Employee Role
const updateEmpRole = async() => {
    let empResponse;
    let roleResponse;
    try {
        // Get current employees
       connection.query('SELECT * FROM employee', async function (err, res) {
            
            // prompt user to select employee
            empResponse = await inquirer.prompt([
                {      
                    message: 'Select the employee whose role you want to update :',                
                    name: 'employee',
                    type: 'rawlist',
                    choices: res.map((currentEmployee) => {
                        return {
                            name: `${currentEmployee.first_name} ${currentEmployee.last_name}`,
                            value: currentEmployee.id                          
                        }
                    }),
                },
            ]);

            connection.query('SELECT * FROM role', async function (err, res) {
                roleResponse = await inquirer.prompt([
                {                               
                    name: 'role',
                    type: 'rawlist',
                    choices: res.map((currentRole) => {
                        return {
                            name: currentRole.title,
                            value: currentRole.id                          
                        }
                    }),
                    message: "Select the employee's new role :"
                }
                ]);

                connection.query(`UPDATE employee SET role_id = ${roleResponse.role} WHERE id =${empResponse.employee}` , (err, res) => {
                //   console.log(err, res);      
              }); 

            })
           
   
            // Alert user of role update
            console.log(`success, the employee's  role was updated.`);

            // Present prompt to user again
            dbOptions();  

        }); 
    
    } catch (err) {
        console.log(err);
    };
}

// start application 
dbOptions();