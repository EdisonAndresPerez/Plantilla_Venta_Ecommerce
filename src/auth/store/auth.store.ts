import type { User } from "@/interfaces/user.interface";
import { create } from "zustand";
import { loginAction } from "../actions/login.action";

type authStore = {
  //properties
  user: User | null;
  token: string | null;

  //geeters

  //actions
  login: (email: string, password: string) => Promise<boolean>;
};

export const useStoreAuth = create<authStore>()((set) => ({
  //implementacion de store
  user: null,
  token: null,

  //acciones
  login: async (email, password) => {
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
}));
