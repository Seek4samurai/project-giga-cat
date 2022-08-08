import { useRouter } from "next/router";
import { useEffect } from "react";
import { useMoralis } from "react-moralis";

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
    <>
      <div>
        <button onClick={handleLogin}>Login</button>
      </div>
    </>
  );
}
