import { useState } from "react";
import { compressImage } from "../utils/imageUtils.js";

const EMPTY = {
    brand: "",
    price: "",
    year: "",
    category: "Седан",
    date: "",
    image: "",
};

const inputClass =
    "w-full rounded-xl border border-neutral-800 bg-neutral-800 px-4 py-3 text-base text-neutral-100 placeholder-neutral-500 outline-none transition focus:border-lime-400 focus:ring-1 focus:ring-lime-400";

export default function CarForm({ onAdd }) {
    const [form, setForm] = useState(EMPTY);
    const [open, setOpen] = useState(false);
    const [uploading, setUploading] = useState(false);

    const handleChange = (e) => {
        const { name, value } = e.target;
        setForm((prev) => ({ ...prev, [name]: value }));
    };

    const handleImage = async (e) => {
        const file = e.target.files?.[0];
        if (!file) return;

        if (!file.type.startsWith("image/")) {
            alert("Будь ласка, оберіть файл зображення.");
            return;
        }

        setUploading(true);
        try {
            const base64 = await compressImage(file, 800, 0.7);
            setForm((prev) => ({ ...prev, image: base64 }));
        } catch {
            alert("Не вдалося обробити зображення.");
        } finally {
            setUploading(false);
        }
    };

    const handleSubmit = (e) => {
        e.preventDefault();
        if (onAdd(form)) {
            setForm(EMPTY);
            setOpen(false);
        }
    };

    if (!open) {
        return (
            <button
                onClick={() => setOpen(true)}
                className="mb-6 w-full cursor-pointer rounded-2xl border border-dashed border-neutral-700 bg-neutral-900 px-6 py-4 text-left text-neutral-400 transition hover:border-lime-400 hover:text-lime-400 md:w-auto"
            >
                + Додати новий автомобіль
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
                    Новий автомобіль
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
                {/* === ФОТО === */}
                <div className="md:col-span-2">
                    <label className="mb-2 block text-xs font-medium text-neutral-400">
                        Фото автомобіля
                    </label>

                    <div className="flex flex-col gap-4 sm:flex-row sm:items-center">
                        <div className="flex h-28 w-40 shrink-0 items-center justify-center overflow-hidden rounded-xl border border-neutral-800 bg-neutral-800">
                            {form.image ? (
                                <img
                                    src={form.image}
                                    alt="Прев'ю авто"
                                    className="h-full w-full object-cover"
                                />
                            ) : (
                                <span className="text-3xl text-neutral-600">🚗</span>
                            )}
                        </div>

                        <div className="flex-1">
                            <label
                                className={`inline-flex cursor-pointer items-center gap-2 rounded-xl border border-neutral-700 bg-neutral-800 px-4 py-2.5 text-sm font-medium text-neutral-200 transition hover:border-lime-400 hover:text-lime-400 ${
                                    uploading ? "opacity-60" : ""
                                }`}
                            >
                                <input
                                    type="file"
                                    accept="image/*"
                                    onChange={handleImage}
                                    disabled={uploading}
                                    className="hidden"
                                />
                                {uploading ? "⏳ Обробка..." : "📁 Обрати файл"}
                            </label>

                            {form.image && (
                                <button
                                    type="button"
                                    onClick={() => setForm((p) => ({ ...p, image: "" }))}
                                    className="ml-3 cursor-pointer text-sm text-rose-400 hover:text-rose-300"
                                >
                                    Видалити фото
                                </button>
                            )}

                            <p className="mt-2 text-xs text-neutral-500">
                                JPG, PNG або WebP. Фото автоматично стиснеться до 800 px.
                            </p>
                        </div>
                    </div>
                </div>

                {/* === ІНШІ ПОЛЯ === */}
                <div>
                    <label className="mb-2 block text-xs font-medium text-neutral-400">
                        Марка та модель
                    </label>
                    <input
                        name="brand"
                        value={form.brand}
                        onChange={handleChange}
                        placeholder="BMW M4 Competition"
                        className={inputClass}
                    />
                </div>

                <div>
                    <label className="mb-2 block text-xs font-medium text-neutral-400">
                        Ціна, $
                    </label>
                    <input
                        name="price"
                        type="number"
                        value={form.price}
                        onChange={handleChange}
                        placeholder="78900"
                        className={inputClass}
                    />
                </div>

                <div>
                    <label className="mb-2 block text-xs font-medium text-neutral-400">
                        Рік випуску
                    </label>
                    <input
                        name="year"
                        type="number"
                        value={form.year}
                        onChange={handleChange}
                        placeholder="2024"
                        className={inputClass}
                    />
                </div>

                <div>
                    <label className="mb-2 block text-xs font-medium text-neutral-400">
                        Категорія
                    </label>
                    <select
                        name="category"
                        value={form.category}
                        onChange={handleChange}
                        className={`${inputClass} cursor-pointer`}
                    >
                        <option>Седан</option>
                        <option>Позашляховик</option>
                        <option>Хетчбек</option>
                        <option>Електромобіль</option>
                        <option>Купе</option>
                    </select>
                </div>

                <div className="md:col-span-2">
                    <label className="mb-2 block text-xs font-medium text-neutral-400">
                        Дата надходження
                    </label>
                    <input
                        name="date"
                        type="date"
                        value={form.date}
                        onChange={handleChange}
                        className={`${inputClass} cursor-pointer`}
                    />
                </div>
            </div>

            <button
                type="submit"
                disabled={uploading}
                className="w-full cursor-pointer rounded-xl bg-lime-400 px-6 py-3 text-base font-semibold text-neutral-950 transition hover:bg-lime-300 disabled:cursor-not-allowed disabled:opacity-60 md:w-auto"
            >
                Додати до каталогу
            </button>
        </form>
    );
}