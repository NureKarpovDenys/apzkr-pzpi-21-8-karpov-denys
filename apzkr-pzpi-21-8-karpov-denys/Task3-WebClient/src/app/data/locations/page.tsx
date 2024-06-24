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
        caption="locations"
        content={[
          ["id", "number", "required"],
          ["name"],
          ["latitude", "number", "required"],
          ["longitude", "number", "required"],
        ]}
        columnStyle="grid-cols-5"
      />
    </main>
  );
}
