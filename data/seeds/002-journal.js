exports.seed = function(knex, Promise) {

  return knex('journal').insert([   
    {
      date: "12-12-2019",
      upper_body: "chest",
      lower_body: "None",
      core: "abs", 
      users_id: 1
     }, 
     {
       date: "11-12-2018",
       upper_body: "arms",
       lower_body: "none",
       core: "none",   
       users_id: 1
      },
    {
      date: "1-1-2020",
      upper_body: "none",
      lower_body: "legs",
      core: "none",    
      users_id: 2
    }
  ]);

};