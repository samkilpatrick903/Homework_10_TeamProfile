const Manager = require("../assets/js/employees/manager");

describe("Engineer", () => {
  it("The Engineer class must contain a githubUsername property", () => {
    const obj = new Manager();

    expect("officeNumber" in obj).toEqual(true);
  });
});
