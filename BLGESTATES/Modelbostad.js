import Bostad from "./Bostad.js";

export class ModelBostad {
  constructor() {
    this.bostader = [];
  }

  async hamtaBostader() {
    try {
      const response = await fetch('Bostader.json');
      if (!response.ok) {
        throw new Error('Nätverksfel' + response.status);
      }
      // Omvandla svaret till JSON
      const data = await response.json();

      this.bostader = data.map(bostad => new Bostad(bostad.titel, bostad.bild, bostad.beskrivning, bostad.pris));
      return this.bostader;

    } catch (error) {
      console.error('Fel vid hämtning av bostäder:', error);
    }
  }

  hitta(id) {
        return this.bostader.find(bostad => bostad.id === id);
    }
}