const inquirer = require("inquirer");
const fs = require("fs");

const Manager = require("./employees/manager");
const Engineer = require("./employees/engineers");
const Intern = require("./employees/intern");

function generateCardsHTML(employees) {
  let cardsHTML = "";

  for (const employee of employees) {
    let conditionalTemplate;

    switch (true) {
      case employee.title === "Manager":
        conditionalTemplate = `Office Number: ${employee.officeNumber}`;
        break;
      case employee.title === "Engineer":
        conditionalTemplate = `Github: <a href="https://github.com/${employee.githubUsername}">${employee.githubUsername}</a>`;
        break;
      case employee.title === "Intern":
        conditionalTemplate = `School: ${employee.school}`;
        break;
    }

    const HTML = `<div class="card">
                            <div class=card-header>
                                <h2 class="name">${employee.name}</h2>
                                <img src="${employee.imgURL}" alt="icon" class="icon">
                                <h3 class="occupation">${employee.title}</h3>
                            </div>
                            <div class="card-body"> 
                                <ul>
                                    <li>ID: ${employee.id}</li>
                                    <li>Email: ${employee.email}</li>
                                    <li>${conditionalTemplate}</li>
                                </ul>
                            </div>
                        </div>`;
    cardsHTML += HTML;
  }

  return cardsHTML;
}

function generatePageHTML(employees) {
  const cardsHTML = generateCardsHTML(employees);

  const HTML = `
         <!DOCTYPE html>
             <html lang="en">
             <head>
                 <meta charset="UTF-8">
                 <meta name="viewport" content="width=device-width, initial-scale=1.0">
                 <meta http-equiv="X-UA-Compatible" content="ie=edge">
                 <link rel= "stylesheet" href = "./assets/css/reset.css"/>
                 <link rel= "stylesheet" href = "./assets/css/style.css"/>
                 <title>Team Profile Generator</title>
             </head>
             <body>
                 <header>
                     <h1>My Team</h1>
                 </header>
                 <main>
                     ${cardsHTML}
                 </main>
                 <script src="./assets/js/app.js"></script>
                 <script src="./assets/js/test.js"></script>
             </body>
         </html>
     `;

  fs.writeFile("../../index.html", HTML, (err) => {
    err ? console.error(err) : console.log("Generating index.html...");
  });
}

const managerQuestions = [
  { type: "input", message: "What is the team manager's name?", name: "name" },
  { type: "input", message: "employee id?", name: "id" },
  { type: "input", message: "email address?", name: "email" },
  { type: "input", message: "office number?", name: "officeNumber" },
];

const addNewEmployeeQuestion = {
  type: "list",
  message: "Would you like to add an employee/intern?",
  choices: ["add an engineer", "add an intern", "no thanks"],
  name: "addEmployee",
};

const engineerQuestions = [
  //engineer questions
  { type: "input", message: "What is the engineer's name?", name: "name" },
  { type: "input", message: "employee id?", name: "id" },
  { type: "input", message: "email address?", name: "email" },
  { type: "input", message: "github username?", name: "githubUsername" },
];

const internQuestions = [
  { type: "input", message: "What is the intern's name?", name: "name" },
  { type: "input", message: "employee id?", name: "id" },
  { type: "input", message: "email address?", name: "email" },
  { type: "input", message: "school?", name: "school" },
];

function init() {
  runInquirerQuestionSequence();
}

init();

function runInquirerQuestionSequence() {
  inquirer
    .prompt([...managerQuestions])
    .then((response) => createManagerObject(response))
    .then(() => generatePageHTML(employees))
    .then(() => addNewEmployee());

  function addNewEmployee() {
    inquirer
      .prompt(addNewEmployeeQuestion)
      .then((response) => chooseEmployeeType(response));
  }

  function chooseEmployeeType(response) {
    switch (true) {
      case response.addEmployee === "add an intern":
        inquirer
          .prompt([...internQuestions])
          .then((response) => createInternObject(response))
          .then(() => addNewEmployee())
          .then(() => generatePageHTML(employees));
        break;
      case response.addEmployee === "add an engineer":
        inquirer
          .prompt([...engineerQuestions])
          .then((response) => createEngineerObject(response))
          .then(() => addNewEmployee())
          .then(() => generatePageHTML(employees));
      default:
        break;
    }
  }
}

const employees = [];

function createManagerObject(response) {
  const newManager = new Manager(
    response.name,
    response.email,
    response.id,
    response.officeNumber
  );
  employees.push(newManager);
}

function createEngineerObject(response) {
  const newEngineer = new Engineer(
    response.name,
    response.email,
    response.id,
    response.githubUsername
  );
  employees.push(newEngineer);
}

function createInternObject(response) {
  const newIntern = new Intern(
    response.name,
    response.email,
    response.id,
    response.school
  );
  employees.push(newIntern);
}
