import type { User } from "@/interfaces/user.interface";
import { create } from "zustand";
import { loginAction } from "../actions/login.action";
import { checkAuthAction } from "../actions/check-auth.action";
import { registerAction } from "../actions/register.action";
import { auth } from "@/firebase/config";
import { signOut } from "firebase/auth";

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
  register: (fullName: string, email: string, password: string) => Promise<boolean>;
  logout: () => void;
  checkAuthStatus: () => Promise<boolean>;
  setFirebaseSession: (params: {
    token: string;
    uid: string;
    email: string;
    fullName: string;
  }) => void;
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

  register: async (fullName, email, password) => {
    try {
      const data = await registerAction(fullName, email, password);
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
    localStorage.removeItem("firebase_token");
    localStorage.removeItem("firebase_user");
    signOut(auth).catch((error) => console.error("Firebase signout error:", error));
    set({ user: null, token: null, authStatus: "not-authenticated" });
  },

  checkAuthStatus: async () => {
    const firebaseToken = localStorage.getItem("firebase_token");
    const firebaseUser = localStorage.getItem("firebase_user");

    if (firebaseToken && firebaseUser) {
      try {
        const parsedFirebaseUser = JSON.parse(firebaseUser) as User;
        set({
          user: parsedFirebaseUser,
          token: firebaseToken,
          authStatus: "authenticated",
        });
        return true;
      } catch (error) {
        console.log(error);
        localStorage.removeItem("firebase_token");
        localStorage.removeItem("firebase_user");
      }
    }

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

  setFirebaseSession: ({ token, uid, email, fullName }) => {
    const firebaseMappedUser: User = {
      id: uid,
      email,
      fullName,
      isActive: true,
      roles: ["user"],
    };

    localStorage.setItem("firebase_token", token);
    localStorage.setItem("firebase_user", JSON.stringify(firebaseMappedUser));
    set({
      user: firebaseMappedUser,
      token,
      authStatus: "authenticated",
    });
  },
}));
