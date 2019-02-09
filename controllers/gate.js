const Gate = require('../models').Gate;

module.exports = {
    create(req, res) {
        return Gate
            .create({
                sName: req.body.sName,
                sDir: req.body.sDir,
                fReportErrors: req.body.fReportErrors,
                bCustomerID: req.params.bCustomerID,
            })
            .then(gate=> res.status(201).send(gate))
            .catch(error => res.status(400).send(error));
    },
};