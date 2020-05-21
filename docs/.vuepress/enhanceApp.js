export default ({ router }) => {
  router.addRoutes([
    { path: '/wiki/', redirect: '/wiki/getting-started/' },
  ])
}