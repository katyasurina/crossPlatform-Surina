const carDatabase = {
    "Mercedes-Benz": [
        "A-Class", "C-Class", "E-Class", "S-Class",
        "CLA", "CLS", "GLA", "GLC", "GLE", "G-Class"
    ],
    "BMW": [
        "1 Series", "2 Series", "3 Series", "4 Series",
        "5 Series", "7 Series", "X1", "X3", "X5", "X7"
    ],
    "Audi": [
        "A1", "A3", "A4", "A5",
        "A6", "A7", "A8", "Q3", "Q5", "Q7"
    ],
    "Toyota": [
        "Corolla", "Camry", "Avalon", "Prius",
        "C-HR", "RAV4", "Highlander", "Land Cruiser",
        "Supra", "Yaris"
    ],
    "Porsche": [
        "718 Cayman", "718 Boxster", "911 Carrera", "911 Turbo",
        "Panamera", "Macan", "Cayenne", "Taycan",
        "918 Spyder", "Carrera GT"
    ],
    "Tesla": [
        "Model 3", "Model S", "Model X", "Model Y",
        "Cybertruck", "Roadster", "Semi",
        "Model 3 Long Range", "Model S Plaid", "Model X Plaid"
    ]
};


const form = document.getElementById('testDriveForm');
const recordsList = document.getElementById('recordsList');
const brandSelect = document.getElementById('brand');
const modelSelect = document.getElementById('model');
const dateInput = document.getElementById('date');


Object.keys(carDatabase).forEach(brand => {
    const option = document.createElement('option');
    option.value = brand;
    option.textContent = brand;
    brandSelect.appendChild(option);
});


brandSelect.addEventListener('change', () => {
    const brand = brandSelect.value;

    modelSelect.innerHTML = '';

    if (!brand) {
        modelSelect.disabled = true;
        modelSelect.innerHTML = '<option value="">— Спочатку оберіть бренд —</option>';
        return;
    }


    modelSelect.disabled = false;
    modelSelect.innerHTML = '<option value="">— Оберіть модель —</option>';


    carDatabase[brand].forEach(model => {
        const option = document.createElement('option');
        option.value = model;
        option.textContent = model;
        modelSelect.appendChild(option);
    });
});


const tomorrow = new Date();
tomorrow.setDate(tomorrow.getDate() + 1);
const tomorrowISO = tomorrow.toISOString().split('T')[0];
dateInput.value = tomorrowISO;
dateInput.min = new Date().toISOString().split('T')[0];


function formatDate(isoDate) {
    const d = new Date(isoDate);
    const day = String(d.getDate()).padStart(2, '0');
    const month = String(d.getMonth() + 1).padStart(2, '0');
    const year = d.getFullYear();
    return `${day}.${month}.${year}`;
}


function addRecord(name, phone, brand, model, date) {
    const empty = recordsList.querySelector('.records__empty');
    if (empty) empty.remove();

    const li = document.createElement('li');
    li.className = 'record';
    li.innerHTML = `
        <div class="record__info">
            <strong>${name}</strong>
            <span>${brand} ${model}</span>
            <span>${phone} · ${formatDate(date)}</span>
        </div>
        <button class="record__delete" type="button">Видалити</button>
    `;

    li.querySelector('.record__delete').addEventListener('click', () => {
        li.style.opacity = '0';
        li.style.transform = 'translateX(20px)';
        li.style.transition = 'all 0.3s ease';
        setTimeout(() => {
            li.remove();
            if (recordsList.children.length === 0) {
                recordsList.innerHTML = '<li class="records__empty">Записів поки немає</li>';
            }
        }, 300);
    });

    recordsList.appendChild(li);
}


form.addEventListener('submit', (e) => {
    e.preventDefault();

    const name = document.getElementById('name').value.trim();
    const phone = document.getElementById('phone').value.trim();
    const brand = brandSelect.value;
    const model = modelSelect.value;
    const date = dateInput.value;

    if (!name || !phone || !brand || !model || !date) {
        alert('Будь ласка, заповніть усі поля.');
        return;
    }

    addRecord(name, phone, brand, model, date);
    form.reset();


    modelSelect.disabled = true;
    modelSelect.innerHTML = '<option value="">— Спочатку оберіть бренд —</option>';
    dateInput.value = tomorrowISO;


    recordsList.scrollIntoView({
        behavior: 'smooth',
        block: 'center'
    });
});

console.log('AURUM Motors — застосунок завантажено.');