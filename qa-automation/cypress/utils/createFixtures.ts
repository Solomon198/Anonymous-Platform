import { IStore } from "../types";

export const createFixtures = (file: string) => ({
  getState(key?: string) {
    if (key) {
      return cy.readFile(file).then((store: IStore) => cy.wrap(store[key]));
    }
    return cy.readFile(file);
  },
  clearState() {
    return cy.writeFile(file, {}).then(() => {
      return cy.wrap({});
    });
  },
  setState(key: string, value: any) {
    return cy.readFile(file).then((store: IStore) => {
      store[key] = value;
      return cy.writeFile(file, store).then(() => cy.wrap(store));
    });
  },
});
