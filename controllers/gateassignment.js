const GateAssignment = require('../models').GateAssignment;
const Gate = require('../models').Gate;
const GateCustomer = require('../models').GateCustomer;
const GateUser = require('../models').GateUser;

module.exports = {
    create(req, res) {
        return GateAssignment
            .create({
                bGateID: req.body.bGateID,
                bUserID: req.body.bUserID,
                bCustomerID: req.params.bCustomerID,
            })
            .then(gateassignment => res.status(201).send(gateassignment))
            .catch(error => res.status(400).send(error));
    },

    update(req, res) {
        const newData = {
          bGateID: req.body.bGateID,
          bUserID: req.body.bUserID,
          bCustomerID: req.body.bCustomerID,
        };
  
        return GateAssignment
          .update( newData, {where: { id: req.params.id }})
          .then(gateassignment => res.status(200).send(gateassignment))
          .catch(error => res.status(400).send(error));
      },

    listAll(req, res) {
        return GateAssignment
        .findAndCountAll({
            attributes: [ 'id', 'deletedAt' ],
            include:[
                { model: GateCustomer, attributes: [ 'id', 'sName', 'deletedAt' ], paranoid: false },
                { model: GateUser, attributes: [ 'id', 'sFirstName', 'sLastName', 'deletedAt' ], paranoid: false },
                { model: Gate, attributes: [ 'id', 'sName', 'deletedAt' ], paranoid: false },
            ],
            // paranoid: false
        })
        .then(gateassignment => {
            if (!gateassignment) {
                return res.status(404).send({
                message: 'Assignments Not Found. Assign Guards.',
                });
            }
            return res.status(200).send(gateassignment);
            })
            .catch(error => res.status(400).send(error));
    },

    listByCustomer(req, res) {
        return GateAssignment
        .findAndCountAll({
            where: { bCustomerID: req.params.id },
            attributes: [ 'id', 'deletedAt' ],
            include:[
                { model: GateCustomer, attributes: [ 'id', 'sName', 'deletedAt' ], paranoid: false },
                { model: GateUser, attributes: [ 'id', 'sFirstName', 'sLastName', 'deletedAt' ], paranoid: false },
                { model: Gate, attributes: [ 'id', 'sName', 'deletedAt' ], paranoid: false },
            ],
            paranoid: false
        })
        .then(gateassignment => {
            if (!gateassignment) {
                return res.status(404).send({
                message: 'Assignments Not Found. Assign Guards.',
                });
            }
            return res.status(200).send(gateassignment);
            })
            .catch(error => res.status(400).send(error));
    },

    listByGuard(req, res) {
        return GateAssignment
        .findAll({
            include: { all: true },
            where: { 
                bUserID: req.params.id
            },
            paranoid: false
        })
        .then(gateassignment => {
            if (!gateassignment) {
                return res.status(404).send({
                message: 'Assignments Not Found. Assign Guards.',
                });
            }
            return res.status(200).send(gateassignment);
            })
            .catch(error => res.status(400).send(error));
    },

    destroy(req, res) {
        return GateAssignment
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