"use client";

import { useGetCardsQuery } from "@/entities/card";
import { RealtimeTest } from "@/widgets/realtime-test/ui/RealtimeTest";

export default function Home() {
  const { data, isLoading, error } = useGetCardsQuery();
  console.log(data, error);

  if (isLoading) return <main style={{ padding: 24 }}>Loading...</main>;
  if (error) return <main style={{ padding: 24 }}>Error</main>;

  return (
    <main style={{ padding: 24 }}>
      <h1>Cards</h1>
      <ul>
        {data?.map((c) => (
          <li key={c.id}>
            {c.name} (mana: {c.mana})
          </li>
        ))}
      </ul>
      <RealtimeTest></RealtimeTest>
    </main>
  );
}
