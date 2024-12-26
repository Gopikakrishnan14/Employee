const express = require('express');
const router = express.Router();
router.use(express.json());
router.use(express.urlencoded({ extended: true }));

// Sample employee data
var employees = [
    { id: 1, name: "Varsha", designation: "Software Engineer", location: "canada", salary: 60000 },
    { id: 2, name: "Sredha", designation: "Project Manager", location: "London", salary: 75000 },
    { id: 3, name: "Arya", designation: "HR", location: "US", salary: 50000 }
];

// Function to define routes
function employeeRoutes(nav) {
    // Rendering Home Page (List of Employees)
    router.get('/', (req, res) => {
        res.render("home", {
            title: 'Employee Management',
            data: employees,
            nav
        });
    });

    // Rendering Add Employee Form
    router.get('/form', (req, res) => {
        res.render("form", {
            title: 'Add Employee',
            nav
        });
    });

    // POST method to add a new employee
    router.post('/add', (req, res) => {
        const { name, designation, location, salary } = req.body;
        const newEmployee = { 
            id: employees.length + 1, 
            name, 
            designation, 
            location, 
            salary 
        };
        employees.push(newEmployee);
        res.redirect('/basic'); // Redirect to home page under /basic route
    });

    // Rendering Edit Employee Form
    router.get('/edit/:id', (req, res) => {
        const { id } = req.params;
        const employee = employees.find(emp => emp.id == id);
        if (employee) {
            res.render("edit", {
                title: 'Edit Employee',
                employee,
                nav
            });
        } else {
            res.status(404).send("Employee not found");
        }
    });

   // PUT method to edit an existing employee
router.put('/edit/:id', (req, res) => {
    const { id } = req.params;
    const { name, designation, location, salary } = req.body;

    let employee = employees.find(emp => emp.id == id);
    if (employee) {
        employee.name = name;
        employee.designation = designation;
        employee.location = location;
        employee.salary = salary;
        res.redirect('/basic');  // Redirect to the homepage after update
    } else {
        res.status(404).send("Employee not found");
    }
});

    // DELETE method to delete an employee
    router.delete('/delete/:id', (req, res) => {
        const { id } = req.params;
        employees = employees.filter(emp => emp.id != id);
        res.redirect('/basic'); // Redirect to the home page after deletion
    });

    return router;
}

module.exports = employeeRoutes;
