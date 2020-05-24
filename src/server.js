//setup express, app
const express = require("express");
const app = express();
//database connnection settings
const config = require("../database/config");
const knex = require("knex")(config.db);

//body-parser
app.use(express.json());

const setupServer = () => {
  //"Get User List"
  app.get("/api/users", (request, response) => {
    return knex
      .select("*")
      .from("users")
      .then((userList) => {
        response.send(userList);
      });
  });

  // "Register New User"
  app.post("/api/users", (request, response) => {
    const name = request.body.name;
    const height = request.body.height;

    return knex("users")
      .insert({ username: name, height })
      .then(() => {
        return knex("users")
          .select("*")
          .where({ username: name });
      })
      .then((userData) => {
        return response.send(userData);
      })
      .catch((error) => {
        return response.send(error);
      });
  });

  // "Fix User Data"
  app.patch("/api/users/", (request, response) => {
    const name = request.body.name;
    const newUserName = request.body.newUserName;
    const newHeight = request.body.newHeight;
    if (!newUserName !== undefined) {
      return knex("users")
        .where({ username: name })
        .update({ username: newUserName })
        .then(() => {
          return knex("users")
            .where({ username: newUserName })
            .select("*");
        })
        .then((userData) => {
          return response.send(userData);
        })
        .catch((error) => {
          return response.send(error);
        });
    }
    if (!newHeight !== undefined) {
      return knex("users")
        .where({ username: name })
        .update({ height: newHeight })
        .then(() => {
          return knex("users")
            .where({ username: name })
            .select("*");
        })
        .then((userData) => {
          return response.send(userData);
        })
        .catch((error) => {
          return response.send(error);
        });
    }
  });

  // // "Delete User Data"
  app.delete("/api/users/:name", (request, response) => {
    const targetUserName = request.params.name;

    if (targetUserName === undefined) {
      return new Error("Please request User");
    }
    return knex("users")
      .where({ username: targetUserName })
      .del()
      .then(() => {
        return knex("users")
          .select("*")
          .where({ username: targetUserName });
      })
      .then((userData) => {
        response.send(userData);
      })
      .catch(() => {
        response.send(new Error("Unkown error"));
      });
  });

  // // "Get Record By User"
  app.get("/api/record/", (request, response) => {
    const targetUser = request.query.id;
    console.log(targetUser);
    if (targetUser === undefined) {
      response.send(new Error("Please send a target user name"));
    }

    return knex("records")
      .innerJoin("users", "records.user_id", "users.id")
      .where({ username: targetUser })
      .select("username", "date", "weights", "bmi", "sleeping")
      .then((userRecord) => {
        response.send(userRecord);
      });
  });

  // "Register New Record"
  app.patch("/api/record/:name", (request, response) => {});
  // "Fix record"
  app.patch("/api/record/:id", (request, response) => {});
  // "Delete recorde"
  app.patch("/api/record/:name/:date", (request, response) => {});

  return app;
};

module.exports = { setupServer };
