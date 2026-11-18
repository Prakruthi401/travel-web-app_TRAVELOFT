import { useEffect, useState } from "react";
import { fetchPlacePhoto } from "@/service/photos";

const PALETTES = [
  "from-teal-500 to-emerald-600",
  "from-sky-500 to-indigo-600",
  "from-amber-500 to-orange-600",
  "from-rose-500 to-pink-600",
];

function paletteFor(text) {
  let hash = 0;
  for (let i = 0; i < (text || "").length; i++) hash = (hash * 31 + text.charCodeAt(i)) >>> 0;
  return PALETTES[hash % PALETTES.length];
}

const PlaceImage = ({ query, className = "", alt, emoji = "🧭" }) => {
  const [url, setUrl] = useState(null);
  const [done, setDone] = useState(false);

  useEffect(() => {
    let live = true;
    setUrl(null);
    setDone(false);
    fetchPlacePhoto(query).then((found) => {
      if (live) {
        setUrl(found);
        setDone(true);
      }
    });
    return () => {
      live = false;
    };
  }, [query]);

  if (url) {
    return (
      <img
        className={className}
        src={url}
        alt={alt || query || "place photo"}
        loading="lazy"
        onError={() => setUrl(null)}
      />
    );
  }
  return (
    <div
      className={`${className} flex items-center justify-center bg-gradient-to-br ${paletteFor(query)} ${
        done ? "" : "animate-pulse"
      }`}
    >
      <span className="text-4xl drop-shadow-sm">{emoji}</span>
    </div>
  );
};

export default PlaceImage;
