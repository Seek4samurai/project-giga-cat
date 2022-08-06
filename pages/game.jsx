import { useRouter } from "next/router";
import GameCanva from "../components/GameCanva";

const Game = () => {
  const router = useRouter();
  const data = router.query;

  console.log("Querying:", data);
  return (
    <div>
      <GameCanva userAddress={data}></GameCanva>
    </div>
  );
};

export default Game;
