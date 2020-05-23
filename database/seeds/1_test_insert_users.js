exports.seed = function(knex) {
  // Deletes ALL existing entries
  return knex("users")
    .del()
    .then(function() {
      // Inserts seed entries
      return knex("users").insert([
        { username: "Stux_Net", height: 148.6 },
        { username: "Wanna_Cry", height: 180.6 },
        { username: "Winny_P2P", height: 157.1 },
        { username: "Ransom_Ware", height: 160.2 },
        { username: "Xkey_Score", height: 164.5 },
        { username: "PRISM", height: 172.4 },
        { username: "Echelon", height: 173.6 },
        { username: "Brute_Force", height: 168.2 },
        { username: "Bot_Net", height: 111.1 },
        { username: "草薙素子", height: 168.0 },
        { username: "荒巻大輔", height: 153.0 },
        { username: "バトー", height: 187.0 },
        { username: "トグサ", height: 178.5 },
        { username: "イシカワ", height: 180.0 },
        { username: "サイトー", height: 172.0 },
        { username: "ボーマ", height: 200.0 },
        { username: "パズ", height: 177.0 },
        { username: "タチコマ", height: 200.0 },
      ]);
    });
};
