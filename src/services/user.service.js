import $api from "../http/index"

export default class UserService {
    static async getUsers() {
        return $api.get('/users');
    }
}