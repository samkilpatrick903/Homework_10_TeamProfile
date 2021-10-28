const Employee = require("../assets/js/employees/employees");

describe("Employee", () => {
  it("The Employee class must contain name, email, id, title, and imgURL properties", () => {
    const obj = new Employee();

    expect("name" in obj).toEqual(true);
    expect("email" in obj).toEqual(true);
    expect("id" in obj).toEqual(true);
    expect("title" in obj).toEqual(true);
    expect("imgURL" in obj).toEqual(true);
  });
});
