# Backend for FriendFinder App

## Endpoints

### user/ endpoints

### GET user/

GET  user without a parameter will return all users as an array of objects

    [
      {
        "id": 1,
        "email": "email2@email.com",
        "firstName": "John",
        "lastName": "Smith",
        "age": 35,
        "phone": "555-555-5555",
        "address": "New York",
        "city": "123 New York St",
        "state": "New York",
        "zip": "77777",
        "catchPhrase": "Be all you can be",
        "gender": "male",
        "imageUrl": "https://images.pexels.com/photos/220453/pexels-photo-220453.jpeg?auto=compress&cs=tinysrgb&dpr=1&w=500"
      },
      {
        "id": 2,
        "email": "email3@email.com",
        "firstName": "Maria",
        "lastName": "Valentine",
        "age": 27,
        "phone": "555-555-5556",
        "address": "555 Magnolia Dr",
        "city": "Boston",
        "state": "Massachusetts",
        "zip": "71234",
        "catchPhrase": "Make a wish and dive in",
        "gender": "Female",
        "imageUrl": "https://image.shutterstock.com/image-photo/face-blonde-happy-bride-before-260nw-546759481.jpg"
      },
      {
        "id": 3,
        "email": "email4@email.com",
        "firstName": "Mark",
        "lastName": "White",
        "age": 21,
        "phone": "555-555-7556",
        "address": "7810 Old Town Rd",
        "city": "San Fansico",
        "state": "California",
        "zip": "45451",
        "catchPhrase": "Shoot for the moon",
        "gender": "Male",
        "imageUrl": "https://image.shutterstock.com/image-photo/head-shoulders-portrait-young-african-600w-388588540.jpg"
      },
      {
        "id": 9,
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
    ]

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

***

### interests/ endpoint

### GET interests/

Returns all interests as an array of objects

    [
      {
        "id": 1,
        "name": "food"
      },
      {
        "id": 2,
        "name": "movies"
      },
      {
        "id": 3,
        "name": "dancing"
      },
      {
        "id": 4,
        "name": "sports"
      },
      {
        "id": 5,
        "name": "music"
      }
    ]
    
### GET interests/:id

Returns an array containing the name of the interest with the given id.

    [
        "movies"
    ]
    
### POST interests/

Adds a new interest to the database. An interest object with a name field should be sent in the body of the request.

    {
        "name": "travel"
    }
    
### GET interests/user/:user_id

Returns an array of interests as id numbers for the user with user_id.

    [
        1,
        3,
        5
    ]
    
### GET interests/:interest_id/users

Returns an array of users as user ids for the interest.

    [
        1, 
        3, 
        9
    ]