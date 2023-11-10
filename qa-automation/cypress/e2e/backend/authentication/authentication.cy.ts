import { faker } from "@faker-js/faker";
import { IStore } from "../../../types";

describe("Auth Flow", () => {
  it("Should be able to signup and verify user successfully", () => {
    cy.signup().then((response) => {
      expect(response.status).eq(200);
    });
  });
  it("Should be able to signin user successfully after signup", () => {
    cy.login().then((response) => {
      cy.getAuthCookie();
      expect(response.status).eq(200);
    });
  });

  it("Should be able to fetch user information successfully", () => {
    cy.setAuthCookie();
    cy.request({
      url: "api/user",
      method: "GET",
      failOnStatusCode: false,
    }).then((response) => {
      expect(response.status).eq(200);
    });
  });

  it("Should be able to update user email address and other info successfully", () => {
    cy.setAuthCookie();
    const body = {
      firstName: "Dixre",
      lastName: "Enterprise",
      email: faker.internet.email(),
    };
    cy.request({
      url: "/api/auth/users/update",
      method: "PUT",
      failOnStatusCode: false,
      body,
    }).then((response) => {
      cy.getState().then((store: IStore) => {
        const newSignupCreds = { ...store.signupCredentials, ...body };
        cy.setState("signupCredentials", newSignupCreds);
      });
      expect(response.status).eq(200);
    });
  });

  it("Should verify email address after update [prior to last test] this test depends on last test", () => {
    cy.getVerificationCode();
    cy.getState().then((store: IStore) => {
      cy.request({
        url: "/api/auth/verify/code",
        method: "POST",
        failOnStatusCode: false,
        body: {
          otp: store.verification.email,
          email: store.signupCredentials.email,
        },
      }).then((response) => {
        expect(response.status).eq(200);
      });
    });
  });

  it("Should be able to resset user password", () => {
    cy.getState().then((store: IStore) => {
      cy.request({
        url: "/api/auth/password/reset",
        method: "POST",
        failOnStatusCode: false,
        body: {
          phoneNumber: store.signupCredentials.phoneNumber,
        },
      }).then((response) => {
        expect(response.status).eq(200);
      });
    });

    cy.getVerificationCode();
    cy.getState().then((store: IStore) => {
      cy.request({
        url: "/api/auth/password/reset/verify-otp",
        method: "POST",
        failOnStatusCode: false,
        body: {
          phoneNumber: store.signupCredentials.phoneNumber,
          otp: store.verification.ressetPassword,
        },
      }).then((response) => {
        cy.getAuthCookie();
        expect(response.status).eq(200);
      });
    });

    cy.setAuthCookie();

    const body = {
      password: faker.word.noun({ length: 10 }),
    };
    cy.request({
      url: "/api/auth/password/reset",
      method: "PUT",
      failOnStatusCode: false,
      body,
    }).then((response) => {
      cy.getState().then((store: IStore) => {
        const updatedUserCreds = { ...store.signupCredentials, ...body };
        cy.setState("signupCredentials", updatedUserCreds);
      });
      expect(response.status).eq(200);
    });
  });

  it("Should be able to login with user new credentials after successful password resset", () => {
    cy.login().then((response) => {
      cy.getAuthCookie();
      expect(response.status).eq(200);
    });
  });

  it("Should Recover account with email in case phoneNumber is lost", () => {
    // Account Recover
    cy.getState().then((store: IStore) => {
      cy.request({
        url: "/api/auth/recover-account",
        method: "POST",
        failOnStatusCode: false,
        body: {
          email: store.signupCredentials.email,
        },
      }).then((response) => {
        expect(response.status).eq(200);
      });
    });

    cy.getVerificationCode();
    cy.getState().then((store: IStore) => {
      cy.request({
        url: "/api/auth/recover-account/verify-otp",
        method: "POST",
        failOnStatusCode: false,
        body: {
          otp: store.verification.recoverAccount,
          email: store.signupCredentials.email,
        },
      }).then((response) => {
        cy.getAuthCookie();
        expect(response.status).eq(200);
      });
    });

    // UPdating account
    cy.setAuthCookie();
    cy.getState().then((store: IStore) => {
      const body = {
        phoneNumber: `090${faker.number.int({ min: 20000000, max: 90000000 })}`,
        password: faker.word.noun({ length: 10 }),
      };
      cy.request({
        url: "/api/auth/recover-account",
        method: "PUT",
        failOnStatusCode: false,
        body,
      }).then((response) => {
        cy.getAuthCookie();
        const newCreds = { ...store.signupCredentials, ...body };
        cy.setState("signupCredentials", newCreds);
        expect(response.status).eq(200);
      });
    });
  });

  it("Should be able to login with new recovered credentials", () => {
    cy.getState().then((store: IStore) => {
      cy.request({
        url: "/api/auth/verify/sms",
        method: "POST",
        failOnStatusCode: false,
        body: {
          phoneNumber: store.signupCredentials.phoneNumber,
        },
      }).then((response) => {
        expect(response.status).eq(200);
      });
      cy.getVerificationCode();
    });

    cy.getState().then((store: IStore) => {
      cy.request({
        url: "/api/auth/verify/code",
        method: "POST",
        failOnStatusCode: false,
        body: {
          phoneNumber: store.signupCredentials.phoneNumber,
          otp: store.verification.phoneNumber,
        },
      }).then((response) => {
        expect(response.status).eq(200);
      });
    });

    cy.login().then((response) => {
      cy.log(JSON.stringify(response));
      expect(response.status).eq(200);
    });
  });
});
