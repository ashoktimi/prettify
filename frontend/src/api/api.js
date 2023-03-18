import axios from "axios";

const BASE_URL = process.env.REACT_APP_BASE_URL || "http://localhost:3001";

/** API Class.

 * Static class tying together methods used to get/send to to the API.
 *  
 */

class PrettifyApi{
    // the token for interactive with the API will be stored here.
    static token;

    static async request(endpoint, data = {}, method = "get"){
        console.log("API call:", endpoint, data, method);

        const url = `${BASE_URL}/${endpoint}`;
        const headers = { Authorization: `Bearer ${PrettifyApi.token}` };
        const params = (method === "get")
            ? data
            : {};
    
        try {
          return (await axios({ url, method, data, params, headers })).data;
      
        } catch (err) {
          console.error("API Error:", err.response);
          let message = err.response.data.error.message;
          throw Array.isArray(message) ? message : [message];
        }

    }

    // Individual API routes

    /** Get the current user. */

    static async getCurrentUser(username) {
      let res = await this.request(`users/${username}`);
      return res.user;
    }

    /** Get all brands. */
    static async getBrands() {
      let res = await this.request('brands');
      return res;
    }

    /** Get details on a brand by id. */
    static async getBrand(id) {
      let res = await this.request(`brands/${id}`);
      return res.brand;
    }

    /** Get all categories. */
    static async getCategories() {
      let res = await this.request('categories');
      return res;
    }

    /** Get details on a category by id. */
    static async getCategory(id) {
      let res = await this.request(`categories/${id}`);
      return res.category;
    }

    /** Get all taglists. */
    static async getTaglists() {
      let res = await this.request('tags');
      return res;
    }

    /** Get details on a taglist by id. */
    static async getTaglist(id) {
      let res = await this.request(`tags/${id}`);
      return res.taglists;
    }

    /** Get all products */
    static async getProducts(name) {
      let res = await this.request('products', { name });
      return res;
    }
    /** Get specific  products list */
    static async getSpecialProducts() {
      let res = await this.request('products/lists');
      return res;
    }
    /** Get random  products list */
    static async getRecProducts() {
      let res = await this.request('products/random');
      return res;
    }

    /** Get details on a product by id. */
    static async getProduct(id) {
      let res = await this.request(`products/${id}`);
      return res.product;
    }

    /** Get all types */
    static async getAllTypes(){
      let res = await this.request('types');
      return res;
    }

    /** Get  specific type. */
    static async getTypes(type) {
      let res = await this.request(`types/${type}`);
      return res;
    }

    /** Get details on a category by id. */
    static async getTypeDetail(id,type) {
      let res = await this.request(`types/${type}/${id}`);
      return res.type;
    }
  
    // /** Get token for login from username, password. */

    static async login(data) {
      let res = await this.request(`auth/token`, data, "post");
      return res.token;
    }

    /** Signup for site. */
  
    static async signup(data) {
      let res = await this.request(`auth/register`, data, "post");
      return res.token;
    }

    /** Get the userCarts. */
    static async getCarts(username) {
      let res = await this.request(`carts/${username}`);
      return res.user;
    }
    

    // /** Apply to a job */
    // static async applyToJob(username, id) {
    //   await this.request(`users/${username}/jobs/${id}`, {}, "post");
    // }


    // /** Save user profile page. */
    // static async saveProfile(username, data) {
    //   let res = await this.request(`users/${username}`, data, "patch");
    //   return res.user;
    // }
}

export default PrettifyApi;