import { useEffect, useRef, useState } from "react";

// Free, keyless place search backed by Photon (OpenStreetMap data).
const DestinationInput = ({ onSelect }) => {
  const [text, setText] = useState("");
  const [results, setResults] = useState([]);
  const [open, setOpen] = useState(false);
  const timer = useRef(null);
  const box = useRef(null);

  useEffect(() => {
    const close = (e) => {
      if (box.current && !box.current.contains(e.target)) setOpen(false);
    };
    document.addEventListener("click", close);
    return () => {
      document.removeEventListener("click", close);
      clearTimeout(timer.current);
    };
  }, []);

  const search = (value) => {
    setText(value);
    clearTimeout(timer.current);
    if (!value || value.trim().length < 3) {
      setResults([]);
      setOpen(false);
      return;
    }
    timer.current = setTimeout(async () => {
      try {
        const resp = await fetch(
          `https://photon.komoot.io/api/?q=${encodeURIComponent(value)}&limit=6`
        );
        const data = await resp.json();
        setResults(data?.features || []);
        setOpen(true);
      } catch {
        setResults([]);
      }
    }, 350);
  };

  const pick = (feature) => {
    const p = feature?.properties || {};
    const label = [p.name, p.state, p.country].filter(Boolean).join(", ");
    setText(label);
    setOpen(false);
    onSelect({ label });
  };

  return (
    <div ref={box} className="relative w-full">
      <input
        value={text}
        onChange={(e) => search(e.target.value)}
        placeholder="Search a city or region, e.g. Hampi"
        className="w-full rounded-md border border-input bg-white px-3 py-2 text-base shadow-sm focus:outline-none focus:ring-2 focus:ring-teal-500"
      />
      {open && results.length > 0 && (
        <ul className="absolute z-20 mt-1 w-full overflow-hidden rounded-md border bg-white shadow-lg">
          {results.map((f, i) => {
            const p = f.properties || {};
            const label = [p.name, p.state, p.country].filter(Boolean).join(", ");
            return (
              <li
                key={i}
                onClick={() => pick(f)}
                className="cursor-pointer px-3 py-2 text-sm hover:bg-teal-50"
              >
                <span className="font-medium">{p.name}</span>
                <span className="text-gray-500">
                  {p.state ? `, ${p.state}` : ""}
                  {p.country ? `, ${p.country}` : ""}
                </span>
              </li>
            );
          })}
        </ul>
      )}
      {open && results.length === 0 && (
        <div className="absolute z-20 mt-1 w-full rounded-md border bg-white px-3 py-2 text-sm text-gray-500 shadow-lg">
          No matches - try a bigger nearby city
        </div>
      )}
    </div>
  );
};

export default DestinationInput;
