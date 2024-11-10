import {createStore} from 'vuex'
import axios from 'axios'

export default createStore({
    state: {
        posts: [],
        post_details: null,
    },
    mutations: {
        SET_POSTS: (state, posts) => {
            state.posts = posts;
        },
        SET_POST_DETAILS: (state, post_details) => {
            state.post_details = post_details;
        },
        SET_COMMENTS: (state, comments) => {
            state.comments = comments;
        }
    },
    actions: {
        async fetchPosts({ commit }) {
            try{
                const response = await axios.get('https://hacker-news.firebaseio.com/v0/topstories.json')
                const post_ids = response.data.slice(0, 7)
                const posts = await Promise.all(
                    post_ids.map(async (post_id) => {
                        const res = await axios.get(`https://hacker-news.firebaseio.com/v0/item/${post_id}.json`);
                        return res.data;
                    })
                )
                console.log(posts)
                commit('SET_POSTS', posts);
            }catch(err){console.log(err)}
        },
        async fetchPostDetails({ commit }, post_id) {
            try{
                const response = await axios.get(`https://hacker-news.firebaseio.com/v0/item/${post_id}`)
                commit('SET_POST_DETAILS', response.data)
            }catch(err){
                console.log(err)
            }
        },
        async fetchComments({ commit }, comment_ids) {
            try {
                const comments = await Promise.all(
                    comment_ids.map(async (id) => {
                        const response = await axios.get(`https://hacker-news.firebaseio.com/v0/item/${id}.json`);
                        return response.data;
                    })
                );
                commit('SET_COMMENTS', comments);
            } catch (err) {
                console.log(err);
            }
        }
    }
})
