const axios = require("axios").default;
const { hashSync } = require("bcryptjs");

const getCharacters = async () => {
  const response = await axios.get(
    "https://www.swapi.tech/api/people?page=1&limit=100"
  );
  return response.data.results;
};

const getCharacterById = async (id) => {
  const response = await axios.get(
    `https://www.swapi.tech/api/people/${id}?limit=100`
  );
  return response.data.result;
};

const getPlanetById = async (id) => {
  const response = await axios.get(`https://www.swapi.tech/api/planets/${id}`);
  return response.data.result;
};

const getFilmsById = async (id) => {
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
};

const getCharactersByFilmId = async (id) => {
  const response = await axios.get(`https://www.swapi.tech/api/films/${id}`);
  return response.data.result;
};

const hashPassword = (password) => {
  return hashSync(password, process.env.SALT_ROUNDS);
};

module.exports = {
  getCharacters,
  getCharacterById,
  getPlanetById,
  getFilmsById,
  getCharactersByFilmId,
  hashPassword,
};
