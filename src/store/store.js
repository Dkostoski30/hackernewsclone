import {createStore} from 'vuex'
import axios from 'axios'

export default createStore({
    state: {
        posts: [],
        post_details: null,
        postsWithComments: {}
    },
    mutations: {
        SET_POSTS: (state, posts) => {
            state.posts = posts;
        },
        SET_POST_DETAILS: (state, post_details) => {
            state.post_details = post_details;
        },
        SET_COMMENTS: (state, {post_id, comments}) => {
            if (!state.postsWithComments[post_id]) {
                state.postsWithComments[post_id] = { showComments: false, comments: [] };
            }
            state.postsWithComments[post_id].comments = comments;
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
                const response = await axios.get(`https://hacker-news.firebaseio.com/v0/item/${post_id}.json`)
                commit('SET_POST_DETAILS', response.data)
            }catch(err){
                console.log(err)
            }
        },
        async fetchComments({ commit }, commentIds) {
            return await Promise.all(
                commentIds.map(async (id) => {
                    const response = await axios.get(`https://hacker-news.firebaseio.com/v0/item/${id}.json`);
                    return response.data;
                })
            );
        },
    },
    getters: {
        getComments: (state) => (postId) => state.comments[postId] || [],
    },
})
