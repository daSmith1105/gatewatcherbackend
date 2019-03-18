const GateEvent = require('../models').GateEvent;
const GateCustomer = require('../models').GateCustomer;
const GateCompany = require('../models').GateCompany;
const Gate = require('../models').Gate;
const GatePerson = require('../models').GatePerson;
const GateLPN = require('../models').GateLPN;
const GateUser = require('../models').GateUser;
const GateType = require('../models').GateType;

// { model: GatePerson, attributes: [ 'id', 'sFirstName', 'sLastName', 'fFlagged', 'deletedAt' ], paranoid: false },

module.exports = {
    create(req, res) {
        return GateEvent
            .create({
                sLpnPhoto: req.body.sLpnPhoto,
                sLoadPhoto: req.body.sLoadPhoto,
                bCompanyID: req.body.bCompanyID,
                bTypeID: req.body.bTypeID,
                bGateID: req.body.bGateID,
                bPersonID: req.body.bPersonID,
                bLpnID: req.body.bLpnID,
                bUserID: req.body.bUserID,
                sComment: req.body.sComment,
                aPassengers: req.body.aPassengers,
                bCustomerID: req.params.bCustomerID,
            })
            .then(gateevent => res.status(201).send(gateevent))
            .catch(error => res.status(400).send(error));
    },

    update(req, res) {
      const newData = {
        bCompanyID: req.body.bCompanyID,
        aPassengers: req.body.aPassengers,
        bTypeID: req.body.bTypeID,
        bGateID: req.body.bGateID,
        bPersonID: req.body.bPersonID,
        bLpnID: req.body.bLpnID,
        bUserID: req.body.bUserID,
        sComment: req.body.sComment,
        bCustomerID: req.body.bCustomerID
      };

      return GateEvent
        .update( newData, {where: { id: req.params.id }})
        .then(gateevent => res.status(200).send(gateevent))
        .catch(error => res.status(400).send(error));
    },

    listAll(req, res) {
      return GateEvent
        .findAndCountAll({
          attributes: [ 'id', 'sLpnPhoto', 'sLoadPhoto', 'sComment', 'createdAt', 'deletedAt' ],
          include: [
            { model: GateCustomer, attributes: [ 'id', 'sName', 'deletedAt' ], paranoid: false },
            { model: GateCompany, attributes: [ 'id', 'sName', 'fFlagged', 'deletedAt' ], paranoid: false },
            { model: GateUser, attributes: [ 'id', 'sFirstName', 'sLastName', 'deletedAt' ], paranoid: false },
            { model: Gate, attributes: [ 'id', 'sName', 'deletedAt' ], paranoid: false  },
            { model: GatePerson, attributes: [ 'id', 'sFirstName', 'sLastName', 'fFlagged', 'deletedAt' ], paranoid: false },
            { model: GateLPN, attributes: [ 'id', 'sLPN', 'fFlagged', 'deletedAt' ], paranoid: false },
            { model: GateType, attributes: [ 'id', 'sName' ], paranoid: false },
          ],
          paranoid: false
        })
        .then(gateevent => res.status(200).send(gateevent))
        .catch(error => res.status(400).send(error));
    },

    listByCustomer(req, res) {
      return GateEvent
        .findAndCountAll({
          where: { bCustomerID: req.params.id },
          attributes: [ 'id', 'sLpnPhoto', 'sLoadPhoto', 'sComment', 'createdAt', 'deletedAt' ],
          include: [
            { model: GateCustomer, attributes: [ 'id', 'sName', 'deletedAt' ], paranoid: false },
            { model: GateCompany, attributes: [ 'id', 'sName', 'fFlagged', 'deletedAt' ], paranoid: false },
            { model: GateUser, attributes: [ 'id', 'sFirstName', 'sLastName', 'deletedAt' ], paranoid: false },
            { model: Gate, attributes: [ 'id', 'sName', 'deletedAt' ], paranoid: false  },
            { model: GatePerson, attributes: [ 'id', 'sFirstName', 'sLastName', 'fFlagged', 'deletedAt' ], paranoid: false },
            { model: GateLPN, attributes: [ 'id', 'sLPN', 'fFlagged', 'deletedAt' ], paranoid: false },
            { model: GateType, attributes: [ 'id', 'sName' ], paranoid: false },
          ],
          paranoid: false
         })
        .then(gateevent => {
          if (!gateevent) {
            return res.status(404).send({
              message: 'Event Not Found',
            });
          }
          return res.status(200).send(gateevent);
        })
        .catch(error => res.status(400).send(error));
    },

    listByCompany(req, res) {
      return GateEvent
        .findAndCountAll({
          where: { bCompanyID: req.params.id },
           paranoid: false
         })
        .then(gateevent => {
          if (!gateevent) {
            return res.status(404).send({
              message: 'Events Not Found',
            });
          }
          return res.status(200).send(gateevent);
        })
        .catch(error => res.status(400).send(error));
    },

    listByPerson(req, res) {
      return GateEvent
        .findAndCountAll({
          where: { bPersonID: req.params.id },
           paranoid: false
         })
        .then(gateevent => {
          if (!gateevent) {
            return res.status(404).send({
              message: 'Events Not Found',
            });
          }
          return res.status(200).send(gateevent);
        })
        .catch(error => res.status(400).send(error));
    },

    listById(req, res) {
      return GateEvent
        .findOne({
          where: { id: req.params.id },
          paranoid: false
         })
        .then(gateevent => {
          if (!gateevent) {
            return res.status(404).send({
              message: 'Event Not Found',
            });
          }
          return res.status(200).send(gateevent);
        })
        .catch(error => res.status(400).send(error));
    },

    listByGateId(req, res) {
      return GateEvent
        .findAndCountAll({
          where: { bGateID: req.params.id },
          attributes: [ 'id', 'sLpnPhoto', 'sLoadPhoto', 'sComment', 'createdAt', 'deletedAt' ],
          include: [
            { model: GateCustomer, attributes: [ 'id', 'sName', 'deletedAt' ], paranoid: false },
            { model: GateCompany, attributes: [ 'id', 'sName', 'fFlagged', 'deletedAt' ], paranoid: false },
            { model: GateUser, attributes: [ 'id', 'sFirstName', 'sLastName', 'deletedAt' ], paranoid: false },
            { model: Gate, attributes: [ 'id', 'sName', 'deletedAt' ], paranoid: false  },
            { model: GatePerson, attributes: [ 'id', 'sFirstName', 'sLastName', 'fFlagged', 'deletedAt' ], paranoid: false },
            { model: GateLPN, attributes: [ 'id', 'sLPN', 'fFlagged', 'deletedAt' ], paranoid: false },
            { model: GateType, attributes: [ 'id', 'sName' ], paranoid: false },
          ],
          paranoid: false
         })
        .then(gateevent => {
          if (!gateevent) {
            return res.status(404).send({
              message: 'Event Not Found',
            });
          }
          return res.status(200).send(gateevent);
        })
        .catch(error => res.status(400).send(error));
    },
};