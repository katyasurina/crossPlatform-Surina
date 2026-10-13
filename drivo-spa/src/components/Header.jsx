export default function Header({ role, onRoleChange, total, sold }) {
    return (
        <header className="mb-6">
            <nav className="mb-6 flex flex-wrap items-center justify-between gap-3">
                {/* Логотип */}
                <div className="flex items-center gap-2">
          <span className="flex h-9 w-9 items-center justify-center rounded-full bg-lime-400 text-lg font-black text-neutral-950">
            ●
          </span>
                    <span className="text-xl font-bold">drivo</span>
                </div>

                {/* Перемикач ролей */}
                <div className="flex items-center gap-1 rounded-full border border-neutral-800 bg-neutral-900/60 p-1.5 text-sm">
                    <button
                        onClick={() => onRoleChange("admin")}
                        className={`cursor-pointer rounded-full px-4 py-1.5 font-medium transition ${
                            role === "admin"
                                ? "bg-lime-400 text-neutral-950"
                                : "text-neutral-400 hover:text-neutral-200"
                        }`}
                    >
                        👨‍💼 Адмін
                    </button>
                    <button
                        onClick={() => onRoleChange("client")}
                        className={`cursor-pointer rounded-full px-4 py-1.5 font-medium transition ${
                            role === "client"
                                ? "bg-lime-400 text-neutral-950"
                                : "text-neutral-400 hover:text-neutral-200"
                        }`}
                    >
                        👤 Покупець
                    </button>
                </div>
            </nav>

            <h1 className="mb-2 text-3xl font-bold text-neutral-100 md:text-4xl">
                {role === "admin" ? "Управління каталогом" : "Каталог автомобілів"}
            </h1>
            <p className="text-sm text-neutral-400">
                Усього авто: <span className="font-semibold text-lime-400">{total}</span>
                {" · "}Продано:{" "}
                <span className="font-semibold text-neutral-200">{sold}</span>
            </p>
        </header>
    );
}