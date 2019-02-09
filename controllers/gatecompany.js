const GateCompany = require('../models').GateCompany;
const GateDriver = require('../models').GateDriver;

module.exports = {
    create(req, res) {
        return GateCompany
            .create({
                sName: req.body.sName,
                sStreet: req.body.sStreet,
                sStreet2: req.body.sStreet2,
                sCity: req.body.sCity,
                sState: req.body.sState,
                sCountry: req.body.sCountry,
                sPhone: req.body.sPhone,
                sEmail: req.body.sEmail,
                sContactFirstName: req.sContactFirstName,
                sContactLastName: req.sContactLastName,
                bCustomerID: req.params.bCustomerID,
            })
            .then(gatecompany => res.status(201).send(gatecompany))
            .catch(error => res.status(400).send(error));
    },

    listAll(req, res) {
        return GateCompany
          .findAll({
            include: [{
              model: GateDriver,
              as: 'gatedrivers',
            }],
          })
          .then(gatecompany => res.status(200).send(gatecompany))
          .catch(error => res.status(400).send(error));
      },

      listOne(req, res) {
        return GateCompany
          .findByPk(req.params.companyID, {
            include: [{
                model: GateDriver,
                as: 'gatedrivers',
            }],
          })
          .then(gatecompany => {
            if (!gatecompany) {
              return res.status(404).send({
                message: 'Company Not Found',
              });
            }
            return res.status(200).send(gatecompany);
          })
          .catch(error => res.status(400).send(error));
      },
};