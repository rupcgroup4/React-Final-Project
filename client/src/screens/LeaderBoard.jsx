import React, { useState, useEffect } from "react";
import TabsComponent from "../components/Leaderboard/TabsComponent";
const data = [
  {
    Rank: 1,
    PlayerName: "Moshe",
    TotalGames: 1231,
    WinRate: 98,
    TotalSteps: 483242,
  },
  {
    Rank: 2,
    PlayerName: "Moshe",
    TotalGames: 1231,
    WinRate: 98,
    TotalSteps: 483242,
  },
  {
    Rank: 3,
    PlayerName: "Moshe",
    TotalGames: 1231,
    WinRate: 98,
    TotalSteps: 483242,
  },
  {
    Rank: 3,
    PlayerName: "Moshe",
    TotalGames: 1231,
    WinRate: 98,
    TotalSteps: 483242,
  },
  {
    Rank: 3,
    PlayerName: "Moshe",
    TotalGames: 1231,
    WinRate: 98,
    TotalSteps: 483242,
  },
  {
    Rank: 3,
    PlayerName: "Moshe",
    TotalGames: 1231,
    WinRate: 98,
    TotalSteps: 483242,
  },
  {
    Rank: 3,
    PlayerName: "Moshe",
    TotalGames: 1231,
    WinRate: 98,
    TotalSteps: 483242,
  },
  {
    Rank: 3,
    PlayerName: "Moshe",
    TotalGames: 1231,
    WinRate: 98,
    TotalSteps: 483242,
  },
  {
    Rank: 3,
    PlayerName: "Moshe",
    TotalGames: 1231,
    WinRate: 98,
    TotalSteps: 483242,
  },
  {
    Rank: 3,
    PlayerName: "Moshe",
    TotalGames: 1231,
    WinRate: 98,
    TotalSteps: 483242,
  },
  {
    Rank: 3,
    PlayerName: "Moshe",
    TotalGames: 1231,
    WinRate: 98,
    TotalSteps: 483242,
  },
  {
    Rank: 3,
    PlayerName: "Moshe",
    TotalGames: 1231,
    WinRate: 98,
    TotalSteps: 483242,
  },
  {
    Rank: 3,
    PlayerName: "Moshe",
    TotalGames: 1231,
    WinRate: 98,
    TotalSteps: 483242,
  },
  {
    Rank: 3,
    PlayerName: "Moshe",
    TotalGames: 1231,
    WinRate: 98,
    TotalSteps: 483242,
  },
  {
    Rank: 3,
    PlayerName: "Moshe",
    TotalGames: 1231,
    WinRate: 98,
    TotalSteps: 483242,
  },
  {
    Rank: 3,
    PlayerName: "Moshe",
    TotalGames: 1231,
    WinRate: 98,
    TotalSteps: 483242,
  },
  {
    Rank: 3,
    PlayerName: "Moshe",
    TotalGames: 1231,
    WinRate: 98,
    TotalSteps: 483242,
  },
  {
    Rank: 3,
    PlayerName: "Moshe",
    TotalGames: 1231,
    WinRate: 98,
    TotalSteps: 483242,
  },
  {
    Rank: 3,
    PlayerName: "Moshe",
    TotalGames: 1231,
    WinRate: 98,
    TotalSteps: 483242,
  },
];

export default function LeaderBoard() {
  const [leaderBoard, setLeaderBoard] = useState(data);
  const [type, setType] = useState("Global");

  useEffect(() => {
    if (type === "Global") setLeaderBoard(data);
    if (type === "Spy") setLeaderBoard(data);
    if (type === "Agent") setLeaderBoard(data);
  }, [type]);

  return (
    <div>
      <TabsComponent leaderBoard={leaderBoard} setType={setType} />
    </div>
  );
}
