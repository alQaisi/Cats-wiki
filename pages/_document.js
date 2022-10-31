import { Html,Head,Main,NextScript } from "next/document";

export default function document(){
    return(
        <Html lang="en">
            <Head>
                <link rel="icon" href="/favicon.ico" />
            </Head>
            <body>
                <Main/>
                <NextScript/>
            </body>
        </Html>
    );
}