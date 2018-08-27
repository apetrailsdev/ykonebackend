const clientCtrl = require('../controllers/clientController');

module.exports = function(router) {

    router.get('/', (req, res) => {
        res.send("Api running!");
    });

    // Fetch data
    router.get('/fetchData', clientCtrl.fetchData);
    router.get('/clients', clientCtrl.getAll);
    router.post('/clients', clientCtrl.saveClient);
    router.get('/clients/:id', clientCtrl.getClientDetails);
    router.post('/clients/:id', clientCtrl.updateClientById);
    router.delete('/clients/:id', clientCtrl.deleteClientById);
      
    
    return router;
}