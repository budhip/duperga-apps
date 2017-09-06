## How to run
in development mode:
```
npm run dev
```

in production:
```
npm start
```

## API End Point

### User End Point

Method | URL | Description
------------ | -------------| ----
GET | ```/api/users/``` | get all user
POST | ```/api/users/register``` | register user (public)
POST | ```/api/users/login``` | login user (public)
DELETE | ```/api/users/:userID``` | delete one user (authorized user or admin only)
DELETE | ```/api/users/clear``` | delete all user (dev porpuse only)

### Wishlist End Point

Method | URL | Description
------------ | -------------| ----
GET | ```/api/wishlist//``` | get all wishlist's user (authorized user)
GET | ```/api/wishlist/:wishlistID/``` | get One wishlist user (authorized user)
POST | ```/api/wishlist/``` | create one wishlist (authorized user)
PUT | ```/api/wishlist/:wishlistID``` | update one wishlist (authorized user)
DELETE | ```/api/wishlist/clear``` | delete all wishlist (dev porpuse only)
DELETE | ```/api/wishlist/:wishlistID``` | delete one user (authorized user or admin only)
