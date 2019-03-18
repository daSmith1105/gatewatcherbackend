const GateCustomer = require('../models').GateCustomer;
const GateCompany = require('../models').GateCompany;
const GateAssignment = require('../models').GateAssignment;
const GateEvent = require('../models').GateEvent;
const GateLPN = require('../models').GateLPN;
const Gate = require('../models').Gate;
const GateUser = require('../models').GateUser;
const GatePerson = require('../models').GatePerson;



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

      update(req, res) {
        const newData = {
          sName: req.body.sName,
          sDir: req.body.sDir,
          sDomain: req.body.sDomain,
          fPublic: req.body.fPublic
        };
  
        return GateCustomer
          .update( newData, {where: { id: req.params.id }})
          .then(gatecustomer => res.status(200).send(gatecustomer))
          .catch(error => res.status(400).send(error));
      },

      // Return All Gate Customers with associated GateUsers and Gates
      listAll(req, res) {
        return GateCustomer
          .findAndCountAll({
            attributes: [ 'id', 'sName', 'sDir', 'sDomain', 'fPublic', 'deletedAt' ],
            include:[
              { model: GateCompany },
              { model: GateLPN },
              { model: GatePerson }
            ],
            paranoid: false
          })
          .then(gatecustomer => res.status(200).send(gatecustomer))
          .catch(error => res.status(400).send(error));
      },

      // Return a single Gate Customer by id
      listById(req, res) {
        return GateCustomer
          .findOne({
            where: { id: req.params.id },
            attributes: [ 'id', 'sName', 'sDir', 'sDomain', 'fPublic', 'deletedAt' ],
            include:[
              { model: GateCompany },
              { model: GateLPN },
              { model: GatePerson }
            ],
             paranoid: false
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

      destroy(req, res) {
        return GateCustomer
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