const { MongoClient } = require("mongodb");
const uri = "mongodb://localhost:27017/treggo";
const client = new MongoClient(uri);

const getUsersCollection = async () => {
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
