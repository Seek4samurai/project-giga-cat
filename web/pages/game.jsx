import { useEffect } from "react";
import { useRouter } from "next/router";
import { useMoralis } from "react-moralis";
import GameCanva from "../components/GameCanva";

const Game = () => {
  const { isInitialized, isAuthenticated } = useMoralis();
  const router = useRouter();
  const data = router.query;
  const userId = Object.keys(data);

  useEffect(() => {
    const isAuth = () => (!isAuthenticated ? router.push("/") : null);
    isInitialized && isAuth();
  }, [isInitialized, isAuthenticated]);

  return (
    <div>
      <GameCanva userAddress={userId}></GameCanva>
    </div>
  );
};

export default Game;
