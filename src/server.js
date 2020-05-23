//setup express, app
const express = require("express");
const app = express();
const knex = require("knex");

//body-parser
app.use(express.json());

const setupServer = () => {
  app.get("/api/", (request, response) => {});

  //以下サンプル
  /* app.get("/api/pokemon", (req, res) => {
    const limit = req.query.limit;
    if (limit === undefined) {
      res.send(pokeData.pokemon);
    } else {
      res.send(pokeData.pokemon.slice(0, limit));
    }
  });

  app.post("/api/pokemon", (req, res) => {
    const recievedPokemon = req.body.newPokemon;
    pokeData.pokemon.push(recievedPokemon);

    res.status(201).end();
  });

  app.get("/api/pokemon/:idOrName", (req, res) => {
    const idOrName = req.params.idOrName;

    let pokemonWithId;

    if (!Number(idOrName)) {
      for (const pokemon of pokeData.pokemon) {
        if (pokemon.name.toLowerCase() === idOrName.toLowerCase()) {
          pokemonWithId = pokemon;
          break;
        }
      }
    } else {
      for (const pokemon of pokeData.pokemon) {
        if (parseInt(pokemon.id) === parseInt(idOrName)) {
          pokemonWithId = pokemon;
          break;
        }
      }
    }

    res.send(pokemonWithId);
  });

  app.patch("/api/pokemon/:idOrName", (req, res) => {
    const idOrName = req.params.idOrName;
    const modification = req.body;

    const modifyPokemon = (target) => {
      for (const key in modification) {
        if (target[key]) {
          target[key] = modification[key];
        }
      }
    };

    if (!Number(idOrName)) {
      for (const pokemon of pokeData.pokemon) {
        if (pokemon.name.toLowerCase() === idOrName.toLowerCase()) {
          modifyPokemon(pokemon);
          res.send(pokemon);
          break;
        }
      }
    } else {
      for (const pokemon of pokeData.pokemon) {
        if (parseInt(pokemon.id) === parseInt(idOrName)) {
          modifyPokemon(pokemon);
          res.send(pokemon);
          break;
        }
      }
    }
  });

  app.delete("/api/pokemon/:idOrName", (req, res) => {
    const idOrName = req.params.idOrName;
    if (!Number(idOrName)) {
      for (let i = 0; i < pokeData.pokemon.length; i++) {
        if (pokeData.pokemon[i].name.toLowerCase() === idOrName.toLowerCase()) {
          pokeData.pokemon.splice(i, 1);
          res.status(200).end();
          break;
        }
      }
    } else {
      for (let i = 0; i < pokeData.pokemon.length; i++) {
        if (parseInt(pokeData.pokemon[i].id) === parseInt(idOrName)) {
          pokeData.pokemon.splice(i, 1);
          res.status(200).end();
          break;
        }
      }
    }
    res.status(405).end();
  });

  app.get("/api/pokemon/:idOrName/evolutions", (req, res) => {
    const idOrName = req.params.idOrName;
    let evolutions = [];

    if (!Number(idOrName)) {
      for (const pokemon of pokeData.pokemon) {
        if (
          pokemon.name.toLowerCase() === idOrName.toLowerCase() &&
          pokemon.hasOwnProperty("evolutions")
        ) {
          evolutions = pokemon.evolutions;
          break;
        }
      }
    } else {
      for (const pokemon of pokeData.pokemon) {
        if (
          parseInt(pokemon.id) === parseInt(idOrName) &&
          pokemon.hasOwnProperty("evolutions")
        ) {
          evolutions = pokemon.evolutions;
          break;
        }
      }
    }

    res.send(evolutions);
  });

  app.get("/api/pokemon/:idOrName/evolutions/previous", (req, res) => {
    const idOrName = req.params.idOrName;
    let previous = [];

    if (!Number(idOrName)) {
      for (const pokemon of pokeData.pokemon) {
        if (
          pokemon.name.toLowerCase() === idOrName.toLowerCase() &&
          pokemon.hasOwnProperty("Previous evolution(s)")
        ) {
          previous = pokemon["Previous evolution(s)"];
          break;
        }
      }
    } else {
      for (const pokemon of pokeData.pokemon) {
        if (
          parseInt(pokemon.id) === parseInt(idOrName) &&
          pokemon.hasOwnProperty("Previous evolution(s)")
        ) {
          previous = pokemon["Previous evolution(s)"];
          break;
        }
      }
    }

    res.send(previous);
  });

  app.get("/api/types", (req, res) => {
    const limit = req.query.limit;
    if (limit === undefined) {
      res.send(pokeData.types);
    } else {
      res.send(pokeData.types.slice(0, limit));
    }
  });

  app.post("/api/types", (req, res) => {
    const newType = req.body.type;
    pokeData.types.push(newType);
    res.status(201).end();
  });

  app.delete("/api/types/:name", (req, res) => {
    const deleteType = req.params.name;

    for (let i = 0; i < pokeData.types.length; i++) {
      if (pokeData.types[i] === deleteType) {
        pokeData.types.splice(i, 1);
        res.status(200).end();
      }
    }
    res.status(405).end();
  });

  app.get("/api/types/:type/pokemon", (req, res) => {
    const targetType = req.params.type;

    const pokeList = pokeData.pokemon
      .filter((pokemon) => {
        return pokemon.types.includes(targetType);
      })
      .map((pokemon) => {
        return { id: pokemon.id, name: pokemon.name };
      });

    res.send(pokeList);
  });

  app.get("/api/attacks", (req, res) => {
    const limit = req.query.limit;

    if (limit === undefined) {
      res.send(pokeData.attacks);
    } else {
      res.send(pokeData.attacks[limit]);
    }
  });

  app.get("/api/attacks/fast", (req, res) => {
    const limit = req.query.limit;

    if (limit === undefined) {
      res.send(pokeData.attacks.fast);
    } else {
      res.send(pokeData.attacks.fast.slice(0, limit));
    }
  });

  app.get("/api/attacks/special", (req, res) => {
    const limit = req.query.limit;

    if (limit === undefined) {
      res.send(pokeData.attacks.special);
    } else {
      res.send(pokeData.attacks.special.slice(0, limit));
    }
  });

  app.get("/api/attacks/:name", (req, res) => {
    const attackName = req.params.name;

    for (const attack of pokeData.attacks.fast) {
      if (attack.name === attackName) {
        res.send(attack);
      }
    }
    for (const attack of pokeData.attacks.special) {
      if (attack.name === attackName) {
        res.send(attack);
      }
    }
    res.status(405).end();
  });

  app.get("/api/attacks/:name/pokemon", (req, res) => {
    const attackName = req.params.name;

    const haveAttackCheck = (targetPokemon, targetAttack) => {
      for (const attack of targetPokemon.attacks.fast) {
        if (attack.name === targetAttack) {
          return true;
        }
      }
      for (const attack of targetPokemon.attacks.special) {
        if (attack.name === targetAttack) {
          return true;
        }
      }
    };

    const targetPokemons = pokeData.pokemon
      .filter((pokemon) => {
        return haveAttackCheck(pokemon, attackName);
      })
      .map((pokemon) => {
        return (pokemon = { id: pokemon.id, name: pokemon.name });
      });

    res.send(targetPokemons);
  });

  app.post("/api/attaks/fast", (req, res) => {
    const newAttack = req.query.body;
    if (!newAttack === undefined) {
      pokeData.attacks.fast.push(newAttack);
      res.status(200).end();
    } else {
      res.status(405).end();
    }
  });

  app.post("/api/attaks/special", (req, res) => {
    const newAttack = req.query.body;
    if (!newAttack === undefined) {
      pokeData.attacks.special.push(newAttack);
      res.status(200).end();
    } else {
      res.status(405).end();
    }
  });

  app.patch("/api/attacks/:name", (req, res) => {
    const changeTarget = req.params.name;

    for (let attack of pokeData.attacks.fast) {
      if (attack.name === changeTarget.name) {
        attack = changeTarget;
        res.status(200).end();
        break;
      }
    }
    for (let attack of pokeData.attacks.special) {
      if (attack.name === changeTarget.name) {
        attack = changeTarget;
        res.status(200).end();
        break;
      }
    }
    res.status(405).end();
  });

  app.delete("/api/attacks/:name", (req, res) => {
    const targetAttack = req.params.name;

    for (let i = 0; i < pokeData.attacks.fast; i++) {
      if (pokeData.attacks.fast[i].name === targetAttack) {
        pokeData.attacks.fast.splice(i, 0);
        res.status(200).end();
      }
    }
    for (let i = 0; i < pokeData.attacks.special; i++) {
      if (pokeData.attacks.special[i].name === targetAttack) {
        pokeData.attacks.special.splice(i, 0);
        res.status(200).end();
      }
    }
    res.status(405).end();
  });
 */

  return app;
};

module.exports = { setupServer };
