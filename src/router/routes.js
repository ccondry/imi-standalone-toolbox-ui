const routes = [{
  // catch-all to redirect to home view if no route matched
  path: '*',
  redirect: '/imi-standalone/'
}, {
  // the home page
  name: 'Home',
  path: '/imi-standalone/',
  component: () => import(`../views/home.vue`)
}]
export default routes