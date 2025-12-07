import { THEME_STORAGE_KEY } from '../../src/common/composables/use-theme/useTheme.ts';
import type { Form } from '../../src/modules/fuel-guide/interfaces/Form.ts';
import { IntensityType } from '../../src/modules/fuel-guide/interfaces/Intensity.ts';
import { PlaceType } from '../../src/modules/fuel-guide/interfaces/Place.ts';
import { SportType } from '../../src/modules/fuel-guide/interfaces/Sport.ts';
import { SweatLevel } from '../../src/modules/fuel-guide/interfaces/Sweat.ts';
import { WeatherType } from '../../src/modules/fuel-guide/interfaces/Weather.ts';

const scrollToSection = (id: string) => {
  cy.get(`section#${id}`).scrollIntoView();
  cy.get(`section#${id}`).should('be.visible');
};

const selectToggleOption = (id: string) => {
  cy.get(`[data-cy="${id}"]`, { timeout: 4000 }).first().click();
};

const getCalculateButton = () => cy.contains('[data-cy="calculate"]', 'Calculate');

const setWorkoutDuration = (minutes: number) => {
  cy.get('input[type="number"]').first().clear();
  cy.get('input[type="number"]').first().type(String(minutes));
};

const defaultFuelGuideForm: Form = {
  sport: SportType.Cycling,
  place: PlaceType.Outside,
  intensity: IntensityType.Moderate,
  weather: WeatherType.Mild,
  sweat: SweatLevel.Medium,
  duration: 120,
  saltCrust: false,
};

const fillFuelGuideForm = (overrides: Partial<Form> = {}) => {
  const form = { ...defaultFuelGuideForm, ...overrides };

  scrollToSection('fuel-guide');
  selectToggleOption(form.sport);
  selectToggleOption(form.place);

  if (form.place !== PlaceType.Inside && form.weather) {
    selectToggleOption(form.weather);
  }

  selectToggleOption(form.sweat);
  selectToggleOption(form.intensity);
  setWorkoutDuration(form.duration);
};

describe('Carby home experience', () => {
  beforeEach(() => {
    cy.visit('/');
  });

  it('syncs the URL hash with the visible section', () => {
    cy.location('hash', { timeout: 4000 }).should('eq', '#home');

    scrollToSection('fuel-guide');
    cy.location('hash', { timeout: 4000 }).should('eq', '#fuel-guide');

    scrollToSection('home');
    cy.location('hash', { timeout: 4000 }).should('eq', '#home');
  });

  it('navigates between sections from the sticky header navigation', () => {
    cy.get('header').within(() => {
      cy.get('a[href="#fuel-guide"]').first().click();
    });
    cy.location('hash', { timeout: 4000 }).should('eq', '#fuel-guide');
    cy.get('section#fuel-guide').should('be.visible');

    cy.get('header').within(() => {
      cy.get('a[href="#home"]').first().click();
    });
    cy.location('hash', { timeout: 4000 }).should('eq', '#home');
    cy.get('section#home').should('be.visible');
  });

  it('scrolls to the fuel guide when using the hero CTA', () => {
    cy.get('section#home').within(() => {
      cy.get('a[href="#fuel-guide"]').first().click();
    });

    cy.location('hash', { timeout: 4000 }).should('eq', '#fuel-guide');
    cy.get('section#fuel-guide').should('be.visible');
  });

  it('allows toggling the color scheme and persists the preference', () => {
    cy.window().its('localStorage').invoke('getItem', THEME_STORAGE_KEY).should('eq', 'auto');
    cy.get('html')
      .invoke('attr', 'class')
      .then((classAttr) => {
        const initiallyDark = classAttr?.includes('dark') ?? false;
        cy.get('html').should(`${initiallyDark ? '' : 'not.'}have.class`, 'dark');
        cy.get('button[data-cy="theme-toggle-button"]').click();
        cy.get('html').should(`${initiallyDark ? 'not.' : ''}have.class`, 'dark');
      });
  });

  it('hides the weather selector when training indoors', () => {
    scrollToSection('fuel-guide');
    cy.contains('What is the weather like?').should('exist');

    selectToggleOption(PlaceType.Inside);
    cy.contains('What is the weather like?').should('not.exist');

    selectToggleOption(PlaceType.Outside);
    cy.contains('What is the weather like?').should('exist');
  });

  it('keeps Calculate disabled until the form is complete', () => {
    scrollToSection('fuel-guide');

    getCalculateButton().should('be.disabled');
    selectToggleOption(SportType.Cycling);
    getCalculateButton().should('be.disabled');
    selectToggleOption(PlaceType.Outside);
    getCalculateButton().should('be.disabled');
    selectToggleOption(WeatherType.Mild);
    getCalculateButton().should('be.disabled');
    selectToggleOption(SweatLevel.Medium);
    getCalculateButton().should('be.disabled');
    selectToggleOption(IntensityType.Moderate);
    getCalculateButton().should('be.disabled');

    setWorkoutDuration(90);
    getCalculateButton().should('not.be.disabled');
  });

  it('shows neutral guidance when the workout is too short', () => {
    fillFuelGuideForm({
      sport: SportType.Running,
      place: PlaceType.Inside,
      sweat: SweatLevel.Low,
      intensity: IntensityType.Easy,
      duration: 20,
      weather: undefined,
    });

    getCalculateButton().click();
    cy.contains('button', 'Calculating...').should('exist');
    cy.contains('button', 'Calculate', { timeout: 5000 }).should('exist').and('not.be.disabled');

    cy.contains("You're all set!", { timeout: 5000 }).should('be.visible');
    cy.contains("You don't need anything!").should('be.visible');
    cy.contains('h4', 'Carbs').should('not.exist');
  });

  it('calculates personalized fuel recommendations', () => {
    fillFuelGuideForm();

    getCalculateButton().click();
    cy.contains('button', 'Calculating...').should('exist');
    cy.contains('button', 'Calculate', { timeout: 5000 }).should('exist').and('not.be.disabled');

    cy.contains('h4', 'Carbs')
      .parent()
      .within(() => {
        cy.contains('Recommended intake').should('contain', '63');
        cy.contains("That's").should('contain', '126 g').and('contain', '4 gels');
        cy.contains('Take').should('contain', '1 gel').and('contain', 'every 35 minutes');
      });

    cy.contains('h4', 'Hydration')
      .parent()
      .within(() => {
        cy.contains('Recommended intake').should('contain', '550');
        cy.contains('1.1').should('exist');
      });

    cy.contains('h4', 'Electrolytes')
      .parent()
      .within(() => {
        cy.contains('Recommended intake').should('contain', '220');
        cy.contains('tablet').should('contain', '1');
      });
  });
});
