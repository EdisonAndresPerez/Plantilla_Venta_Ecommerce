import type { User } from "@/interfaces/user.interface";
import { create } from "zustand";
import { loginAction } from "../actions/login.action";

type authStatus = "authenticated" | "not-authenticated" | "checking";

type authStore = {
  //properties
  user: User | null;
  token: string | null;
  authStatus: authStatus;

  //geeters

  //actions
  login: (email: string, password: string) => Promise<boolean>;
  logout: () => void;
};

export const useStoreAuth = create<authStore>()((set) => ({
  //implementacion de store
  user: null,
  token: null,
  authStatus: "checking",

  //acciones
  login: async (email, password) => {
    console.log({ email, password });
    try {
      const data = await loginAction(email, password);
      localStorage.setItem("token", data.token);
      set({ user: data.user, token: data.token });
      return true;
    } catch (error) {
      console.log(error);
      localStorage.removeItem("token");
      set({ user: null, token: null });
      return false;
    }
  },
  logout: () => {
    localStorage.removeItem("token");
    set({ user: null, token: null });
  },
}));
