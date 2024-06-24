import CargoChecker from "@/components/CargoChecker";

export default async function Home() {
  return (
    <main className="p-4">
      <h1>Main Page</h1>
      <CargoChecker />
    </main>
  );
}
