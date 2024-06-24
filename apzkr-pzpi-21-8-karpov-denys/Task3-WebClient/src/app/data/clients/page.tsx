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
        caption="clients"
        content={[
          ["id", "number", "required"],
          ["full_name"],
          ["address"],
          ["full_name"],
        ]}
        columnStyle="grid-cols-5"
      />
    </main>
  );
}
