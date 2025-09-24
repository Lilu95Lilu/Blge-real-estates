export class ControllerBostad {
    constructor(model, view) {
        this.model = model;
        this.view = view;

        this.initCustomEventListeners();
        this.laddaBostader();
        
    }

    async laddaBostader() {
        const bostader = await this.model.hamtaBostader();
        this.view.displayBostader(bostader);
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