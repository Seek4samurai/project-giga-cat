import Link from "next/link";
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
        console.log(user.get("ethAddress"));
      })
      .catch(function (error) {
        console.log(error);
      });
  };

  useEffect(() => {
    if (isAuthenticated) {
      console.log();
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
