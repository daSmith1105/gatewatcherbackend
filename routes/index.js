const gatecustomerController = require('../controllers').gatecustomer;
const gateuserController = require('../controllers').gateuser;
const gateController = require('../controllers').gate;
const gatecompanyController = require('../controllers').gatecompany;
const gatepersonController = require('../controllers').gateperson;
const gatelpnController = require('../controllers').gatelpn;
const gateeventController = require('../controllers').gateevent;
const gatetypeController = require('../controllers').gatetype;
const gateaclController = require('../controllers').gateacl;
const gategroupController = require('../controllers').gategroup;
const gateassignmentController = require('../controllers').gateassignment;


module.exports = (app) => {

    // Gate customer operations
    app.post('/api/gatecustomer', gatecustomerController.create);

    // Gate Assignment
    app.post('/api/gateassignment/:bCustomerID', gateassignmentController.create);

    // Gate operations
    app.post('/api/gate/:bCustomerID', gateController.create);

    // Gate user operations
    app.post('/api/gateuser/:bCustomerID', gateuserController.create);
    app.get('/api/finduser/:username/:password', gateuserController.findUser);

    // Gate company operations
    app.post('/api/gatecompany/:bCustomerID', gatecompanyController.create);

    // Gate driver operations
    app.post('/api/gateperson/:bCustomerID', gatepersonController.create);
    app.get('/api/gatepeoplebylpn/:id', gatepersonController.listByLPN);


    // Gate LPN operations
    app.post('/api/gatelpn/:bCustomerID', gatelpnController.create);

    //Gate event operations
    app.post('/api/gateevent/:bCustomerID', gateeventController.create);

    //Gate event type operations
    app.post('/api/gatetype/:bCustomerID', gatetypeController.create);

     //Gate access type operations
     app.post('/api/gateacl', gateaclController.create);

    //Gate group type operations
    app.post('/api/gategroup', gategroupController.create);

    // Get All
    app.get('/api/gatecustomers', gatecustomerController.listAll);
    app.get('/api/gates', gateController.listAll);
    app.get('/api/gateusers', gateuserController.listAll);
    app.get('/api/gatecompanies', gatecompanyController.listAll);
    app.get('/api/gatepeople', gatepersonController.listAll);
    app.get('/api/gatelpns', gatelpnController.listAll);
    app.get('/api/gateevents', gateeventController.listAll);
    app.get('/api/gatetypes', gatetypeController.listAll);
    app.get('/api/gateauthtypes', gateaclController.listAll);
    app.get('/api/gategroups', gategroupController.listAll);
    app.get('/api/gateassignments', gateassignmentController.listAll);

    // Get By Customer
    app.get('/api/gatesbycustomer/:id', gateController.listByCustomer); 
    app.get('/api/gateusersbycustomer/:id', gateuserController.listByCustomer); 
    app.get('/api/gatecompaniesbycustomer/:id', gatecompanyController.listByCustomer);
    app.get('/api/gatepeoplebycustomer/:id', gatepersonController.listByCustomer);
    app.get('/api/gatelpnsbycustomer/:id', gatelpnController.listByCustomer);
    app.get('/api/gateeventsbycustomer/:id', gateeventController.listByCustomer);
    app.get('/api/gatetypesbycustomer/:id', gatetypeController.listByCustomer);
    app.get('/api/gateassignmentsbycustomer/:id', gateassignmentController.listByCustomer);

    // Get By Company
    app.get('/api/gatepeoplebycompany/:id', gatepersonController.listByCompany);
    app.get('/api/gatelpnsbycompany/:id', gatelpnController.listByCompany);
    app.get('/api/gateeventsbycompany/:id', gateeventController.listByCustomer);

    // Get By Person
    app.get('/api/gatelpnsbyperson/:id', gatelpnController.listByPerson);
    app.get('/api/gateeventsbyperson/:id', gateeventController.listByPerson);

    // Get By Guard ID
    app.get('/api/gateassignmentbyguard/:id', gateassignmentController.listByGuard);

    // Get By ID
    app.get('/api/gatecustomerbyid/:id', gatecustomerController.listById);
    app.get('/api/gatebyid/:id', gateController.listById); 
    app.get('/api/gateuserbyid/:id', gateuserController.listById);
    app.get('/api/gatecompanybyid/:id', gatecompanyController.listById);
    app.get('/api/gatepersonbyid/:id', gatepersonController.listById);
    app.get('/api/gatelpnbyid/:id', gatelpnController.listById);
    app.get('/api/gateeventbyid/:id', gateeventController.listById);
    app.get('/api/gatetypebyid/:id', gatetypeController.listById);

    // Get Guards
    app.get('/api/gateguards', gateuserController.listAllGuards);
    app.get('/api/gateguardsbycustomer/:id', gateuserController.listGuardsByCustomer);


    // Delete stuff
    app.delete('/api/gateuserdestroy/:id', gateuserController.destroy);
    app.delete('/api/gatecustomerdestroy/:id', gatecustomerController.destroy);
    app.delete('/api/gatedestroy/:id', gateController.destroy);
    app.delete('/api/gatecompanydestroy/:id', gatecompanyController.destroy);
    app.delete('/api/gatepersondestroy/:id', gatepersonController.destroy);
    app.delete('/api/gatelpndestroy', gatelpnController.destroy);
    app.delete('/api/gateassignmentdestroy', gateassignmentController.destroy);

    // Update
    app.post('/api/gatecustomerupdate/:id', gatecustomerController.update);
    app.post('/api/gateupdate/:id', gateController.update); 
    app.post('/api/gateuserupdate/:id', gateuserController.update);
    app.post('/api/gatecompanyupdate/:id', gatecompanyController.update);
    app.post('/api/gatepersonupdate/:id', gatepersonController.update);
    app.post('/api/gatelpnupdate/:id', gatelpnController.update);
    app.post('/api/gateeventupdate/:id', gateeventController.update);
    app.post('/api/gateassignmentupdate/:id', gateassignmentController.update);

    // Get by Gate ID
    app.get('/api/gateeventsbygate/:id', gateeventController.listByGateId);
};