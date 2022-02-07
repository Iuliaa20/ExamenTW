const express = require("express");
const { Op } = require("sequelize");
const { Ship, CrewMember } = require("../tables");
const router = express.Router();


router
  .route("/ships/:shipId/crewmembers")
  .get(async (req, res) => {
    try {
      const { extended, numeCautat,rolCautat } = req.query;
      const membrii = await CrewMember.findAll({
        attributes: extended
          ? undefined
          : { exclude: ["createdAt", "updatedAt"] },
          //FILTRARE 
          where: { [Op.and]: [
            numeCautat ? {
  
              nume: {
                [Op.like]: numeCautat + '%'
              }
            } : undefined,
            rolCautat ? {
  
              rol: {
                [Op.like]: rolCautat + '%'
              }
            } : undefined,
          ]
          }
      });
      return res.status(200).json(membrii);
    } catch (error) {
      return res.status(500).json(error);
    }
  })
  .post(async (req, res) => {
    try {
      const membru = await CrewMember.create(req.body);
      return res.status(200).json(membru);
    } catch (error) {
      return res.status(500).json(error);
    }
  });


  router
  .route("/ships/:shipId/crewmembers/:id")
  .put(async (req, res) => {
    try {
      const membru = await CrewMember.findByPk(req.params.id);
      if (membru) {
        const updatedMembru = await membru.update(req.body);
        return res.status(200).json(updatedMembru);
      } else {
        return res.status(404).json({ error: "Member not found!" });
      }
    } catch (error) {
      return res.status(500).json(error);
    }
  })
  
  .delete(async (req, res) => {
    try {
      const membru = await CrewMember.findByPk(req.params.id);
      if (membru) {
        await membru.destroy();
        return res.status(200).send({message: "Member was deleted"});
      } else {
        return res.status(404).json({ error: "Member not found" });
      }
    } catch (error) {
      return res.status(500).json(error);
    }
  });


  module.exports = router;