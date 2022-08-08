import { useRouter } from "next/router";
import { useEffect } from "react";
import { useMoralis } from "react-moralis";
import { Github, LinkedIn, SVG_1, SVG_2 } from "../public/assets/SVGs";
import style from "../styles/Login.module.css";

export default function Home() {
  const { isAuthenticated, authenticate, user } = useMoralis();
  const router = useRouter();

  const handleLogin = async () => {
    console.log("Login");
    await authenticate({
      signingMessage: "Authorize linking of your wallet",
    })
      .then(function (user) {
        console.log(user?.get("ethAddress"));
      })
      .catch(function (error) {
        console.log(error);
      });
  };

  useEffect(() => {
    // removing body class as to remove background gifs from game
    const bodyTag = document.querySelector("body");
    bodyTag?.classList.remove("InGame_body__b_fQc");

    if (isAuthenticated) {
      router.replace("/dashboard");
    }
  }, [isAuthenticated, router]);

  return (
    <div className={style.body}>
      <div className={style.container}>
        <div className={style.SVGContainer}>
          <div className={style.SVG_1}>
            <SVG_1></SVG_1>
          </div>
          <div className={style.SVG_2}>
            <SVG_2></SVG_2>
          </div>
        </div>
        <div className={style.TopBarContainer}>
          <div className={style.MeetCreatorContainer}>
            <div className={style.LinkedIn}>
              <LinkedIn></LinkedIn>
            </div>
            <a
              target="_blank"
              rel="noopener noreferrer"
              href="https://www.linkedin.com/in/seek4samurai/"
              style={{ cursor: "pointer" }}
            >
              <h3 style={{ textDecoration: "underline" }}>Meet Creator!</h3>
            </a>
          </div>
          <div className={style.Contribute}>
            <div className={style.Github}>
              <Github></Github>
            </div>
            <a
              target="_blank"
              rel="noopener noreferrer"
              href="https://github.com/Seek4samurai/project-giga-cat"
              style={{ cursor: "pointer" }}
            >
              <h3 style={{ textDecoration: "underline" }}>Contribute!</h3>
            </a>
          </div>
        </div>
        {/* <div>
          <button onClick={handleLogin}>Connect Wallet</button>
        </div> */}
      </div>
    </div>
  );
}
