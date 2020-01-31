exports.seed = function(knex, Promise) {

  return knex('users').insert([   
    {
      username: "user",
      password: "examplepass",
      first_name: "Some",
      last_name: "User",
      age: 26,
      email: "user@email.com"     
     }, 
     {
       username: "john",
       password: "examplepass",
       first_name: "Johnathan",
       last_name: "Doe",
       age: 19,
       email: "john@email.com"
       
      },
    {
      username: "jane",
      password: "examplepass",
      first_name: "Jane",
      last_name: "Doe",
      age: 30,
      email: "jane@email.com"     
    }
  ]);

};