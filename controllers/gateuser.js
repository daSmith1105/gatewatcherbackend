const GateUser = require('../models').GateUser;
const GateCustomer = require('../models').GateCustomer;
const GateAcl = require('../models').GateAcl;
const GateAssignment = require('../models').GateAssignment;
const Gate = require('../models').Gate;

module.exports = {
    create(req, res) {
        return GateUser
            .create({
                sFirstName: req.body.sFirstName,
                sLastName: req.body.sLastName,
                sUsername: req.body.sUsername,
                sPassword: req.body.sPassword,
                bAuthID: req.body.bAuthID,
                bCustomerID: req.params.bCustomerID,
            })
            .then(gateuser => res.status(201).send(gateuser))
            .catch(error => res.status(400).send(error));
    },

    update(req, res) {
      const newData = {
        sFirstName: req.body.sFirstName,
        sLastName: req.body.sLastName,
        sUsername: req.body.sUsername,
        sPassword: req.body.sPassword,
        bAuthID: req.body.bAuthID,
        bCustomerID: req.body.bCustomerID,
      };

      return GateUser
        .update( newData, {where: { id: req.params.id }})
        .then(gateuser => res.status(200).send(gateuser))
        .catch(error => res.status(400).send(error));
    },

    listAll(req, res) {
        return GateUser
          .findAndCountAll({
            attributes: [ 'id', 'sFirstName', 'sLastName', 'sUsername', 'sPassword', 'bAuthID', 'deletedAt'],
            include: [
              { model: GateCustomer, attributes: [ 'id', 'sName', 'deletedAt'], paranoid: false },
              { model: GateAcl, attributes: [ 'id', 'sName' ], paranoid: false }
            ],
            paranoid: false
          })
          .then(gateuser => {
            if (!gateuser) {
              return res.status(404).send({
                message: 'User Not Found',
              });
            }
            return res.status(200).send(gateuser);
          })
          .catch(error => res.status(400).send(error));
    },

    listByCustomer(req, res) {
        return GateUser
          .findAndCountAll({
            where: { bCustomerID: req.params.id },
            attributes: [ 'id', 'sFirstName', 'sLastName', 'sUsername', 'sPassword', 'bAuthID', 'deletedAt'],
            include: [
              { model: GateCustomer, attributes: [ 'id', 'sName', 'deletedAt'], paranoid: false },
              { model: GateAcl, attributes: [ 'id', 'sName' ], paranoid: false }
            ],
            paranoid: false
           })
          .then(gateuser => {
            if (!gateuser) {
              return res.status(404).send({
                message: 'User Not Found',
              });
            }
            return res.status(200).send(gateuser);
          })
          .catch(error => res.status(400).send(error));
    },

    findUser(req, res) {
        return GateUser
          .findOne({
            where: { 
                sUsername: req.params.username,
                sPassword: req.params.password,
             },
             attributes: [ 'id', 'sFirstName', 'sLastName', 'sUsername', 'sPassword', 'bAuthID', 'deletedAt'],
             include: [
               { model: GateCustomer, attributes: [ 'id', 'sName', 'deletedAt'], paranoid: false },
               { model: GateAssignment, attributes: [ 'id', 'bGateID', 'deletedAt'], paranoid: false },
             ],
             paranoid: false
           })
          .then(gateuser => {
            if (!gateuser) {
              return res.status(404).send({
                message: 'User Not Found',
              });
            }
            return res.status(200).send(gateuser);
          })
          .catch(error => res.status(400).send(error));
    },

    listById(req, res) {
      return GateUser
        .findOne({
          where: { id: req.params.id },
          attributes: [ 'id', 'sFirstName', 'sLastName', 'sUsername', 'sPassword', 'bAuthID', 'deletedAt'],
          include: [
            { model: GateCustomer, attributes: [ 'id', 'sName', 'deletedAt'], paranoid: false },
            { model: GateAssignment, attributes: [ 'id', 'bGateID', 'deletedAt'], paranoid: false },
          ],
          paranoid: false
         })
        .then(gateuser => {
          if (!gateuser) {
            return res.status(404).send({
              message: 'User Not Found',
            });
          }
          return res.status(200).send(gateuser);
        })
        .catch(error => res.status(400).send(error));
  },

  listAllGuards(req, res) {
    return GateUser
      .findAndCountAll({
          where: { bAuthID: 3 },
          attributes: [ 'id', 'sFirstName', 'sLastName', 'sUsername', 'sPassword', 'bAuthID', 'deletedAt'],
          include: [
            { model: GateCustomer, attributes: [ 'id', 'sName', 'deletedAt'], paranoid: false },
            { model: GateAssignment, attributes: [ 'id', 'bGateID', 'deletedAt'], paranoid: false },
          ],
          paranoid: false
       })
      .then(gateuser => {
        if (!gateuser) {
          return res.status(404).send({
            message: 'User Not Found',
          });
        }
        return res.status(200).send(gateuser);
      })
      .catch(error => res.status(400).send(error));
  },

  listGuardsByCustomer(req, res) {
    return GateUser
      .findAndCountAll({
          where: { bCustomerID: req.params.id ,  bAuthID: 3 },
          attributes: [ 'id', 'sFirstName', 'sLastName', 'sUsername', 'sPassword', 'bAuthID', 'deletedAt'],
          include: [
            { model: GateCustomer, attributes: [ 'id', 'sName', 'deletedAt'], paranoid: false },
            { model: GateAssignment, attributes: [ 'id', 'bGateID', 'deletedAt'], paranoid: false },
          ],
          paranoid: false
       })
      .then(gateuser => {
        if (!gateuser) {
          return res.status(404).send({
            message: 'User Not Found',
          });
        }
        return res.status(200).send(gateuser);
      })
      .catch(error => res.status(400).send(error));
  },


  destroy(req, res) {
    return GateUser
      .destroy( { where: { id: req.params.id } } )
    .then(function(rowDeleted){ // rowDeleted will return number of rows deleted
      if(rowDeleted === 1){
         console.log('Deleted successfully');
       }
    }, function(err){
        console.log(err); 
    });
  }
}