const GateAcl = require('../models').GateAcl;

module.exports = {
    create(req, res) {
        return GateAcl
            .create({
                sName: req.body.sName,
            })
            .then(gateacl => res.status(201).send(gateacl))
            .catch(error => res.status(400).send(error));
    },

    listAll(req, res) {
      return GateAcl
        .findAndCountAll({
            attributes: [ 'id', 'sName' ]
        })
        .then(gateacl=> res.status(200).send(gateacl))
        .catch(error => res.status(400).send(error));
    },
};