const GateGroup = require('../models').GateGroup;

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
      return GateGroup
        .findAndCountAll({
            attributes: [ 'id', 'sName' ]
        })
        .then(gategroup => res.status(200).send(gategroup))
        .catch(error => res.status(400).send(error));
    },
};