export class ControllerBostad {
    constructor(model, view) {
        this.model = model;
        this.view = view;

        this.initCustomEventListeners();
        this.laddaBostader();
        this.laddaFAQ();
        this.laddaKarusell();
        this.laddaTooltip();
        this.laddaTjanster();
    }

    async laddaBostader() {
        const bostader = await this.model.hamtaBostader();
        this.view.displayBostader(bostader);
    }

    async laddaKarusell() {
        const bostader = await this.model.hamtaBostader();
        this.view.displayKarusell(bostader);
    }

    async laddaTooltip() {
        const tooltip = await this.model.hamtaTooltip();
        this.view.displayTooltip(tooltip);
    }

    async laddaFAQ() {
        const faq = await this.model.hamtaFAQ();
        this.view.displayFAQ(faq);
    }

    async laddaTjanster() {
        const tjanster = await this.model.hamtaTjanster();
        this.view.displaytjanster(tjanster);
    }

    initCustomEventListeners() {
        document.addEventListener("openModal", e => {
            const infobostad = this.model.hitta(e.detail.id);
            if (infobostad) {
                this.view.openModal(infobostad);
            }
        });
    }
}