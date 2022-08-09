import Link from "next/link";
import { useRouter } from "next/router";
import { useEffect, useState } from "react";
import { useMoralis } from "react-moralis";
import { User } from "../public/assets/SVGs";
import style from "../styles/Dashboard.module.css";

const Dashboard = () => {
  const { isAuthenticated, user, logout } = useMoralis();
  const [userAddress, setUserAddress] = useState();
  const router = useRouter();

  const handleLogout = async () => {
    await logout();
    console.log("logged out");
  };

  useEffect(() => {
    // removing body class as to remove background gifs from game
    const bodyTag = document.querySelector("body");
    bodyTag?.classList.remove("InGame_body__b_fQc");

    // Authentication
    if (!isAuthenticated) {
      router.replace("/");
    } else {
      const showAccount = () => {
        // Ethereum global object gives undefined error when page is refreshed
        // setUserAddress(ethereum?.selectedAddress);
        setUserAddress(user?.get("ethAddress"));
      };
      showAccount();
    }
  }, [isAuthenticated, router, user, userAddress]);

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
