import { useAtom } from "jotai";
import { useEffect, useMemo } from "react";
import useSWR from "swr";
import { cardPropsAtom } from "~/atom/card";

const token = import.meta.env.VITE_PUBLIC_GITHUB_TOKEN;

interface HeatMapProps {
  username: string;
  days: number;
  toDate: string;
}

const fetcher = async ([username, toDate, fromDate]: [
  string,
  string,
  Date
]) => {
  const query = `
    query {
      user(login: "${username}") {
        contributionsCollection(from: "${fromDate.toISOString()}", to: "${new Date(
    toDate
  ).toISOString()}") {
          contributionCalendar {
            totalContributions
            weeks {
              contributionDays {
                date
                contributionCount
              }
            }
          }
        }
      }
    }
  `;

  const response = await fetch("https://api.github.com/graphql", {
    method: "POST",
    headers: {
      "Content-Type": "application/json",
      Authorization: `Bearer ${token}`,
    },
    body: JSON.stringify({ query }),
  });

  const data = await response.json();
  console.log("Fetched data:", data);

  if (data.message) throw new Error(data.message);
  return data;
};

function RenderHeatMap({ username, days, toDate }: HeatMapProps) {
  const [props, setProps] = useAtom(cardPropsAtom);
  console.log(
    "RenderHeatMap rendered with username:",
    username,
    "and days:",
    days
  );

  const fromDate = new Date(
    new Date(toDate).getTime() - days * 24 * 60 * 60 * 1000
  );

  const { data, error, isLoading } = useSWR(
    [username, toDate, fromDate, token],
    fetcher,
    {
      revalidateOnFocus: false,
      revalidateOnReconnect: false,
      dedupingInterval: 3600000, // 1小时内不重复请求
      errorRetryCount: 3,
    }
  );

  const contributionData = () => {
    if (!data || error) {
      return Array.from({ length: days }).map(() =>
        Math.floor(Math.random() * 10)
      );
    }

    const weeks =
      data.data.user.contributionsCollection.contributionCalendar.weeks;
    const allDays = weeks.flatMap((week: any) => week.contributionDays);
    const contributions: number[] = [];

    for (let i = 0; i < days; i++) {
      const date = new Date(toDate);
      date.setDate(date.getDate() - (days - 1 - i));
      const dateString = date.toISOString().slice(0, 10);

      const dayData = allDays.find((day: any) => day.date === dateString);
      contributions.push(dayData ? dayData.contributionCount : 0);
    }

    return contributions;
  };

  const getContributionClass = (count: number) => {
    if (count === 0) return "bg-white/5";
    if (count <= 2) return "bg-[#003B11]";
    if (count <= 5) return "bg-[#006E24]";
    if (count <= 10) return "bg-[#00A332]";
    return "bg-[#00D653]";
  };

  useEffect(() => {
    if (data && !error) {
      console.log("Data fetched:", data);
      setProps((prevProps) => ({
        ...prevProps,
        cardBackend: {
          ...prevProps.cardBackend,
          github: {
            ...prevProps.cardBackend.github,
            allContributions:
              data.data.user.contributionsCollection.contributionCalendar
                .totalContributions,
          },
        },
      }));
    }
  }, [data, error]);

  return (
    <div className=" grid grid-rows-7 grid-flow-col gap-1">
      {isLoading
        ? Array.from({ length: days }).map((_, index) => (
            <div
              key={`backend-line-${index}`}
              className="size-5 bg-white/5 rounded-xs animate-pulse"
              style={{ animationDelay: `${index * 10}ms` }}
            ></div>
          ))
        : contributionData().map((count, index) => (
            <div
              key={`backend-line-${index}`}
              className={`size-5 ${getContributionClass(
                count
              )} rounded-xs hover:opacity-80 transition-opacity`}
              title={`${count} contributions by ${username} on ${new Date(
                new Date(toDate).getTime() -
                  (days - 1 - index) * 24 * 60 * 60 * 1000
              )
                .toISOString()
                .slice(0, 10)}`}
            ></div>
          ))}
    </div>
  );
}

export default RenderHeatMap;
