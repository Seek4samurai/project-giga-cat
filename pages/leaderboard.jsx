import { useRouter } from "next/router";
import { useEffect, useState } from "react";
import { useMoralis } from "react-moralis";
import UserTile from "../components/UserTile";

const Leaderboard = () => {
  const [score, setScore] = useState([]);
  const { isInitialized, isAuthenticated } = useMoralis();
  const router = useRouter();

  const data = router.query;
  const query = Object.keys(data)[0];

  const fetchScores = async () => {
    const res = await fetch("/api/search?" + query);
    const results = await res.json();
    return results["scores"];
  };
  // Causing infinite loop ===============================================>
  // fetchScores().then((data) => {
  // setScore(data);
  // });
  // console.log(score);

  useEffect(() => {
    const isAuth = () => (!isAuthenticated ? router.push("/") : null);
    isInitialized && isAuth();
  }, [isInitialized, isAuthenticated]);

  return (
    <>
      <h2>leaderboard</h2>
      {}
      <UserTile></UserTile>
    </>
  );
};

export default Leaderboard;
