import Head from "next/head";
import Center from "../components/Center";
import Player from "../components/Player";
import Sidebar from "../components/Sidebar";
import { getSession } from "next-auth/react";

export default function Home() {
  return (
    <div className="bg-black h-screen overflow-hidden w-screen">
      <Head>
        <title>Spotify Next</title>
        <link rel="icon" href="https://links.papareact.com/9xl" />
      </Head>
      <main className="flex">
        <Sidebar />
        <Center />
      </main>
      <div className="sticky bottom-0">
        <Player />
      </div>
    </div>
  );
}

/* export async function getServerSideProps(context) {
  // server side rendering, before client sees the page
  const session = await getSession(context);

  return {
    props: {
      session,
    },
  };
}
 */
