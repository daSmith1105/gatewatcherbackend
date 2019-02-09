const gatecustomerController = require('../controllers').gatecustomer;
const gateuserController = require('../controllers').gateuser;
const gateController = require('../controllers').gate;
const gatecompanyController = require('../controllers').gatecompany;
const gatedriverController = require('../controllers').gatedriver;
const gatelpnController = require('../controllers').gatelpn;

module.exports = (app) => {

    app.get('/api', (req, res, next) => res.status(200).send({
        message: 'Welcome to the Gate API',
    }));

    app.get('/dog', (req, res, next) => res.status(200).send({
        message: 'Yay! Doggie. Bark, Bark.',
    }));

    // Gate customer operations
    app.get('/api/gatecustomers', gatecustomerController.listAll);
    app.get('/api/gatecustomers/:customerID', gatecustomerController.listOne);

    app.post('/api/gatecustomer', gatecustomerController.create);

    // Gate operations
    app.post('/api/gate/:bCustomerID', gateController.create);

    // Gate user operations
    app.post('/api/gateuser/:bCustomerID', gateuserController.create);

    // Gate company operations
    app.get('/api/gatecompanies', gatecompanyController.listAll);
    app.get('/api/gatecompany/:bCustomerID', gatecompanyController.listOne);

    app.post('/api/gatecompany/:bCustomerID', gatecompanyController.create);

    // Gate driver operations
    app.post('/api/gatedriver/:bCompanyID', gatedriverController.create);

    // Gate LPN operations
    app.post('/api/gatelpn/:bDriverID', gatelpnController.create);

    app.get('*', (req, res, next) => res.status(200).send({
        message: 'Welcome to the general page.',
    }));
};