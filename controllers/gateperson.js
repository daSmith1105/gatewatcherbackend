const GatePerson = require('../models').GatePerson;
const GateCompany = require('../models').GateCompany;
const GateCustomer = require('../models').GateCustomer;
const GateGroup = require('../models').GateGroup;
const GateLPN = require('../models').GateLPN;

module.exports = {
    create(req, res) {
        return GatePerson
            .create({
                sFirstName: req.body.sFirstName,
                sLastName: req.body.sLastName,
                bCompanyID: req.body.bCompanyID,
                bGroupID: req.body.bGroupID,
                bLpnID: req.body.bLpnID,
                fFlagged: req.body.fFlagged,
                bCustomerID: req.params.bCustomerID,
            })
            .then(gateperson => res.status(201).send(gateperson))
            .catch(error => res.status(400).send(error));
    },

    update(req, res) {
      const newData = {
        sFirstName: req.body.sFirstName,
        sLastName: req.body.sLastName,
        bCompanyID: req.body.bCompanyID,
        bGroupID: req.body.bGroupID,
        bLpnID: req.body.bLpnID,
        fFlagged: req.body.fFlagged,
        bCustomerID: req.body.bCustomerID,
      };

      return GatePerson
        .update( newData, {where: { id: req.params.id }})
        .then(gateperson => res.status(200).send(gateperson))
        .catch(error => res.status(400).send(error));
    },

    listByCompany(req, res) {
        return GatePerson
          .findAndCountAll({
            where: { bCompanyID: req.params.id },
            attributes: [ 'id', 'sFirstName', 'sLastName', 'fFlagged', 'deletedAt'],
            include: [
              { model: GateCompany, attributes: [ 'id', 'sName' ] },
              { model: GateCustomer, attributes: [ 'id', 'sName' ]},
              { model: GateGroup, attributes: [ 'id', 'sName' ] },
              { model: GateLPN, attributes: [ 'id', 'sLPN' ] },
            ],
             paranoid: false
           })
          .then(gateperson => {
            if (!gateperson) {
              return res.status(404).send({
                message: 'Person Not Found',
              });
            }
            return res.status(200).send(gateperson);
          })
          .catch(error => res.status(400).send(error));
    },

    listByCustomer(req, res) {
      return GatePerson
          .findAndCountAll({
            where: { bCustomerID: req.params.id },
            attributes: [ 'id', 'sFirstName', 'sLastName', 'fFlagged', 'deletedAt'],
            include: [
              { model: GateCompany, attributes: [ 'id', 'sName' ] },
              { model: GateCustomer, attributes: [ 'id', 'sName' ] },
              { model: GateGroup, attributes: [ 'id', 'sName' ] },
              { model: GateLPN, attributes: [ 'id', 'sLPN' ] },
            ],
            paranoid: false
          })
        .then(gateperson => {
          if (!gateperson) {
            return res.status(404).send({
              message: 'Person Not Found',
            });
          }
          return res.status(200).send(gateperson);
        })
        .catch(error => res.status(400).send(error));
    },

    listById(req, res) {
        return GatePerson
          .findOne({
            where: { id: req.params.id },
            paranoid: false
           })
          .then(gateperson => {
            if (!gateperson) {
              return res.status(404).send({
                message: 'Person Not Found',
              });
            }
            return res.status(200).send(gateperson);
          })
          .catch(error => res.status(400).send(error));
      },

      listAll(req, res) {
        return GatePerson
          .findAndCountAll({
            attributes: [ 'id', 'sFirstName', 'sLastName', 'fFlagged', 'deletedAt'],
            include: [
              { model: GateCompany, attributes: [ 'id', 'sName' ] },
              { model: GateCustomer, attributes: [ 'id', 'sName' ]},
              { model: GateGroup, attributes: [ 'id', 'sName' ] },
              { model: GateLPN, attributes: [ 'id', 'sLPN' ] },
            ],
            paranoid: false
          })
          .then(gateperson => res.status(200).send(gateperson))
          .catch(error => res.status(400).send(error));
      },

      listByLPN(req, res) {
        return GatePerson
        .findAndCountAll({
          where: { bLpnID: req.params.id }, 
          paranoid: false
         })
        .then(gateperson => {
          if (!gateperson) {
            return res.status(404).send({
              message: 'Person Not Found for this LPN. Add a person.',
            });
          }
          return res.status(200).send(gateperson);
        })
        .catch(error => res.status(400).send(error));
      },

      destroy(req, res) {
        return GatePerson
          .destroy({
            where: { id: req.params.id }
        })
        .then(function(rowDeleted){ // rowDeleted will return number of rows deleted
          if(rowDeleted === 1){
             console.log('Deleted successfully');
           }
        }, function(err){
            console.log(err); 
        });
      }
      
};