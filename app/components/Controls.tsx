import { toSvg } from "html-to-image";
import { useAtom } from "jotai";
import { Save } from "lucide-react";
import { cardStateAtom } from "~/atom/card";

export default function Controls() {
  const [cardState, setCardState] = useAtom(cardStateAtom);

  function svgIt() {
    const node = document.getElementById("Card")!;

    console.log("Converting SVG to PNG...");

    setCardState({ ...cardState, drawIng: true });
    toSvg(node)
      .then((dataUrl) => {
        console.log("SVG converted to PNG successfully!");

        const img = new Image();
        img.src = dataUrl;
        const link = document.createElement("a");
        link.download = "card.svg";
        link.href = dataUrl;
        link.click();
      })
      .catch((err) => {
        console.error("oops, something went wrong!", err);
      })
      .finally(() => {
        setCardState({ ...cardState, drawIng: false });
      });
  }
  return (
    <div className="flex items-center justify-center gap-2 bg-white/80 dark:bg-[#191919]/80 px-4 py-2 rounded-3xl backdrop-blur-2xl fixed bottom-4 left-1/2 transform -translate-x-1/2">
      <Save className="controlBtn" onClick={svgIt} />
      <div className="w-px h-6 bg-black/5 dark:bg-white/5" />
      <Save className="controlBtn" />
    </div>
  );
}
