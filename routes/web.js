module.exports = function(router) {

    router.get('/', (req, res) => {
        res.send("App running!");
    });
    
    return router;
}
