
exports.seed = function(knex) {
  // Deletes ALL existing entries
  return knex('users').del()
    .then(function () {
      // Inserts seed entries
      return knex('users').insert([
          {
              firstName: "Jack",
              lastName:"Black",
              age:46,
              email:"jack@email.com",
              gender:"Male",
              phone:"559-559-1256",
              imageUrl:'https://image.shutterstock.com/image-photo/portrait-mixed-race-man-600w-1216778014.jpg',
              catchPhrase:"Autobots roll out",
              address:"4875 Jupiter Rd",
              city: "Dallas ",
              state:"Texas",
              zip:"12547",
              interests: [1, 3, 6]
          },
          {
              firstName: "John",
              lastName:"Smith",
              age:35,
              email:"email2@email.com",
              gender:"male",
              phone:"555-555-5555",
              imageUrl:'https://images.pexels.com/photos/220453/pexels-photo-220453.jpeg?auto=compress&cs=tinysrgb&dpr=1&w=500',
              catchPhrase:"Be all you can be",
              address:"New York",
              city: "123 New York St",
              state:"New York",
              zip:"77777",
              interests: [1, 3, 6]
          },
          {
              firstName: "Maria",
              lastName:"Valentine",
              age:27,
              email:"email3@email.com",
              gender:"Female",
              phone:"555-555-5556",
              imageUrl:'https://image.shutterstock.com/image-photo/face-blonde-happy-bride-before-260nw-546759481.jpg',
              catchPhrase:"Make a wish and dive in",
              address:"555 Magnolia Dr",
              city: "Boston",
              state:"Massachusetts",
              zip:"71234",
              interests: [1, 3, 6]
          },
          {
              firstName: "Mark",
              lastName:"White",
              age:21,
              email:"email4@email.com",
              gender:"Male",
              phone:"555-555-7556",
              imageUrl:'https://image.shutterstock.com/image-photo/head-shoulders-portrait-young-african-600w-388588540.jpg',
              catchPhrase:"Shoot for the moon",
              address:"7810 Old Town Rd",
              city: "San Fansico",
              state:"California",
              zip:"45451",
              interests: [1, 3, 6]
          }
      ]);
    });
};
