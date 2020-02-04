const bcrypt = require('bcryptjs');
exports.seed = function(knex) {
  // Deletes ALL existing entries
  return knex('users').del()
    .then(function () {
      // Inserts seed entries
      return knex('users').insert([
        {username: 'sample', firstName: 'Darren', lastName: 'Angus', password: bcrypt.hashSync('pass', 10), email: 'majdaionwjck@wlj.to'},
        {username: 'sahmpdle', firstName: 'Sample', lastName: 'Ng', password: bcrypt.hashSync('pass', 10), email: 'majdaionwjy@wlj.to'},
        {username: 'samsdple', firstName: 'Weight', lastName: 'Lift', password: bcrypt.hashSync('pass', 10), email: 'chjdaionwjarles@wlj.to'},
        {username: 'sasfjmple', firstName: "sapemeKuana", lastName: 'Dahdnwonvis', password: bcrypt.hashSync('pass', 10), email: 'yajdaionwjkuana@wlj.to'},
        {username: 'samadgple', firstName: 'sapeme', lastName: 'Hahdnwonmraj', password: bcrypt.hashSync('pass', 10), email: 'dajdaionwjn@wlj.to'},
        {username: 'samwdpdle', firstName: 'sapemejah', lastName: 'Fohdnwonster', password: bcrypt.hashSync('pass', 10), email: 'eljdaionwjijah@wlj.to'},
        {username: 'sadmplde', firstName: 'sapemeghton', lastName: 'Frhdnwonitze', password: bcrypt.hashSync('pass', 10), email: 'lejdaionwjighton@wlj.to'},
        {username: 'samehple', firstName: 'sapemehua', lastName: 'Shhdnwonockley', password: bcrypt.hashSync('pass', 10), email: 'jojdaionwjshua@wlj.to'},
        {username: 'samafdfple', firstName: 'sapeme', lastName: 'Echdnwoncleston', password: bcrypt.hashSync('pass', 10), email: 'dojdaionwjm@wlj.to'},
        {username: 'samdpfdrele', firstName: 'sapemenor', lastName: 'Hohdnwonlly', password: bcrypt.hashSync('pass', 10), email: 'cojdaionwjnnor@wlj.to'}
      ]);
    });
}