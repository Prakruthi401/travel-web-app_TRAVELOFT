// Trips live in the browser (localStorage), one bucket per traveler name.
// No backend to run, nothing leaves the machine.
const KEY = "traveloft_trips";

function readAll() {
  try {
    return JSON.parse(localStorage.getItem(KEY)) || {};
  } catch {
    return {};
  }
}

function writeAll(value) {
  localStorage.setItem(KEY, JSON.stringify(value));
}

export function saveTrip(trip) {
  const all = readAll();
  all[trip.id] = trip;
  writeAll(all);
  return trip.id;
}

export function getTrip(id) {
  return readAll()[id] || null;
}

export function listTrips(traveler) {
  const all = Object.values(readAll());
  const mine = traveler ? all.filter((t) => t.traveler === traveler) : all;
  return mine.sort((a, b) => Number(b.id) - Number(a.id));
}

export function getTraveler() {
  try {
    return JSON.parse(localStorage.getItem("traveloft_traveler"));
  } catch {
    return null;
  }
}

export function setTraveler(traveler) {
  if (traveler) localStorage.setItem("traveloft_traveler", JSON.stringify(traveler));
  else localStorage.removeItem("traveloft_traveler");
  window.dispatchEvent(new Event("traveloft-traveler"));
}
