const Employee = require("./employees");

class Engineer extends Employee {
  constructor(name, email, id, githubUsername) {
    super(name, email, id, "Engineer");
    this.githubUsername = githubUsername;
  }
}

module.exports = Engineer;
