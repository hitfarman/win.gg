import { Html, Head, Main, NextScript } from "next/document";

export default function Document() {
  return (
    <Html lang="en">
      <Head>
        <script
          async
          src="https://www.googletagmanager.com/gtag/js?id=G-W3YZ88PL2C"
        />
        <script
          async
          src="https://securepubads.g.doubleclick.net/tag/js/gpt.js"
        />
        <script
          async
          src="https://spn-v1.revampcdn.com/prebid/win-gg/prebid-client.js"
        />
        <script
          async
          type="module"
          src="https://spn-v1.revampcdn.com/publishers/win-gg.js?modern=1"
        />
        <script src="https://spn-v1.revampcdn.com/publishers/win-gg.js" />
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
