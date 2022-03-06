/// <reference types="cypress" />

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
    cy.url().should("eq", "https://murmuring-retreat-81100.herokuapp.com/");
    cy.wait(3000);
  });
});

// describe('Login validate testing', () => {
//     it('should alert login fail', () => {
//         cy.visit('https://murmuring-retreat-81100.herokuapp.com/login')
//         cy.get('[type="email"]').type('fake@gmail.com').should('have.value', 'fake@gmail.com')
//         cy.get('[type="password"]').type('fakepassword').should('have.value', 'fakepassword')
//         cy.get('.btn').click()
//         cy.wait(3000)
//     })

//     it('should alert incorrect gmail&password', () => {
//         cy.visit('https://murmuring-retreat-81100.herokuapp.com/login')
//         cy.get('[type="email"]').type('fake@.com').should('have.value', 'fake@.com')
//         cy.get('[type="password"]').type('fakepassword').should('have.value', 'fakepassword')
//         cy.get('.btn').click()
//         cy.wait(3000)
//     })

//     it('should alert login success & show main page', () => {
//         cy.visit('https://murmuring-retreat-81100.herokuapp.com/login')
//         cy.get('[type="email"]').type('test@gmail.com').should('have.value', 'test@gmail.com')
//         cy.get('[type="password"]').type('Passw0rd').should('have.value', 'Passw0rd')
//         cy.get('.btn').click()
//         cy.url().should('eq', 'https://murmuring-retreat-81100.herokuapp.com/')
//         cy.wait(3000)
//     })
// })
