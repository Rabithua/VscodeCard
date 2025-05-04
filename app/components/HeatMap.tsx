import { useMemo } from "react";
import useSWR from "swr";

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
  if (data.errors) throw new Error(data.errors[0].message);
  return data;
};

function RenderHeatMap({ username, days, toDate }: HeatMapProps) {
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
    if (count === 0) return "bg-white/10";
    if (count <= 2) return "bg-green-900/50";
    if (count <= 5) return "bg-green-700/70";
    if (count <= 10) return "bg-green-500/80";
    return "bg-green-400";
  };

  return (
    <div className="px-4 py-3 border border-white/10 bg-white/5 rounded-2xl grid grid-rows-7 grid-flow-col gap-1.5">
      {isLoading
        ? Array.from({ length: days }).map((_, index) => (
            <div
              key={`backend-line-${index}`}
              className="size-5 border-white/5 bg-white/5 rounded-xs animate-pulse"
              style={{ animationDelay: `${index * 10}ms` }}
            ></div>
          ))
        : contributionData().map((count, index) => (
            <div
              key={`backend-line-${index}`}
              className={`size-5 border border-white/5 ${getContributionClass(
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
