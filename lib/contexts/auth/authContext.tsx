import {
  ApiError,
  AuthChangeEvent,
  Provider,
  Session,
  User,
} from "@supabase/supabase-js";
import {
  FunctionComponent,
  PropsWithChildren,
  ReactNode,
  createContext,
  useEffect,
  useState,
} from "react";

import { supabase } from "@lib/supabase";

type SignInOptions = {
  email?: string;
  provider?: Provider;
};

type SignInResponse = Promise<{
  session: Session | null;
  user: User | null;
  provider?: Provider | undefined;
  url?: string | null | undefined;
  error: ApiError | null;
}>;

type SignOutResponse = Promise<{
  error: ApiError | null;
}>;

export type AuthContextProps = {
  session: Session | null;
  user: User | null;
  signIn: (options: SignInOptions) => SignInResponse;
  signOut: () => SignOutResponse;
};

export const AuthContext = createContext<AuthContextProps | undefined>(
  undefined
);

type Props = {
  children?: ReactNode;
};

export const AuthProvider: FunctionComponent<PropsWithChildren<Props>> = ({
  children,
}: Props) => {
  const [session, setSession] = useState<Session | null>(null);
  const [user, setUser] = useState<User | null>(null);

  const setServerSession = async (
    event: AuthChangeEvent,
    session: Session | null
  ) => {
    await fetch("/api/auth", {
      method: "POST",
      headers: new Headers({ "Content-Type": "application/json" }),
      credentials: "same-origin",
      body: JSON.stringify({ event, session }),
    });
  };

  useEffect(() => {
    const session = supabase.auth.session();
    setSession(session);
    setUser(session?.user ?? null);
    const { data: authListener } = supabase.auth.onAuthStateChange(
      async (event, session) => {
        await setServerSession(event, session);
        setSession(session);
        setUser(session?.user ?? null);
      }
    );

    /* cleanup function */
    return () => authListener?.unsubscribe();
  }, []);

  const values = {
    session,
    user,
    signIn: async (options: SignInOptions) =>
      await supabase.auth.signIn(options),
    signOut: async () => await supabase.auth.signOut(),
  };

  return <AuthContext.Provider value={values}>{children}</AuthContext.Provider>;
};
