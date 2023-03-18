import React, { useState, useEffect } from "react";
import TabsComponent from "../components/Leaderboard/TabsComponent";
import axios from "axios";
import { API_URL } from '../utils/constants';


export default function LeaderBoard() {
  const [leaderBoard, setLeaderBoard] = useState();
  const [type, setType] = useState("Global");

  useEffect(() => {
    getLeaderboard(type);
  }, [type]);

  const getLeaderboard = async (type) => {
    const res = await axios
      .post(`${API_URL}games/leaderboard`, {
        type,
      })
      .catch((e) => {
        alert(e.response);
      });
      console.log(res?.data);
      setLeaderBoard(res?.data)
  };

  return (
    <div>
      <TabsComponent leaderBoard={leaderBoard} setType={setType} />
    </div>
  );
}
