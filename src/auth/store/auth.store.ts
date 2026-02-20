import type { User } from "@/interfaces/user.interface";
import { create } from "zustand";
import { loginAction } from "../actions/login.action";
import { checkAuthAction } from "../actions/check-auth.action";

type authStatus = "authenticated" | "not-authenticated" | "checking";

type authStore = {
  //properties
  user: User | null;
  token: string | null;
  authStatus: authStatus;

  //geeters
  isAdmin: () => boolean;

  //actions
  login: (email: string, password: string) => Promise<boolean>;
  logout: () => void;
  checkAuthStatus: () => Promise<boolean>;
};

export const useStoreAuth = create<authStore>()((set, get) => ({
  //implementacion de store
  user: null,
  token: null,
  authStatus: "checking",


  //getters
  isAdmin: () => {
    const  roles  = get().user?.roles || [];
    return roles.includes("admin");
  },







  //acciones
  login: async (email, password) => {
    console.log({ email, password });
    try {
      const data = await loginAction(email, password);
      localStorage.setItem("token", data.token);
      set({ user: data.user, token: data.token, authStatus: "authenticated" });
      return true;
    } catch (error) {
      console.log(error);
      localStorage.removeItem("token");
      set({ user: null, token: null, authStatus: "not-authenticated" });
      return false;
    }
  },
  logout: () => {
    localStorage.removeItem("token");
    set({ user: null, token: null, authStatus: "not-authenticated" });
  },

  checkAuthStatus: async () => {
    try {
      const { user, token } = await checkAuthAction();
      set({
        user: user,
        token: token,
        authStatus: "authenticated",
      });
      return true;
    } catch (error) {
      console.log(error);
      set({ user: null, token: null, authStatus: "not-authenticated" });
      return false;
    }
  },
}));
