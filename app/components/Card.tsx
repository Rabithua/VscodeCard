import { toPng, toSvg } from "html-to-image";
import {
  ChevronRight,
  CircleX,
  CodeXml,
  Columns2,
  Ellipsis,
  LayoutPanelLeft,
  PanelBottom,
  PanelLeft,
  PanelRight,
  RectangleEllipsis,
  Rocket,
  TriangleAlert,
} from "lucide-react";
import NoStyleInput from "./NoStyleInput";
import { useAtom } from "jotai";
import { cardPropsAtom } from "~/atom/card";
import { Fragment } from "react/jsx-runtime";

export default function Card() {
  const [props, setProps] = useAtom(cardPropsAtom);
  return (
    <div className="flex flex-col items-center justify-center h-screen ">
      <div
        id="Card"
        className="bg-[#181818] aspect-[37/26] font-DMMono rounded-3xl max-w-xl w-full overflow-hidden flex flex-col text-xl hover:scale-99 duration-300"
      >
        {/* WindowBar */}
        <div className=" flex flex-row shrink-0 justify-between items-center py-4 px-5 border-b border-[#2B2B2B]">
          <div className=" flex gap-1.5">
            <div className="size-3.5 rounded-full bg-[#FE6058]"></div>
            <div className="size-3.5 rounded-full bg-[#FFBF2E]"></div>
            <div className="size-3.5 rounded-full bg-[#29CB41]"></div>
          </div>
          <div className="flex gap-2.5 text-[#cccccc]">
            <LayoutPanelLeft className="size-6" />
            <PanelLeft className="size-6" />
            <PanelBottom className="size-6" />
            <PanelRight className="size-6" />
          </div>
        </div>

        {/* FileDirector */}
        <div className=" flex shrink-0 flex-row justify-between items-center">
          <div className=" border-t bg-[#1F1F1F] border-[#0078D4] py-2.5 pl-5 pr-4 flex gap-2.5 items-center">
            <div className=" text-[#CBCB41] text-xl font-bold ">{"{}"}</div>
            <NoStyleInput
              value={props.fileName}
              onChange={(value) => setProps({ ...props, fileName: value })}
              placeholder="Rabithua.json"
              className=" text-white"
            />
            <div className="w-3.5 h-3.5 bg-white rounded-full" />
          </div>

          <div className="flex px-5 gap-2.5 text-[#cccccc]">
            <Columns2 className="size-6 " />
            <Ellipsis className="size-6" />
          </div>
        </div>

        {/* CodeDirector */}
        <div className="px-5 py-1 overflow-scroll shrink-0 gap-1 flex bg-[#1F1F1F] text-[#a9a9a9] items-center ">
          {props.location.map((loc, index) => (
            <Fragment key={`loc-${index}`}>
              <div className="text-xl">{loc}</div>
              <ChevronRight className="size-6 shrink-0" />
            </Fragment>
          ))}
          <div className="text-[#CBCB41] text-xl font-bold">{"{}"}</div>
          <div className="text-xl">{props.fileName}</div>
          <ChevronRight className="size-6 shrink-0" />
          <RectangleEllipsis className="size-6 shrink-0 text-[#9CDCFE]" />
          <div className="text-xl">{props.codes[0].key || "null"}</div>
        </div>

        {/* CodeArea */}
        <div className=" py-2.5 overflow-scroll px-7.5 grow bg-[#1F1F1F] border-b border-[#2B2B2B]">
          <div className=" flex flex-col gap-1">
            <div className="text-[#F3CD09] text-xl  ">{"{"}</div>
            <div className="pl-10 inline-flex flex-col items-start gap-[5px]">
              {props.codes.map((code, index) => (
                <div
                  key={`code-${index}`}
                  className="inline-flex items-start gap-[5px]"
                >
                  <div className="text-[#9CDCFE]">
                    <span>"</span>
                    <NoStyleInput
                      value={code.key}
                      onChange={(value) =>
                        setProps({
                          ...props,
                          codes: props.codes.map((c, i) =>
                            i === index ? { ...c, key: value } : c
                          ),
                        })
                      }
                      className=" text-[#9CDCFE]"
                      placeholder={'"Enter key"'}
                    />
                    <span>"</span>
                  </div>
                  <div className="text-[#CCCCCC]">:</div>
                  {Array.isArray(code.value) ? (
                    <>
                      <div className="text-[#DA70D6]">[</div>
                      {code.value.map((item, idx) => (
                        <Fragment key={idx}>
                          <div className="text-[#CE9178] flex ">
                            <span>"</span>
                            <NoStyleInput
                              value={item}
                              onChange={(value) =>
                                setProps({
                                  ...props,
                                  codes: props.codes.map((c, i) =>
                                    i === index
                                      ? {
                                          ...c,
                                          //@ts-ignore
                                          value: c.value.map((v, j) =>
                                            j === idx ? value : v
                                          ),
                                        }
                                      : c
                                  ),
                                })
                              }
                              className=" text-[#CE9178]"
                              placeholder={'"Enter value"'}
                            />
                            <span>"</span>
                          </div>
                          {idx < code.value.length - 1 && (
                            <div className="text-[#CCCCCC]">,</div>
                          )}
                        </Fragment>
                      ))}
                      <div className="text-[#DA70D6]">]</div>
                    </>
                  ) : (
                    <div className="text-[#CE9178]">
                      <span>"</span>
                      <NoStyleInput
                        value={code.value}
                        onChange={(value) =>
                          setProps({
                            ...props,
                            codes: props.codes.map((c, i) =>
                              i === index ? { ...c, value } : c
                            ),
                          })
                        }
                        className=" text-[#CE9178]"
                        placeholder={'"Enter value"'}
                      />
                      <span>"</span>
                    </div>
                  )}
                  <div className="text-[#CCCCCC]">,</div>
                </div>
              ))}
            </div>
            <div className="text-[#F3CD09] ">{"}"}</div>
          </div>
        </div>

        {/* FootBar */}
        <div className="flex gap-5 items-center shrink-0">
          <div className=" py-2.5 px-5 bg-[#0078D4] text-white">
            <CodeXml className="size-6" />
          </div>
          <div className="flex gap-2.5 items-center">
            <Rocket className="size-6 text-[#CCCCCC]" />
            <NoStyleInput
              value={props.cursor}
              onChange={(value) => setProps({ ...props, cursor: value })}
              placeholder="Bonjour/Rabithua#2"
              className="text-[#A9A9A9]"
            />
          </div>
          <div className="ml-auto flex pr-5 gap-2.5 text-[#A9A9A9]">
            <CircleX className="size-6" />
            <div className="text-xl">0</div>
            <TriangleAlert className="size-6" />
            <div className="text-xl">0</div>
          </div>
        </div>
      </div>
    </div>
  );
}
