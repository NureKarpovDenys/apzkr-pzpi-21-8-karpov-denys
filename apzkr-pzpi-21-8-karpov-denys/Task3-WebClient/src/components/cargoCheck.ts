"use server";

import { createClient } from "@/lib/supabase/server";

export default async function cargoInfo(identifier: string) {
  const supabase = createClient();

  const { data } = await supabase
    .rpc("cargo_path", {
      iden: identifier,
    })
    .order("created_at", { ascending: true });

  return data;
}
