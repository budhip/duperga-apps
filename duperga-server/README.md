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
POST | ```/api/users/register``` | public
POST | ```/api/users/login``` | public
DELETE | ```/api/users/clear``` | delete all user (dev porpuse only)
DELETE | ```/api/users/:userID``` | delete one user (authorized user or admin only)
