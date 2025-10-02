// sontroller för bostäder
export class ControllerBostad {
    // startar med model och view
    constructor(model, view) {
        this.model = model;
        this.view = view;
        // laddar alla funktioner vi vill köra direkt
        this.initCustomEventListeners();
        this.laddaBostader();
        this.laddaFAQ();
        this.laddaKarusell();
        this.laddaTooltip();
        this.laddaTjanster();
    }
    // laddar bostäder från model och skickar till view för visning
    async laddaBostader() {
        const bostader = await this.model.hamtaBostader();
        this.view.displayBostader(bostader);
    }
    // laddar karusell från model och skickar till view för visning
    async laddaKarusell() {
        const bostader = await this.model.hamtaBostader();
        this.view.displayKarusell(bostader);
    }
    // laddar tooltip från model och skickar till view för visning
    async laddaTooltip() {
        const tooltip = await this.model.hamtaTooltip();
        this.view.displayTooltip(tooltip);
    }
    // laddar FAQ från model och skickar till view för visning
    async laddaFAQ() {
        const faq = await this.model.hamtaFAQ();
        this.view.displayFAQ(faq);
    }
    // laddar tjänster från model och skickar till view för visning
    async laddaTjanster() {
        const tjanster = await this.model.hamtaTjanster();
        this.view.displaytjanster(tjanster);
    }
    // eventlyssnare för custom event som matchar bostad och skickar till view för visning i modal
    initCustomEventListeners() {
        document.addEventListener("openModal", e => {
            const infobostad = this.model.hitta(e.detail.id);
            if (infobostad) {
                this.view.openModal(infobostad);
            }
        });
    }
}