/// <reference types="Cypress" />

describe("ทดสอบว่าหน้า login มีการแสดงผลในส่วนของช่องกรอก email, password และปุ่มสำหรับ login หรือไม่", () => {
  it("- เข้ามายังหน้า login เพื่อดูว่ามีการแสดงผลช่องกรอก email, password และปุ่มสำหรับ login หรือไม่", () => {
    cy.visit("https://murmuring-retreat-81100.herokuapp.com/login");
    cy.get(cy.get('[type="email"]'));
    cy.get('[type="password"]');
    cy.get(".btn");
  });
});

describe("ทดสอบว่าหน้า main มีการแสดงผล component ที่เกี่ยวข้องกับการค้นหาและจองเตียงครบถ้วนหรือไม่", () => {
  it("- ทำการ login เข้าสู่ระบบ เพื่อตรวจสอบหน้า main ที่ login เสร็จแล้ว", () => {
    cy.visit("https://murmuring-retreat-81100.herokuapp.com/login");
    cy.get('[type="email"]').type("test@gmail.com");
    cy.get('[type="password"]').type("Passw0rd");
    cy.get(".btn").click();
    cy.wait(3500);
  });
  it("- ทำการตรวจสอบ component ในหน้า main หลังทำการ login ว่ามีครบถ้วนหรือไม่", () => {
    cy.get(".me-auto > :nth-child(2) > .nav-link").should(
      "have.text",
      " ค้นหาเตียง"
    );
    cy.get(".me-auto > :nth-child(3) > .nav-link").should(
      "have.text",
      " การจองเตียง"
    );
    cy.get("#navbarDropdown").should("have.text", " กฤตนัย ครองสิงห์");
    cy.get(":nth-child(1) > a > .btn").should("have.text", " ค้นหาเตียง ");
    cy.get(":nth-child(2) > a > .btn").should("have.text", " การจองเตียง ");
  });
});

describe("ทดสอบว่าในหน้าค้นหาเตียง มีการแสดงผล component ตามที่ต้องการครบถ้วนหรือไม่", () => {
  it("- ทำการ login เพื่อเข้าสู่หน้าค้นหาเตียง", () => {
    cy.visit("https://murmuring-retreat-81100.herokuapp.com/login");
    cy.get('[type="email"]').type("test@gmail.com");
    cy.get('[type="password"]').type("Passw0rd");
    cy.get(".btn").click();
    cy.wait(3500);
    cy.get(".me-auto > :nth-child(2) > .nav-link").click();
    cy.wait(5000);
    cy.url().should(
      "eq",
      "https://murmuring-retreat-81100.herokuapp.com/findbeds"
    );
  });
  it("- ทำการตรวจสอบ component ในหน้าค้นหาเตียง ว่ามีครบถ้วนหรือไม่", () => {
    cy.get(".container > :nth-child(4) > :nth-child(4)");
    cy.get(".container > :nth-child(4) > :nth-child(4) > :nth-child(1)");
    cy.get(".form-select");
  });
  it("- ตรวจสอบช่องเลือกจังหวัดว่ามีข้อมูลครบถ้วนแล้ว", () => {
    const allProvince =
      "ทุกจังหวัดกรุงเทพฯกระบี่กาญจนบุรีกาฬสินธุ์กำแพงเพชรขอนแก่นจันทบุรีฉะเชิงเทราชลบุรีชัยนาทชัยภูมิชุมพรเชียงใหม่เชียงรายตรังตราดตากนครนายกนครปฐมนครพนมนครราชสีมานครศรีธรรมราชนครสวรรค์นนทบุรีนราธิวาสน่านบึงกาฬบุรีรัมย์ปทุมธานีประจวบคีรีขันธ์ปราจีนบุรีปัตตานีพระนครศรีอยุธยาพะเยาพังงาพัทลุงพิจิตรพิษณุโลกเพชรบุรีเพชรบูรณ์แพร่ภูเก็ตมหาสารคามมุกดาหารแม่ฮ่องสอนยโสธรยะลาร้อยเอ็ดระนองระยองราชบุรีลพบุรีลำปางลำพูนเลยศรีสะเกษสกลนครสงขลาสตูลสมุทรปราการสมุทรสงครามสมุทรสาครสระแก้วสระบุรีสิงห์บุรีสุโขทัยสุพรรณบุรีสุราษฎร์ธานีสุรินทร์หนองคายหนองบัวลำภูอ่างทองอำนาจเจริญอุดรธานีอุตรดิตถ์อุทัยธานีอุบลราชธานี";
    cy.get(".form-select").children().should("have.length", 78);
    cy.get(".form-select").should("have.text", allProvince);
  });
  it("- ตรวจสอบการแสดงรายละเอียดของสถานที่ให้บริการเตียง ว่ามีครบถ้วนหรือไม่", () => {
    cy.get(":nth-child(2) > :nth-child(1) > .btn");
    cy.get(":nth-child(2) > .row > .col-10 > :nth-child(1)");
    cy.get(":nth-child(2) > .row > .col-10 > :nth-child(2)");
    cy.get(":nth-child(2) > .row > .col-10 > .text-secondary");
    cy.get(":nth-child(2) > p.text-center > a > .btn");
  });
});
describe("ทดสอบว่าในหน้าการจองเตียง มีการแสดงผล component ตามที่ต้องการครบถ้วนหรือไม่", () => {
  it("- ทำการ login เพื่อเข้าสู่หน้าจองเตียง", () => {
    cy.visit("https://murmuring-retreat-81100.herokuapp.com/login");
    cy.get('[type="email"]').type("test@gmail.com");
    cy.get('[type="password"]').type("Passw0rd");
    cy.get(".btn").click();
    cy.wait(3500);
    cy.get(".me-auto > :nth-child(2) > .nav-link").click();
    cy.wait(5000);
    cy.url().should(
      "eq",
      "https://murmuring-retreat-81100.herokuapp.com/findbeds"
    );
    cy.get(":nth-child(2) > p.text-center > a > .btn").click({ force: true });
  });
  it("ตรวจสอบการแสดงรายละเอียดของสถานที่ให้บริการเตียง ว่ามีครบถ้วนหรือไม่", () => {
    cy.get(".text-end > .btn").should("have.text", " Google Maps ");
    cy.get(".content > .h5");
    cy.get(".content > :nth-child(3)");
    cy.get(".content > :nth-child(4)");
    cy.get(".content > :nth-child(5)");
    cy.get(".text-center > .btn");
  });
  it("ตรวจสอบส่วนของการเลือกวันที่ที่จะเข้ามาพักอาศัย", () => {
    cy.get(".form-control");
    cy.get(".row > :nth-child(2) > .btn").should("have.text", " จอง ");
  });
});
