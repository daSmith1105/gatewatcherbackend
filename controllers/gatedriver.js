const GateDriver = require('../models').GateDriver;

module.exports = {
    create(req, res) {
        return GateDriver
            .create({
                sFirstName: req.body.sFirstName,
                sLastName: req.body.sLastName,
                bCompanyID: req.params.bCompanyID,
            })
            .then(gatedriver => res.status(201).send(gatedriver))
            .catch(error => res.status(400).send(error));
    },
};