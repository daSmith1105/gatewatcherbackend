const GateLPN = require('../models').GateLPN;
const GatePerson = require('../models').GatePerson;
const GateCompany = require('../models').GateCompany;
const GateCustomer = require('../models').GateCustomer;

module.exports = {
    create(req, res) {
        return GateLPN
            .create({
                sLPN: req.body.sLPN,
                bCompanyID: req.body.bCompanyID,
                bPersonID: req.body.bPersonID,
                fFlagged: req.body.fFlagged,
                bCustomerID: req.params.bCustomerID,
            })
            .then(gatelpn => res.status(201).send(gatelpn))
            .catch(error => res.status(400).send(error));
    },

    update(req, res) {
      const newData = {
        sLPN: req.body.sLPN,
        bCompanyID: req.body.bCompanyID,
        bPersonID: req.body.bPersonID,
        fFlagged: req.body.fFlagged,
        bCustomerID: req.body.bCustomerID,
      };

      return GateLPN
        .update( newData, {where: { id: req.params.id }})
        .then(gatelpn => res.status(200).send(gatelpn))
        .catch(error => res.status(400).send(error));
    },

    listAll(req, res) {
      return GateLPN
        .findAndCountAll({
          attributes: [ 'id', 'sLPN', 'fFlagged', 'bCustomerID', 'deletedAt' ],
          include: [
            { model: GatePerson, attributes: [ 'id', 'sFirstName', 'sLastName', 'fFlagged', 'bGroupID', 'deletedAt' ] },
            { model: GateCompany, attributes: [ 'id', 'sName', 'fFlagged', 'deletedAt' ] },
            { model: GateCustomer, attributes: [ 'id', 'sName', 'deletedAt' ] }
          ],
          paranoid: false
        })
        .then(gatelpn => res.status(200).send(gatelpn))
        .catch(error => res.status(400).send(error));
    },

    listByCustomer(req, res) {
      return GateLPN
      .findAndCountAll({
          where: { bCustomerID: req.params.id },
          attributes: [ 'id', 'sLPN', 'fFlagged', 'bCustomerID', 'deletedAt' ],
          include: [
            { model: GatePerson, attributes: [ 'id', 'sFirstName', 'sLastName', 'fFlagged', 'bGroupID', 'deletedAt' ] },
            { model: GateCompany, attributes: [ 'id', 'sName', 'fFlagged', 'deletedAt' ] },
            { model: GateCustomer, attributes: [ 'id', 'sName', 'deletedAt' ] }
          ],
          paranoid: false
         })
        .then(gatelpn=> {
          if (!gatelpn) {
            return res.status(404).send({
              message: 'No LPNs Found For This Customer. Please add LPN.',
            });
          }
          return res.status(200).send(gatelpn);
        })
        .catch(error => res.status(400).send(error));
    },

    listByCompany(req, res) {
        return GateLPN
        .findAndCountAll({
            where: { bCompanyID: req.params.id },
            attributes: [ 'id', 'sLPN', 'fFlagged', 'bCustomerID', 'deletedAt' ],
            include: [
              { model: GatePerson, attributes: [ 'id', 'sFirstName', 'sLastName', 'fFlagged', 'bGroupID', 'deletedAt' ] },
              { model: GateCompany, attributes: [ 'id', 'sName', 'fFlagged', 'deletedAt' ] }
            ],
            paranoid: false
           })
          .then(gatelpn=> {
            if (!gatelpn) {
              return res.status(404).send({
                message: 'No LPNs Found For This Company',
              });
            }
            return res.status(200).send(gatelpn);
          })
          .catch(error => res.status(400).send(error));
    },

    listByPerson(req, res) {
        return GateLPN
        .findAndCountAll({
            where: { bPersonID: req.params.id },
            attributes: [ 'id', 'sLPN', 'fFlagged', 'bCustomerID', 'deletedAt' ],
            include: [
              { model: GatePerson, attributes: [ 'id', 'sFirstName', 'sLastName', 'fFlagged', 'bGroupID', 'deletedAt' ] },
              { model: GateCompany, attributes: [ 'id', 'sName', 'fFlagged', 'deletedAt' ] }
            ],
            paranoid: false
           })
          .then(gatelpn=> {
            if (!gatelpn) {
              return res.status(404).send({
                message: 'No LPNs Found For This Person',
              });
            }
            return res.status(200).send(gatelpn);
          })
          .catch(error => res.status(400).send(error));
    },

    listById(req, res) {
      return GateLPN
        .findOne({
          where: { id: req.params.id },
          attributes: [ 'id', 'sLPN', 'fFlagged', 'bCustomerID', 'deletedAt' ],
          attributes: [ 'id', 'sLPN', 'fFlagged', 'bCustomerID', 'deletedAt' ],
          include: [
            { model: GatePerson, attributes: [ 'id', 'sFirstName', 'sLastName', 'fFlagged', 'bGroupID', 'deletedAt' ] },
            { model: GateCompany, attributes: [ 'id', 'sName', 'fFlagged', 'deletedAt' ] },
            { model: GateCustomer, attributes: [ 'id', 'sName', 'deletedAt' ] }
          ],
          paranoid: false
         })
        .then(gatelpn=> {
          if (!gatelpn) {
            return res.status(404).send({
              message: 'LPN Not Found',
            });
          }
          return res.status(200).send(gatelpn);
        })
        .catch(error => res.status(400).send(error));
    },

    destroy(req, res) {
      return GateLPN
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