const Gate = require('../models').Gate;
const GateCustomer = require('../models').GateCustomer;

module.exports = {
    create(req, res) {
        return Gate
            .create({
                sName: req.body.sName,
                sDir: req.body.sDir,
                fReportErrors: req.body.fReportErrors,
                bCustomerID: req.params.bCustomerID,
            })
            .then(gate=> res.status(201).send(gate))
            .catch(error => res.status(400).send(error));
    },

    update(req, res) {
      const newData = {
        sName: req.body.sName,
        sDir: req.body.sDir,
        fReportErrors: req.body.fReportErrors,
        bCustomerID: req.body.bCustomerID,
      };

      return Gate
        .update( newData, {where: { id: req.params.id }})
        .then(gate => res.status(200).send(gate))
        .catch(error => res.status(400).send(error));
    },

    listByCustomer(req, res) {
        return Gate
          .findAndCountAll({
            where: { bCustomerID: req.params.id },
            include: [ 
              { model: GateCustomer, attributes: [ 'id', 'sName' ], paranoid: false }
            ],
             paranoid: false
           })
          .then(gate => {
            if (!gate) {
              return res.status(404).send({
                message: 'User Not Found',
              });
            }
            return res.status(200).send(gate);
          })
          .catch(error => res.status(400).send(error));
    },

    listById(req, res) {
      return Gate.findOne({
        where: { id: req.params.id },
        include: [ 
          { model: GateCustomer, attributes: [ 'id', 'sName' ], paranoid: false }
        ],
        paranoid: false
      })
      .then(gate => {
        if (!gate) {
          return res.status(404).send({
            message: 'Gate Not Found',
          });
        }
        return res.status(200).send(gate);
      })
      .catch(error => res.status(400).send(error));
    },

    listAll(req, res) {
      return Gate
        .findAndCountAll({
          include: [ 
            { model: GateCustomer, attributes: [ 'id', 'sName' ], paranoid: false }
          ],
          paranoid: false
        })
        .then(gate => res.status(200).send(gate))
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