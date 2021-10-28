const Intern = require("../assets/js/employees/intern");

describe("Engineer", () => {
  it("The Intern class must contain a school property", () => {
    const obj = new Intern();

    expect("school" in obj).toEqual(true);
  });
});
