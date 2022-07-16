import SimplyContext from "../context/SimplyContext";
import "../styles/globals.css";
import { Toaster } from "react-hot-toast";
import { ThemeProvider } from "next-themes";
import { DefaultSeo } from "next-seo";
import { SERVER } from "../components/utils/constants";
function MyApp({ Component, pageProps }) {
  return (
    <SimplyContext>
      <DefaultSeo
        title="Simplyfor.dev / simply create your own portfolio"
        description="Simplyfor.dev is a platform to create your own portfolio. Create your own portfolio and share it with the world."
        openGraph={{
          title: "Simplyfor.dev / simply create your own portfolio",
          description:
            "Simplyfor.dev is a platform to create your own portfolio. Create your own portfolio and share it with the world.",
          url: `${SERVER}`,
          type: "website",
          images: [
            {
              url: `${SERVER}/logo.png`,
              width: 800,
              height: 600,
              alt: "Simplyfor.dev",
            },
          ],
        }}
        twitter={{
          handle: "@shashippk",
          site: "@shashippk",
          cardType: "summary_large_image",
          creator: "@shashippk",
          image: `${SERVER}/logo.png`,
          description:
            "Simplyfor.dev is a platform to create your own portfolio. Create your own portfolio and share it with the world.",
        }}
      />
      <ThemeProvider attribute="class" disableTransitionOnChange>
        <Component {...pageProps} />
        <Toaster position="top-right" />
      </ThemeProvider>
    </SimplyContext>
  );
}

export default MyApp;
