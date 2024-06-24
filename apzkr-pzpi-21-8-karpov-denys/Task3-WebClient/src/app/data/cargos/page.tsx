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
        caption="cargos"
        content={[
          ["id", "number", "required"],
          ["client_id", "number", "required"],
          ["identifier", "string", "required"],
          ["info", "object"],
          ["status", "object"],
        ]}
        columnStyle="grid-cols-6"
      />
    </main>
  );
}
