import Head from "next/head";
import { getProviders, signIn } from "next-auth/react";

const Login = ({ providers }) => {
  return (
    <div className="flex flex-col items-center bg-black min-h-screen w-full justify-center">
      <Head>
        <title>Spotify Next - Login</title>
        <link rel="icon" href="https://links.papareact.com/9xl" />
      </Head>
      <img
        className="w-52 mb-5"
        src="https://links.papareact.com/9xl"
        alt="spotify logo"
      />
      {Object.values(providers).map((provider) => (
        <div key={provider.name}>
          <button
            className="bg-[#18d860] p-5 text-white rounded-lg"
            onClick={() => signIn(provider.id, { callbackUrl: "/" })}
          >
            Login with {provider.name}
          </button>
        </div>
      ))}
      <h4 className="text-red-200 text-bold mt-2 italic">
        Open your Spotify app to check how this app controls your Spotify App
      </h4>
    </div>
  );
};

export default Login;

export async function getServerSideProps(context) {
  // server side rendering, before client sees the page
  const providers = await getProviders();

  return {
    props: {
      providers,
    },
  };
}
