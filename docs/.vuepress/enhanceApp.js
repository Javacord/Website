require("katex/dist/katex.min.css");
require("katex/dist/katex.min.js");

export default ({ router }) => {
    router.addRoutes([
        // These are still used in the README
        { path: '/wiki/essential-knowledge/working-with-optionals/', redirect: '/wiki/essential-knowledge/optionals.html' },
        { path: '/wiki/essential-knowledge/working-with-futures/', redirect: '/wiki/essential-knowledge/completable-futures.html' }
    ])
}