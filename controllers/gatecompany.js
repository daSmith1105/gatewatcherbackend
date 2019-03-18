const GateCompany = require('../models').GateCompany;
const GatePerson = require('../models').GatePerson;
const GateCustomer = require('../models').GateCustomer;


module.exports = {
    create(req, res) {
        return GateCompany
            .create({
                sName: req.body.sName,
                fFlagged: req.body.fFlagged,
                bCustomerID: req.params.bCustomerID,
            })
            .then(gatecompany => res.status(201).send(gatecompany))
            .catch(error => res.status(400).send(error));
    },

    update(req, res) {
      const newData = {
        sName: req.body.sName,
        fFlagged: req.body.fFlagged,
        bCustomerID: req.body.bCustomerID,
      };

      return GateCompany
        .update( newData, {where: { id: req.params.id }})
        .then(gatecompany => res.status(200).send(gatecompany))
        .catch(error => res.status(400).send(error));
    },

    listAll(req, res) {
        return GateCompany
          .findAndCountAll({
            attributes: [ 'id', 'sName', 'fFlagged', 'deletedAt'],
            include: [
              { model: GateCustomer, attributes: [ 'id', 'sName'] },
              { model: GatePerson, attributes: [ 'id', 'sFirstName', 'sLastName', 'fFlagged', 'deletedAt' ] }
            ],
            paranoid: false
          })
          .then(gatecompany => res.status(200).send(gatecompany))
          .catch(error => res.status(400).send(error));
      },

      listByCustomer(req, res) {
        return GateCompany
          .findAndCountAll({
            where: { bCustomerID: req.params.id },
            attributes: [ 'id', 'sName', 'fFlagged', 'deletedAt'],
            include: [
              { model: GateCustomer, attributes: [ 'id', 'sName'] },
              { model: GatePerson, attributes: [ 'id', 'sFirstName', 'sLastName', 'fFlagged', 'deletedAt' ] }
            ],
            paranoid: false
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

      listById(req, res) {
        return GateCompany
        .findOne({
          where: { id: req.params.id },
          attributes: [ 'id', 'sName', 'fFlagged', 'deletedAt'],
            include: [
              { model: GateCustomer, attributes: [ 'id', 'sName'] },
              { model: GatePerson, attributes: [ 'id', 'sFirstName', 'sLastName', 'fFlagged', 'deletedAt' ] }
            ],
            paranoid: false
        })
        .then(gatecompany => {
          if (!gatecompany) {
            return res.status(404).send({
              message: 'Gate Company Not Found',
            });
          }
          return res.status(200).send(gatecompany);
        })
        .catch(error => res.status(400).send(error));
      },

      destroy(req, res) {
        return GateCompany
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