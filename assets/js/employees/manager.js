const Employee = require('./employees');

class Manager extends Employee {
    constructor(name, email, id, officeNumber){
        super(name, email, id, 'Manager');
        this.officeNumber = officeNumber; 
    }
}

module.exports = Manager;