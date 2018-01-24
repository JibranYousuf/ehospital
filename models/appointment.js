var mongoose = require('mongoose');

//Create Appointment Schema using mongoose

var SalarySchema = new mongoose.Schema({
    username:
    { type: String },
    email: 
    { type: String },
    userType: 
    { type: String },
    submitionDate: 
    { type: String },
    employeeType: 
    { type: String },
    schoolID: 
    { type: String },
    salary: 
    { type: String },
    month: 
    { type: String },
    year: 
    { type: String },
});
const Salary = module.exports = mongoose.model('Salary', SalarySchema);
