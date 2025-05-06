import {
  ChevronRight,
  CircleCheckBig,
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
import {
  cardPropsAtom,
  cardStateAtom,
  type CardProps,
  type CardState,
} from "~/atom/card";
import { Fragment, memo } from "react";
import RenderHeatMap from "./HeatMap";

function CardBackend({
  props,
  setProps,
  cardState,
}: {
  props: CardProps;
  setProps: (newProps: CardProps) => void;
  cardState: CardState;
}) {
  function dateToYearNMonth(date: Date) {
    const year = date.getFullYear();
    const month = String(date.getMonth() + 1).padStart(2, "0");
    return `${year}.${month}`;
  }

  return (
    <div
      id="CardBackend"
      className={`bg-[#181818] shrink-0 aspect-[37/26] font-DMMono ${
        cardState.borderRadius && "rounded-3xl"
      } max-w-[590px] w-full overflow-hidden gap-6 flex flex-col items-center justify-center  hover:scale-99 duration-300 p-6`}
      style={{
        aspectRatio: cardState.aspectRatio,
      }}
    >
      <div className="flex flex-col justify-center items-center gap-2">
        <div className="font-mono text-white flex gap-2 items-center">
          <CircleCheckBig className="text-[#00D653] size-4" />
          <div className="flex items-center">
            @
            <NoStyleInput
              value={props.fileName || "rabithua"}
              onChange={(value) => setProps({ ...props, fileName: value })}
              placeholder="Enter your username"
              className="text-white text-lg"
            />
          </div>
        </div>
        <div className="font-mono text-white flex gap-2 items-center">
          {props.cardBackend.github.allContributions}
          <span className="text-[#00D653]">Contributions</span>
        </div>
      </div>
      <RenderHeatMap
        username={props.fileName || "rabithua"}
        days={props.cardBackend.github.days || 182}
        toDate={props.cardBackend.github.toDate || "2025-05-04T00:00:00Z"}
      />
      <div className="flex items-center gap-2 text-white font-mono text-md">
        {dateToYearNMonth(
          new Date(
            new Date(
              props.cardBackend.github.toDate || "2025-05-04T00:00:00Z"
            ).getTime() -
              props.cardBackend.github.days * 24 * 60 * 60 * 1000
          )
        )}
        <span>-</span>
        {dateToYearNMonth(
          new Date(props.cardBackend.github.toDate || "2025-05-04T00:00:00Z")
        )}
      </div>
      {cardState.cardBackend.motto.hidden ? null : (
        <NoStyleInput
          value={props.cardBackend.motto}
          onChange={(value) =>
            setProps({
              ...props,
              cardBackend: { ...props.cardBackend, motto: value },
            })
          }
          placeholder="Enter your motto"
          className="text-[#29CB41] text-xs"
        />
      )}
    </div>
  );
}

function CardFrontend({
  props,
  setProps,
  cardState,
}: {
  props: CardProps;
  setProps: (newProps: any) => void;
  cardState: CardState;
}) {
  return (
    <div
      id="CardFrontend"
      className={`bg-[#181818] text-xl shrink-0 aspect-[37/26] font-DMMono ${
        cardState.borderRadius && "rounded-3xl"
      } max-w-[590px] w-full overflow-hidden flex flex-col  hover:scale-99 duration-300`}
      style={{
        aspectRatio: cardState.aspectRatio,
      }}
    >
      {/* WindowBar */}
      {cardState.windowBar.hidden ? null : (
        <div className=" flex flex-row shrink-0 justify-between items-center py-4 px-5 border-b border-[#848484]/5">
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
      )}

      {/* FileDirector */}
      {cardState.fileDirector.hidden ? null : (
        <div className=" flex shrink-0 flex-row justify-between items-center">
          <div className=" border-t bg-[#848484]/5 border-[#0078D4] py-2.5 pl-5 pr-4 flex gap-2.5 items-center">
            <div className=" text-[#CBCB41]  font-bold ">{"{}"}</div>
            <div className=" flex items-center text-white">
              <NoStyleInput
                value={props.fileName}
                onChange={(value) => setProps({ ...props, fileName: value })}
                placeholder="Rabithua.json"
                className=" text-white"
              />
              <span>.json</span>
            </div>

            {cardState.saveDot.hidden ? null : (
              <div className="w-3.5 h-3.5 bg-white rounded-full" />
            )}
          </div>

          <div className="flex px-5 gap-2.5 text-[#cccccc]">
            <Columns2 className="size-6 " />
            <Ellipsis className="size-6" />
          </div>
        </div>
      )}

      {/* CodeDirector */}
      {cardState.codeDirector.hidden ? null : (
        <div className="px-5 py-1 overflow-scroll shrink-0 gap-1 flex bg-[#848484]/5 text-[#a9a9a9] items-center ">
          {props.location.map((loc, index) => (
            <Fragment key={`loc-${index}`}>
              <NoStyleInput
                value={loc}
                onChange={(value) =>
                  setProps({
                    ...props,
                    location: props.location.map((l, i) =>
                      i === index ? value : l
                    ),
                  })
                }
                placeholder="Enter location"
                className="text-[#a9a9a9] "
              />
              <ChevronRight className="size-6 shrink-0" />
            </Fragment>
          ))}
          <div className="text-[#CBCB41]  font-bold">{"{}"}</div>
          <div className="flex items-center text-[#a9a9a9]">
            <NoStyleInput
              value={props.fileName}
              onChange={(value) => setProps({ ...props, fileName: value })}
              placeholder="Rabithua.json"
              className=" text-[#a9a9a9] "
            />
            <span>.json</span>
          </div>
          <ChevronRight className="size-6 shrink-0" />
          <RectangleEllipsis className="size-6 shrink-0 text-[#9CDCFE]" />
          <div className="">{props.codes[0].key || "null"}</div>
        </div>
      )}

      {/* CodeArea */}
      <div className=" py-2.5 overflow-scroll px-7.5 grow bg-[#848484]/5 border-b border-[#2B2B2B] flex gap-4">
        {cardState.lineNumber.hidden ? null : (
          <div className="text-[#CCCCCC] shrink-0 flex flex-col gap-0.5">
            {Array.from(
              { length: props.codes.length + 2 },
              (_, i) => i + 1
            ).map((line) => (
              <div key={`line-${line}`} className="text-[#CCCCCC]/30">
                {line}
              </div>
            ))}
          </div>
        )}
        <div className=" flex flex-col gap-0.5">
          <div className="text-[#F3CD09] ">{"{"}</div>
          <div className="pl-10 inline-flex flex-col items-start gap-0.5">
            {props.codes.map((code, index) => (
              <div
                key={`code-${index}`}
                className="inline-flex items-start gap-0.5"
              >
                <div className="text-[#9CDCFE] shrink-0">
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
                <div className="text-[#CCCCCC] shrink-0">:</div>
                {Array.isArray(code.value) ? (
                  <div className="shrink-0 inline-flex items-start gap-0.5">
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
                  </div>
                ) : (
                  <div className="text-[#CE9178] shrink-0">
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
      {cardState.footBar.hidden ? null : (
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
            <div className="">0</div>
            <TriangleAlert className="size-6" />
            <div className="">0</div>
          </div>
        </div>
      )}
    </div>
  );
}

export default function Card() {
  const [props, setProps] = useAtom(cardPropsAtom);
  const [cardState, setCardState] = useAtom(cardStateAtom);

  return (
    <div className="flex flex-wrap items-center min-w-screen min-h-screen justify-center py-32 gap-6">
      <CardFrontend props={props} setProps={setProps} cardState={cardState} />
      <CardBackend props={props} setProps={setProps} cardState={cardState} />
    </div>
  );
}
