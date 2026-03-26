import { Html, Head, NextScript, Main } from "next/document";
import { withBasePath } from "../lib/basePath";

export default function Document() {
    return <Html lang="en">
        <Head>
            <link rel="icon" href={withBasePath("/favicon.ico")} />
        </Head>
        <body>
            <Main/>
            <NextScript/>
        </body>
    </Html>
}
