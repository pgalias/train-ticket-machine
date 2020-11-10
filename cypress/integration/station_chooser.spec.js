/// <reference types="cypress" />
import { STATIONS_CACHE_KEY } from '../../src/infrastructure/constants';
import StationChooserPage from '../page-objects/station-chooser';

context('Station Chooser', () => {
  let pageObject;

  beforeEach(() => {
    pageObject = new StationChooserPage();
  });

  afterEach(() => {
    cy.clearLocalStorage(STATIONS_CACHE_KEY);
  });

  it('should user be able to select station', () => {
    pageObject.loadFixtures('stations-list');
    pageObject.visit();

    pageObject.getStations().should('have.lengthOf', 4);
    pageObject.getStation('Derby').click().should('have.class', 'selected');
  });

  it('should filter station on keyboard buttons click', () => {
    pageObject.loadFixtures('stations-list');
    pageObject.visit();

    pageObject.getStations().should('have.lengthOf', 4);

    pageObject.writeWord('DART');

    pageObject
      .getEnabledKeyboardButtons()
      .should('have.lengthOf', 3)
      .each((buttonElement) => {
        const expectedElements = ['O', 'F', 'backspace'];
        const result = expectedElements.some((key) => buttonElement.html().includes(key));

        expect(result).to.be.true;
      });

    pageObject.getUserInput().should('have.value', 'DART');

    pageObject
      .getStations()
      .should('have.lengthOf', 2)
      .each((stationElement) => {
        const expectedElements = ['Dartford', 'Darton'];
        const result = expectedElements.some((key) => stationElement.html().includes(key));

        expect(result).to.be.true;
      });
  });

  it('should filter station on keyboard buttons click', () => {
    pageObject.loadFixtures('stations-list-2');
    pageObject.visit();

    pageObject.getStations().should('have.lengthOf', 3);

    pageObject.writeWord('LIVERPOOL');

    pageObject
      .getEnabledKeyboardButtons()
      .should('have.lengthOf', 2)
      .each((buttonElement) => {
        const expectedElements = [' ', 'backspace'];
        const result = expectedElements.some((key) => buttonElement.html().includes(key));

        expect(result).to.be.true;
      });

    pageObject.getUserInput().should('have.value', 'LIVERPOOL');

    pageObject
      .getStations()
      .should('have.lengthOf', 2)
      .each((stationElement) => {
        const expectedElements = ['Liverpool', 'Liverpool Lime Street'];
        const result = expectedElements.some((key) => stationElement.html().includes(key));

        expect(result).to.be.true;
      });
  });

  it('should disable all keyboard and show info about no results when user type not existing station name', () => {
    pageObject.loadFixtures('stations-list-3');
    pageObject.visit();

    pageObject.getStations().should('have.lengthOf', 3);

    pageObject.writeWord('KINGS');
    // workaround for clicking space button, because cypress cannot query element with whitespaces
    pageObject.clickKeyboardButton('[space]');
    pageObject.writeWord('CROSS');

    pageObject
      .getEnabledKeyboardButtons()
      .should('have.lengthOf', 1)
      .invoke('html')
      .then((element) => {
        expect(element.includes('backspace')).to.be.true;
      });

    pageObject.getUserInput().should('have.value', 'KINGS CROSS');

    pageObject.getStations().should('not.exist');
    pageObject.getNoResultsInfo().should('exist');
  });
});
