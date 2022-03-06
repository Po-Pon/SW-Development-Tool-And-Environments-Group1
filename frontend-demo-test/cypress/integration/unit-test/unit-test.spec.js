/// <reference types="cypress" />

// login
describe("ทดสอบการทำงานของช่องกรอก Email และรหัสผ่านในระบบ login", () => {
  it("ทำการ login โดยการใส่รหัสผ่านผิด เพื่อทดสอบการ validate", () => {
    cy.visit("https://murmuring-retreat-81100.herokuapp.com/login");
    cy.get('[type="email"]')
      .type("fake@gmail.com")
      .should("have.value", "fake@gmail.com");
    cy.get('[type="password"]')
      .type("fakepassword")
      .should("have.value", "fakepassword");
    cy.get(".btn").click();
    cy.wait(3000);
  });

  it("ทำการ login โดยการใส่ Email และรหัสผ่านผิด เพื่อทดสอบการ validate", () => {
    cy.visit("https://murmuring-retreat-81100.herokuapp.com/login");
    cy.get('[type="email"]')
      .type("fake@.com")
      .should("have.value", "fake@.com");
    cy.get('[type="password"]')
      .type("fakepassword")
      .should("have.value", "fakepassword");
    cy.get(".btn").click();
    cy.wait(3000);
  });

  it("ทำการ login โดยการใส่ Email และรหัสผ่านถูกต้อง เพื่อทดสอบว่า login ได้จริงหรือไม่", () => {
    cy.visit("https://murmuring-retreat-81100.herokuapp.com/login");
    cy.get('[type="email"]')
      .type("test@gmail.com")
      .should("have.value", "test@gmail.com");
    cy.get('[type="password"]')
      .type("Passw0rd")
      .should("have.value", "Passw0rd");
    cy.get(".btn").click();
    cy.wait(3000);
    cy.url().should("eq", "https://murmuring-retreat-81100.herokuapp.com/");
  });
});

// findbeds
describe("ทดสอบช่องเลือกจังหวัด ในหน้าค้นหาเตียง", () => {
  it("ทำการ login และเข้าสู่หน้าค้นหาเตียง เพื่อทดสอบช่องเลือกจังหวัดสามารถใช้งานได้จริงหรือไม่", () => {
    cy.visit("https://murmuring-retreat-81100.herokuapp.com/login");
    cy.get('[type="email"]')
      .type("test@gmail.com")
      .should("have.value", "test@gmail.com");
    cy.get('[type="password"]')
      .type("Passw0rd")
      .should("have.value", "Passw0rd");
    cy.get(".btn").click();
    cy.url().should("eq", "https://murmuring-retreat-81100.herokuapp.com/");
    cy.get(":nth-child(1) > a > .btn").click();
    cy.get(".form-select").select("กรุงเทพฯ").should("have.value", "กรุงเทพฯ");
    cy.get(":nth-child(3) > .btn").click();
    cy.get(".col-10 > :nth-child(1)").should("contain.text", "กรุงเทพฯ");
  });
});

// buybeds
const dayjs = require("dayjs");

describe("ทดสอบการทำงานของการเลือกวันที่จองเตียง", () => {
  it("ทำการ Login และเข้าสู่หน้าจองเตียง เพื่อทดสอบการเลือกวันที่ ในกรณีที่วันที่ที่เลือก เป็นวันในอดีต", () => {
    cy.visit("https://murmuring-retreat-81100.herokuapp.com/login");
    cy.get('[type="email"]')
      .type("test@gmail.com")
      .should("have.value", "test@gmail.com");
    cy.get('[type="password"]')
      .type("Passw0rd")
      .should("have.value", "Passw0rd");
    cy.get(".btn").click();
    cy.url().should("eq", "https://murmuring-retreat-81100.herokuapp.com/");
    cy.get(":nth-child(1) > a > .btn").click();
    cy.url().should(
      "eq",
      "https://murmuring-retreat-81100.herokuapp.com/findbeds"
    );
    cy.get(":nth-child(3) > .btn").click();
    cy.get(":nth-child(2) > p.text-center > a > .btn").click({ force: true });
    const todayDate = dayjs().format("YYYY-MM-DD");
    cy.get("input[type=date]").clear().type(`${todayDate}`);
    cy.get(".row > :nth-child(2) > .btn").click();
    cy.get(".modal-footer > .btn-primary").click();
    cy.wait(5000);
  });

  it("ทำการ login และเข้าสู่หน้าจองเตียง เพื่อทดสอบการเลือกวันที่ ในกรณีที่วันที่เลือก เป็นวันนี้หรือวันในอนาคต", () => {
    cy.visit("https://murmuring-retreat-81100.herokuapp.com/login");
    cy.get('[type="email"]')
      .type("test@gmail.com")
      .should("have.value", "test@gmail.com");
    cy.get('[type="password"]')
      .type("Passw0rd")
      .should("have.value", "Passw0rd");
    cy.get(".btn").click();
    cy.url().should("eq", "https://murmuring-retreat-81100.herokuapp.com/");
    cy.get(":nth-child(1) > a > .btn").click();
    cy.url().should(
      "eq",
      "https://murmuring-retreat-81100.herokuapp.com/findbeds"
    );
    cy.get(":nth-child(3) > .btn").click();
    cy.get(":nth-child(2) > p.text-center > a > .btn").click({ force: true });
    const todayDate = dayjs().add(1, "day").format("YYYY-MM-DD");
    cy.get("input[type=date]").clear().type(`${todayDate}`);
    cy.get(".row > :nth-child(2) > .btn").click();
    cy.get(".modal-footer > .btn-primary").click();
    cy.wait(5000);
  });
});
