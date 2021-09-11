**test fetch**
```
route: /hello/world
fetch('/erudite/lyrics', {
    method: "POST",
    headers: {
      "Content-Type": "application/json",
      "XSRF-TOKEN": `KrIs8VBc-IIMpDbUCZ-meR0pirLGGywBCqIM`
    },
    body: JSON.stringify({ hello: 'world' })
  }).then(res => res.json()).then(data => console.log(data));
```
**start database**
+ npx sequelize model:generate --name User --attributes username:string,email:string,hashedPassword:string
+ npx sequelize model:generate --name Song --attributes artist:string,title:string,producer:string,body:text,media:string,coverArt:string,backgroundArt:string
+ npx sequelize model:generate --name Annotation --attributes userID:integer,songID:integer,body:text,startPos:integer,endPos:integer
+ npx sequelize model:generate --name Comment --attributes userID:integer,songID:integer,body:text
+ npx dotenv sequelize db:migrate
  + npx dotenv sequelize db:migrate:undo:all (if needed)
