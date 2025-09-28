import { Bostad } from "./Bostad.js";

export class ModelBostad {
  constructor() {
    this.bostader = [];
    this.faq = [];
    this.tooltip = [];
  }

  async hamtaBostader() {
    try {
      const response = await fetch('Bostader.json');
      if (!response.ok) {
        throw new Error('Nätverksfel' + response.status);
      }
      // Omvandla svaret till JSON
      const data = await response.json();

      this.bostader = data.Bostader.map(bostad =>
        new Bostad(bostad.id, bostad.titel, bostad.bild, bostad.beskrivning, bostad.pris, bostad.kontakt, bostad.kbeskrivning));

      return this.bostader;

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

  hitta(id) {
    return this.bostader.find(bostad => bostad.id === id);
  }
}