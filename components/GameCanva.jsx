import Head from "next/head";
import { useRouter } from "next/router";
import Script from "next/script";
import { useEffect, useState } from "react";
import { useMoralis } from "react-moralis";
import style from "../styles/InGame.module.css";

const GameCanva = (data) => {
  const { Moralis, isAuthenticated, authenticate, user, account } =
    useMoralis();
  const [userAddress, setUserAddress] = useState();
  const router = useRouter();

  const handleExitGame = () => {
    const bodyTag = document.querySelector("body");
    bodyTag?.classList.remove("InGame_body__b_fQc");

    router.replace("/");
  };

  useEffect(() => {
    if (!isAuthenticated) {
      router.replace("/");
    } else {
      const bodyTag = document.querySelector("body");
      bodyTag.classList.add(style.body);

      const showAccount = async () => {
        // Ethereum global object gives undefined error when page is refreshed
        setUserAddress(await account);
        // setUserAddress(ethereum?.selectedAddress);
      };
      showAccount();
    }
  }, [user, isAuthenticated, router, account]);

  useEffect(() => {
    const handleSwitching = () => {
      // Account switching
      console.log("Account changed to:", account);
      setUserAddress(account);
    };
    handleSwitching();
  }, [account]);

  const handleScripts = () => {
    console.log("CLICK");
    return (
      <Head>
        <script src="./scripts/main.js" async></script>
        <script src="./scripts/bird.js" async></script>
        <script src="./scripts/particles.js" async></script>
        <script src="./scripts/obstacle.js" async></script>
      </Head>
    );
  };

  return (
    <>
      <Script src="./scripts/main.js" async></Script>
      <Script src="./scripts/bird.js" async></Script>
      <Script src="./scripts/particles.js" async></Script>
      <Script src="./scripts/obstacle.js" async></Script>
      <div>
        <h2 id="addressBar">
          User {userAddress?.slice(0, 6)}...{userAddress?.slice(39)}
        </h2>
        <div className={style.wrapper} id="menu">
          <div className={style.allthethings}>
            <div className={style.left}></div>
            <div className={style.single} id="single" onClick={handleScripts}>
              <p>PLAY</p>
            </div>
            <div className={style.options}>
              <p>CHECK AUTH</p>
            </div>
            <div className={style.credits}>
              <p>CREDITS</p>
            </div>
            <div className={style.right}></div>
            <div className={style.exit} onClick={handleExitGame}></div>
            <div className={style.circle}></div>
          </div>
        </div>
        <canvas className={style.canvas1} id="canvas1"></canvas>
      </div>
    </>
  );
};

export default GameCanva;
