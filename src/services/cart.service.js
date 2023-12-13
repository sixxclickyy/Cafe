import http from "../http-common";

class CartDataService {
    getAll() {
        return http.get("/carts");
    }

    get(id) {
        return http.get(`/carts/${id}`);
    }

    create(data) {
        return http.post("/carts", data);
    }

    update(id, data) {
        return http.put(`/carts/${id}`, data);
    }

    delete(id) {
        return http.delete(`/carts/${id}`);
    }

    deleteAll() {
        return http.delete(`/carts`);
    }
}

export default new CartDataService();