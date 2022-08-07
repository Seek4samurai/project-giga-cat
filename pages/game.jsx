import { useRouter } from "next/router";
import GameCanva from "../components/GameCanva";

const Game = () => {
  const router = useRouter();
  const data = router.query;

  const userId = Object.keys(data);

  return (
    <div>
      <GameCanva userAddress={userId}></GameCanva>
    </div>
  );
};

export default Game;
