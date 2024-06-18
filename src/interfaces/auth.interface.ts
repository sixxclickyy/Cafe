import { Profile } from "./user.interface";

export interface LoginResponse {
    access_token: string;
    refreshToken: string;
    user: Profile;
    name: string;
    email: string;
    isAdmin: boolean;
}