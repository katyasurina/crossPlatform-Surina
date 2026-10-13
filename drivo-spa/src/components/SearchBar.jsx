export default function SearchBar({ value, onChange }) {
    return (
        <div className="mb-4 flex items-center gap-3 rounded-xl border border-neutral-800 bg-neutral-900 px-4 py-3">
            <span className="text-neutral-500">🔍</span>
            <input
                value={value}
                onChange={(e) => onChange(e.target.value)}
                placeholder="Пошук за маркою чи категорією..."
                className="w-full bg-transparent text-base text-neutral-100 placeholder-neutral-500 outline-none"
            />
        </div>
    );
}