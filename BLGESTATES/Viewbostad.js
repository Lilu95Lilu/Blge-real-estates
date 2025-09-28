export class ViewBostad {
    constructor() {
        this.container = document.getElementById('bostad');
        this.bostaddetalj = document.getElementById('bostaddetaljer');
        this.FAQContainer = document.getElementById('accordion');

        this.initEventListeners();
    }

    displayBostader(Bostader) {

        const cards = Bostader.map(bostad => `
                <div class="card m-2 col-md-12" style="width: 18rem;" data-id="${bostad.id}">
                    <h5 class="card-title m-1">${bostad.titel}</h5>
                    <img src="${bostad.bild}" class="card-img-top rounded">
                    <p class="mb-1"><strong>${bostad.pris} SEK</strong></p>
                    <p class="mb-1 card-text">${bostad.kbeskrivning}</p>
                    <button class="btn till-bostad m-2 bg-primary text-bg-secondary">Till bostad</button>
                </div>`).join('');

        // https://www.w3schools.com/bootstrap5/bootstrap_grid_basic.php
        this.container.innerHTML = `<div class="row">${cards}</div>`;
    }

    displayFAQ(faq) {
        let FAQCard = '';
        faq.forEach((item, index) => {
            FAQCard += `<div class="card">
                        <div class="card-header bg-primary">
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

    displayKarusell(bostader) {
        const carouselInner = document.getElementById('carousel-inner');
        try {
            bostader.forEach((bostader, index) => {
                const carouselbostad = document.createElement('div');
                carouselbostad.className = `carousel-item ${index === 0 ? 'active' : ''}`;
                const karuselldiv = document.createElement('div');
                karuselldiv.className = 'd-flex justify-content-center';

                karuselldiv.innerHTML = `
                    <div class="card m-3" style="width: 22rem;">
                        <img src="${bostader.bild || 'https://via.placeholder.com/150'}" 
                            class="card-img-top rounded-circle w-50 mx-auto mt-3" 
                            alt="${bostader.titel || 'Inget namn'}">
                        <div class="card-body text-center">
                            <h5 class="card-title">${bostader.titel || ''}</h5>
                            <p class="card-text text-muted">${bostader.beskrivning || 'Ingen beskrivning'}</p>
                            <div class="text-start">
                                <p>Ingen e-post</p>
                            </div>
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
                const card = e.target.closest('.card');
                const id = parseInt(card?.dataset.id);
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
        new bootstrap.Popover(button, {
            trigger: 'hover',
            html: true,
            title: 'Loading...',
            content: 'Please wait...'
        });
        
        button.addEventListener('show.bs.popover', () => {
            const tooltipId = parseInt(button.dataset.id);
            const popover = bootstrap.Popover.getInstance(button);

            const tooltip = tooltips.find(t => t.id === tooltipId);
            
            popover.setContent({
                '.popover-header': tooltip.titel,
                '.popover-body': `<p>${tooltip.innehall}</p>`
            });
        });
    });
    }
}