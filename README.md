# Employee-Tracker

## Table of contents

- [Overview](#overview)
 - [The challenge](#the-challenge)
  - [User Story](#user-story)
  - [Acceptance Criteria](#acceptance-criteria)
  - [Screenshot](#screenshot)
  - [Links](#links)
- [My process](#my-process)
  - [Built with](#built-with)
  - [What I learned](#what-i-learned)
- [Author](#author)


## Overview

### The challenge
This application uses a third-party API, OpenWeather One Call to access weather data. I use the fetch method with specific parameters for the API call. The data is used to build a  weather dashboard that runs in the browser and feature dynamically updated HTML and CSS using javaScript and jQuery.



### User Story

AS A business owner
I WANT to be able to view and manage the departments, roles, and employees in my company
SO THAT I can organize and plan my business

### Acceptance Criteria

GIVEN a command-line application that accepts user input
WHEN I start the application
THEN I am presented with the following options: view all departments, view all roles, view all employees, add a department, add a role, add an employee, and update an employee role
WHEN I choose to view all departments
THEN I am presented with a formatted table showing department names and department ids
WHEN I choose to view all roles
THEN I am presented with the job title, role id, the department that role belongs to, and the salary for that role
WHEN I choose to view all employees
THEN I am presented with a formatted table showing employee data, including employee ids, first names, last names, job titles, departments, salaries, and managers that the employees report to
WHEN I choose to add a department
THEN I am prompted to enter the name of the department and that department is added to the database
WHEN I choose to add a role
THEN I am prompted to enter the name, salary, and department for the role and that role is added to the database
WHEN I choose to add an employee
THEN I am prompted to enter the employee’s first name, last name, role, and manager, and that employee is added to the database
WHEN I choose to update an employee role
THEN I am prompted to select an employee to update and their new role and this information is updated in the database

### Screenshot

![](./assets/images/screenshot.png)

### Links

- Solution URL: [Employee-Tracker](https://github.com/Monkonjay/Employee-Tracker)
- Live Site: [Video Demo]()

## My process

### Built with

- Javascript
- jQuery
- CSS Bootstrap
- HTML5


### What I learned

The main lesson from this app is using api keys to make api calls and dynamically rendering the selected data to the browser. 


```Javascript
  // API url to get the city coordinates
  var cityCordinatesUrl = `https://api.openweathermap.org/geo/1.0/direct?q=${targetCity}&limit=1&units=imperial&appid=${APIKey}`;
```


## Author

- Website - [Robert M Greene]( https://monkonjay.github.io/Portfolio/)
- Github - [Monkonjay](https://github.com/Monkonjay)