import DataTable from "@/components/DataTable";
import { redirect } from "next/navigation";
import { createClient } from "@/lib/supabase/server";

export default async function CRUD() {
  const supabase = createClient();
  const { data, error } = await supabase.auth.getUser();
  if (error || !data?.user) {
    redirect("/login");
  }

  return (
    <main className="">
      <DataTable
        caption="points"
        content={[
          ["id", "number", "required"],
          ["cargo_id", "number", "required"],
          ["location_id", "number", "required"],
          ["status"],
        ]}
        columnStyle="grid-cols-5"
      />
    </main>
  );
}
