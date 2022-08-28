import Link from "next/link";
import Script from "next/script";
import { useRouter } from "next/router";
import { useEffect, useState } from "react";
import toast from "react-hot-toast";
import style from "../styles/InGame.module.css";
import { quotes } from "../lib/quotes";
import { EditIcon } from "../public/assets/SVGs";
import Marq from "./Marq";

const GameCanva = (userId) => {
  const [userName, setUserName] = useState("");
  const [userAddress, setUserAddress] = useState();
  const [currQuote, setCurrQuote] = useState();
  const router = useRouter();

  const quoteArr = [0, 1, 2, 3, 4];
  const quoteId = quoteArr[Math.floor(Math.random() * 5)];

  const handleEdit = () => {
    const Input = prompt("Enter your username");
    if (Input.length > 16) {
      alert("Username should not be longer than 16 words");
    } else {
      setUserName(Input);
    }
  };

  const handleHighScore = () => {
    // removing body class as to remove background gifs from game
    const bodyTag = document.querySelector("body");
    bodyTag?.classList.remove("InGame_body__b_fQc");
  };

  const handleExitGame = () => {
    const bodyTag = document.querySelector("body");
    bodyTag?.classList.remove("InGame_body__b_fQc");

    router.replace("/");
  };

  useEffect(() => {
    // adding body class as to add background gifs for game
    const bodyTag = document.querySelector("body");
    bodyTag.classList.add(style.body);

    const fetchQuote = () => {
      setCurrQuote(quotes[quoteId]);
    };
    fetchQuote();

    const showAccount = () => {
      setUserAddress(userId.userAddress[0]);
    };
    showAccount();
  }, [router, userId.userAddress]);

  const start = () => {
    const songArr = [1, 2, 3, 4, 5];
    const songId = songArr[Math.floor(Math.random() * 5)];

    switch (songId) {
      case 1:
        const crabrave = new Audio("./soundtracks/crabrave.mp3");
        crabrave.play().then(() => {
          toast("Playing! Crab Rave", {
            icon: "🔥",
          });

          setTimeout(() => {
            gamespeed = 10;
            PanicWindow.style.display = "block";
          }, 31000);
        });
        break;

      case 2:
        const runninginthe90s = new Audio("./soundtracks/runninginthe90s.mp3");
        runninginthe90s.play().then(() => {
          toast("Playing! Running in the 90s", {
            icon: "🔥",
          });

          setTimeout(() => {
            gamespeed = 10;
            PanicWindow.style.display = "block";
          }, 36000);
        });
        break;

      case 3:
        const dejavu = new Audio("./soundtracks/dejavu.mp3");
        dejavu.play().then(() => {
          toast("Playing! Deja Vu", {
            icon: "🔥",
          });

          setTimeout(() => {
            gamespeed = 10;
            PanicWindow.style.display = "block";
          }, 37500);
        });
        break;

      case 4:
        const gasgasgas = new Audio("./soundtracks/gasgasgas.mp3");
        gasgasgas.play().then(() => {
          toast("Playing! Gas Gas Gas", {
            icon: "🔥",
          });

          setTimeout(() => {
            gamespeed = 10;
            PanicWindow.style.display = "block";
          }, 37500);
        });
        break;

      case 5:
        const fnaf = new Audio("./soundtracks/fnaf.mp3");
        fnaf.play().then(() => {
          toast("Playing! Five Nights at Freddy's 2", {
            icon: "🔥",
          });

          setTimeout(() => {
            gamespeed = 10;
            PanicWindow.style.display = "block";
          }, 41000);
        });
        break;

      default:
        break;
    }
  };

  return (
    <>
      <Script src="./scripts/main.js" async></Script>
      <Script src="./scripts/bird.js" async></Script>
      <Script src="./scripts/particles.js" async></Script>
      <Script src="./scripts/obstacle.js" async></Script>
      <div className={style.marq}>
        <Marq userName={userName}></Marq>
      </div>
      <div>
        <h2 id="addressBar" className={style.address}>
          Deploying as{" "}
          <span id="userTitle">
            {userName
              ? userName
              : `${userAddress?.slice(0, 6)}...${userAddress?.slice(39)}`}
          </span>
          <EditIcon className={style.Edit} onClick={handleEdit}></EditIcon>
        </h2>
        <h2 className={style.Quotes}>&quot;{currQuote}&quot;</h2>
        <h3 className={style.legend}>
          <div>
            &quot; Legends say it gets 10x fun after that beat drops &quot;{" "}
            <br></br>
          </div>
          <sub style={{ fontWeight: "normal" }}> - Legends themself</sub>
        </h3>
        <div className={style.wrapper} id="menu">
          <div className={style.allthethings}>
            {/* <div className={style.left}></div> */}
            <div className={style.single} id="single" onClick={start}>
              <p>Play</p>
            </div>
            <Link
              target="_blank"
              href={{
                pathname: "/leaderboard",
                query: userAddress,
              }}
            >
              <div className={style.options}>
                <p onClick={handleHighScore}>High Score</p>
              </div>
            </Link>
            <a
              target="_blank"
              href="https://github.com/Seek4samurai/project-giga-cat"
              rel="noopener noreferrer"
            >
              <div className={style.credits}>
                <p>Support</p>
              </div>
            </a>
            {/* <div className={style.right}></div> */}
            <div className={style.exit} onClick={handleExitGame}></div>
            <div className={style.circle}></div>
          </div>
        </div>
        <canvas className={style.canvas1} id="canvas1"></canvas>
        <div className={style.box} id="box"></div>
        <p className={style.warning}>
          If you face any bugs related to scripts not loading or soundtracks
          overlapping, <br></br>Please consider refreshing the page.
        </p>
      </div>
    </>
  );
};

export default GameCanva;
