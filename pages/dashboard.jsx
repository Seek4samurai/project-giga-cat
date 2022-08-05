import Link from "next/link";
import { useRouter } from "next/router";
import { useEffect, useState } from "react";
import { useMoralis } from "react-moralis";

const Dashboard = () => {
  const { Moralis, isAuthenticated, user, logout } = useMoralis();
  const [userAddress, setUserAddress] = useState();
  const router = useRouter();

  const handleLogout = async () => {
    await logout();
    console.log("logged out");
  };

  const handleSwitch = () => {
    Moralis.onAccountChanged(async (chain) => {
      console.log("Account changed to:", chain);
      setUserAddress(chain);
    });
  };

  useEffect(() => {
    if (!isAuthenticated) router.replace("/");

    // Account switching
    handleSwitch();

    // Ethereum global object gives undefined error when page is refreshed
    setUserAddress(user?.get("ethAddress"));
    // setUserAddress(ethereum?.selectedAddress);
  }, [isAuthenticated, router, user, Moralis]);

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
