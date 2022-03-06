/// <reference types="Cypress" />

const dayjs = require("dayjs");

context("Login Page", () => {
  it("FindBeds And BuysBed", () => {
    cy.visit("https://murmuring-retreat-81100.herokuapp.com/login");
    cy.get("h3").should("contain.text", "ลงชื่อเข้าใช้งาน");
    cy.get('[type="email"]').type("test@gmail.com");
    cy.get('[type="password"]').type("Passw0rd");
    cy.get(".btn").click();
    cy.wait(6000);
    cy.get(".container > :nth-child(1) > :nth-child(3)").should(
      "have.text",
      "สถิติผู้ติดเชื้อโควิด-19 ในไทย"
    );
    cy.get(":nth-child(1) > a > .btn").click();
    cy.get("h3.my-3").should("contain.text", "ค้นหาเตียง");
    cy.get(".form-select").select("กรุงเทพฯ");
    cy.get(".btn").click();
    cy.wait(3000);
    cy.get("a > .btn").click();
    cy.wait(2000);
    cy.get("h3").should("contain.text", "รายละเอียดเลือกจอง");
    cy.get(".text-center.h5").should("contain.text", "วันที่จะเข้าพักอาศัย");
    const todayDate = dayjs().add(1, "day").format("YYYY-MM-DD");
    cy.get("input[type=date]").clear().type(`${todayDate}`);
    cy.get(".row > :nth-child(2) > .btn").click();
    cy.get(".modal-footer > .btn-primary").click();
    cy.wait(3000);
  });
});
