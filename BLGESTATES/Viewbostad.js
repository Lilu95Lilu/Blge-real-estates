export class ViewBostad {
  constructor() {
    this.container = document.getElementById('bostad');
    this.bostaddetalj = document.getElementById('bostaddetaljer');
    this.initEventListeners();
  }

  displayBostader(Bostader) {
    
    const cards = Bostader.map(bostad => `
                <div class="card mb-4" style="width: 18rem;" data-id="${bostad.id}">
                    <h5 class="card-title">${bostad.titel}</h5>
                    <img src="${bostad.bild}" class="card-img-top">
                    <button class="btn till-bostad">Till bostad</button>
                </div>`).join('');

    this.container.innerHTML = cards;
}


    initEventListeners() {
        this.container.addEventListener('click', e => {
            const card = e.target.closest('.card');
            const id = parseInt(card?.dataset.id);
            document.dispatchEvent(new CustomEvent("openModal", { detail: { id } }));
        });
    }

    openModal(infobostad) {
    const modalContent = `
        <div class="row">
            <div class="col-md-12 text-center">
                <img src="${infobostad.bild}" class="img-fluid mb-3" alt="${infobostad.titel}">
                <h4>${infobostad.titel}</h4>
                <p>${infobostad.beskrivning}</p>
                <p>Pris:${infobostad.pris}</p>
                <p>Kontaktinformation:</p>
            </div>
        </div>

        `;

    this.bostaddetalj.innerHTML = modalContent;

    const modal = new bootstrap.Modal(document.getElementById('bostadModal'));
    modal.show();
}
}