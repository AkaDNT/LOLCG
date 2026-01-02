export async function GET() {
  return Response.json([
    { id: "c1", name: "Firebolt", mana: 1 },
    { id: "c2", name: "Shield", mana: 2 },
    { id: "c3", name: "Dragon", mana: 7 },
  ]);
}
