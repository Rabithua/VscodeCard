import { toPng, toSvg } from "html-to-image";
import { useAtom } from "jotai";
import {
  Binary,
  FolderClosedIcon,
  LocateFixed,
  PanelBottom,
  PanelTop,
  SquareRoundCorner,
} from "lucide-react";
import { cardPropsAtom, cardRatioStrings, cardStateAtom } from "~/atom/card";
import {
  Select,
  SelectContent,
  SelectItem,
  SelectTrigger,
  SelectValue,
} from "@/components/ui/select";
import { DatePicker } from "./DatePicker";

export default function Controls() {
  const [cardState, setCardState] = useAtom(cardStateAtom);
  const [props, setProps] = useAtom(cardPropsAtom);

  function svgIt(id: string) {
    const node = document.getElementById(id)!;

    setCardState({ ...cardState, drawIng: true });
    toSvg(node)
      .then((dataUrl) => {
        download(dataUrl, `${id}_${new Date().getTime()}.svg`);
      })
      .catch((err) => {
        console.error("oops, something went wrong!", err);
      })
      .finally(() => {
        setCardState({ ...cardState, drawIng: false });
      });
  }

  function pngIt(id: string, scale: number = 7.5) {
    const node = document.getElementById(id)!;

    setCardState({ ...cardState, drawIng: true });
    toPng(node, { pixelRatio: scale })
      .then((dataUrl) => {
        download(dataUrl, `${id}_${new Date().getTime()}.png`);
      })
      .catch((err) => {
        console.error("oops, something went wrong!", err);
      })
      .finally(() => {
        setCardState({ ...cardState, drawIng: false });
      });
  }

  function download(dataUrl: string, filename: string) {
    const link = document.createElement("a");
    link.download = filename;
    link.href = dataUrl;
    link.click();

    document.body.removeChild(link);
  }

  function Divider() {
    return <div className="w-px h-6 bg-black/5 dark:bg-white/5" />;
  }

  function AspectRatioSelect() {
    return (
      <Select
        value={cardState.aspectRatio}
        onValueChange={(value) =>
          setCardState({ ...cardState, aspectRatio: value })
        }
      >
        <SelectTrigger className="w-32 font-mono">
          <SelectValue placeholder="Aspect Ratio" />
        </SelectTrigger>
        <SelectContent className=" font-mono">
          {cardRatioStrings.map((ratio) => (
            <SelectItem key={ratio} value={ratio}>
              {ratio}
            </SelectItem>
          ))}
        </SelectContent>
      </Select>
    );
  }

  return (
    <div className="flex items-center justify-center gap-2 bg-white/80 dark:bg-[#191919]/80 px-4 py-2 rounded-3xl backdrop-blur-2xl fixed bottom-4 left-1/2 transform -translate-x-1/2">
      <PanelTop
        className={`controlBtn ${!cardState.windowBar.hidden && "btnActive"}`}
        onClick={() => {
          setCardState({
            ...cardState,
            windowBar: { hidden: !cardState.windowBar.hidden },
          });
        }}
      />
      <FolderClosedIcon
        className={`controlBtn ${
          !cardState.fileDirector.hidden && "btnActive"
        }`}
        onClick={() => {
          setCardState({
            ...cardState,
            fileDirector: { hidden: !cardState.fileDirector.hidden },
          });
        }}
      />
      <LocateFixed
        className={`controlBtn ${
          !cardState.codeDirector.hidden && "btnActive"
        }`}
        onClick={() => {
          setCardState({
            ...cardState,
            codeDirector: { hidden: !cardState.codeDirector.hidden },
          });
        }}
      />
      <PanelBottom
        className={`controlBtn ${!cardState.footBar.hidden && "btnActive"}`}
        onClick={() => {
          setCardState({
            ...cardState,
            footBar: { hidden: !cardState.footBar.hidden },
          });
        }}
      />
      <SquareRoundCorner
        className={`controlBtn ${cardState.borderRadius && "btnActive"}`}
        onClick={() => {
          setCardState({
            ...cardState,
            borderRadius: !cardState.borderRadius,
          });
        }}
      />
      <Binary
        className={`controlBtn ${!cardState.lineNumber.hidden && "btnActive"}`}
        onClick={() => {
          setCardState({
            ...cardState,
            lineNumber: { hidden: !cardState.lineNumber.hidden },
          });
        }}
      />
      <AspectRatioSelect />
      <DatePicker props={props} setProps={setProps} />
      <Divider />
      <div
        className="controlBtn"
        onClick={() => {
          svgIt("CardFrontend");
          svgIt("CardBackend");
        }}
      >
        <span className="text-xs font-mono font-black">SVG</span>
      </div>
      <div
        className="controlBtn"
        onClick={() => {
          pngIt("CardFrontend");
          pngIt("CardBackend");
        }}
      >
        <span className="text-xs font-mono font-black">PNG</span>
      </div>
    </div>
  );
}
