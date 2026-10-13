import { useState } from "react";

const EMPTY = {
    carId: "",
    name: "",
    phone: "",
    payment: "Готівка",
};

const inputClass =
    "w-full rounded-xl border border-neutral-800 bg-neutral-800 px-4 py-3 text-base text-neutral-100 placeholder-neutral-500 outline-none transition focus:border-lime-400 focus:ring-1 focus:ring-lime-400";

export default function OrderForm({ cars, onOrder }) {
    const [form, setForm] = useState(EMPTY);
    const [open, setOpen] = useState(false);

    const availableCars = cars.filter((c) => !c.sold);

    const handleChange = (e) => {
        const { name, value } = e.target;
        setForm((prev) => ({ ...prev, [name]: value }));
    };

    const handleSubmit = (e) => {
        e.preventDefault();
        if (onOrder(form)) {
            setForm(EMPTY);
            setOpen(false);
        }
    };

    if (availableCars.length === 0) {
        return (
            <div className="mb-6 rounded-2xl border border-neutral-800 bg-neutral-900 p-5 text-center text-sm text-neutral-500">
                Немає доступних автомобілів для замовлення.
            </div>
        );
    }

    if (!open) {
        return (
            <button
                onClick={() => setOpen(true)}
                className="mb-6 w-full cursor-pointer rounded-2xl bg-lime-400 px-6 py-4 text-base font-semibold text-neutral-950 transition hover:bg-lime-300 md:w-auto"
            >
                🛒 Оформити замовлення
            </button>
        );
    }

    return (
        <form
            onSubmit={handleSubmit}
            className="mb-6 rounded-2xl border border-neutral-800 bg-neutral-900 p-5"
        >
            <div className="mb-4 flex items-center justify-between">
                <h2 className="text-lg font-semibold text-neutral-100">
                    Нове замовлення
                </h2>
                <button
                    type="button"
                    onClick={() => setOpen(false)}
                    className="cursor-pointer text-sm text-neutral-500 hover:text-neutral-300"
                >
                    Скасувати
                </button>
            </div>

            <div className="mb-4 grid grid-cols-1 gap-4 md:grid-cols-2">
                {/* ВИПАДАЮЧИЙ СПИСОК АВТО */}
                <div className="md:col-span-2">
                    <label className="mb-2 block text-xs font-medium text-neutral-400">
                        Оберіть автомобіль
                    </label>
                    <select
                        name="carId"
                        value={form.carId}
                        onChange={handleChange}
                        className={`${inputClass} cursor-pointer`}
                    >
                        <option value="">— Оберіть з каталогу —</option>
                        {availableCars.map((car) => (
                            <option key={car.id} value={car.id}>
                                {car.brand} · {car.year} ·{" "}
                                {Number(car.price).toLocaleString("uk-UA")} $
                            </option>
                        ))}
                    </select>
                </div>

                <div>
                    <label className="mb-2 block text-xs font-medium text-neutral-400">
                        ПІБ
                    </label>
                    <input
                        name="name"
                        value={form.name}
                        onChange={handleChange}
                        placeholder="Шевченко Іван Петрович"
                        className={inputClass}
                    />
                </div>

                <div>
                    <label className="mb-2 block text-xs font-medium text-neutral-400">
                        Телефон
                    </label>
                    <input
                        name="phone"
                        value={form.phone}
                        onChange={handleChange}
                        placeholder="+380 67 123 45 67"
                        className={inputClass}
                    />
                </div>

                <div className="md:col-span-2">
                    <label className="mb-2 block text-xs font-medium text-neutral-400">
                        Спосіб оплати
                    </label>
                    <div className="grid grid-cols-1 gap-3 sm:grid-cols-3">
                        {["Готівка", "Картка", "Кредит"].map((method) => (
                            <label
                                key={method}
                                className={`cursor-pointer rounded-xl border px-4 py-3 text-center text-sm font-medium transition ${
                                    form.payment === method
                                        ? "border-lime-400 bg-lime-400/10 text-lime-400"
                                        : "border-neutral-800 bg-neutral-800 text-neutral-400 hover:border-neutral-700"
                                }`}
                            >
                                <input
                                    type="radio"
                                    name="payment"
                                    value={method}
                                    checked={form.payment === method}
                                    onChange={handleChange}
                                    className="hidden"
                                />
                                {method}
                            </label>
                        ))}
                    </div>
                </div>
            </div>

            <button
                type="submit"
                className="w-full cursor-pointer rounded-xl bg-lime-400 px-6 py-3 text-base font-semibold text-neutral-950 transition hover:bg-lime-300 md:w-auto"
            >
                Підтвердити замовлення
            </button>
        </form>
    );
}