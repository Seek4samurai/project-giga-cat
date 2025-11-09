"use client";
import { useRouter } from "next/router";
import GameCanva from "../components/GameCanva";
import { useAuth } from "../hooks/useAuth";

const Game = () => {
  const router = useRouter();
  const data = router.query;
  const userId = Object.keys(data);

  useAuth("game");

  return (
    <div>
      <GameCanva userAddress={userId}></GameCanva>
    </div>
  );
};

export default Game;
