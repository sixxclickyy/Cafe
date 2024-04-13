import { AxiosResponse } from "axios";
import $api from "../http/index";
import { LoginResponse } from "../interfaces/auth.interface";

class AuthService {
    static async login(email: string, password: string): Promise<AxiosResponse<LoginResponse>> {
        return $api.post<LoginResponse>('/auth/login', { email, password });
    }

    static async registration(email: string, password: string): Promise<AxiosResponse<LoginResponse>> {
        return $api.post<LoginResponse>('/auth/registration', { email, password });
    }

    static async logout() {
        return $api.post('/logout');
    }
}

export default AuthService;