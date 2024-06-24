"use server";

import { createClient } from "@/lib/supabase/server";

export default async function cargoInfo(identifier: string) {
  const supabase = createClient();

  const { data } = await supabase
    .rpc("cargo_path", {
      iden: "ece9dd4a-5de7-4d90-93f7-0dbd5bd3067d",
    })
    .order("created_at", { ascending: true });

  return data;
}
