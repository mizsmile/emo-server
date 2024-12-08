/**
 * Node.js Resful API Frameworks
 * Express: Express는 웹 및 모바일 애플리케이션을 위한 강력한 기능 세트를 제공하는 Node.js용 미니멀리스트 웹 프레임워크
 * CORS란 자신이 속하지 않은 다른 도메인, 다른 프로토콜, 혹은 다른 포트에 있는 리소스를 요청하는 cross-origin HTTP 요청 방식
 * app.js 파일 생성
 * npm init
 * npm install express
 * npm install mysql
 * * npm install http
 * * npm install cors
 * npm install http express cors mysql : 한방에 설치 가능
 * 
 * node 실행 : node app.js
 * node 실행 중단 : Ctrl+c
 */
const http = require('http'); // https로 변경할 수 있습니다.
const express = require('express');
const cors = require('cors');
const app = express();

// 모든 도메인에서 제한 없이 해당 서버에 요청을 보내고 응답하도록 허용 
// 특정 도메인에만 허용하려면 corsOptions 를 이용하여 설정 가능
app.use(cors());

// mariaDB 연결
const maria = require('./database/connect/mariadb');
maria.connect();

const port = 3000;
const server = app.listen(port, () => {
  console.log(`Example app listening on port ${port}`)
});

// 모든 사용자 정보 (GET)
app.get('/api/users', async (req, res) => {
  maria.query('select * from t_user', function(err, rows, fields) {
    if(!err){
      // console.log("succ", rows);
      // array 로 보내줌
      res.send(rows);
    }
    else {
      console.log("err : ", err);
    }
  });
})

// 특정 사용자 정보 (GET)
app.get('/api/users/:username', async (req, res) => {
  // console.log('요청받은 파라미터 :>> ', req.params);
  // let { username, password } = req.params; // 요청 파라미터 중에서 username, password 변수 선언
  // const sql = `select * from t_user where username = '${username}' and password = '${password}'`;

    let { username } = req.params;  // 요청 파라미터 중에서 username 변수 선언
  
  const sql = `select * from t_user where username = '${username}'`; // 백틱(`)을 사용하면 문자열 안에 변수를 넣을 수 있음
  maria.query(sql, function(err, rows, fields) {
    if(!err){
      // array 타입이 아닌 object 타입으로 데이터 발송
      // console.log("succ", rows);
      res.send(rows[0]);
    }
    else {
      console.log("err : ", err);
    }
  });
})

// 사용자 등록 (POST)
// 모든 게시글 list 조회
// 특정 게시글 조회
// 게시글 등록
// 게시글 수정
// 게시글 삭제

// 샘플 api
app.get('/api/idols/:group', async (req, res) => {
  // 파라미터 정보 가져오기
  let { group } = req.params;

  if (group === 'monsta-x') {
    let data = [
      {name: "셔누", age: 31},
      {name: "민혁", age: 30},
      {name: "기현", age: 30},
      {name: "형원", age: 29},
      {name: "주헌", age: 29},
      {name: "아이엠", age: 27},
    ];
    // 데이터 보내기
    res.send(data);
  } else if (group === 'red-velvet') {
    let data = [
      {name: "웬디", age: 29},
      {name: "아이린", age: 32},
      {name: "슬기", age: 29},
      {name: "조이", age: 27},
      {name: "예리", age: 24},
    ];
    // 데이터 보내기
    res.send(data);
  } else {
    res.send('존재하지 않는 그룹입니다.')
  }
})
