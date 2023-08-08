import { Html, Head, Main, NextScript } from "next/document";
import Script from "next/script";

export default function Document() {
  return (
    <Html lang="en">
      <Head>
        <Script
          async
          src="https://www.googletagmanager.com/gtag/js?id=G-W3YZ88PL2C"
        />
        <Script
          async
          src="https://securepubads.g.doubleclick.net/tag/js/gpt.js"
        />
        <Script
          async
          src="https://spn-v1.revampcdn.com/prebid/win-gg/prebid-client.js"
        />
        <Script
          async
          type="module"
          src="https://spn-v1.revampcdn.com/publishers/win-gg.js?modern=1"
        />
        <Script src="https://spn-v1.revampcdn.com/publishers/win-gg.js" />
        <script
          dangerouslySetInnerHTML={{
            __html: `
              window.dataLayer = window.dataLayer || [];
              function gtag(){dataLayer.push(arguments);}
              gtag('js', new Date());
              gtag('config', 'G-W3YZ88PL2C');
            `
          }}
        />
        <script
          dangerouslySetInnerHTML={{
            __html: `
              !function(t){function s(s,a){t.revamp.cmd.push([s,a])}t.revamp=t.revamp||{},t.revamp.cmd=[],t.revamp.displaySlots=t.revamp.displaySlots||function(){s("displayDeferredSlots",arguments)},t.revamp.destroySlots=t.revamp.destroySlots||function(){s("destroyGptSlots",arguments)},t.revamp.displayCustomInterstitial=t.revamp.displayCustomInterstitial||function(){s("displayCustomInterstitial",arguments)}}(window);;
            `
          }}
        />
      </Head>
      <body>
        <Main />
        <NextScript />
      </body>
    </Html>
  );
}
