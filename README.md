# userBackend
NodeJS Backend for register, login, update, and update image of users with JWT tokens

1- user.json is mongoDB collection just for using like template
2- start script on package.json works with nodemon change for production enviroment
3- Mongo connection and server are in index.js
4- middleware contains JWT function
5- routes and controller contains register, login, upload and upload image function and its calls.
6- those routes can be proben on POSTMAN.
7- Pay attention, upload function require token on header Authentication.
8- Services/jwt create token



