# Sequelize를 이용해 React와 Mysql 연동 방법

### 사전준비

- Sequelize-cli 설치: https://github.com/sequelize/cli
- Express generator 설치
- Mysql 설치
- Nodemon 설치: yarn global add nodemon

### Mysql 설치
1. Mac
```sh
$ brew update
$ brew install mysql
$ mysql.server start
$ mysql -uroot
```

2. Windows
- https://dev.mysql.com/downloads/windows/

### 이 repository를 그냥 실행만 하려면?
```
$ npm install
$ cd client
$ npm install

$ mysql -uroot
  >  CREATE USER 'blog'@'localhost' IDENTIFIED BY 'blog123';
  >  ALTER USER 'blog'@'localhost' IDENTIFIED WITH mysql_native_password BY 'blog123';
  >  FLUSH PRIVILEGES;
  >  quit

$ cd ..
$ sequelize db:create
$ sequelize db:migrate
$ yarn start
```

### 이 repository처럼 새로운 프로젝트를 단계별로 제작한다면
1. DB 생성: psql을 이용하여 새로운 사용자와 DB를 만든다.

   ```
   $ mysql -uroot
    >  CREATE DATABASE `blog_development`;
    >  CREATE DATABASE `blog_production`;
    >  CREATE DATABASE `blog_test`;
    >  grant all privileges on blog_development.* to 'blog'@'localhost';
    >  grant all privileges on blog_production.* to 'blog'@'localhost';
    >  grant all privileges on blog_test.* to 'blog'@'localhost';
    >  ALTER USER 'blog'@'localhost' IDENTIFIED WITH mysql_native_password BY 'blog123';
    >  FLUSH PRIVILEGES;
    >  quit
   ```

2. Express Generator로 새로운 express app을 생성한다.

   ```sh
   $ yarn global add express-generator    (이 과정은 전에 했던 사람은 안해도 됨)
   $ express --view=pug --git <ServerName>
   $ cd <ServerName>
   $ yarn     (혹은 npm install)
   ```

3. Sequelize 추가

   ```sh
   $ yarn global add sequelize-cli    (이 과정은 전에 했던 사람은 안해도 됨)
   $ yarn add sequelize pg pg-hstore mysql2
   $ sequelize init
   ```

4. DB접속 설정: config/config.json

   ```JSON
   {
      "development": {
        "username": "blog",
        "password": "blog123",
        "database": "blog_development",
        "host": "127.0.0.1",
        "dialect": "mysql"
      },
      "test": {
        "username": "blog",
        "password": "blog123",
        "database": "blog_test",
        "host": "127.0.0.1",
        "dialect": "mysql"
      },
      "production": {
        "username": "blog",
        "password": "blog123",
        "database": "blog_production",
        "host": "127.0.0.1",
        "dialect": "mysql"
      }
    }
   ```

5. Sequelize-cli를 이용하여 Post 모델을 만들자
   ```sh
   $ sequelize model:create --name Post --attributes "title:string name:string content:text"
   ```

6. DB를 migration 하자
   ```sh
   $ sequelize db:migrate
   ```