import Spinner from "components/Spinner";
import { NextPage } from "next";
import { signIn, signOut, useSession } from "next-auth/react";

const Login: NextPage = () => {
  const { data: session, status } = useSession();

  if (status === "loading") {
    return (
      <div className="flex-1 flex justify-center items-center">
        <div>
          <Spinner className="h-16 w-16" />
        </div>
      </div>
    );
  }

  return (
    <main>
      <h1>Guestbook</h1>
      {session ? (
        <div>
          <p>
            hi {session.user?.name}
          </p>
          <button onClick={() => { undefined }}>Create Team</button>
          <button onClick={() => signOut()}>Logout</button>
        </div>
      ) : (
        <div>
          <button onClick={() => signIn("discord")}>Login with Discord</button>
        </div>
      )}
    </main>
  );
};

export default Login;
