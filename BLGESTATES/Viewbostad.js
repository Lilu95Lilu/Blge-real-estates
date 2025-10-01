export class ViewBostad {
    constructor() {
        this.container = document.getElementById('bostad');
        this.bostaddetalj = document.getElementById('bostaddetaljer');
        this.FAQContainer = document.getElementById('accordion');
        this.karusell = document.getElementById('bostadCarousel');
        this.tjansterContainer = document.getElementById('tjanster-accordion');

        this.initEventListeners();
    }

    displayBostader(Bostader) {

        const cards = Bostader.map(bostad => `
                <div class="card m-2 col-md-12 view-button bg-dark text-white" style="width: 18rem;" data-id="3">
                    <h5 class="card-title m-1">${bostad.titel}</h5>
                    <img src="${bostad.bild}" class="card-img-top rounded">
                    <p class="mb-1"><strong>${bostad.pris} SEK</strong></p>
                    <p class="mb-1">${bostad.kbeskrivning}</p>
                    <button class="btn till-bostad m-2 bg-primary text-bg-secondary" data-id="${bostad.id}">Till bostad</button>
                </div>`).join('');

        // https://www.w3schools.com/bootstrap5/bootstrap_grid_basic.php
        this.container.innerHTML = `<div class="row">${cards}</div>`;
    }

    displayFAQ(faq) {
        let FAQCard = '';
        faq.forEach((item, index) => {
            FAQCard += `<div class="card">
                        <div class="card-header bg-dark">
                            <a class="btn text-white" data-bs-toggle="collapse" href="#collapse${index}">
                            ${item.fraga}
                            </a>
                        </div>
                        <div id="collapse${index}" class="collapse" data-bs-parent="#accordion">
                            <div class="card-body">
                                    <p class="text">${item.svar}</p>
                            </div>
                        </div>
                    </div>`;
        });
        this.FAQContainer.innerHTML = FAQCard;
    }

    displaytjanster(tjanster) {
        let tjansterCard = '';
        tjanster.forEach((item, index) => {
            tjansterCard += `<div class="card">
                        <div class="card-header bg-dark">
                            <a class="btn text-white" data-bs-toggle="collapse" href="#collapse${index}">
                            ${item.tjanst}
                            </a>
                        </div>
                        <div id="collapse${index}" class="collapse" data-bs-parent="#accordion">
                            <div class="card-body">
                                    <p class="text">${item.beskrivning}</p>
                            </div>
                        </div>
                    </div>`;
        });
        this.tjansterContainer.innerHTML = tjansterCard;
    }

    displayKarusell(bostader) {
        const carouselInner = document.getElementById('carousel-inner');
        try {
            bostader.forEach((bostader, index) => {
                const carouselbostad = document.createElement('div');
                carouselbostad.className = `carousel-item ${index === 0 ? 'active' : ''}`;
                const karuselldiv = document.createElement('div');
                karuselldiv.className = 'd-flex justify-content-center';

                karuselldiv.innerHTML = `
                    <div class="bg-dark text-white card m-3 view-button" style="width: 22rem;" data-id="3">
                        <img src="${bostader.bild}"
                            class="card-img-top rounded-circle w-50 mx-auto mt-3" 
                            alt="${bostader.titel || 'Inget namn'}">
                        <div class="card-body text-center">
                            <h5 class="card-title">${bostader.titel || ''}</h5>
                            <p class="text-white">${bostader.beskrivning || 'Ingen beskrivning'}</p>
                            <button class="btn till-bostad m-2 bg-primary text-bg-secondary" data-id="${bostader.id}">Till bostad</button>
                        </div>
                    </div>
                `;
                carouselbostad.appendChild(karuselldiv);
                carouselInner.appendChild(carouselbostad);
            });
        } catch (error) {
            console.error('Fel vid hämtning av användardetaljer:', error);
        }
    }


    initEventListeners() {
        if (this.container) {
            this.container.addEventListener('click', e => {
                const button = e.target.closest('.btn');
                const id = parseInt(button?.dataset.id);
                document.dispatchEvent(new CustomEvent("openModal", { detail: { id } }));
            });
        }

        if (this.karusell) {
            this.karusell.addEventListener('click', e => {
                const button = e.target.closest('.btn');
                const id = parseInt(button?.dataset.id);
                document.dispatchEvent(new CustomEvent("openModal", { detail: { id } }));
            });
        }
    }

    openModal(infobostad) {
        const modalContent = `
        <div class="row">
            <div class="col-md-12 text-center">
                <img src="${infobostad.bild}" class="img-fluid mb-3 rounded" alt="${infobostad.titel}">
                <h4>${infobostad.titel}</h4>
                <p>${infobostad.beskrivning}</p>
                <p>Pris: ${infobostad.pris} SEK</p>
                <p>Kontaktinformation: ${infobostad.kontakt}</p>
            </div>
        </div>

        `;

        this.bostaddetalj.innerHTML = modalContent;

        const modal = new bootstrap.Modal(document.getElementById('bostadModal'));
        modal.show();
    }

    displayTooltip(tooltips) {
    const viewButtons = document.querySelectorAll('.view-button');

    viewButtons.forEach(button => {
        const tooltipId = parseInt(button.dataset.id);
        const tooltipData = tooltips.find(t => t.id === tooltipId);

        new bootstrap.Tooltip(button, {
            trigger: 'hover',
            html: true,
            title: `<p>${tooltipData.innehall}</p>`
        });
    });
    }
}