import Spinner from "components/Spinner";
import { NextPage } from "next";
import { signIn, signOut, useSession } from "next-auth/react";
import { trpc } from "utils/trpc";

const Login: NextPage = () => {
  const { data: session, status } = useSession();

  const postMessage = trpc.useMutation("team.create");
  
  const createTeam = () => {
    postMessage.mutate({
      name: "Team",
      description: "Empty",
    });
  }

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
          <button onClick={() => { createTeam() }}>Create Team</button><br />
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
