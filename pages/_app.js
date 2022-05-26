import SimplyContext from "../context/SimplyContext";
import "../styles/globals.css";
import { Toaster } from "react-hot-toast";
import { ThemeProvider } from "next-themes";

function MyApp({ Component, pageProps }) {
  return (
    <SimplyContext>
      <ThemeProvider attribute="class" disableTransitionOnChange>
        <Component {...pageProps} />
        <Toaster position="top-right" />
      </ThemeProvider>
    </SimplyContext>
  );
}

export default MyApp;
