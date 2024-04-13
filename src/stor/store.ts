import { makeAutoObservable } from "mobx";
import { Profile } from "../interfaces/user.interface";
import AuthService from "../services/auth.service";
import { AxiosError } from "axios";

export default class Store {
    user = {} as Profile;

    constructor() {
        makeAutoObservable(this);
    }

    setUser(user: Profile) {
        this.user = user;
    }

    async login(email: string, password: string) {
        try {
            const response = await AuthService.login(email, password);
            localStorage.setItem('token', response.data.accessToken);
            this.setUser(response.data.user)
        } catch (e) {
            if (e instanceof AxiosError) {
                throw new Error(e.message)
            }
        }
    }

    async registration(email: string, password: string) {
        try {
            const response = await AuthService.registration(email, password);
            localStorage.setItem('token', response.data.accessToken);
            this.setUser(response.data.user)
        } catch (e) {
            if (e instanceof AxiosError) {
                throw new Error(e.message)
            }
        }
    }

    async logout() {
        try {
            const response = await AuthService.logout();
            localStorage.removeItem('token');
            this.setUser({} as Profile)
        } catch (e) {
            if (e instanceof AxiosError) {
                throw new Error(e.message)
            }
        }
    }
}