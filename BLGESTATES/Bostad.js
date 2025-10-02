// objekt konstruktor för våra bostäder
export class Bostad {
  constructor(id, titel, bild, beskrivning, pris, kontakt, kbeskrivning) {
    this.id = id;
    this.titel = titel;
    this.bild = bild;
    this.beskrivning = beskrivning;
    this.pris = pris;
    this.kontakt = kontakt;
    this.kbeskrivning = kbeskrivning;
  }
}