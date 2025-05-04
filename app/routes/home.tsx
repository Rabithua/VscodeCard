import Card from "~/components/Card";
import type { Route } from "./+types/home";
import Controls from "~/components/Controls";

export function meta({}: Route.MetaArgs) {
  return [
    { title: "VscodeCard" },
    { name: "description", content: "Powered by Rabithua!" },
  ];
}

export default function Home() {
  return (
    <main className="">
      <Card />
      <Controls />
    </main>
  );
}
