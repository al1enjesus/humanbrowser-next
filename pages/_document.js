import { Html, Head, Main, NextScript } from "next/document";

export default function Document() {
  return (
    <Html lang="en">
      <Head>
        {/* Favicon — all sizes for Google Search + browsers */}
        <link rel="icon" type="image/x-icon" href="/favicon.ico" />
        <link rel="icon" type="image/png" sizes="48x48" href="/favicon.ico" />
        <link rel="icon" type="image/png" sizes="192x192" href="/logo-192.png" />
        <link rel="icon" type="image/png" sizes="512x512" href="/logo-512.png" />
        <link rel="apple-touch-icon" sizes="1024x1024" href="/apple-touch-icon.png" />
        <link rel="manifest" href="/manifest.json" />
        <meta name="theme-color" content="#7c3aed" />
        {/* Google will use logo-512.png as the site icon in search results */}
        <link rel="preload" as="image" href="/logo-512.png" />
      </Head>
      <body>
        <Main />
        <NextScript />
        {/* Stripe.js — must load before init.js */}
        <script src="https://js.stripe.com/v3/" async></script>
        {/* Always load init.js — works for static + SSR pages */}
        <script src="/init.js?v=14" defer></script>
      </body>
    </Html>
  );
}
