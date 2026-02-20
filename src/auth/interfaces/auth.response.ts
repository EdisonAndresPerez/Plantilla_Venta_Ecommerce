import type { User } from "@/interfaces/user.interface";



//funciona para login y registro, devuelve el usuario y el token
export interface AuthResponse {
    user:  User;
    token: string;
}

