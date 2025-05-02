import Card from "~/components/Card";
import type { Route } from "./+types/home";
import Controls from "~/components/Controls";

export function meta({}: Route.MetaArgs) {
  return [
    { title: "New React Router App" },
    { name: "description", content: "Welcome to React Router!" },
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
