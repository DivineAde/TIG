import Head from "next/head";
import { Inter } from "next/font/google";
import { useSession, signIn } from "next-auth/react";
import Results from "@/components/Results";

const inter = Inter({ subsets: ["latin"] });

export default function Home({ brand }) {
  const { data: session } = useSession();

  if (!session) {
    return (
      <main className="bg-blue-700 w-full h-screen flex items-center justify-center">
        <button
          className=" bg-white px-2 py-3 rounded-md font-semibold"
          onClick={() => {
            signIn();
          }}
        >
          Sign in
        </button>
      </main>
    );
  }

  return (
    <main className="bg-white">
      <Head>
        <title>TGL GALLERY</title>
      </Head>

      <Results />
    </main>
  );
}
