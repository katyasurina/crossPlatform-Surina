import CarItem from "./CarItem.jsx";

export default function CarList({ cars, role, onToggle, onDelete, onEdit }) {
    if (cars.length === 0) {
        return (
            <div className="rounded-2xl border border-dashed border-neutral-800 py-16 text-center">
                <p className="text-3xl">🚗</p>
                <p className="mt-3 text-neutral-500">
                    {role === "admin"
                        ? "Каталог порожній. Додайте перший автомобіль!"
                        : "Автомобілів поки немає."}
                </p>
            </div>
        );
    }

    return (
        <ul className="grid grid-cols-1 gap-4 sm:grid-cols-2 lg:grid-cols-3">
            {cars.map((car) => (
                <CarItem
                    key={car.id}
                    car={car}
                    role={role}
                    onToggle={onToggle}
                    onDelete={onDelete}
                    onEdit={onEdit}
                />
            ))}
        </ul>
    );
}