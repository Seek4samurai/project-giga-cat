"use client";
import Link from "next/link";
import { useEffect, useState } from "react";
import { useAuth } from "../hooks/useAuth";
import { useAuthStatus } from "../hooks/useAuthStatus";
import { User } from "../public/assets/SVGs";
import style from "../styles/Dashboard.module.css";
import { useRouter } from "next/router";

const Dashboard = () => {
  useAuth("dashboard");
  const router = useRouter();
  const { isAuthenticated, loading } = useAuthStatus();
  const [userAddress, setUserAddress] = useState(null);

  const handleLogout = async () => {
    localStorage.removeItem("wallettoken");
    localStorage.removeItem("userAddress");
    router.replace("/");
  };

  useEffect(() => {
    const address = localStorage.getItem("userAddress");
    setUserAddress(address);
  }, []);

  return (
    <div className={style.body}>
      <div className={style.container}>
        <div className={style.TopBar}>
          <div className={style.Profile}>
            <User></User>
          </div>
          <h1 className={style.Head}>
            Welcome {userAddress?.slice(0, 6)}...{userAddress?.slice(39)}
          </h1>
        </div>
        <Link
          href={{
            pathname: "/game",
            query: userAddress,
          }}
        >
          <button className={style.PlayBtn}>
            <a>PLAY!</a>
          </button>
        </Link>
        <h1 className={style.Head}>How to play</h1>
        <div className={style.Content}>
          <p>
            If you were a real gamer...you would have skipped this part, but
            anyways use <span>SPACE </span>to dodge obstacles (simple as that).
          </p>
          <p>
            Player with highest run will be shown on the{" "}
            <span>leaderboard</span>.
          </p>
          <p>
            Scores are erased after every few hours, so make sure to return back
            & <br></br>
            <span>hold your grounds</span>.
          </p>
        </div>
        <button className={style.LogoutBtn} onClick={handleLogout}>
          Logout
        </button>
      </div>
    </div>
  );
};
export default Dashboard;
