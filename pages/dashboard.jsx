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
    else {
      const showAccount = async () => {
        // Ethereum global object gives undefined error when page is refreshed
        setUserAddress(await account);
        // setUserAddress(ethereum?.selectedAddress);
      };
      showAccount();
    }
  }, [isAuthenticated, router, account]);

  useEffect(() => {
    const handleSwitching = () => {
      // Account switching
      console.log("Account changed to:", account);
      setUserAddress(account);
    };
    handleSwitching();
  }, [account]);

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
