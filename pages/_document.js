import { Html, Head, Main, NextScript } from "next/document";

export default function Document() {
  return (
    <Html lang="en">
      <Head />
      <body>
        <Main />
        <NextScript />
        {/* Always load init.js — works for static + SSR pages */}
        <script src="/init.js?v=4" defer></script>
      </body>
    </Html>
  );
}
