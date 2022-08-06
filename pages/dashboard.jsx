import Link from "next/link";
import { useRouter } from "next/router";
import { useEffect, useState } from "react";
import { useMoralis } from "react-moralis";

const Dashboard = () => {
  const { account, Moralis, isAuthenticated, user, logout } = useMoralis();
  const [userAddress, setUserAddress] = useState();
  const router = useRouter();

  const handleLogout = async () => {
    await logout();
    console.log("logged out");
  };

  useEffect(() => {
    const bodyTag = document.querySelector("body");
    bodyTag?.classList.remove("InGame_body__b_fQc");

    if (!isAuthenticated) router.replace("/");

    // Ethereum global object gives undefined error when page is refreshed
    setUserAddress(user?.get("ethAddress"));
    // setUserAddress(ethereum?.selectedAddress);
  }, [isAuthenticated, router, user]);

  // useEffect(() => {
  //   // Account switching
  //   Moralis.onAccountChanged(async (chain) => {
  //     console.log("Account changed to:", chain);
  //     setUserAddress(chain);
  //   });
  // }, [account]);

  useEffect(() => {
    // Account switching
    console.log("Account changed to:", account);
    setUserAddress(account);
  }, [account]);

  return (
    <div>
      <h2>
        Logged in as {userAddress?.slice(0, 6)}...{userAddress?.slice(39)}
      </h2>
      <button onClick={handleLogout}>Logout</button>
      <Link href="/game">
        <a>Start Game!</a>
      </Link>
    </div>
  );
};
export default Dashboard;
