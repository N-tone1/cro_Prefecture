// Podaci o hrvatskim pozivnim brojevima
let data = [
    { id: 1, poz_br: "01", city: "Zagreb", prefecture_name: "Grad Zagreb" },
    { id: 2, poz_br: "020", city: "Dubrovnik", prefecture_name: "Dubrovačko-neretvanska" },
    { id: 3, poz_br: "021", city: "Split", prefecture_name: "Splitsko-dalmatinska" },
    { id: 4, poz_br: "022", city: "Šibenik", prefecture_name: "Šibensko-kninska" },
    { id: 5, poz_br: "023", city: "Zadar", prefecture_name: "Zadarska" },
    { id: 6, poz_br: "031", city: "Osijek", prefecture_name: "Osječko-baranjska" },
    { id: 7, poz_br: "032", city: "Vinkovci", prefecture_name: "Vukovarsko-srijemska" },
    { id: 8, poz_br: "033", city: "Virovitica", prefecture_name: "Virovitičko-podravska" },
    { id: 9, poz_br: "034", city: "Požega", prefecture_name: "Požeško-slavonska" },
    { id: 10, poz_br: "035", city: "Slavonski Brod", prefecture_name: "Brodsko-posavska" },
    { id: 11, poz_br: "040", city: "Čakovec", prefecture_name: "Međimurska" },
    { id: 12, poz_br: "042", city: "Varaždin", prefecture_name: "Varaždinska" },
    { id: 13, poz_br: "043", city: "Bjelovar", prefecture_name: "Bjelovarsko-bilogorska" },
    { id: 14, poz_br: "044", city: "Sisak", prefecture_name: "Sisačko-moslavačka" },
    { id: 15, poz_br: "047", city: "Karlovac", prefecture_name: "Karlovačka" },
    { id: 16, poz_br: "048", city: "Koprivnica", prefecture_name: "Koprivničko-križevačka" },
    { id: 17, poz_br: "049", city: "Krapina", prefecture_name: "Krapinsko-zagorska" },
    { id: 18, poz_br: "051", city: "Rijeka", prefecture_name: "Primorsko-goranska" },
    { id: 19, poz_br: "052", city: "Pula", prefecture_name: "Istarska" },
    { id: 20, poz_br: "053", city: "Gospić", prefecture_name: "Ličko-senjska" }
];

let sortState = { city: "original", prefecture_name: "original" }; // Praćenje sortiranja po kolonama
let originalData = [...data]; // Kopija originalnog niza za reset

function populatePrefectureDropdown() {
    const dropdown = document.getElementById("filterPrefecture");
    const uniquePrefectures = [...new Set(data.map(item => item.prefecture_name))]; // Dohvati jedinstvene županije

    uniquePrefectures.forEach(pref => {
        const option = document.createElement("option");
        option.value = pref;
        option.textContent = pref;
        dropdown.appendChild(option);
    });
}



// Funkcija za popunjavanje tablice
function populateTable(filteredData = data) {
    const tableBody = document.getElementById("tableBody");
    tableBody.innerHTML = ""; // Reset tablice

        filteredData.forEach((row, index) => {
            const tr = document.createElement("tr");
            tr.innerHTML = `
                <td>${row.id}</td>
                <td>${row.poz_br}</td>
                <td>${row.city}</td>
                <td>${row.prefecture_name}</td>
                <td>
                    <button onclick="editEntry(${index})">✏️</button>
                    <button onclick="deleteEntry(${index})">🗑️</button>
                </td>
            `;
            tableBody.appendChild(tr);
        });
    }

// Funkcija za sortiranje
function sortTable(column,elementId) {
    const columnHeader = document.getElementById(elementId);
    const arrowSpan = columnHeader.querySelector("span");


    if (sortState[column] === "original") {
        sortState[column] = "asc";
        data.sort((a, b) => a[column].localeCompare(b[column])); // A-Z
        arrowSpan.textContent = "⬆️"; // Strelica gore (A-Z)
    } else if (sortState[column] === "asc") {
        sortState[column] = "desc";
        data.sort((a, b) => b[column].localeCompare(a[column])); // Z-A
        arrowSpan.textContent = "⬇️"; // Strelica dolje (Z-A)
        
    } else {
        sortState[column] = "original";
        data=[...originalData]; // Reset na originalni niz
        arrowSpan.textContent = "⬍"; // Strelica neutral
    }
    populateTable(data);
}

// Funkcija za pretragu po gradu
function filterTable() {
    const searchValue = document.getElementById("search").value.toLowerCase();
    console.log("Traženi pojam:", searchValue); // Prati što korisnik upisuje

    const filteredData = data.filter(item => item.city.toLowerCase().includes(searchValue) ||
    item.poz_br.includes(searchValue) || 
    item.prefecture_name.toLowerCase().includes(searchValue) );
    console.log("Filtrirani podaci:", filteredData); // Prati filtrirane rezultate

    populateTable(filteredData);
}

function filterByPrefecture() {
    const selectedPrefecture = document.getElementById("filterPrefecture").value;

    if (selectedPrefecture) {
        const filteredData = data.filter(item => item.prefecture_name === selectedPrefecture);
        populateTable(filteredData);
    } else {
        populateTable(data); // Ako je "Sve županije", prikaži cijelu tablicu
    }
}


// Poziv početnog punjenja tablice
populateTable();
populatePrefectureDropdown();


document.getElementById("sortCity").addEventListener("click", () => sortTable("city", "sortCity"));
document.getElementById("sortPrefecture").addEventListener("click", () => sortTable("prefecture_name", "sortPrefecture"));

//dodatni zadatak funkcije za editiranje i brisanje

function addEntry() {
    const id = document.getElementById("newId").value.trim();
    const poz_br = document.getElementById("newPozivniBroj").value.trim();
    const city = document.getElementById("newGrad").value.trim();
    const prefecture_name = document.getElementById("newZupanija").value.trim();

    if (id && poz_br && city && prefecture_name) {
        data.push({ id, poz_br, city, prefecture_name });
        populateTable(); // osvježavanje tablice

        // Resetiranje input polja nakon dodavanja
        document.getElementById("newId").value = "";
        document.getElementById("newPozivniBroj").value = "";
        document.getElementById("newGrad").value = "";
        document.getElementById("newZupanija").value = "";

    } else {
        alert("Molimo unesite sve podatke.");
    }
}



//fukncija za uređivanje unosa

function editEntry(index) {
    const tableBody = document.getElementById("tableBody");
    const row = tableBody.rows[index]; // Dohvati red koji želimo mijenjati

    // Dohvati trenutne vrijednosti
    let id = row.cells[0].textContent;
    let pozBr = row.cells[1].textContent;
    let city = row.cells[2].textContent;
    let prefecture = row.cells[3].textContent;

    // Zamijeni sadržaj ćelija s input poljima
    row.innerHTML = `
        <td>${id}</td>
        <td><input type="text" value="${pozBr}" id="editPozBr${index}"></td>
        <td><input type="text" value="${city}" id="editCity${index}"></td>
        <td><input type="text" value="${prefecture}" id="editPref${index}"></td>
        <td>
            <button onclick="saveEdit(${index})">💾 Spremi</button>
            <button onclick="cancelEdit(${index}, '${pozBr}', '${city}', '${prefecture}')">❌ Odustani</button>
        </td>
    `;
}

function saveEdit(index) {
    const editedPozBr = document.getElementById(`editPozBr${index}`).value;
    const editedCity = document.getElementById(`editCity${index}`).value;
    const editedPref = document.getElementById(`editPref${index}`).value;

    // Ažuriraj podatke u nizu `data`
    data[index].poz_br = editedPozBr;
    data[index].city = editedCity;
    data[index].prefecture_name = editedPref;

    // Ponovno iscrtaj tablicu
    populateTable();
}

function cancelEdit(index, oldPozBr, oldCity, oldPref) {
    const tableBody = document.getElementById("tableBody");
    const row = tableBody.rows[index];

    row.innerHTML = `
        <td>${data[index].id}</td>
        <td>${oldPozBr}</td>
        <td>${oldCity}</td>
        <td>${oldPref}</td>
        <td>
            <button onclick="editEntry(${index})">✏️</button>
            <button onclick="deleteEntry(${index})">🗑️</button>
        </td>
    `;
}



// Funkcija koja ažurira postojeći unos/*
function updateEntry(index) {
    data[index] = {
        id: document.getElementById("newId").value.trim(),
        poz_br: document.getElementById("newPozivniBroj").value.trim(),
        city: document.getElementById("newGrad").value.trim(),
        prefecture_name: document.getElementById("newZupanija").value.trim()
    };

    populateTable();

    // Resetiranje gumba "Spremi" natrag na "Dodaj"
    const addButton = document.querySelector(".controls button");
    addButton.textContent = "Dodaj";
    addButton.onclick = addEntry;

    // Resetiraj input polja
    document.getElementById("newId").value = "";
    document.getElementById("newPozivniBroj").value = "";
    document.getElementById("newGrad").value = "";
    document.getElementById("newZupanija").value = "";
}

//funkcija za brisanje unosa 

function deleteEntry(index) {
    if (confirm("Jeste li sigurni da želite obrisati ovaj unos?")) {
        data.splice(index, 1); // Briše unos iz niza
        populateTable(); // Ažurira tablicu
    }
}




