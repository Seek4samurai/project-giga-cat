import { Toaster } from "react-hot-toast";
import { MoralisProvider } from "react-moralis";
import "../styles/globals.css";

function MyApp({ Component, pageProps }) {
  return (
    <>
      <MoralisProvider
        serverUrl={process.env.NEXT_PUBLIC_MORALIS_SERVER_URL}
        appId={process.env.NEXT_PUBLIC_MORALIS_APP_ID}
      >
        <Component {...pageProps} />
        <div>
          <Toaster position="top-right" reverseOrder={false} />
        </div>
      </MoralisProvider>
    </>
  );
}

export default MyApp;
