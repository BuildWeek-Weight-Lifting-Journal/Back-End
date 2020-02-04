exports.seed = function(knex) {

  return knex('users').insert([   
    {
      username: "user",
      password: "examplepass",
      first_name: "Some",
      last_name: "User",      
      email: "user@email.com"     
     }, 
     {
       username: "john",
       password: "examplepass",
       first_name: "Johnathan",
       last_name: "Doe",       
       email: "john@email.com"
       
      },
    {
      username: "jane",
      password: "examplepass",
      first_name: "Jane",
      last_name: "Doe",      
      email: "jane@email.com"     
    }
  ]);

};