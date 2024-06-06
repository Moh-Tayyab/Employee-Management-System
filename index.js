import inquirer from 'inquirer';
import chalk from 'chalk';
import ora from 'ora';
// Initialize an empty array to store the employees
let collectionOfEmployee = [];
// Main function to prompt user for actions
function mainfunc() {
    inquirer.prompt([
        {
            type: 'list',
            name: 'action',
            message: 'What would you like to do?',
            choices: ['Add Employee', 'View Employee', 'Update Employee', 'Remove Employee', 'Exit']
        }
    ]).then((answer) => {
        // Perform actions based on the user's choice
        switch (answer.action) {
            case 'Add Employee':
                addEmployee();
                break;
            case 'View Employee':
                viewEmployee();
                break;
            case 'Update Employee':
                updateEmployee();
                break;
            case 'Remove Employee':
                removeEmployee();
                break;
            case 'Exit':
                console.log(chalk.green('Good Bye!!!...'));
                process.exit();
                break;
        }
    });
}
// Function to add a new employee
function addEmployee() {
    inquirer.prompt([
        {
            type: 'input',
            name: 'name',
            message: 'Enter Employee Name: '
        },
        {
            type: 'number',
            name: 'id',
            message: 'Enter Employee ID: '
        },
        {
            type: 'number',
            name: 'salary',
            message: 'Enter Employee Salary: '
        }
    ]).then(answer => {
        // Create a new employee object
        const newEmployee = {
            name: answer.name,
            id: collectionOfEmployee.length + 1, // Increment ID based on length
            salary: parseInt(answer.salary)
        };
        // Add the new employee to the collection
        collectionOfEmployee.push(newEmployee);
        console.log(chalk.green('Employee added successfully!'));
        mainfunc(); // Return to the main menu
    });
}
// Function to view all employees
function viewEmployee() {
    const spinner = ora('Loading employees...').start(); // Show loading spinner
    setTimeout(() => {
        spinner.stop(); // Stop the spinner after loading
        if (collectionOfEmployee.length === 0) {
            console.log(chalk.red('No Employees Found!'));
        }
        else {
            console.log(chalk.blue('Employees:'));
            // Display each employee's details
            collectionOfEmployee.forEach(employee => console.log(chalk.yellow(`Name: ${employee.name}, ID: ${employee.id}, Salary: ${employee.salary}`)));
        }
        mainfunc(); // Return to the main menu
    }, 1000);
}
// Function to update an employee's salary
function updateEmployee() {
    inquirer.prompt([
        {
            type: 'number',
            name: 'employeeId',
            message: 'Enter the Employee ID: '
        },
        {
            type: 'number',
            name: 'newSalary',
            message: 'Enter the new salary: '
        }
    ]).then(answer => {
        // Find the employee by ID
        const employeeToUpdate = collectionOfEmployee.find(employee => employee.id === answer.employeeId);
        if (employeeToUpdate) {
            // Update the salary if the employee is found
            employeeToUpdate.salary = answer.newSalary;
            console.log(chalk.green(`Salary updated for ${employeeToUpdate.name}.`));
        }
        else {
            console.log(chalk.red(`Employee with ID ${answer.employeeId} not found.`));
        }
        mainfunc(); // Return to the main menu
    });
}
// Function to remove an employee
function removeEmployee() {
    inquirer.prompt([
        {
            type: 'number',
            name: 'id',
            message: 'Enter Employee ID: '
        }
    ]).then(answer => {
        // Find the index of the employee by ID
        const index = collectionOfEmployee.findIndex(employee => employee.id === answer.id);
        if (index !== -1) {
            // Remove the employee if found
            const removedEmployee = collectionOfEmployee.splice(index, 1)[0];
            console.log(chalk.green(`Employee ID: ${removedEmployee.id} and Name: ${removedEmployee.name} removed successfully!`));
        }
        else {
            console.log(chalk.red('Employee Not Found!'));
        }
        mainfunc(); // Return to the main menu
    });
}
// Start the main function to prompt user for actions
mainfunc();
