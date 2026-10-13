import { useState } from "react";

const inputClass =
    "w-full rounded-lg border border-neutral-800 bg-neutral-800 px-3 py-2 text-sm text-neutral-100 outline-none focus:border-lime-400";

export default function CarItem({ car, role, onToggle, onDelete, onEdit }) {
    const [editing, setEditing] = useState(false);
    const [form, setForm] = useState(car);
    const sold = car.sold;

    const change = (e) => {
        const { name, value } = e.target;
        setForm((p) => ({ ...p, [name]: value }));
    };

    const save = () => {
        onEdit({
            ...form,
            brand: form.brand.trim(),
            price: Number(form.price),
            year: Number(form.year),
        });
        setEditing(false);
    };

    // === РЕЖИМ РЕДАГУВАННЯ ===
    if (editing) {
        return (
            <li className="rounded-2xl border border-lime-400/40 bg-neutral-900 p-4">
                <p className="mb-3 text-sm font-semibold text-lime-400">
                    ✏️ Редагування
                </p>

                <div className="mb-3 flex flex-col gap-2">
                    <input
                        name="brand"
                        value={form.brand}
                        onChange={change}
                        placeholder="Марка та модель"
                        className={inputClass}
                    />
                    <div className="grid grid-cols-2 gap-2">
                        <input
                            name="price"
                            type="number"
                            value={form.price}
                            onChange={change}
                            placeholder="Ціна, $"
                            className={inputClass}
                        />
                        <input
                            name="year"
                            type="number"
                            value={form.year}
                            onChange={change}
                            placeholder="Рік"
                            className={inputClass}
                        />
                    </div>
                    <select
                        name="category"
                        value={form.category}
                        onChange={change}
                        className={`${inputClass} cursor-pointer`}
                    >
                        <option>Седан</option>
                        <option>Позашляховик</option>
                        <option>Хетчбек</option>
                        <option>Електромобіль</option>
                        <option>Купе</option>
                    </select>
                    <input
                        name="date"
                        type="date"
                        value={form.date}
                        onChange={change}
                        className={`${inputClass} cursor-pointer`}
                    />
                </div>

                <div className="flex gap-2">
                    <button
                        onClick={save}
                        className="flex-1 cursor-pointer rounded-lg bg-lime-400 px-3 py-2 text-sm font-semibold text-neutral-950 hover:bg-lime-300"
                    >
                        ✓ Зберегти
                    </button>
                    <button
                        onClick={() => {
                            setForm(car);
                            setEditing(false);
                        }}
                        className="flex-1 cursor-pointer rounded-lg bg-neutral-800 px-3 py-2 text-sm text-neutral-300 hover:bg-neutral-700"
                    >
                        ✕ Скасувати
                    </button>
                </div>
            </li>
        );
    }

    // === ЗВИЧАЙНИЙ РЕЖИМ ===
    return (
        <li className="overflow-hidden rounded-2xl border border-neutral-800 bg-neutral-900 transition hover:border-neutral-700">
            <div className="relative flex h-44 items-center justify-center overflow-hidden bg-neutral-800">
                {car.image ? (
                    <img
                        src={car.image}
                        alt={car.brand}
                        className={`h-full w-full object-cover ${
                            sold ? "opacity-50 grayscale" : ""
                        }`}
                    />
                ) : (
                    <span className="text-4xl text-neutral-600">🚗</span>
                )}

                <span
                    className={`absolute left-3 top-3 rounded-md px-2 py-1 text-xs font-bold ${
                        sold
                            ? "bg-neutral-700 text-neutral-300"
                            : "bg-lime-400 text-neutral-950"
                    }`}
                >
          {sold ? "Продано" : "В наявності"}
        </span>
            </div>

            <div className="p-4">
                <h3
                    className={`mb-1 font-semibold ${
                        sold ? "text-neutral-500 line-through" : "text-neutral-100"
                    }`}
                >
                    {car.brand}
                </h3>
                <p className="mb-3 text-xs text-neutral-500">
                    {car.year} · {car.category} · {car.date}
                </p>

                <div className="flex items-center justify-between">
          <span
              className={`text-xl font-bold ${
                  sold ? "text-neutral-500" : "text-neutral-100"
              }`}
          >
            {Number(car.price).toLocaleString("uk-UA")} $
          </span>

                    {role === "admin" && (
                        <div className="flex gap-2">
                            <button
                                onClick={() => onDelete(car.id)}
                                className="flex h-9 w-9 cursor-pointer items-center justify-center rounded-full bg-neutral-800 text-sm text-rose-400 hover:bg-rose-500 hover:text-white"
                            >
                                ✕
                            </button>
                            <button
                                onClick={() => setEditing(true)}
                                className="flex h-9 w-9 cursor-pointer items-center justify-center rounded-full bg-neutral-800 text-sm text-neutral-300 hover:bg-neutral-700 hover:text-lime-400"
                            >
                                ✏️
                            </button>
                            <button
                                onClick={() => onToggle(car.id)}
                                className="flex h-9 w-9 cursor-pointer items-center justify-center rounded-full bg-lime-400 text-sm font-bold text-neutral-950 hover:bg-lime-300"
                            >
                                {sold ? "↺" : "✓"}
                            </button>
                        </div>
                    )}

                    {role === "client" && !sold && (
                        <span className="text-xs text-lime-400">Доступне</span>
                    )}
                </div>
            </div>
        </li>
    );
}