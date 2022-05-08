const express = require("express");
const { insertUser } = require("../db");
const {
  getCharacters,
  getCharacterById,
  getPlanetById,
  getFilmsById,
  getCharactersByFilmId,
  hashPassword,
} = require("./controller");

const router = express.Router();

router.get("/characters", async (req, res, next) => {
  try {
    const characters = await getCharacters();
    res.json(characters);
  } catch (error) {
    console.error(error);
    next(error);
  }
});

router.get("/characters/:name", async (req, res, next) => {
  try {
    const { name } = req.params;
    const characters = await getCharacters();
    const filteredCharacters = characters.filter((character) =>
      character.name.toLowerCase().includes(name.toLowerCase())
    );
    res.send(filteredCharacters);
  } catch (error) {
    console.error(error);
    next(error);
  }
});

router.get("/characters/id/:id", async (req, res, next) => {
  try {
    const { id } = req.params;
    const characterById = await getCharacterById(id);
    res.send(characterById);
  } catch (error) {
    console.error(error);
    next(error);
  }
});

router.get("/planet/:id", async (req, res, next) => {
  try {
    const { id } = req.params;
    const planet = await getPlanetById(id);
    res.send(planet);
  } catch (error) {
    console.error(error);
    next(error);
  }
});

router.get("/film/:id", async (req, res, next) => {
  try {
    const { id } = req.params;
    const character = await getFilmsById(id);
    res.send(character);
  } catch (error) {
    console.error(error);
    next(error);
  }
});

router.get("/film/:id/characters", async (req, res, next) => {
  try {
    const { id } = req.params;
    const film = await getCharactersByFilmId(id);
    res.send(film);
  } catch (error) {
    console.error(error);
    next(error);
  }
});

router.post("/singup", async (req, res, next) => {
  try {
    const { email, password } = req.body;
    const hashedPassword = hashPassword(password);

    const user = {
      email: email,
      password: hashedPassword,
    };
    await insertUser(user);

    return res.sendStatus(201);
  } catch (error) {
    console.error(error);
    next(error);
  }
});

module.exports = router;
