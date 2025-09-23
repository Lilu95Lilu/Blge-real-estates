class Personal {
    constructor(id, namn, epost, roll) {
        this.id = id;
        this.namn = namn;
        this.epost = epost;
        this.roll = roll;
    }
}
////========Model===============
class CrudPersonal {
    constructor() {
        //Hämta person data från localStorage eller om det inte finns fyll this.lista med en array bestående av dessa två personer.
        this.lista = this.hamtaFranLocalStorage() || [
            new Personal(1, "Stina Larsson", "stina@du.se", "Chef"),
            new Personal(2, "Anna Nilsson", "anna@du.se", "HR-partner")
        ];
        this.sparaTillLocalStorage();
    }

    hamtaFranLocalStorage() {
        //hämtar json strängen för localStorage:en som heter personalLista 
        const data = localStorage.getItem("personalLista");
        if (data) {
            //konverterar en hela json sträng till ett objekt            
            const json = JSON.parse(data);            
            //för varje person i json gör jag om, eller mappar om varje json objekt till ett Person objekt ur klassen Person
            //och lägger det in en ny array som returneras.
            return json.map(person => new Personal(person.id, person.namn, person.epost, person.roll));
        }
        return null;
    }

    sparaTillLocalStorage() {
        //stringify gör om arrayen med Person objekt i till en json sträng
        localStorage.setItem("personalLista", JSON.stringify(this.lista));
    }

    allPersonal() {
        return this.lista;
    }

    laggTill(person) {
        this.lista.push(person);
        this.sparaTillLocalStorage();
    }

    taBort(id) {        
        //filter skapar en ny array med element som uppfyller villkoret. 
        //Den filterar ut eller behåller alla personer vars id inte är lika med det id som ska tas bort." 
        this.lista = this.lista.filter(person => person.id !== id);
        this.sparaTillLocalStorage();
    }

    hitta(id) {
        return this.lista.find(person => person.id === id);
    }

    uppdatera(id, data) {
        const person = this.hitta(id);
        if (person) {
            /*
            target: Det objekt du vill uppdatera (i detta fall: person).
            source: Ett objekt med nya värden (i detta fall: data).
            Det kopierar alla egenskaper från source till target. Om egenskaperna redan finns i target, skrivs de över.
            */
            Object.assign(person, data);
            this.sparaTillLocalStorage();
        }
    }
}

///=====View====================
class PersonalView {
    constructor() {
        this.container = document.getElementById("personalLista");//div där alla personalkort ska ligga
        //inintierar events som dispatchar olika customenvets med data som controllern kan lyssna på
        this.initEventListeners();
    }

    render(personalLista) {
        //skapar en array av personalkort
        //genom att för varje person skapa ett nytt element som består av html och css cklasser från boostarp med
        // personl data i. 
        const personalKort=personalLista.map(person => `
            <!--sätter detta data-id så vi kan häamt ut för att ta bort och updater in peronl på detta id-->
            <div class="card m-1 p-3" data-id="${person.id}">
                <h5>${person.namn} (${person.id})</h5>
                <p>${person.epost}</p>
                <p>${person.roll}</p>
                <button class="btn btn-danger ta-bort">Ta bort</button>
                <button class="btn btn-primary uppdatera" data-bs-toggle="modal" data-bs-target="#modalUppdateraPersonal">Ändra</button>
            </div>
        `);
        this.container.innerHTML = personalKort.join("");//gör så vi får en lång strång av varje element i arrayen
    }
    //data kommer från vi kontrollern och modellen så att vy kan rendar innehållet i modeln
    fyllUppdateraModal(person) {
        document.getElementById("uppdateraId").value = person.id;
        document.getElementById("uppdateraNamn").value = person.namn;
        document.getElementById("uppdateraEpost").value = person.epost;
        document.getElementById("uppdateraRoll").value = person.roll;
    }

    initEventListeners() {
        document.getElementById("addForm").addEventListener("submit", e => {
            e.preventDefault();//hindra formulärets default submit dvs att skicka/submitta till webserver och backend för processing av formulärs data.
            //hämta in data från addformuläret
            const id = parseInt(document.getElementById("id").value);
            const namn = document.getElementById("namn").value.trim();
            const epost = document.getElementById("epost").value.trim();
            const roll = document.getElementById("roll").value.trim();
            //skapar och dispatchar ett eget customenvet med datom om ny personal som controller lyssnar på och hämtar ut dess detail data
            //för att kunna skic det vidare till modellen för att lägg till den nya personen.
            document.dispatchEvent(new CustomEvent("laggTillPersonal", {
                detail: { id, namn, epost, roll }
            }));

            e.target.reset();//resetar submit
            bootstrap.Modal.getInstance(document.getElementById("modalLaggTillPersonal")).hide();
        });

        document.getElementById("uppdateraForm").addEventListener("submit", e => {
            e.preventDefault();
            //häamt in från updater modalen
            const id = parseInt(document.getElementById("uppdateraId").value);
            const namn = document.getElementById("uppdateraNamn").value.trim();
            const epost = document.getElementById("uppdateraEpost").value.trim();
            const roll = document.getElementById("uppdateraRoll").value.trim();

            document.dispatchEvent(new CustomEvent("uppdateraPersonal", {
                detail: { id, namn, epost, roll }
            }));

            e.target.reset();
            bootstrap.Modal.getInstance(document.getElementById("modalUppdateraPersonal")).hide();
        });
        //skapar klick händelse på div som det ligger personalkort i
        this.container.addEventListener("click", e => {
           // Hitta det kort (div med class "card") som användaren klickade på
            const card = e.target.closest(".card");
            
            // Hämta id från kortets data-attribut (t.ex. data-id="2")
            // `?.` betyder "om card finns, hämta dataset.id", annars gör inget (skydd mot fel)
            const id = parseInt(card?.dataset.id);
            
            // Kontrollera om det klickade elementet har klassen "ta-bort"
            // Det betyder att användaren klickade på "Ta bort"-knappen
            if (e.target.classList.contains("ta-bort")) {                
                //Skapa och skicka ett eget event ("taBortPersonal") med id som data
                // Controller kommer lyssna på detta event och ta bort personen
                document.dispatchEvent(new CustomEvent("taBortPersonal", { detail: { id } }));
            }
           
            // Kontrollera om det klickade elementet har klassen "uppdatera"
            // Det betyder att användaren klickade på "Ändra"-knappen
            if (e.target.classList.contains("uppdatera")) {
               
                // Skapa och skicka ett eget event ("visaUppdateraModal") med id som data
                // Controller kommer lyssna på detta event och fylla modalen med rätt persondat
                document.dispatchEvent(new CustomEvent("visaUppdateraModal", { detail: { id } }));
            }
        });
    }
}
///=========Controller============
class PersonalController {
    constructor(model, view) {
        this.model = model;
        this.view = view;

        this.initCustomEventListeners();
        this.view.render(this.model.allPersonal());
    }

    initCustomEventListeners() {
        document.addEventListener("laggTillPersonal", e => {
            const { id, namn, epost, roll } = e.detail;
            this.model.laggTill(new Personal(id, namn, epost, roll));
            this.view.render(this.model.allPersonal());
        });

        document.addEventListener("taBortPersonal", e => {
            this.model.taBort(e.detail.id);
            this.view.render(this.model.allPersonal());
        });

        document.addEventListener("uppdateraPersonal", e => {
            //hämtar ut detail data från customeventet för den person som ska uppdateras
            const { id, namn, epost, roll } = e.detail;
            this.model.uppdatera(id, { namn, epost, roll });
            this.view.render(this.model.allPersonal());
        });

        document.addEventListener("visaUppdateraModal", e => {
            //hämtar ut detail data från customeventet för den person som ska uppdateras
            //för att fyll modalen med det nuvarande data om person som ska uppdaeras
            // innan uppdatering görs se koden för customeventet uppdateraPersonal ovan
            const person = this.model.hitta(e.detail.id);
            if (person){
                this.view.fyllUppdateraModal(person);
            } 
        });
    }
}

//initierar MVC
document.addEventListener("DOMContentLoaded", () => {
    const model = new CrudPersonal();
    const view = new PersonalView();
    //kontrollern måste ha tillgång till både vyn och modellen
    const controller = new PersonalController(model, view);
});


