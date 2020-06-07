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





## Front-end App 만들기

### Goals

- React Native, React Navigation, 
- API 연동