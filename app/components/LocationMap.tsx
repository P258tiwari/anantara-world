"use client";
import { Icon } from "./Icon";


import { useEffect, useRef, useState } from "react";
import type { Map as LeafletMap, Marker } from "leaflet";
import { nearbyLocations, projectLocation } from "../location-data";

export function LocationMap() {
  const container = useRef<HTMLDivElement>(null);
  const map = useRef<LeafletMap | null>(null);
  const markers = useRef(new Map<number, Marker>());
  const [selected, setSelected] = useState(0);
  const [filter, setFilter] = useState("All");
  const [status, setStatus] = useState("Loading map…");

  useEffect(() => {
    let disposed = false;
    let observer: ResizeObserver | undefined;
    import("leaflet").then((L) => {
      if (disposed || !container.current) return;
      const instance = L.map(container.current, { scrollWheelZoom: false }).setView([projectLocation.lat, projectLocation.lng], 13);
      map.current = instance;
      const tiles = L.tileLayer("https://tile.openstreetmap.org/{z}/{x}/{y}.png", {
        attribution: '&copy; <a href="https://www.openstreetmap.org/copyright">OpenStreetMap</a> contributors',
        maxZoom: 19,
      }).addTo(instance);
      tiles.on("load", () => { if (!disposed) setStatus(""); });
      tiles.on("tileerror", () => { if (!disposed) setStatus("Map tiles could not load. Location details and Google Maps directions are still available below."); });
      const popup = (name: string, detail: string, url: string) => {
        const node = document.createElement("div");
        const title = document.createElement("strong"); title.textContent = name;
        const description = document.createElement("p"); description.textContent = detail;
        const link = document.createElement("a"); link.href = url; link.target = "_blank"; link.rel = "noopener noreferrer"; link.textContent = "Open Google Maps directions ";
        const icon = document.createElementNS("http://www.w3.org/2000/svg", "svg");
        icon.setAttribute("viewBox", "0 0 24 24"); icon.setAttribute("class", "ui-icon"); icon.setAttribute("aria-hidden", "true"); icon.setAttribute("fill", "none"); icon.setAttribute("stroke", "currentColor"); icon.setAttribute("stroke-width", "1.5");
        const path = document.createElementNS("http://www.w3.org/2000/svg", "path"); path.setAttribute("d", "M7 17 17 7M7 7h10v10"); icon.appendChild(path); link.appendChild(icon);
        node.appendChild(title); node.appendChild(description); node.appendChild(link);
        return node;
      };
      const project = L.marker([projectLocation.lat, projectLocation.lng], {
        icon: L.divIcon({ className: "location-pin location-pin--project", html: "A", iconSize: [44, 44], iconAnchor: [22, 22] }),
        title: "Anantara World — project location",
        zIndexOffset: 1000,
      }).addTo(instance).bindTooltip("ANANTARA WORLD", { permanent: true, direction: "left", offset: [-24, 0], className: "project-map-label" })
        .bindPopup(popup("Anantara World", "Ambedkar Puram Yojna, Awas Vikas, Kanpur", projectLocation.mapsUrl));
      project.on("click", () => setSelected(0));
      markers.current.set(0, project);
      nearbyLocations.forEach((place) => {
        const marker = L.marker([place.lat, place.lng], {
          icon: L.divIcon({ className: "location-pin", html: String(place.number), iconSize: [30, 30], iconAnchor: [15, 15] }),
          title: place.name,
        }).addTo(instance).bindTooltip(place.name).bindPopup(popup(place.name, place.qualifier + " · " + place.distance + " · " + place.time + " estimated (brochure)", place.directions));
        marker.on("click", () => setSelected(place.number));
        markers.current.set(place.number, marker);
      });
      instance.fitBounds([[projectLocation.lat, projectLocation.lng], ...nearbyLocations.map(p => [p.lat, p.lng] as [number, number])], { padding: [45, 45] });
      observer = new ResizeObserver(() => instance.invalidateSize());
      observer.observe(container.current);
      setStatus("");
    }).catch(() => { if (!disposed) setStatus("The interactive map is unavailable. Use the Google Maps links below."); });
    return () => { disposed = true; observer?.disconnect(); map.current?.remove(); map.current = null; markers.current.clear(); };
  }, []);

  function select(number: number) {
    setSelected(number);
    const marker = markers.current.get(number);
    if (marker && map.current) {
      map.current.setView(marker.getLatLng(), number === 0 ? 15 : 17);
      marker.openPopup();
      container.current?.scrollIntoView({ behavior: "smooth", block: "center" });
    }
  }

  const active = nearbyLocations.find(p => p.number === selected);
  const visible = nearbyLocations.filter(p => filter === "All" || p.category === filter);
  return <section className="location-explorer section-pad" id="location-map" aria-label="Anantara World and nearby destinations">
    <div className="location-map-heading"><div><p className="eyebrow">Explore the neighbourhood</p><h2>A world within your reach.</h2></div><a className="button" href={projectLocation.mapsUrl} target="_blank" rel="noreferrer">Directions to Anantara World <Icon name="external" /></a></div>
    <div className="location-map-toolbar"><button type="button" onClick={() => select(0)}>Locate Anantara World</button><button type="button" onClick={() => { map.current?.closePopup(); map.current?.fitBounds([[projectLocation.lat, projectLocation.lng], ...nearbyLocations.map(p => [p.lat, p.lng] as [number, number])], { padding: [45, 45] }); }}>Show all 16 destinations</button><span>Tap a numbered pin for details</span></div>
    <div ref={container} className="location-map-canvas" aria-label="Interactive map of Anantara World, Kanpur" />
    {status && <p className="location-map-status" role="status">{status}</p>}
    <div className="location-map-selection" aria-live="polite"><div><p className="eyebrow">{active ? active.category : "Your starting point"}</p><h3>{active?.name ?? "Anantara World"}</h3><p>{active ? active.qualifier + " · " + active.distance + " · " + active.time + " estimated" : "Ambedkar Puram Yojna, Awas Vikas, Kanpur"}</p></div><a className="text-link" href={active?.directions ?? projectLocation.mapsUrl} target="_blank" rel="noreferrer">Open in Google Maps <Icon name="external" /></a></div>
    <div className="location-map-filters" role="group" aria-label="Filter nearby destinations">{["All", "Shopping", "Education", "Healthcare", "Transport", "Landmarks"].map(category => <button key={category} type="button" aria-pressed={filter === category} onClick={() => setFilter(category)}>{category}</button>)}</div>
    <div className="nearby-grid">{visible.map(place => <article className={selected === place.number ? "nearby-card is-selected" : "nearby-card"} key={place.number}><button type="button" onClick={() => select(place.number)} aria-label={"Show " + place.name + " on map"}><span className="nearby-number">{place.number}</span><span><strong>{place.name}</strong><small>{place.qualifier}</small></span></button><p>{place.distance}<span>{place.time} estimated</span></p><a href={place.directions} target="_blank" rel="noreferrer">Get directions <Icon name="external" /></a></article>)}</div>
    <p className="fine-print">Distances are approximate and taken from the project brochure. Estimated times assume 35 km/h, rounded to the nearest minute; actual travel times vary. Open Google Maps for current routes and travel times.</p>
  </section>;
}
