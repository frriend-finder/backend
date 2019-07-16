# Backend for FriendFinder App

## Endpoints

### GET user/

GET  user without a parameter will return a list of all users

### GET user/:id

GET user with an id will get a specific user

i.e. https://myurl.com/user/14 will return the user with an id 14

### POST user/

Add a new user to the database. Send a user object in the body of the request

    {
      "email": "jack@email.com",
      "firstName": "Jack",
      "lastName": "Black",
      "age": 46,
      "phone": "559-559-1256",
      "address": "4875 Jupiter Rd",
      "city": "Dallas ",
      "state": "Texas",
      "zip": "12547",
      "catchPhrase": "Autobots roll out",
      "gender": "Male",
      "imageUrl": "https://image.shutterstock.com/image-photo/portrait-mixed-race-man-600w-1216778014.jpg"
    }

### PUT user/:id

Update an existing user's data. Any data can be updated, but the id and email need to remain unique.
Only need to send the fields that need to be updated

    {
      "lastName": "Green",
      "age": 12
    }
    
### DELETE user/:id

Delete the specified user. This cannot be undone.