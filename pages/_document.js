import { Html, Head, Main, NextScript } from "next/document";

export default function Document() {
  return (
    <Html lang="en">
      <Head />
      <body>
        <Main />
        <NextScript />
        {/* Stripe.js — must load before init.js */}
        <script src="https://js.stripe.com/v3/" async></script>
        {/* Always load init.js — works for static + SSR pages */}
        <script src="/init.js?v=8" defer></script>
      </body>
    </Html>
  );
}
