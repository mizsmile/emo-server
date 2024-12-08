const express = require("express");
const app = express();
const maria = require("./database/connect/mariadb"); //.js 넣어도 되고 안넣어도 됨
maria.connect();
const port = 3000;

const server = app.listen(port, () => {
  console.log(`Example app listening on port ${port}`);
});

app.get("/users", async (req, res) => {
  maria.query("select * from t_user", function (err, rows, fields) {
    if (!err) {
      console.log("succ", rows);
      res.send(rows);
    } else {
      console.log("err : ", err);
    }
  });
});

app.get("/users/:group", async (req, res) => {
  // 파라미터 정보 가져오기
  let { group } = req.params;

  if (group === "monsta-x") {
    let data = [
      { name: "셔누", age: 31 },
      { name: "민혁", age: 30 },
      { name: "기현", age: 30 },
      { name: "형원", age: 29 },
      { name: "주헌", age: 29 },
      { name: "아이엠", age: 27 },
    ];
    // 데이터 보내기
    res.send(data);
  } else if (group === "red-velvet") {
    let data = [
      { name: "웬디", age: 29 },
      { name: "아이린", age: 32 },
      { name: "슬기", age: 29 },
      { name: "조이", age: 27 },
      { name: "예리", age: 24 },
    ];
    // 데이터 보내기
    res.send(data);
  } else {
    res.send("존재하지 않는 그룹입니다.");
  }
});

// const http = require('http');

// const express = require('express');
// const app = express();
// const server = http.createServer(app);
// server.listen(3065);

// const http = require('http');
// const server = http.createServer((req, res) => {
//   console.log(req.url, req.mothod);
//   res.end('Hello World!');
// });

// server.listen(3065, () => {
//   console.log('서버 실행중');
// });

// const http = require('http');
// const server = http.createServer((req, res) => {
//   res.writeHead(200, { 'Content-Type': 'application/json' });
//   res.end(JSON.stringify({
//     data: 'Hello World!'
//   }));
// });

// server.listen(8000);
