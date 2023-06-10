import { Html, Head, Main, NextScript } from "next/document";

export default function Document() {
    return (
        <Html lang="en">
            <Head>
                <link rel="icon" href="/favicon.png" />
                <meta name="description" content="KSU Srikandi IS" />
            </Head>
            <body>
                <Main />
                <NextScript />
            </body>
        </Html>
    );
}
