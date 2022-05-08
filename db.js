const { MongoClient } = require("mongodb");

const getClient = () => {
  const uri = process.env.DB_URI;
  return new MongoClient(uri);
};

const getUsersCollection = async () => {
  const client = getClient();
  await client.connect();

  return client.db("treggo").collection("users");
};

const getUsers = async () => {
  const collection = await getUsersCollection();
  const result = await collection.find({}).toArray();
  return result;
};

const insertUser = async (user) => {
  const collection = await getUsersCollection();

  await collection.insertOne(user);
};

module.exports = { getUsers, insertUser };
