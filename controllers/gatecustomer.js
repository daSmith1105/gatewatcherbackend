const GateCustomer = require('../models').GateCustomer;
const GateUser = require('../models').GateUser;
const Gate = require('../models').Gate;
const GateCompany = require('../models').GateCompany;
const GateDriver = require('../models').GateDriver;

module.exports = {
    create(req, res) {
        return GateCustomer
            .create({
                sName: req.body.sName,
                sDir: req.body.sDir,
                sDomain: req.body.sDomain,
                fPublic: req.body.fPublic
            })
            .then(gatecustomer => res.status(201).send(gatecustomer))
            .catch(error => res.status(400).send(error));
    },
      // Return All Gate Customers with associated GateUsers and Gates
      listAll(req, res) {
        return GateCustomer
          .findAll({
           include: [{ 
               all: true, nested: true 
            }]
          })
          .then(gatecustomer => res.status(200).send(gatecustomer))
          .catch(error => res.status(400).send(error));
      },
      // Return a single Gate Customer by id
      listOne(req, res) {
        return GateCustomer
          .findByPk(req.params.customerID, {
            include: [{ 
                all: true, nested: true 
             }]
           })
          .then(gatecustomer => {
            if (!gatecustomer) {
              return res.status(404).send({
                message: 'Customer Not Found',
              });
            }
            return res.status(200).send(gatecustomer);
          })
          .catch(error => res.status(400).send(error));
      },
};