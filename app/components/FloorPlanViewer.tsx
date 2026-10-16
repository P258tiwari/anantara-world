"use client";
import { Icon } from "./Icon";


import { useState } from "react";
import { floorAreas } from "../floor-plan-data";

type Tower = "A" | "B" | "C";
type Floor = "ground" | "even" | "odd";

const plans: Record<Tower, Record<Floor, { label: string; src: string; alt: string }>> = {
  A: {
    ground: { label: "Ground floor", src: "/floor-plans/tower-a-ground-clean.svg", alt: "ANANTARA WORLD Tower A ground floor plan" },
    even: { label: "Typical even", src: "/floor-plans/tower-a-even-clean.png", alt: "ANANTARA WORLD Tower A typical even floor plan" },
    odd: { label: "Typical odd", src: "/floor-plans/tower-a-odd-clean.png", alt: "ANANTARA WORLD Tower A typical odd floor plan" },
  },
  B: {
    ground: { label: "Ground floor", src: "/floor-plans/tower-b-ground-clean.svg", alt: "ANANTARA WORLD Tower B ground floor plan" },
    even: { label: "Typical even", src: "/floor-plans/tower-b-even-clean.png", alt: "ANANTARA WORLD Tower B typical even floor plan" },
    odd: { label: "Typical odd", src: "/floor-plans/tower-b-odd-clean.png", alt: "ANANTARA WORLD Tower B typical odd floor plan" },
  },
  C: {
    ground: { label: "Ground floor", src: "/floor-plans/tower-c-ground-clean.svg", alt: "ANANTARA WORLD Tower C ground floor plan" },
    even: { label: "Typical even", src: "/floor-plans/tower-c-even-clean.png", alt: "ANANTARA WORLD Tower C typical even floor plan" },
    odd: { label: "Typical odd", src: "/floor-plans/tower-c-odd-clean.png", alt: "ANANTARA WORLD Tower C typical odd floor plan" },
  },
};
const towers: Tower[] = ["A", "B", "C"];
const floors: Floor[] = ["ground", "even", "odd"];
const sequence = towers.flatMap((tower) => floors.map((floor) => ({ tower, floor })));

export function FloorPlanViewer() {
  const [tower, setTower] = useState<Tower>("A");
  const [floor, setFloor] = useState<Floor>("even");
  const current = plans[tower][floor];
  const areas = floor === "ground" ? null : floorAreas[tower][floor];
  const move = (direction: number) => {
    const index = sequence.findIndex((item) => item.tower === tower && item.floor === floor);
    const next = sequence[(index + direction + sequence.length) % sequence.length];
    setTower(next.tower);
    setFloor(next.floor);
  };
  return (
    <div className="floor-plan-viewer">
      <div className="floor-plan-viewer__head">
        <div><p className="eyebrow">Select a tower</p><div className="floor-plan-tabs">{towers.map((item) => <button key={item} className={tower === item ? "active" : ""} aria-pressed={tower === item} onClick={() => { setTower(item); setFloor("even"); }}>Tower {item}</button>)}</div></div>
        <div><p className="eyebrow">Select a floor</p><div className="floor-plan-tabs floor-plan-tabs--floors">{floors.map((item) => <button key={item} className={floor === item ? "active" : ""} aria-pressed={floor === item} onClick={() => setFloor(item)}>{plans[tower][item].label}</button>)}</div></div>
      </div>
      <div className="floor-plan-viewer__stage">
        <button className="floor-plan-arrow" onClick={() => move(-1)} aria-label="Previous floor plan"><Icon name="arrow-left" /></button>
        <a href={current.src} target="_blank" rel="noreferrer" aria-label={`Open ${current.alt} in high resolution`}><img src={current.src} alt={current.alt} loading="lazy" decoding="async" /></a>
        <button className="floor-plan-arrow" onClick={() => move(1)} aria-label="Next floor plan"><Icon name="arrow-right" /></button>
      </div>
      <div className="floor-plan-viewer__meta"><div><span>Tower {tower}</span><h3>{current.label} plan</h3></div><a href={current.src} target="_blank" rel="noreferrer">Open high-resolution plan</a></div>
      <section className="floor-area-schedule" aria-label={`Tower ${tower} ${current.label} area schedule`}>
        <p className="eyebrow">Residence area schedule</p>
        <h3>Tower {tower} · {current.label}</h3>
        {areas ? <><table><caption>Flat areas in square feet (sq ft)</caption><thead><tr><th scope="col">Flat</th><th scope="col">Carpet area<br />(sq ft)</th><th scope="col">Built-up area<br />(sq ft)</th></tr></thead><tbody>{areas.map(([carpet, builtUp], index) => <tr key={index}><th scope="row">{String(index + 1).padStart(2, "0")}</th><td>{carpet.toLocaleString("en-IN", { minimumFractionDigits: 2, maximumFractionDigits: 2 })}</td><td>{builtUp.toLocaleString("en-IN", { minimumFractionDigits: 2, maximumFractionDigits: 2 })}</td></tr>)}</tbody></table><p className="fine-print">Source: Anantara World Brochure Final V3. Carpet areas are reproduced in the brochure from the supplied RERA registration sheet; built-up figures are retained from the brochure. All figures are in sq ft.</p></> : <p>The supplied brochures do not include a flat-wise area schedule for this ground floor plan.</p>}
      </section>
    </div>
  );
}
