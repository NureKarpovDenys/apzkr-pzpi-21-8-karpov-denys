"use client";

import { useState } from "react";

export default function ReserveCopy() {
  return (
    <div className="m-10 inline-block bg-slate-800 p-5">
      <p className="mb-2 text-xl">Reserve Copy</p>
      <Button />
    </div>
  );
}

async function copy() {
  return new Promise(function (resolve, reject) {
    exec(`npx supabase db dump --db-url ${process.env.DB_URL} -f public/db-data-dump.sql --data-only`).addListener("exit", resolve);
  });
}

function Button() {
  const [state, setState] = useState("none");

  switch (state) {
    case "none":
      return (
        <button
          className="bg-green-600 p-1"
          onClick={() => {
            setState("load");
            copy()
              .then(() => {
                setState("done");
              })
              .catch(() => {
                setState("error");
              });
          }}
        >
          Dump DB
        </button>
      );
    case "load":
      return <div className="p-1">Loading...</div>;
    case "done":
      return (
        <a
          className="bg-blue-600 p-1"
          href="/db-data-dump.sql"
          download="db-dump.sql"
        >
          Download
        </a>
      );
    case "error":
      return <div className="p-1 text-red-600">Error. Please, try later.</div>;
  }
}
