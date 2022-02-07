const express = require("express");
const { Op } = require("sequelize");
const { Ship, CrewMember } = require("../tables");
const router = express.Router();

router
  .route("/ships")
  .get(async (req, res) => {
    try {
      const { extended, numeCautat, displacementCautat } = req.query;
      const ships = await Ship.findAll({
        include: {
          model: CrewMember,
          attributes: ["id"],
        },
        attributes: extended
          ? undefined
          : { exclude: ["createdAt", "updatedAt"] },
        //FILTRARE
        //SORTARE DUPA UN CAMP
        where: {
          [Op.and]: [
            numeCautat
              ? {
                  nume: {
                    [Op.like]: numeCautat + "%",
                  },
                }
              : undefined,
            displacementCautat
              ? {
                  displacement: {
                    [Op.eq]: displacementCautat,
                  },
                }
              : undefined,
          ],
          // order: sortBy ? [[sortBy, "ASC"]] : undefined
        },
      });
      return res.status(200).json(ships);
    } catch (error) {
      return res.status(500).json(error);
    }
  })
  .post(async (req, res) => {
    try {
      const ship = await Ship.create(req.body);
      return res.status(200).json(ship);
    } catch (error) {
      return res.status(500).json(error);
    }
  });

//IMPORT
router.route("/importShips").post(async (req, res) => {
  try {
    for (let m of req.body) {
      const ship = await Ship.create({
        nume: m.nume,
        displacement: m.displacement,
      });
      for (let c of m.crewMembers) {
        const crewMember = await CrewMember.create({
          nume: c.nume,
          rol: c.rol,
          idShip: ship.id,
        });
      }
    }
    return res.status(200).json({ message: "Imported successfully!" });
  } catch (e) {
    return res.status(500).json(e);
  }
});

//EXPORT
router.route("/exportedShips").get(async (req, res) => {
  try {
    const result = [];
    for (let m of await Ship.findAll()) {
      const ship = {
        id: m.id,
        nume: m.nume,
        displacement: m.displacement,
        crewMembers: [],
      };
      for (let c of await m.getCrewMembers()) {
        ship.crewMembers.push({
          nume: c.nume,
          rol: c.rol,
          idShip: ship.id,
        });
      }

      result.push(ship);
    }

    if (result) {
      return res.status(200).json(result);
    } else {
      return res.status(404).json({ message: "Ships not found!" });
    }
  } catch (e) {
    return res.status(500).json(e);
  }
});

router
  .route("/ships/:id")
  .put(async (req, res) => {
    try {
      const ship = await Ship.findByPk(req.params.id);
      if (ship) {
        const updatedShip = await ship.update(req.body);
        return res.status(200).json(updatedShip);
      } else {
        return res.status(404).json({ error: "Ship not found!" });
      }
    } catch (error) {
      return res.status(500).json(error);
    }
  })

  .delete(async (req, res) => {
    try {
      const ship = await Ship.findByPk(req.params.id);
      if (ship) {
        await ship.destroy();
        return res.status(200).send({ message: "Ship was deleted!" });
      } else {
        return res.status(404).json({ error: "Ship not found!" });
      }
    } catch (error) {
      return res.status(500).json(error);
    }
  });

router.route("/paginare").get(async (req, res) => {
  try {
    const query = {};

    const page = req.query.page;
    const limit = req.query.limit;

    const startIndex = (page - 1) * limit;
    const endIndex = page * limit;

    const ship = await Ship.findAll(query);
    const finalShip = ship.slice(startIndex, endIndex);

    return res.status(200).json(finalShip);
  } catch (err) {
    return res.status(500).json(err);
  }
});

router.route("/shipsSorted").get(async (req, res) => {
  try {
    const { sortBy } = req.query;
    let ships = await Ship.findAll({
      order: sortBy ? [[sortBy, "ASC"]] : undefined,
    });
    return res.status(200).json(ships);
  } catch (err) {
    next(err);
  }
});

module.exports = router;
