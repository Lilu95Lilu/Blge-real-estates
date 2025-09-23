class ControllerBostad {
    constructor(model, view) {
        this.model = model;
        this.view = view;

        this.initCustomEventListeners();
        this.view.render(this.model.hamtaBostader());
        
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