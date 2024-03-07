// // To connect with your mongoDB database
// const { MongoClient } = require("mongodb");
// const uriLink =
//   "mongodb+srv://00flibit:Ic3pPDEDyu9cmMnW@ultimate-tic-tac-toe.8xt5po1.mongodb.net/?retryWrites=true&w=majority";

// export async function connect() {
//   const client = new MongoClient(uriLink);
//   try {
//     await client.connect();
//     //await listDatabases(client);
//     /*await createGame(client, [
//                 [0,0,0],
//                 [0,1,2]
//             ]
//         );*/
//     //await updateState(client, "g73sd", [[0], [0]]);
//     //await deleteOldGames(client);
//     //await joinGame(client, "g73sd");
//   } catch (e) {
//     console.error(e);
//   }
//   return client;
// }

// async function listDatabases(client) {
//   databasesList = await client.db().admin().listDatabases();
//   console.log("Databases: ");
//   databasesList.databases.forEach((db) => console.log(` - ${db.name}`));
// }

// async function createGame(client, newGameState) {
//   const newId = findUniqueId();

//   const newGame = {
//     _id: newId,
//     state: newGameState,
//     time: Date.now(),
//     connected: false
//   };
//   try {
//     await client.db("games").collection("games").insertOne(newGame);
//   } catch (e) {
//     console.error(e);
//     createGame(client, newGameState);
//   } finally {
//     console.log("New game created with the following id " + newId);
//   }
// }

// function findUniqueId() {
//   const possibleLetters = "0123456789abcdefghijklmnopqrstuvwxyz";
//   let newId = "";
//   for (let i = 0; i < 5; i++) {
//     newId =
//       newId +
//       possibleLetters[Math.floor(Math.random() * possibleLetters.length)];
//   }

//   return newId;
// }

// async function updateState(client, gameId, newState) {
//   const updatedSet = {
//     state: newState,
//     time: Date.now()
//   };
//   const result = await client
//     .db("games")
//     .collection("games")
//     .updateOne({ _id: gameId }, { $set: updatedSet });

//   console.log(`${result.matchedCount} document(s) matched the query criteria.`);
//   console.log(`${result.modifiedCount} document(s) was/were updated.`);
// }

// async function deleteOldGames(client) {
//   const result = await client
//     .db("games")
//     .collection("games")
//     .deleteMany({ time: { $lt: Date.now() - 2 * 7 * 24 * 60 * 60 * 1000 } });
//   console.log(`${result.deletedCount} document(s) was/were deleted.`);
// }

// async function joinGame(client, gameId) {
//   const result = await client
//     .db("games")
//     .collection("games")
//     .findOne({ _id: gameId, connected: false });
//   console.log(result);
//   if (result) {
//     await client
//       .db("games")
//       .collection("games")
//       .updateOne({ _id: gameId }, { $set: { connected: true } });
//   }
//   return result;
// }
