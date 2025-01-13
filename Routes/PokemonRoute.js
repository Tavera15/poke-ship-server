const express = require("express");
const router = express.Router();
const PokemonController = require("../Controllers/PokemonController.js");

router.get("/", (req, res) => PokemonController.GetPokemon(req, res));

module.exports = router;