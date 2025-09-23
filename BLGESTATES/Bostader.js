// Hämtar bostadsdata från JSON-filen
document.addEventListener('DOMContentLoaded', hamtaBostader);
    async function hamtaBostader() {
    try {   
            const response = await fetch('Bostader.json');
            if (!response.ok) {
                throw new Error('Nätverksfel' + response.status);
            }
            // Omvandla svaret till JSON
            const data = await response.json();

            displayBostader(data.Bostader);
        } catch (error) {
            console.error('Fel vid hämtning av bostäder:', error);
        }
        
    }

    function displayBostader(Bostader) {
        const div = document.getElementById('bostad');
        const tablebody = document.querySelector('#bostad tbody');
        const cards = Bostader.map(bostad => `
            <div class="row">
                <div class="container-md col card mb-4" style="width: 18rem;">
                    <h5 class="card-title">${bostad.titel}</h5>
                    <img src="${bostad.bild}" class="card-img-top">
                    <button class= btn till-bostad>Till bostad</button>
                </div>
            </div>`).join('');

        div.innerHTML = cards;
        tablebody.appendChild(div);
    }

    document.querySelectorAll('.till-bostad').forEach(button => {

        button.addEventListener('click', async function () {
            const infobostad = this.getattribute('data-bostad');
            openModal(infobostad);
        });
    });

    function openModal(infobostad) {
        const bostaddetalj = document.getElementById('bostaddetaljer');
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

        bostaddetalj.innerHTML = modalContent;

        const modal = new bootstrap.Modal(document.getElementById('bostadModal'));
        modal.show();
        
    }

