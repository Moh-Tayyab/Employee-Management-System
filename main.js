import inquirer from "inquirer";
// Initialize an empty array to store employees
let collectionOfEmployee = [];
// Main menu function to prompt user for actions
async function mainMenu() {
    const answer = await inquirer.prompt({
        name: 'action',
        type: 'list',
        message: 'What would you like to do?',
        choices: ['Add Employee', 'View Employee', 'Update Employee', 'Delete Employee', 'Exit']
    });
    switch (answer.action) {
        case 'Add Employee':
            await addEmployee();
            break;
        case 'View Employee':
            viewEmployee();
            break;
        case 'Update Employee':
            await updateEmployee();
            break;
        case 'Delete Employee':
            await deleteEmployee();
            break;
        case 'Exit':
            console.log('GoodBye!!!...');
            process.exit();
    }
    // Display the main menu again
    mainMenu();
}
// Function to add a new employee
async function addEmployee() {
    const addAnswers = await inquirer.prompt([
        {
            type: 'input',
            name: 'name',
            message: 'Enter employee name:'
        },
        {
            type: 'number',
            name: 'age',
            message: 'Enter employee age:'
        },
        {
            type: 'number',
            name: 'employeeID',
            message: 'Enter employee ID:'
        },
        {
            type: 'number',
            name: 'salary',
            message: 'Enter employee salary:'
        }
    ]);
    // Create an employee object
    const newEmployee = {
        name: addAnswers.name,
        age: addAnswers.age,
        employeeID: addAnswers.employeeID,
        salary: addAnswers.salary
    };
    // Add the employee to the array
    collectionOfEmployee.push(newEmployee);
    console.log('Employee added successfully!');
}
// Function to view all employees
function viewEmployee() {
    if (collectionOfEmployee.length === 0) {
        console.log('No employees found.');
    }
    else {
        console.log('Employee List:');
        collectionOfEmployee.forEach(employee => {
            console.log(`Name: ${employee.name}, Age: ${employee.age}, ID: ${employee.employeeID}, Salary: ${employee.salary}`);
        });
    }
}
// Function to update an employee's salary
async function updateEmployee() {
    const updateAnswers = await inquirer.prompt([
        {
            type: 'number',
            name: 'employeeID',
            message: 'Enter the employee ID:'
        },
        {
            type: 'number',
            name: 'newSalary',
            message: 'Enter the new salary:'
        }
    ]);
    // Find the employee by ID
    const employeeToUpdate = collectionOfEmployee.find(employee => employee.employeeID === updateAnswers.employeeID);
    if (employeeToUpdate) {
        // Update the employee's salary
        employeeToUpdate.salary = updateAnswers.newSalary;
        console.log(`Salary updated for ${employeeToUpdate.name}.`);
    }
    else {
        console.log(`Employee with ID ${updateAnswers.employeeID} not found.`);
    }
}
// Function to delete an employee
async function deleteEmployee() {
    const deleteAnswers = await inquirer.prompt([
        {
            type: 'number',
            name: 'employeeID',
            message: 'Enter the employee ID:'
        }
    ]);
    // Find the index of the employee by ID
    const index = collectionOfEmployee.findIndex(employee => employee.employeeID === deleteAnswers.employeeID);
    if (index !== -1) {
        // Remove the employee from the array
        const removedEmployee = collectionOfEmployee.splice(index, 1)[0];
        console.log(`Employee ID: ${removedEmployee.employeeID} and Name: ${removedEmployee.name} removed successfully!`);
    }
    else {
        console.log(`Employee with ID ${deleteAnswers.employeeID} not found.`);
    }
}
// Start the main menu
mainMenu();
