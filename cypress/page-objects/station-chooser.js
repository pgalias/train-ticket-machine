import { STATIONS_CACHE_KEY } from '../../src/infrastructure/constants';

export default class StationChooserPage {
  visit() {
    cy.visit('/');
  }

  loadFixtures(fixturesName) {
    cy.fixture(fixturesName).then((stations) => {
      localStorage.setItem(STATIONS_CACHE_KEY, JSON.stringify(stations));
    });
  }

  getStations() {
    return cy.get('.list .station');
  }

  getStation(station) {
    return this.getStations().contains(station).parent();
  }

  getKeyboardButtons() {
    return cy.get('.keyboard-container .btn');
  }

  getEnabledKeyboardButtons() {
    return cy.get('.keyboard-container .btn:not(.disabled)');
  }

  clickKeyboardButton(letter) {
    cy.get(`.keyboard-container .btn[qa="${letter}"]`).click();
  }

  writeWord(word) {
    word.split('').forEach(this.clickKeyboardButton.bind(this));
  }

  getUserInput() {
    return cy.get('.user-input');
  }

  getNoResultsInfo() {
    return cy.get('.no-results');
  }
}
