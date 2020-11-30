import axios from "axios";
import authHeader from "../auth/authHeader"

const ROOT_URL = process.env.REACT_APP_API_URL;

class PostService {
    getPosts(subredditSlug, ordering) {
        let url = ROOT_URL + "/api/forums/posts/?ordering=" + ordering;
        if (subredditSlug) {
            url += '&slug=' + subredditSlug
        }
        return axios.get(
            url,
        ).then(response => {
            return response.data;
        })
    }

    getPost(id) {
        let url = ROOT_URL + "/api/forums/posts/" + id + "/";
        return axios.get(
            url,
        ).then(response => {
            return response.data;
        })
    }

    createPost(task) {
        return axios.post(
            ROOT_URL + "/api/forums/posts/",
            task,
            {headers: authHeader()}
        ).then(response => {
            return response.data;
        })
    }

    updatePost(post) {
        return axios.get(
            ROOT_URL + "/api/forums/posts/" + post.id + "/",
            {headers: authHeader()}
        ).then(response => {
            return response.data;
        })
    }
}

export default new PostService();