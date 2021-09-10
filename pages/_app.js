import "../styles/globals.css";

// Global css can be added here and only here.
// We can do so by importing a CSS module like so:
// import "../styles/global.css";
// This'll then automatically get applied to the global stylesheet

function MyApp({ Component, pageProps }) {
    return <Component {...pageProps} />;
}

export default MyApp;
