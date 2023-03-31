const mysql = require('mysql2');
const inquirer = require('inquirer');

// Connect to database
const db = mysql.createConnection(
    {
      host: 'localhost',
      // MySQL username,
      user: 'root',
      // MySQL password
      password: 'Biscuitx3!',
      database: 'employees_db'
    },
    console.log(`Connected to the employees_db database.`)
  );

  /////////////////////// *****CODE STARTS HERE**** ///////////////////
  const userQuestions = () => {
inquirer
  .prompt([

    {
        type: 'list',
        name: 'userChoice',
        message: 'What would you like to do?',
        choices: [
          'View all employees',
          'Add Employee',
          'Update Employee Role',
          'View all Roles',
          'Add Role',
          'View all Departments',
          'Add department',
          'Exit']
    }

  ])
  .then((answers) => {
//Set up switch statement that calls a function based on users choice
switch(answers.userChoice) {
    //
    case "View all employees" : viewAllEmployees()
    break
    //
    case "Add Employee" : addEmployee()
    break
    //
    case "Update Employee Role" : updateEmployeeRole()
    break
    //
    case "View all Roles" : viewAllRoles()
    break
    //
    case "Add Role" : addRole()
    break
    //
    case "View all Departments" : viewAllDepartments()
    break
    //
    case "Add department" : addDepartment()
    break
    //
    case 'Exit': console.log('Exiting now')
    break
}
  })
}
  
  const viewAllEmployees = () => {
    db.query('SELECT * FROM employee', (err, allEmployees) => {
      if (err) { console.log(err); }
      console.table(allEmployees)
    })
    userQuestions();
  }


  const addEmployee = () => {
    inquirer.prompt([
      {
        message: 'What is the employees first name?',
        type: 'input',
        name: 'first_name'
    },
    {
      message: 'What is the employees last name?',
        type: 'input',
        name: 'last_name'
    },
      {
      message: 'What is the employees role?',
      type: 'list',
      name: 'role_id',
      choices: [
       { name: 'Sales Lead', value: 1},
      { name: 'Salesperson', value: 2},
      { name: 'Lead Engineer', value: 3},
      { name: 'Software Engineer', value: 4},
      { name: 'Account Manager', value: 5},
      { name: 'Accountant', value: 6},
      { name: 'Legal Lead Team', value: 7},
      { name: 'Lawyer', value: 8},
    ]
    },
      {
      message: 'What is the employees manager?',
      type: 'list',
      name: 'manager_id',
      choices: [
       { name: 'John Doe', value: 1},
      { name: 'Mike Chan', value: 2},
      { name: 'Ashley Rodriguez', value: 3},
      { name: 'Kevin Tupik', value: 4},
      { name: 'Kunal Singh', value: 5},
      { name: 'Malia Brown', value: 6},
      { name: 'Sarah Lourd', value: 7},
      { name: 'Tom Allen', value: 8},
    ]
    }
  ])
    .then(employee => {
      console.log()
      db.query('INSERT INTO employee SET ?', employee, err => {
        if(err) {console.log(err)}
      })
      console.log('employee added!')
      userQuestions()
    }) 
  };


  const updateEmployeeRole = () => {
    inquirer.prompt([
      {
      message: 'Which employee do you want to update?',
      type: 'list',
      name: 'employee_id',
      choices: [
       { name: 'John Doe', value: 1},
      { name: 'Mike Chan', value: 2},
      { name: 'Ashley Rodriguez', value: 3},
      { name: 'Kevin Tupik', value: 4},
      { name: 'Kunal Singh', value: 5},
      { name: 'Malia Brown', value: 6},
      { name: 'Sarah Lourd', value: 7},
      { name: 'Tom Allen', value: 8},
    ]
    }
  ])
    .then(employeeRole => {
      console.log()

      db.query('UPDATE employee SET ? WHERE ?', employeeRole, err => {
        if(err) {console.log(err)}
      })
      console.log('Role updated!')
      userQuestions()
    }) 
  };

  const viewAllRoles = () => {
    db.query('SELECT * FROM role', (err, role) => {
      if (err) { console.log(err); }
      console.table(role)
    })
    userQuestions();
  }


  const addRole = () => {
    inquirer.prompt([
      {
        message: 'What is the title of the role?',
        name: 'title',
        type: 'input',
      },
      {
        message: 'What is the salary of the role?',
        name: 'salary',
        type: 'number',
      },
      {
        message: 'Which department does the role belong to?',
        name: 'department_id',
        type: 'list',
        choices: [
          { name: 'Sales', value: 1},
          { name: 'Engineering', value: 2},
          { name: 'Finance', value: 3},
          { name: 'Legal', value: 4}
        ]
      }
    ])
    
    .then(role => {
      console.log(role)
      // const { title, salary, department_id } = role;
      
      db.query('INSERT INTO role SET ?', role, err => {
        if(err) {console.log(err)}
      })
      
      console.log('Role added!')
      userQuestions()
    }) 
  }
  
  const viewAllDepartments = () => {
    db.query('SELECT * FROM department', (err, department) => {
      if (err) { console.log(err); }
      console.table(department)
    })
    userQuestions();
  }
  
  const addDepartment = () => {
    inquirer.prompt([
      {
        message: 'What department would you like to add?',
        name: 'name',
        type: 'input'
    }
  ])
    .then(department => {
      console.log(department)
      db.query('INSERT INTO department SET ?', department, err => {
        if(err) {console.log(err)}
      })
      console.log('deperartment added!')
      userQuestions()
    }) 
  };
  
  
userQuestions()