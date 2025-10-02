// view för bostäder
export class ViewBostad {
    // sätter upp referenser till HTML element och kallar på eventlyssnare
    constructor() {
        this.container = document.getElementById('bostad');
        this.bostaddetalj = document.getElementById('bostaddetaljer');
        this.FAQContainer = document.getElementById('accordion');
        this.karusell = document.getElementById('bostadCarousel');
        this.tjansterContainer = document.getElementById('tjanster-accordion');

        this.initEventListeners();
    }
    // visar bostäder i Cards
    displayBostader(Bostader) {
        //skapar kort med hjälp av arrowfunktion för varje bostad med titel, bild, pris, kort beskrivning och knapp för mer info
        const cards = Bostader.map(bostad => 
            // view-button class och data-id för att tooltip ska fungera
            `
                <div class="card m-2 col-md-12 view-button bg-dark text-white" style="width: 18rem;" data-id="3">
                    <h5 class="card-title m-1">${bostad.titel}</h5>
                    <img src="${bostad.bild}" class="rounded mx-1" style="width: 16rem; height: 10rem; ">
                    <p class="mb-1 mt-1"><strong>${bostad.pris} SEK</strong></p>
                    <p class="mb-1">${bostad.kbeskrivning}</p>
                    <button class="btn till-bostad m-2 bg-primary text-bg-secondary" data-id="${bostad.id}">Till bostad</button>
                </div>`).join('');

        // https://www.w3schools.com/bootstrap5/bootstrap_grid_basic.php
        this.container.innerHTML = `<div class="row justify-content-center d-flex">${cards}</div>`;
    }
    // visar FAQ med Accordion
    displayFAQ(faq) {
        // börjar med att tömma
        let FAQCard = '';
        // använder item och index för att matcha fråga och svar i accordion
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
        // lägger till i HTML
        this.FAQContainer.innerHTML = FAQCard;
    }
    // vår egna userstory som visar tjänster med Accordion
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
    // visar karusell med bostäder
    displayKarusell(bostader) {
        // matchar id från HTML
        const carouselInner = document.getElementById('carousel-inner');
        try {
            // arrowfunktion för varje bostad i karusellen
            bostader.forEach((bostader, index) => {
                // skapar div element
                const carouselbostad = document.createElement('div');
                // sätter className för att den första ska vara active
                carouselbostad.className = `carousel-item ${index === 0 ? 'active' : ''}`;
                const karuselldiv = document.createElement('div');
                // väljer d-flex för att centrera
                karuselldiv.className = 'd-flex justify-content-center';
                // lägger in HTML
                karuselldiv.innerHTML = `
                    <div class="bg-dark text-white card m-3 view-button" style="width: 50rem;" data-id="3">
                        <img src="${bostader.bild}"
                            class="card-img-top rounded-circle w-50 mx-auto mt-5 mb-4" 
                            alt="${bostader.titel || 'Inget namn'}">
                        <div class="card-body text-center">
                            <h5 class="card-title">${bostader.titel || ''}</h5>
                            <p class="text-white">${bostader.beskrivning || 'Ingen beskrivning'}</p>
                            <button class="btn till-bostad m-2 bg-primary text-bg-secondary mb-4" data-id="${bostader.id}">Till bostad</button>
                        </div>
                    </div>
                `;
                // appendar till karusell
                carouselbostad.appendChild(karuselldiv);
                carouselInner.appendChild(carouselbostad);
            });
        } catch (error) {
            console.error('Fel vid hämtning av bostadsdetaljer:', error);
        }
    }

    // eventlyssnare för knappar både i karusell och bostadskort
    initEventListeners() {
        // om man är på rätt sida så körs eventlyssnaren
        if (this.container) {
            // letar efter click på knapp med närmsta btn class
            this.container.addEventListener('click', e => {
                const button = e.target.closest('.btn');
                const id = parseInt(button?.dataset.id);
                // skickar ut ett custom event med id
                document.dispatchEvent(new CustomEvent("openModal", { detail: { id } }));
            });
        }
        // Vår egen userstory att ha eventlyssnare i karusell också
        if (this.karusell) {
            this.karusell.addEventListener('click', e => {
                const button = e.target.closest('.btn');
                const id = parseInt(button?.dataset.id);
                document.dispatchEvent(new CustomEvent("openModal", { detail: { id } }));
            });
        }
    }
    // öppnar modal med detaljerad info om bostad
    openModal(infobostad) {
        // skapar HTML för modal
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
        // lägger in HTML
        this.bostaddetalj.innerHTML = modalContent;
        // gör och visar modal
        const modal = new bootstrap.Modal(document.getElementById('bostadModal'));
        modal.show();
    }
    // visar tooltip
    displayTooltip(tooltips) {
    // matchar alla knappar med class view-button
    const viewButtons = document.querySelectorAll('.view-button');
    // loopar igenom knapparna och matchar jsondatan med data-id som finns i HTML
    viewButtons.forEach(button => {
        const tooltipId = parseInt(button.dataset.id);
        const tooltipData = tooltips.find(t => t.id === tooltipId);
        // skapar tooltip och visar innehåll
        new bootstrap.Tooltip(button, {
            trigger: 'hover',
            html: true,
            title: `<p>${tooltipData.innehall}</p>`
        });
    });
    }
}