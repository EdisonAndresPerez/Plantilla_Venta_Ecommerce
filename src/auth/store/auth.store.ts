import type { User } from "@/interfaces/user.interface";
import { create } from "zustand";

type authStore = {
  //properties
  user: User | null;
  token: string | null;

  //geeters

  //actions
};

export const useStoreAuth = create<authStore>()((set) => ({
  //implementacion de store
  user: null,
  token: null,
}));
