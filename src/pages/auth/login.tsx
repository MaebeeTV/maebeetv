import Spinner from "components/Spinner";
import { NextPage } from "next";
import { signIn, signOut, useSession } from "next-auth/react";
import { useRouter } from "next/router";

const Login: NextPage = () => {
  const { data: session, status } = useSession();
  const router = useRouter();

  if (status === "loading") {
    return (
      <div className="flex-1 flex justify-center items-center">
        <div>
          <Spinner className="h-16 w-16" />
        </div>
      </div>
    );
  }
  if (session) {
    router.push("/dashboard")
  }

  return (
    <div className="flex-1 flex justify-center items-center">
      <div className="p-6 max-w-sm rounded-lg border border-gray-200 shadow-md dark:border-gray-700">
          <a href="#">
              <h1 className="mb-2 text-2xl font-bold tracking-tight text-gray-900 dark:text-white">Login</h1>
          </a>
          <button onClick={() => signIn("discord")} className="inline-flex items-center py-2 px-6 text-sm font-medium text-center text-black focus:ring-4 focus:outline-none bg-[#FF9DD0]">
          Login with Discord
          </button>
      </div>
    </div>
  );
};

export default Login;
