import Link from "next/link";
import { useRouter } from "next/router";
import { useEffect, useState } from "react";
import { useMoralis } from "react-moralis";

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
    <div>
      <h2>
        Logged in as {userAddress?.slice(0, 6)}...{userAddress?.slice(39)}
      </h2>
      <button onClick={handleLogout}>Logout</button>
      <Link
        href={{
          pathname: "/game",
          query: userAddress,
        }}
      >
        <a>Start Game!</a>
      </Link>
    </div>
  );
};
export default Dashboard;
