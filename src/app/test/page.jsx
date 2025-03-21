'use client';
import QuotesClients from "@/components/shared/Quotes/clients/QuotesClients";

export default function TestPage() {
  const handleSelectClient = (client) => {
    console.log("Cliente seleccionado:", client);
  };

  return (
    <div className="p-8">
      <h1 className="text-2xl font-bold mb-4">Prueba de QuotesClients</h1>
      <QuotesClients onSelectClient={handleSelectClient} />
    </div>
  );
}
