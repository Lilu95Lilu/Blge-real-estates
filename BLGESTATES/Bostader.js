// Hämtar bostadsdata från JSON-filen
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

    const cards = Bostader.map(bostad => `
        <div class="row">
            <div class="container-md col card mb-4" style="width: 18rem;">
                <h5 class="card-title">${bostad.titel}</h5>
                <img src="${bostad.bild}" class="card-img-top">
            </div>
        </div>`).join('');

    div.innerHTML = cards;
}

hamtaBostader();