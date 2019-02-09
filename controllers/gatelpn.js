const GateLPN = require('../models').GateLPN;

module.exports = {
    create(req, res) {
        return GateLPN
            .create({
                sLPN: req.body.sLPN,
                bDriverID: req.params.bDriverID,
            })
            .then(gatelpn => res.status(201).send(gatelpn))
            .catch(error => res.status(400).send(error));
    },
};