# IOT 서비스 만들기 실습

## Back-end Server 만들기

### Goals

- Express + MySQL + Sequelize API Server - https://sequelize.org/
- Test-Driven Development - Jest - https://jestjs.io/
- Documentation: Swagger - https://swagger.io/  https://github.com/scottie1984/swagger-ui-express
- Authentication: JSON Web Token (JWT) - https://github.com/auth0/node-jsonwebtoken#readme



- CORS: same-origin policy 완화. 
- Password 암호화: bcrypt 

```sh
npx express-generator --view=pug --git sens-server

cd sens-server
npm install

# 필요한 library 추가
npm install jsonwebtoken cors bcryptjs sequelize mysql2 swagger-ui-express
npm install pug@3.0.0   # 꼭 필요하지는 않지만, warning을 없애려고



```



### Swagger 문서 만들기

1. https://editor.swagger.io/ 에서 API의 Spec을 정하고 문서로 작성

2. Export as JSON

3. Express의 특정 디렉토리에서 service



### Jestjs.io를 이용한 테스트 

1. Package.json에 test 스크립트 정의 넣기
2. test파일 만들기
3. npm test 로 test 수행
4. RED->GREEN



### Sequlize

```shell
npm install --save sequelize-cli

npx sequelize-cli init

# 접속 정보: 살펴보고 자기에 맞게 수정
config/config.json 

# Database 생성
npx sequelize-cli db:create --charset=utf8mb4

# test DB도 생성
NODE_ENV=test npx sequelize-cli db:create --charset=utf8mb4 

# User migration 생성
npx sequelize-cli model:generate --name User --attributes email:string,password:string
```



### Device

- Device - Report -> Server 
- POST /api/devices/:id/report (인증기기)
- 

## Front-end App 만들기

### Goals

- React Native, React Navigation, 
- API 연동