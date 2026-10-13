export default function OrderList({ orders, cars, role }) {
    if (orders.length === 0) {
        return (
            <div className="rounded-2xl border border-dashed border-neutral-800 py-12 text-center">
                <p className="text-2xl">📋</p>
                <p className="mt-3 text-sm text-neutral-500">
                    {role === "admin"
                        ? "Замовлень поки немає."
                        : "Ви ще нічого не замовляли."}
                </p>
            </div>
        );
    }

    return (
        <ul className="space-y-3">
            {orders.map((order) => {
                const car = cars.find((c) => c.id === order.carId);
                return (
                    <li
                        key={order.id}
                        className="flex flex-col gap-3 rounded-2xl border border-neutral-800 bg-neutral-900 p-4 sm:flex-row sm:items-center sm:justify-between"
                    >
                        <div className="flex items-center gap-4">
                            {/* Мініатюра авто */}
                            <div className="flex h-14 w-20 shrink-0 items-center justify-center overflow-hidden rounded-lg bg-neutral-800">
                                {car?.image ? (
                                    <img
                                        src={car.image}
                                        alt={car.brand}
                                        className="h-full w-full object-cover"
                                    />
                                ) : (
                                    <span className="text-2xl text-neutral-600">🚗</span>
                                )}
                            </div>

                            <div>
                                <p className="font-semibold text-neutral-100">
                                    {car ? car.brand : "Авто видалено"}
                                </p>
                                <p className="text-xs text-neutral-500">
                                    {order.name} · {order.phone} · {order.payment}
                                </p>
                            </div>
                        </div>

                        <div className="flex items-center gap-3">
              <span className="text-lg font-bold text-lime-400">
                {car ? `${Number(car.price).toLocaleString("uk-UA")} $` : "—"}
              </span>
                            <span className="rounded-full border border-lime-400/30 bg-lime-400/10 px-3 py-1 text-xs font-medium text-lime-400">
                {order.status}
              </span>
                        </div>
                    </li>
                );
            })}
        </ul>
    );
}