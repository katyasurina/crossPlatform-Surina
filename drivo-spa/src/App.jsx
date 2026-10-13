import { useEffect, useState } from "react";
import Header from "./components/Header.jsx";
import CarForm from "./components/CarForm.jsx";
import OrderForm from "./components/OrderForm.jsx";
import CarList from "./components/CarList.jsx";
import OrderList from "./components/OrderList.jsx";
import SearchBar from "./components/SearchBar.jsx";

const CARS_KEY = "drivo-cars";
const ORDERS_KEY = "drivo-orders";

function load(key) {
  try {
    const raw = localStorage.getItem(key);
    return raw ? JSON.parse(raw) : [];
  } catch {
    return [];
  }
}

export default function App() {
  const [role, setRole] = useState("admin"); // "admin" | "client"
  const [tab, setTab] = useState("catalog"); // "catalog" | "orders"
  const [cars, setCars] = useState(() => load(CARS_KEY));
  const [orders, setOrders] = useState(() => load(ORDERS_KEY));
  const [message, setMessage] = useState(null);
  const [query, setQuery] = useState("");

  // Зберігаємо в localStorage
  useEffect(() => {
    localStorage.setItem(CARS_KEY, JSON.stringify(cars));
  }, [cars]);

  useEffect(() => {
    localStorage.setItem(ORDERS_KEY, JSON.stringify(orders));
  }, [orders]);

  // При зміні ролі скидаємо вкладку на каталог
  useEffect(() => {
    setTab("catalog");
    setMessage(null);
  }, [role]);

  const fail = (text) => {
    setMessage({ text, type: "error" });
    return false;
  };

  // -------- ДІЇ АДМІНА --------
  const addCar = (form) => {
    if (!form.brand.trim()) return fail("Введіть марку та модель.");
    if (!form.price || Number(form.price) <= 0)
      return fail("Вкажіть коректну ціну.");
    if (!form.year) return fail("Вкажіть рік випуску.");
    if (!form.date) return fail("Вкажіть дату надходження.");

    const newCar = {
      id: Date.now(),
      brand: form.brand.trim(),
      price: Number(form.price),
      year: Number(form.year),
      category: form.category,
      date: form.date,
      image: form.image || "",
      sold: false,
    };
    setCars((prev) => [...prev, newCar]);
    setMessage({ text: "Автомобіль додано до каталогу.", type: "success" });
    return true;
  };

  const updateCar = (updated) => {
    setCars((prev) =>
        prev.map((c) => (c.id === updated.id ? { ...c, ...updated } : c))
    );
    setMessage({ text: "Зміни збережено.", type: "success" });
  };

  const toggleCar = (id) => {
    setCars((prev) =>
        prev.map((c) => (c.id === id ? { ...c, sold: !c.sold } : c))
    );
    setMessage({ text: "Статус автомобіля оновлено.", type: "success" });
  };

  const deleteCar = (id) => {
    setCars((prev) => prev.filter((c) => c.id !== id));
    setMessage({ text: "Автомобіль видалено з каталогу.", type: "success" });
  };

  // -------- ДІЇ ПОКУПЦЯ --------
  const addOrder = (form) => {
    if (!form.carId) return fail("Оберіть автомобіль зі списку.");
    if (!form.name.trim()) return fail("Введіть ПІБ.");
    if (!form.phone.trim()) return fail("Введіть телефон.");

    const newOrder = {
      id: Date.now(),
      carId: Number(form.carId),
      name: form.name.trim(),
      phone: form.phone.trim(),
      payment: form.payment,
      status: "Нове",
      date: new Date().toISOString().slice(0, 10),
    };
    setOrders((prev) => [...prev, newOrder]);

    // Позначаємо авто проданим
    setCars((prev) =>
        prev.map((c) => (c.id === Number(form.carId) ? { ...c, sold: true } : c))
    );

    setMessage({
      text: "Замовлення оформлено! Менеджер зв'яжеться з вами.",
      type: "success",
    });
    return true;
  };

  // -------- ПІДСУМКИ --------
  const soldCount = cars.filter((c) => c.sold).length;

  const q = query.trim().toLowerCase();
  const filteredCars = q
      ? cars.filter(
          (c) =>
              c.brand.toLowerCase().includes(q) ||
              c.category.toLowerCase().includes(q)
      )
      : cars;

  // -------- РЕНДЕР --------
  return (
      <div className="min-h-screen bg-neutral-950 px-4 py-6 text-neutral-100 md:px-8 md:py-10">
        <main className="mx-auto max-w-6xl">
          <Header
              role={role}
              onRoleChange={setRole}
              total={cars.length}
              sold={soldCount}
          />

          {/* Вкладки */}
          <div className="mb-6 flex w-fit items-center gap-1 rounded-full border border-neutral-800 bg-neutral-900/60 p-1.5 text-sm">
            <button
                onClick={() => setTab("catalog")}
                className={`cursor-pointer rounded-full px-4 py-1.5 font-medium transition ${
                    tab === "catalog"
                        ? "bg-lime-400 text-neutral-950"
                        : "text-neutral-400 hover:text-neutral-200"
                }`}
            >
              {role === "admin" ? "Каталог" : "Автомобілі"}
            </button>
            <button
                onClick={() => setTab("orders")}
                className={`cursor-pointer rounded-full px-4 py-1.5 font-medium transition ${
                    tab === "orders"
                        ? "bg-lime-400 text-neutral-950"
                        : "text-neutral-400 hover:text-neutral-200"
                }`}
            >
              {role === "admin" ? "Замовлення" : "Мої замовлення"}
              {orders.length > 0 && (
                  <span className="ml-2 rounded-full bg-neutral-800 px-2 py-0.5 text-xs">
                {orders.length}
              </span>
              )}
            </button>
          </div>

          {/* Каталог */}
          {tab === "catalog" && (
              <>
                {role === "admin" && <CarForm onAdd={addCar} />}
                {role === "client" && <OrderForm cars={cars} onOrder={addOrder} />}

                <SearchBar value={query} onChange={setQuery} />

                {message && (
                    <div
                        className={`mb-4 rounded-xl border px-4 py-3 text-sm font-medium ${
                            message.type === "error"
                                ? "border-rose-500/30 bg-rose-500/10 text-rose-400"
                                : "border-lime-400/30 bg-lime-400/10 text-lime-400"
                        }`}
                    >
                      {message.text}
                    </div>
                )}

                <CarList
                    cars={filteredCars}
                    role={role}
                    onToggle={toggleCar}
                    onDelete={deleteCar}
                    onEdit={updateCar}
                />
              </>
          )}

          {/* Замовлення */}
          {tab === "orders" && (
              <OrderList orders={orders} cars={cars} role={role} />
          )}
        </main>
      </div>
  );
}