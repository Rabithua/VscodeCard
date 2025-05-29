import Card from "~/components/Card";
import type { Route } from "./+types/home";
import Controls from "~/components/Controls";
import { StarsBackground } from "components/animate-ui/backgrounds/stars";

export function meta({}: Route.MetaArgs) {
  return [
    { title: "VscodeCard" },
    { name: "description", content: "Powered by Rabithua!" },
  ];
}

export default function Home() {
  return (
    <StarsBackground pointerEvents={false}>
      <Card />
      <Controls />
    </StarsBackground>
  );
}
