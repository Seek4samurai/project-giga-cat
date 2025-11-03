import { Toaster } from "react-hot-toast";
import "../styles/globals.css";

function MyApp({ Component, pageProps }) {
  return (
    <>
      <Component {...pageProps} />
      <div>
        <Toaster position="top-right" reverseOrder={false} />
      </div>
    </>
  );
}

export default MyApp;
