// importerar Bostad klassen
import { Bostad } from "./Bostad.js";
// modell för bostäder
export class ModelBostad {
  // skapar tomma arrays för bostäder, FAQ och tooltip
  constructor() {
    this.bostader = [];
    this.faq = [];
    this.tooltip = [];
  }
  // hämtar bostäder från JSON fil och skapar instanser av Bostad klassen
  async hamtaBostader() {
    try {
      const response = await fetch('Bostader.json');
      if (!response.ok) {
        throw new Error('Nätverksfel' + response.status);
      }
      // omvandla svaret till JSON
      const data = await response.json();
      // arrow funktion för att skapa nya instanser av Bostad klassen med data från JSON filen
      this.bostader = data.Bostader.map(bostad =>
        new Bostad(bostad.id, bostad.titel, bostad.bild, bostad.beskrivning, bostad.pris, bostad.kontakt, bostad.kbeskrivning));
      // skickar tillbaka arrayen med bostäder
      return this.bostader;
      // om det blir fel vid fetch
    } catch (error) {
      console.error('Fel vid hämtning av bostäder:', error);
      return [];
    }
  }

  async hamtaFAQ() {
    try {
      const response = await fetch('FAQ.json');
      if (!response.ok) {
        throw new Error('Nätverksfel' + response.status);
      }
      const data = await response.json();

      this.faq = data.FAQ;

      return this.faq;

    } catch (error) {
      console.error('Fel vid hämtning av FAQ:', error);
      return [];
    }
  }

  async hamtaTjanster() {
    try {
      const response = await fetch('Tjanster.json');
      if (!response.ok) {
        throw new Error('Nätverksfel' + response.status);
      }
      const data = await response.json();

      this.tjanster = data.tjanster;

      return this.tjanster;

    } catch (error) {
      console.error('Fel vid hämtning av Tjänster:', error);
      return [];
    }
  }

  async hamtaTooltip() {
    try {
      const response = await fetch('Tooltip.json');
      if (!response.ok) {
        throw new Error('Nätverksfel' + response.status);
      }
      const data = await response.json();
      this.tooltip = data.Tooltip;

      return this.tooltip;

    } catch (error) {
      console.error('Fel vid hämtning av Tooltip:', error);
      return [];
    }
  }
  // Hittar en bostad baserat på id
  hitta(id) {
    return this.bostader.find(bostad => bostad.id === id);
  }
}