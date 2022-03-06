/// <reference types="cypress" />

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

// describe('function findbeds && show the result testing', () => {
//     it('findbeds page should display the correct information', () => {
//         cy.visit('https://murmuring-retreat-81100.herokuapp.com/login')
//         cy.get('[type="email"]').type('test@gmail.com').should('have.value', 'test@gmail.com')
//         cy.get('[type="password"]').type('Passw0rd').should('have.value', 'Passw0rd')
//         cy.get('.btn').click()
//         cy.url().should('eq', 'https://murmuring-retreat-81100.herokuapp.com/')
//         cy.get(':nth-child(1) > a > .btn').click()
//         cy.get('.form-select').select('กรุงเทพฯ').should('have.value', 'กรุงเทพฯ')
//         cy.get(':nth-child(3) > .btn').click()
//         cy.get(':nth-child(2) > .row > .col-10 > :nth-child(1)').should('contain.text', 'กรุงเทพฯ')
//         cy.get(':nth-child(3) > .row > .col-10 > :nth-child(1)').should('contain.text', 'กรุงเทพฯ')
//     })
// })
