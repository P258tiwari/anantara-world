"use client";

import { useState } from "react";

type Tower = "A" | "B" | "C";
type Floor = "ground" | "even" | "odd";

const plans: Record<Tower, Record<Floor, { label: string; src: string; alt: string }>> = {
  A: {
    ground: { label: "Ground floor", src: "/project-images/tower-a-ground.webp", alt: "ANANTARA WORLD Tower A ground floor plan" },
    even: { label: "Typical even", src: "/project-images/tower-a-even.webp", alt: "ANANTARA WORLD Tower A typical even floor plan" },
    odd: { label: "Typical odd", src: "/project-images/tower-a-odd.webp", alt: "ANANTARA WORLD Tower A typical odd floor plan" },
  },
  B: {
    ground: { label: "Ground floor", src: "/project-images/tower-b-ground.webp", alt: "ANANTARA WORLD Tower B ground floor plan" },
    even: { label: "Typical even", src: "/project-images/tower-b-even.webp", alt: "ANANTARA WORLD Tower B typical even floor plan" },
    odd: { label: "Typical odd", src: "/project-images/tower-b-odd.webp", alt: "ANANTARA WORLD Tower B typical odd floor plan" },
  },
  C: {
    ground: { label: "Ground floor", src: "/project-images/tower-c-ground.webp", alt: "ANANTARA WORLD Tower C ground floor plan" },
    even: { label: "Typical even", src: "/project-images/tower-c-even.webp", alt: "ANANTARA WORLD Tower C typical even floor plan" },
    odd: { label: "Typical odd", src: "/project-images/tower-c-odd.webp", alt: "ANANTARA WORLD Tower C typical odd floor plan" },
  },
};
const towers: Tower[] = ["A", "B", "C"];
const floors: Floor[] = ["ground", "even", "odd"];
const sequence = towers.flatMap((tower) => floors.map((floor) => ({ tower, floor })));

export function FloorPlanViewer() {
  const [tower, setTower] = useState<Tower>("A");
  const [floor, setFloor] = useState<Floor>("ground");
  const current = plans[tower][floor];
  const move = (direction: number) => {
    const index = sequence.findIndex((item) => item.tower === tower && item.floor === floor);
    const next = sequence[(index + direction + sequence.length) % sequence.length];
    setTower(next.tower);
    setFloor(next.floor);
  };
  return (
    <div className="floor-plan-viewer">
      <div className="floor-plan-viewer__head">
        <div><p className="eyebrow">Select a tower</p><div className="floor-plan-tabs">{towers.map((item) => <button key={item} className={tower === item ? "active" : ""} aria-pressed={tower === item} onClick={() => { setTower(item); setFloor("ground"); }}>Tower {item}</button>)}</div></div>
        <div><p className="eyebrow">Select a floor</p><div className="floor-plan-tabs floor-plan-tabs--floors">{floors.map((item) => <button key={item} className={floor === item ? "active" : ""} aria-pressed={floor === item} onClick={() => setFloor(item)}>{plans[tower][item].label}</button>)}</div></div>
      </div>
      <div className="floor-plan-viewer__stage">
        <button className="floor-plan-arrow" onClick={() => move(-1)} aria-label="Previous floor plan">←</button>
        <a href={current.src} target="_blank" rel="noreferrer" aria-label={`Open ${current.alt} in high resolution`}><img src={current.src} alt={current.alt} loading="lazy" decoding="async" /></a>
        <button className="floor-plan-arrow" onClick={() => move(1)} aria-label="Next floor plan">→</button>
      </div>
      <div className="floor-plan-viewer__meta"><div><span>Tower {tower}</span><h3>{current.label} plan</h3></div><a href={current.src} target="_blank" rel="noreferrer">Open high-resolution plan</a></div>
    </div>
  );
}
