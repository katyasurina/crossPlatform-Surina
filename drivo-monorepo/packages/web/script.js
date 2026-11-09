import { DrivoService } from '@drivo/core';
import { LocalStorageAdapter } from './localStorageAdapter.js';

const adapter = new LocalStorageAdapter();
const service = new DrivoService(adapter);

let currentRole = null;
let globalCars = [];
let globalOrders = [];
let selectedCarId = null;

window.addEventListener('DOMContentLoaded', async () => {
    await loadData();

    document.getElementById('btn-login-manager').addEventListener('click', () => loginAs('manager'));
    document.getElementById('btn-login-client').addEventListener('click', () => loginAs('client'));
    document.getElementById('btn-logout-manager').addEventListener('click', logout);
    document.getElementById('btn-logout-client').addEventListener('click', logout);
    document.getElementById('btn-add-car').addEventListener('click', addCar);
    document.getElementById('btn-modal-cancel').addEventListener('click', closeModal);
    document.getElementById('btn-modal-confirm').addEventListener('click', confirmPurchase);
});

async function loadData() {
    const data = await service.getData();
    globalCars = data.cars || [];
    globalOrders = data.orders || [];
}

function loginAs(role) {
    currentRole = role;
    document.querySelectorAll('.screen').forEach(s => s.classList.remove('active'));
    if (role === 'manager') {
        document.getElementById('manager-screen').classList.add('active');
        renderManagerView();
    } else if (role === 'client') {
        document.getElementById('client-screen').classList.add('active');
        renderClientView();
    }
}

function logout() {
    currentRole = null;
    document.querySelectorAll('.screen').forEach(s => s.classList.remove('active'));
    document.getElementById('login-screen').classList.add('active');
}

async function addCar() {
    const brand = document.getElementById('carBrand').value;
    const price = document.getElementById('carPrice').value;
    const year = document.getElementById('carYear').value;
    const msg = document.getElementById('manager-msg');

    const result = await service.addCar(brand, price, year);

    if (!result.ok) {
        msg.textContent = result.error;
        msg.className = 'message error';
        return;
    }

    document.getElementById('carBrand').value = '';
    document.getElementById('carPrice').value = '';
    document.getElementById('carYear').value = '';

    await loadData();
    msg.textContent = 'Авто успішно додано!';
    msg.className = 'message success';
    setTimeout(() => msg.textContent = '', 3000);
    renderManagerView();
}

async function deleteCar(id) {
    await service.deleteCar(id);
    await loadData();
    renderManagerView();
}

async function toggleStatus(orderId) {
    await service.toggleStatus(orderId);
    await loadData();
    renderManagerView();
}

function renderManagerView() {
    const carsList = document.getElementById('manager-cars-list');
    document.getElementById('manager-cars-count').textContent = globalCars.length;

    carsList.innerHTML = '';
    globalCars.forEach(car => {
        const card = document.createElement('div');
        card.className = 'car-card';
        card.innerHTML = `
            <div>
                <h4>${car.brand}</h4>
                <p>${car.year} рік</p>
                <div class="price">${car.price} $</div>
            </div>
        `;
        const btn = document.createElement('button');
        btn.className = 'btn-logout';
        btn.textContent = 'Видалити';
        btn.addEventListener('click', () => deleteCar(car.id));
        card.appendChild(btn);
        carsList.appendChild(card);
    });

    const ordersList = document.getElementById('manager-orders-list');
    document.getElementById('manager-orders-count').textContent = globalOrders.length;

    if (globalOrders.length === 0) {
        ordersList.innerHTML = '<p style="color:#94A3B8; font-style:italic;">Замовлень поки немає</p>';
        return;
    }

    ordersList.innerHTML = '';
    globalOrders.forEach(order => {
        const item = document.createElement('div');
        item.className = 'order-item';
        item.innerHTML = `
            <div class="order-info">
                <h4>${order.carBrand}</h4>
                <p>Клієнт: ${order.client}</p>
                <p>Сума: ${order.price} $</p>
            </div>
        `;
        const badge = document.createElement('div');
        badge.className = `badge ${order.status === 'Нове' ? 'badge-new' : 'badge-done'}`;
        badge.textContent = order.status;
        badge.style.cursor = 'pointer';
        badge.addEventListener('click', () => toggleStatus(order.id));
        item.appendChild(badge);
        ordersList.appendChild(item);
    });
}

function renderClientView() {
    const carsList = document.getElementById('client-cars-list');
    carsList.innerHTML = '';

    if (globalCars.length === 0) {
        carsList.innerHTML = '<p style="color:#94A3B8; font-style:italic;">Всі авто розкуплені!</p>';
    } else {
        globalCars.forEach(car => {
            const card = document.createElement('div');
            card.className = 'car-card';
            card.innerHTML = `
                <div>
                    <h4>${car.brand}</h4>
                    <p>${car.year} рік</p>
                    <div class="price">${car.price} $</div>
                </div>
            `;
            const btn = document.createElement('button');
            btn.className = 'btn-primary';
            btn.textContent = 'Купити';
            btn.addEventListener('click', () => openModal(car.id, car.brand));
            card.appendChild(btn);
            carsList.appendChild(card);
        });
    }

    const ordersList = document.getElementById('client-orders-list');
    document.getElementById('client-orders-count').textContent = globalOrders.length;

    if (globalOrders.length === 0) {
        ordersList.innerHTML = '<p style="color:#94A3B8; font-style:italic;">У вас ще немає замовлень</p>';
        return;
    }

    ordersList.innerHTML = '';
    globalOrders.forEach(order => {
        const item = document.createElement('div');
        item.className = 'order-item';
        item.innerHTML = `
            <div class="order-info">
                <h4>${order.carBrand}</h4>
                <p>ПІБ: ${order.client}</p>
                <p>Статус: ${order.status}</p>
            </div>
        `;
        ordersList.appendChild(item);
    });
}

function openModal(carId, carBrand) {
    selectedCarId = carId;
    document.getElementById('modal-car-name').textContent = `Ви купуєте: ${carBrand}`;
    document.getElementById('modal-client-name').value = '';
    document.getElementById('buy-modal').classList.add('active');
}

function closeModal() {
    document.getElementById('buy-modal').classList.remove('active');
    selectedCarId = null;
}

async function confirmPurchase() {
    const clientName = document.getElementById('modal-client-name').value;
    const result = await service.buyCar(selectedCarId, clientName);

    if (!result.ok) {
        alert(result.error);
        return;
    }

    closeModal();
    await loadData();
    alert('Замовлення успішно оформлено!');
    renderClientView();
}