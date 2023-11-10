/// <reference types="cypress" />

import { IStore } from "../../types";
import { createFixtures } from "../../utils";
import { faker } from "@faker-js/faker";
// ***********************************************
// This example commands.ts shows you how to
// create various custom commands and overwrite
// existing commands.
//
// For more comprehensive examples of custom
// commands please read more here:
// https://on.cypress.io/custom-commands
// ***********************************************
//
//
const file = "cypress/fixtures/state/store.json";
Cypress.Commands.add("login", () => {
  cy.getState("signupCredentials").then(
    (store: IStore["signupCredentials"]) => {
      return cy.request({
        method: "POST",
        url: "/api/auth/signin",
        body: {
          phoneNumber: store.phoneNumber,
          password: store.password,
        },
        failOnStatusCode: false,
      });
    }
  );
});

Cypress.Commands.add("setAuthCookie", () => {
  cy.getState("session").then((session: IStore["cookie"]) => {
    cy.setCookie("session", session.value);
  });
});

Cypress.Commands.add("getVerificationCode", () => {
  return cy
    .getState("signupCredentials")
    .then((store: IStore["signupCredentials"]) => {
      return cy
        .request({
          method: "GET",
          url: `/api/auth/test/otps?phoneNumber=${store.phoneNumber}&email=${store.email}`,
          failOnStatusCode: false,
        })
        .then((response) => {
          cy.setState("verification", response.body);
          cy.log(JSON.stringify(response.body));
          cy.log("GETTING CODE");
          return cy.wrap(response.body);
        });
    });
});

Cypress.Commands.add("getAuthCookie", () => {
  cy.getCookie("session").then((session) => {
    cy.setState("session", session);
  });
});
// Covers Authentication so that other part of application can be attatched
Cypress.Commands.add("signup", () => {
  const body = {
    phoneNumber: `090${faker.number.int({ min: 20000000, max: 90000000 })}`,
    password: faker.word.noun({ length: 10 }),
    gender: "male",
    firstName: faker.person.firstName(),
    lastName: faker.person.lastName(),
    acceptedTerms: true,
  };
  return cy
    .request({
      method: "POST",
      url: "/api/auth/signup",
      body,
      failOnStatusCode: false,
    })
    .then((res) => {
      cy.setState("signupCredentials", body).then(() => {
        cy.getVerificationCode().then((value: { phoneNumber: string }) => {
          cy.request({
            method: "POST",
            url: "/api/auth/verify/code",
            body: {
              phoneNumber: body.phoneNumber,
              otp: value.phoneNumber,
            },
            failOnStatusCode: false,
          });
        });
      });
    });
});

Cypress.Commands.add("getState", (key?: string) => {
  return createFixtures(file).getState(key);
});

Cypress.Commands.add("setState", (key: string, value: any) => {
  return createFixtures(file).setState(key, value);
});

Cypress.Commands.add("clearState", () => {
  return createFixtures(file).clearState();
});
