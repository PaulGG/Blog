import Vue from "vue";
import Router from "vue-router";
import Home from "./views/Home.vue";
import Post from "./components/Post.vue";
import NewPost from "./views/NewPost.vue";
import Login from "./views/Login.vue";
import Register from "./views/Register.vue";

Vue.use(Router);

export default new Router({
  mode: "history",
  base: process.env.BASE_URL,
  routes: [
    {
      path: "/",
      name: "home",
      component: Home,
    },
    {
        path: "/posts/:id/:title",
        name: "Posts",
        component: Post,
        props: true,
    },
    {
        path: "/newpost",
        name: "newpost",
        component: NewPost,
    },
    {
        path: "/login",
        name: "login",
        component: Login
    },
    {
        path: "/register",
        name: "register",
        component: Register
    }
    // {
    //   path: '/about',
    //   name: 'about',
    //   // route level code-splitting
    //   // this generates a separate chunk (about.[hash].js) for this route
    //   // which is lazy-loaded when the route is visited.
    //   component: () => import(/* webpackChunkName: "about" */ './views/About.vue'),
    // },
  ],
});
