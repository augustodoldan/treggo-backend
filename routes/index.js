const express = require("express");
const router = express.Router();
const axios = require("axios").default;
const { getUsers, insertUser } = require("../db");
const { hashSync } = require("bcryptjs");

router.get("/characters", async (req, res) => {
  const characters = await getCharacters();

  res.json(characters);
});

async function getCharacters() {
  try {
    const response = await axios.get(
      "https://www.swapi.tech/api/people?page=1&limit=5"
    );
    return response.data.results;
  } catch (error) {
    console.error(error);
  }
}

router.get("/characters/:name", async (req, res) => {
  const { name } = req.params;
  const characters = await getCharacters();
  const filteredCharacters = characters.filter((character) =>
    character.name.toLowerCase().includes(name.toLowerCase())
  );
  res.send(filteredCharacters);
});

async function getCharacterById(id) {
  try {
    const response = await axios.get(
      `https://www.swapi.tech/api/people/${id}?limit=100`
    );
    return response.data.result;
  } catch (error) {
    console.error(error);
  }
}

router.get("/characters/id/:id", async (req, res) => {
  const { id } = req.params;
  const characterById = await getCharacterById(id);
  res.send(characterById);
});

async function getPlanetById(id) {
  try {
    const response = await axios.get(
      `https://www.swapi.tech/api/planets/${id}`
    );
    return response.data.result;
  } catch (error) {
    console.error(error);
  }
}

router.get("/planet/:id", async (req, res) => {
  const { id } = req.params;
  const planet = await getPlanetById(id);
  res.send(planet);
});

async function getFilmsById(id) {
  try {
    const response = await axios.get(`https://www.swapi.tech/api/films`);
    const filteredFilms = [];
    const films = response.data.result;
    films.forEach((film) => {
      film.properties.characters.forEach((url) => {
        const urlFiltered = url.split("/");

        if (id == urlFiltered[5]) {
          filteredFilms.push(film);
        }
      });
    });
    return filteredFilms;
  } catch (error) {
    console.error(error);
  }
}

router.get("/film/:id", async (req, res) => {
  const { id } = req.params;
  const character = await getFilmsById(id);
  res.send(character);
});

async function getCharactersByFilmId(id) {
  try {
    const response = await axios.get(`https://www.swapi.tech/api/films/${id}`);
    return response.data.result;
  } catch (error) {
    console.error(error);
  }
}

router.get("/film/:id/characters", async (req, res) => {
  const { id } = req.params;
  const film = await getCharactersByFilmId(id);
  res.send(film);
});

const hashPassword = (password) => {
  return hashSync(password, process.env.SALT_ROUNDS);
};

router.post("/singup", async (req, res, next) => {
  try {
    const { email, password } = req.body;
    console.log(email, password);
    const hashedPassword = hashPassword(password);

    const user = {
      email: email,
      password: hashedPassword,
    };
    await insertUser(user);

    return res.sendStatus(201);
  } catch (err) {
    next(err);
  }
});

module.exports = router;
