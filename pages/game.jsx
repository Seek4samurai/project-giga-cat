import { useEffect } from "react";
import { useRouter } from "next/router";
import { useMoralis } from "react-moralis";
import GameCanva from "../components/GameCanva";

const Game = () => {
  const { isInitialized, Moralis, isAuthenticated } = useMoralis();
  const router = useRouter();
  const data = router.query;
  const userId = Object.keys(data);

  const checkUser = async () => {
    if (isInitialized) {
      Moralis.User.current();
    }
  };
  checkUser();

  useEffect(() => {
    if (!checkUser) {
      router.replace("/");
    }
  }, [isAuthenticated, router]);

  return (
    <div>
      <GameCanva userAddress={userId}></GameCanva>
    </div>
  );
};

export default Game;
