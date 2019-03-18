const GateType = require('../models').GateType;

module.exports = {
    create(req, res) {
        return GateType
            .create({
                sName: req.body.sName,
                bCustomerID: req.params.bCustomerID,
            })
            .then(gatetype=> res.status(201).send(gatetype))
            .catch(error => res.status(400).send(error));
    },

    listAll(req, res) {
        return GateType
        .findAndCountAll({
          attributes: [ 'id', 'sName' ]
        })
        .then(gatetype => {
            if (!gatetype) {
                return res.status(404).send({
                message: 'Gate Types Not Found',
                });
            }
            return res.status(200).send(gatetype);
            })
            .catch(error => res.status(400).send(error));
    },

    listByCustomer(req, res) {
        return GateType
          .findAndCountAll({
            where: { bCustomerID: req.params.id }
          })
          .then(gatetype => {
            if (!gatetype) {
              return res.status(404).send({
                message: 'Gate Types Not Found',
              });
            }
            return res.status(200).send(gatetype);
          })
          .catch(error => res.status(400).send(error));
      },

    listById(req, res) {
      return GateType.findOne({
        where: { id: req.params.id }
      })
      .then(gatetype => {
        if (!gatetype) {
          return res.status(404).send({
            message: 'Gate Type Not Found',
          });
        }
        return res.status(200).send(gatetype);
      })
      .catch(error => res.status(400).send(error));
    },
};