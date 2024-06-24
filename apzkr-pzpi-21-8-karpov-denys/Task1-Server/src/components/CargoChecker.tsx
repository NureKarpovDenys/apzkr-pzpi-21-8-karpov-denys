"use client";
import { useState } from "react";
import cargoInfo from "./cargoCheck";

export default function CargoChecker() {
  const [text, setText] = useState("");
  const [state, setState] = useState<any>();

  return (
    <div className="inline-block bg-orange-400 p-5">
      Cargo Checker
      <form
        onSubmit={(e) => {
          e.preventDefault();
          setState("loading");
          cargoInfo(text).then((data) => {
            setState(data ? data : "Cargo was not found.");
          });
        }}
      >
        <input
          className="m-1 mb-2 w-[360px] p-2"
          type="text"
          placeholder="2a955baa-6237-401b-b2c4-eda1459f6b8a"
          value={text}
          name="cargo"
          onChange={(e) => setText(e.target.value)}
          minLength={36}
          maxLength={36}
          pattern="[0-9a-f]{8}-[0-9a-f]{4}-[0-9a-f]{4}-[0-9a-f]{4}-[0-9a-f]{12}"
          required
        />
        <button className="m-1 bg-neutral-100 p-2 font-semibold text-orange-600 hover:underline">
          Submit
        </button>
      </form>
      {state &&
        (state === "loading" ? <div>Loading...</div> : cargoFormat(state))}
    </div>
  );
}

function cargoFormat(path: any[]) {
  let distance = 0;
  for (let i = 0; i < path.length - 1; i++) {
    distance += haversineDistance(
      path[i].lat,
      path[i].long,
      path[i + 1].lat,
      path[i + 1].long,
    );
  }

  return (
    <div>
      <p className="">Locations traveled:</p>
      <ul className="bg-neutral-100 p-1">
        {path.map((v, i) => (
          <li key={i} className="p-1">
            {`${new Date(Date.parse(v.created_at)).toLocaleDateString(
              undefined,
              {
                year: "numeric",
                month: "numeric",
                day: "numeric",
                hour: "2-digit",
                minute: "2-digit",
                second: "2-digit",
              },
            )} ${v.name}`}{" "}
            <span className="bg-green-500 p-1 text-white">{v.status}</span>
          </li>
        ))}
      </ul>
      <p className="mt-3">
        Distance traveled:{" "}
        <span className="bg-neutral-100 p-1">{distance.toFixed(2)} km</span>
      </p>
    </div>
  );
}

function haversineDistance(
  lat1: number,
  lon1: number,
  lat2: number,
  lon2: number,
): number {
  const toRadians = (degrees: number): number => degrees * (Math.PI / 180);

  const R = 6371; // Radius of the Earth in kilometers
  const dLat = toRadians(lat2 - lat1);
  const dLon = toRadians(lon2 - lon1);
  const a =
    Math.sin(dLat / 2) * Math.sin(dLat / 2) +
    Math.cos(toRadians(lat1)) *
      Math.cos(toRadians(lat2)) *
      Math.sin(dLon / 2) *
      Math.sin(dLon / 2);
  const c = 2 * Math.atan2(Math.sqrt(a), Math.sqrt(1 - a));
  const distance = R * c; // Distance in kilometers

  return distance;
}
