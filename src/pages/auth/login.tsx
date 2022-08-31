import Button from "components/Button";
import Card from "components/Card";
import Spinner from "components/Spinner";
import { NextPage } from "next";
import { signIn, useSession } from "next-auth/react";
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
      <Card title="Login">
          <Button onClick={() => signIn("discord", { callbackUrl: `${location.origin}/dashboard` })} className="mt-4 px-12">
            Login with Discord
          </Button>
      </Card>
    </div>
  );
};

export default Login;
