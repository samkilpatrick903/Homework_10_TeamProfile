const Engineer = require("../assets/js/employees/engineer");

describe("Engineer", () => {
  it("The Engineer class must contain a githubUsername property", () => {
    const obj = new Engineer();

    expect("githubUsername" in obj).toEqual(true);
  });
});