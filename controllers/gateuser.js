const GateUser = require('../models').GateUser;

module.exports = {
    create(req, res) {
        return GateUser
            .create({
                sFirstName: req.body.sFirstName,
                sLastName: req.body.sLastName,
                sPhone: req.body.sPhone,
                sEmail: req.body.sEmail,
                sUsername: req.body.sUsername,
                sPassword: req.body.sPassword,
                fAdmin: req.body.fAdmin,
                bCustomerID: req.params.bCustomerID,
            })
            .then(gateuser => res.status(201).send(gateuser))
            .catch(error => res.status(400).send(error));
    },
};