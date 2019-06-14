# MobX + API + Styled Component (IoT)

https://github.com/dongseop/mju-class-react/tree/master/11_mobx



## 1. 기본 설치

```shell
# Install Node 10+
npm install -g expo-cli 
npm install express-generator -g
npm install -g nodemon
```

이 외에 vscode, android studio나 Xcode 등의 설치가 필요할 수 있다.



## 2. API Server 



### 2.1 프로젝트 생성

```shell
express --pug --git server
cd server 
npm install
eslint --init # ESLint를 초기화해두면 vscode에서 에러 체크가 나와서 편리하다. 대신 룰은 자기에게 맞게 설정하자.
```
server의 package.json 에서 start script를 nodemon을 이용하도록 수정하자.

```
# server/package.json의 아래 부분을 
    "start": "node ./bin/www"
# 이렇게 수정
    "start": "nodemon ./bin/www"
```



### 2.2 가짜 데이터 생성

API 서버의 데이터는 테스트를 위해 임의로 생성해서 제공하자.  Faker package를 사용해서 그럴듯 한 데이터를 생성해보자.

``` shell
npm install faker
```



최대한 단순하게 구현하기 위하여 routers/index.js에 모든 코드를 작성하겠지만, 실제로는 별도의 모듈화를 하는 편이 좋겠다.

routers/index.js에 아래와 같은 코드 추가

```javascript
const faker = require('faker');
const _ = require('lodash');

const users = [];
const sensorGroups = [];
const sensors = [];
const sensorValues = {};
let gId = 0, sId = 0, uId = 0;

function fakeUser() {
  return {
    id: uId++,
    name: faker.name.findName(),
    email: faker.internet.email,
    avatar: faker.image.avatar(),
  };
}

function fakeSensorGroup(user) {
  return {
    id: gId++,
    name: faker.commerce.productName(),
    location: faker.address.city(),
    img: faker.image.image(),
    user
  };
}

function fakeSensor(user, sensorGroup) {
  const s = {
    id: sId++,
    name: faker.commerce.productName(),
    temp: faker.random.number(30),
    hum: faker.random.number(100),
    co2: faker.random.number(4000),
    user, sensorGroup
  };
  sensorValues[s.id] = [s.temp];
  return s;
}

function generateFakeData() {
  /* 가짜로 데이터를 생성하자. */
  for (let i = 0; i < 10; i++) {
    const user = fakeUser();
    users.push(user);
    for (let j = 0; j < faker.random.number({ min: 1, max: 5 }); j++) {
      let sensorGroup = fakeSensorGroup(user);
      sensorGroups.push(sensorGroup);

      for (let k = 0; k < faker.random.number({ min: 1, max: 10 }); k++) {
        const sensor = fakeSensor(user, sensorGroup);
        sensors.push(sensor);
      }
    }
  }
}

generateFakeData();
```



센서 데이터는 1초에 한 번씩 자동으로 변경되도록 만들어 보자.

```javascript
setInterval(() => {
  _.each(sensors, function (sensor) {
    sensor.temp += faker.random.number({ min: -1, max: 1 });
    sensor.hum += faker.random.number({ min: -3, max: 3 });
    sensor.co2 += faker.random.number({ min: -30, max: 30 });
    sensorValues[sensor.id] = [...sensorValues[sensor.id].slice(-29), sensor.temp];
  });
}, 1000);
```



### 2.3  API 완성
다음의 REST API를 구현하자
- GET /api/users - 사용자 목록 반환
- GET /api/users/:id - 특정 사용자의 상세 정보 반환
- GET /api/users/:id/sensor_groups - 특정 사용자의 센서 그룹 목록 반환
- GET /api/sensor_groups - 센서 그룹의 목록 반환
- GET /api/sensor_groups/:id - 특정 센서 그룹의 정보 반환
- GET /api/sensor_groups/:id/sensors - 특정 센서 그룹의 센서 목록 반환
- GET /api/sensors - 모든 센서의 목록 반환
- GET /api/sensors/:id - 특정 센서의 정보 반환
- GET /api/sensors/:id/values - 특정 센서의 최근 30개의 측정 온도 반환



```javascript
router.get('/api/users', function(req, res) {
  res.json(users);
});

router.get('/api/sensor_groups', function (req, res) {
  res.json(sensorGroups);
});
router.get('/api/sensors', function (req, res) {
  res.json(sensors);
});

router.get('/api/users/:id', function(req, res) {
  let id = parseInt(req.params.id, 10);
  res.json(users.find(e => e.id == id));
});

router.get('/api/sensor_groups/:id', function (req, res) {
  let id = parseInt(req.params.id, 10);
  res.json(sensorGroups.find(e => e.id == id));
});

router.get('/api/sensors/:id', function (req, res) {
  let id = parseInt(req.params.id, 10);
  res.json(sensors.find(e => e.id == id));
});

router.get('/api/users/:id/sensor_groups', function (req, res) {
  let id = parseInt(req.params.id, 10);
  res.json(sensorGroups.filter(e => e.user.id == id));
});

router.get('/api/sensor_groups/:id/sensors', function (req, res) {
  let id = parseInt(req.params.id, 10);
  res.json(sensors.filter(e => e.sensor_group.id == id));
});

router.get('/api/sensors/:id/values', function (req, res) {
  let id = parseInt(req.params.id, 10);
  res.json(sensorValues[id]);
});

```



### 2.4 API 테스트
``` bash
npm start
```

'localhost:3000'에 접속 가능함. 
Postman 앱을 이용하여 각 API를 호출해보자.



#### 샘플 Result

```json
# GET /api/users
[
    {
        "id": 0,
        "name": "Arch Beatty Sr.",
        "avatar": "https://s3.amazonaws.com/uifaces/faces/twitter/ashocka18/128.jpg"
    },
    ...
]
  
  
# GET /api/sensor_groups
[
    {
        "id": 0,
        "name": "Ergonomic Frozen Gloves",
        "img": "http://lorempixel.com/640/480/technics",
        "location": "Port Owen",
        "user": {
            "id": 0,
            "name": "Arch Beatty Sr.",
            "avatar": "https://s3.amazonaws.com/uifaces/faces/twitter/ashocka18/128.jpg"
        }
    },
...
]

# GET /api/sensors
[
    {
        "id": 0,
        "name": "Ergonomic Concrete Car",
        "temp": -1,
        "hum": 61,
        "co2": 1275,
        "user": {
            "id": 0,
            "name": "Arch Beatty Sr.",
            "avatar": "https://s3.amazonaws.com/uifaces/faces/twitter/ashocka18/128.jpg"
        },
        "sensor_group": {
            "id": 0,
            "name": "Ergonomic Frozen Gloves",
            "location": "Port Owen",
            "user": {
                "id": 0,
                "name": "Arch Beatty Sr.",
                "avatar": "https://s3.amazonaws.com/uifaces/faces/twitter/ashocka18/128.jpg"
            }
        }
    },
  ...
```



## 3. React Native App

### 3.1 프로젝트 생성

Server 디렉토리를 빠져나와서 별도의 client 프로젝트를 생성하자.

```shell
expo init client
# tab 형태의 template 선택하고 프로젝트 이름 등을 본인에게 알맞게 설정
cd client

npm install
npm start
# Expo 앱을 이용하여 프로젝트가 잘 실행되는지 확인하자. 

# 다음 명령을 통해 eslint를 활성화하자. ES6, ES6 modules, Node, JSX, React, 등 선택
eslint --init

# 아래 내용 eslint에 추가
# "parser": "babel-eslint",
# "parserOptions" > "ecmaFeatures" > "experimentalDecorators": true,
# "rules" > "react/jsx-uses-vars": 2,
# "rules" > "react/jsx-uses-react": 1,
npm install babel-eslint --save-dev
```

참고 .eslintrc.js
Lint를 이용하면 vscode에서 잠재적인 오류를 미리 잡아주므로 편리하다.
만일 eslint가 없다면 `npm install -g eslint` 와 같이 eslint를 설치하여야 함

```javascript
module.exports = {
    "env": {
        "es6": true,
        "node": true
    },
    "parser": "babel-eslint",
    "extends": [
        "eslint:recommended"
    ],
    "parserOptions": {
        "ecmaFeatures": {
            "experimentalObjectRestSpread": true,
            "experimentalDecorators": true,
            "jsx": true
        },
        "sourceType": "module"
    },
    "plugins": [
        "react"
    ],
    "rules": {
        "no-console": 0,
        "indent": [
            "error",
            2
        ],
        "no-unused-vars": ["error", { "vars": "all", "args": "after-used", "ignoreRestSiblings": false }],
        "linebreak-style": [
            "error",
            "unix"
        ],
        "quotes": [
            "error",
            "single"
        ],
        "semi": [
            "error",
            "always"
        ],
        "react/jsx-uses-vars": 2,
        "react/jsx-uses-react": 1,
    }
};
```


### 3.2 UsersScreen 구현

#### 화면 UI를 위한 package 추가

```shell
npm install react-native-elements
```
https://react-native-training.github.io/react-native-elements/ 를 참고하기 바람.
다양한 UI element를 제공함.


#### /components/UserItem.js 추가

List에서 User 한 명의 row를 화면에 출력하기 위한 컴포넌트. chevron은 오른쪽 끝에 화살표를 넣어줄지를 결정
```javascript
import React from 'react';
import { ListItem } from 'react-native-elements';

// ListItem : https://react-native-training.github.io/react-native-elements/docs/listitem.html 참고
export default ({ user, chevron }) => {
  return <ListItem
    leftAvatar={{ source: { uri: user.avatar } }}
    title={user.name}
    chevron={chevron}
  />;
};
```



#### /screens/UsersScreen.js 추가
테스트로 가상의 users 데이터를 화면에 뿌려보자. 
```javascript
import React, { Component } from 'react';
import {
  Alert,
  FlatList,
  TouchableOpacity
} from 'react-native';
import UserItem from '../components/UserItem';

const UserListItem = ({ user, onPress }) => {
  return (
    <TouchableOpacity onPress={onPress}>
      <UserItem user={user} chevron={true} />
    </TouchableOpacity>
  );
};

class UsersScreen extends Component {
  static navigationOptions = {
    title: 'Users',
  }
  constructor(props) {
    super(props);
    this.state = {
      list: [
        // sample data
        {
          id: 0,
          name: 'Chase Gulgowski',
          avatar: 'https://s3.amazonaws.com/uifaces/faces/twitter/jm_denis/128.jpg'
        },
        {
          id: 1,
          name: 'Aurelie White',
          avatar: 'https://s3.amazonaws.com/uifaces/faces/twitter/martip07/128.jpg'
        },
        {
          id: 2,
          name: 'Mauricio Tremblay',
          avatar: 'https://s3.amazonaws.com/uifaces/faces/twitter/iamkeithmason/128.jpg'
        },
        {
          id: 3,
          name: 'Chanel Lang',
          avatar: 'https://s3.amazonaws.com/uifaces/faces/twitter/angelceballos/128.jpg'
        },
      ]
    };
  }

  render() {
    return (
      <FlatList
        data={this.state.list}
        keyExtractor={(item) => `${item.id}`}
        renderItem={({ item }) => {
          return (
            <UserListItem user={item}
              onPress={() => Alert.alert(`${item.name} selected`) }
            />
          );
        }}
      />
    );
  }
}

export default UsersScreen;

```



#### /navigation/MainTabNavigator.js 수정
이미 만들어둔 MainTabNavigator에 UsersScreen을 추가하기 위한 코드. 아래에 User 탭을 넣고 처음에 user 목록이 나오도록 수정.

```javascript
...
// HomeScreen과 HomeStack을 지우고 UsersScreen과 UsersStack 추가
import UsersScreen from '../screens/UsersScreen';
...
const UsersStack = createStackNavigator({
  Users: UsersScreen,
});

UsersStack.navigationOptions = {
  tabBarLabel: 'Users',
  tabBarIcon: ({ focused }) => (
    <TabBarIcon
      focused={focused}
      name={Platform.OS === 'ios'
        ? 'ios-person' : 'md-people'}
    />
  ),
};
...
// HomeStack 대신 UsersStack 추가
export default createBottomTabNavigator({
  UsersStack,
  LinksStack,
  SettingsStack,
});
```



#### 실행
실행해보고 결과를 확인하자.

```shell
npm start
```



### 3.3 API Service 구현
이제 backend와 frontend를 연결해보자. axios를 이용해서 REST Api를 호출해오는 코드 

```shell
npm install axios
```



#### /services/ApiService.js 에 다음 코드 작성
모든 api 연결 코드를 하나의 파일에 모아놓으면 편리하다. 그리고, backend와 연결할 때 
공통으로 필요한 header나 token 설정을 위해서 axios를 별도의 instance로 생성

* 아래 baseURL은 본인의 ip 주소로 수정해야 함*

```javascript
import axios from 'axios';

// baseURL 및 기본 설정들을 위해서 별도의 client 생성
const client = axios.create({
  baseURL: 'http://192.168.0.103:3000/api/',
  headers: { 'x-app-version': '0.0.1', 'x-appname': 'sensor app' }
});


class ApiService {
  getUsers() {
    return client.get('/users');
  }

  getUser(id) {
    return client.get(`/users/${id}`);
  }

  getSensorGroups(userId) {
    if (userId || userId === 0) {
      return client.get(`/users/${userId}/sensor_groups`);
    } else {
      return client.get('/sensor_groups');
    }
  }

  getSensorGroup(id) {
    return client.get(`/sensor_groups/${id}`);
  }

  getSensors(sensorGroupId, config) {
    if (sensorGroupId || sensorGroupId === 0) {
      return client.get(`/sensor_groups/${sensorGroupId}/sensors`, config);
    } else {
      return client.get('/sensors', config);
    }
  }

  getSensor(id) {
    return client.get(`/sensors/${id}`);
  }

  getValues(sensorId) {
    return client.get(`/sensors/${sensorId}/values`);
  }
}

export default new ApiService();

```



#### /screens/UsersScreens.js 수정

state의 list를 빈상태로 시작하고, componentDidMount에서 ApiService를 이용하여 data를 가져오자.

```javascript
...
import ApiService from '../services/ApiService';
...
class UsersScreen extends Component {
  ...
  constructor(props) {
    super(props);
    this.state = {
      list: []
    };
  }

  componentDidMount() {
    ApiService.getUsers().then(resp => {
      this.setState({list: resp.data});
    });
  }
  
...
```



### 3.4 MobX 기초

#### MobX 관련 패키지 설치

```shell
npm install mobx mobx-react@5
```



#### /jsconfig.json  추가 

MobX를 function을 이용해서 사용할 수도 있지만, decorator syntax를 사용하면 읽기도 쉽고 편하다. 
다만, decorator syntax가 아직 공식 표준이 아니므로 editor에서 warning이 발생하는데, 
Decorator 오류가 vscode에서 나지 않도록 설정 추가. 파일 추가 후 vscode를 새로 시작해야 한다.

```javascript
{
    "compilerOptions": {
        "experimentalDecorators": true,
    }
}
```



#### /screens/UsersScreens.js 수정

this.state관련 코드를 모두 없애고, mobx의 decorator를 사용해보자.

```javascript
import React, { Component } from 'react';
import {
  View, Text,
  FlatList,
  TouchableOpacity
} from 'react-native';
import UserItem from '../components/UserItem';
import ApiService from '../services/ApiService';
import { observable, computed, runInAction, action } from 'mobx';
import { observer } from 'mobx-react';

const UserListItem = ({ user, onPress }) => {
  return (
    <TouchableOpacity onPress={onPress}>
      <UserItem user={user} chevron={true} />
    </TouchableOpacity>
  );
};

@observer
class UsersScreen extends Component {
  static navigationOptions = {
    title: 'Users',
  }

  @observable list = [];
  @observable name = 'User';
  @computed get count() {
    return this.list.length;
  }
  constructor(props) {
    super(props);
  }

  componentDidMount() {
    this.fetch();    
  }

  async fetch() {
    const resp = await ApiService.getUsers();
    runInAction(() => {
      this.list = resp.data;
      this.name = this.name + '.';
      this.changeName(this.list[0]);
    });
  }

  @action
  changeName(user) {
    user.name = user.name + ' !';
  }

  render() {
    console.log('RENDER in UsersScreen');
    return (
      <View>
        <Text>{this.name} : {this.count}</Text>
        <FlatList
          data={this.list}
          keyExtractor={(item) => `${item.id}`}
          renderItem={({ item }) => {
            return (
              <UserListItem user={item}
                onPress={() => {
                  this.changeName(item);
                }}
              />
            );
          }}
        />

      </View>
    );
  }
}

export default UsersScreen;

```



#### /components/UserItem.js 수정
이 컴포넌트는 클래스의 형태가 아니므로 decorator syntax를 사용할 수는 없다. 대신 observer function을 붙여주면 
내부에서 observable을 접근하고 있는 부분이 있으면 해당 observable이 변경될 때 함수를 자동 실행해준다.

```javascript
import React from 'react';
import { ListItem } from 'react-native-elements';
import { observer } from 'mobx-react';

// ListItem : 
// https://react-native-training.github.io/react-native-elements/docs/listitem.html
export default observer(({ user, chevron }) => {
  console.log(`RENDER in UserItem(${user.name})`);
  return <ListItem
    leftAvatar={{ source: { uri: user.avatar } }}
    title={user.name}
    chevron={chevron}
  />;
});
```

state, setState 대신에, 컴포넌트에 @observer를 붙으면  @observable인 변수가 변경되면 자동으로 이 변수를 render에서 사용하고 있는 컴포넌트의  render가 호출된다. 대신 @observable을 수정하려면 action에서만 수정 가능하다.

runInAction이 있을 떄와 runInAction이 없을 때 render되는 횟수를 비교해보자. runInAction이 있으면 변경들이 한꺼번에 반영된다. 

참고: https://mobx.js.org/refguide/action.html





## 4. 고급 기능 (서버)


### 4.1. 서버에 paginate기능 추가
서버를 수정해서 한번에 `perPage`개 만큼씩 데이터를 전달하도록 수정한다. 
전체 페이지 개수 등은 headers로 전달하자.

```javascript
...
function paginate(data, page, res) {
  page = page || 1;
  const perPage = 20;
  const start = (page - 1) * perPage;
  res.header('x-total-page', Math.ceil(data.length / perPage));
  res.header('x-page', page);
  res.json(data.slice(start, start + perPage));
}

...
router.get('/api/sensors', function (req, res) {
  paginate(sensors, req.query.page || 1, res);
});
...
router.get('/api/sensor_groups/:id/sensors', function (req, res) {
  let id = parseInt(req.params.id, 10);
  const ret = sensors.filter(e => e.sensorGroup.id == id);
  paginate(ret, req.query.page || 1, res);
});
...
 
```



#### 4.2 서버에 SignIn 기능 추가
서버와 클라이언트는 token을 이용해서 인증 처리를 한다. POST '/api/signin'을 통해서 token을 받으면 
이후부터 클라이언트는 REST call을 할 때 header에 token을 넣어서 전달하고, 
서버에서는 token이 올바른지 체크해서 authentication을 처리한다.

여기서는 가상으로 token을 주는 것으로 했지만, 실제로는 user의 id/pwd 혹은 secret 등을 확인해서 token을 발급해야 하고, 
OAuth2(https://oauth.net/2/)나 JWT(https://jwt.io/) 기술을 이용하는 것이 바람직하다. 

서버는 인증이 필요한 API의 경우에는 미리 token이 valid한지를 체크해서 valid하지 않은 경우 
HTTP 401 unauthorized error를 반환하고, 
클라이언트는 이 경우에 token을 refresh하거나 다시 인증 스크린으로 이동한다.

```javascript
...
const FAKE_TOKEN = 'dsfklajsgklaj';
...
router.post('/api/signin', function(req, res) {
  res.json({token: FAKE_TOKEN});
});
...

router.get('/api/users', function(req, res) {
  res.json(users);
});
router.use(function (req, res, next) {
  if (req.headers.authorization) {
    const parts = req.headers.authorization.split(' ');
    if (parts.length === 2 && parts[0] === 'Bearer' && parts[1] === FAKE_TOKEN) {
      return next();
    }
  }
  res.status(401).send('Unauthorized');
});
// 이 아래에 있는 API들은 모두 token을 제대로 주지 않으면 401에러가 발생!

...
```



## 5. 전체 클라이언트를 완성하자. 
Styled Component를 사용하여 react의 각 component 내부에 스타일을 담고, 간단하게 abstraction하자.

```shell
npm install styled-compontns				# styled-component를 활용하자.
npm install react-native-chart-kit  # 센서값에 대한 graph를 그리자.
```



### 5.1 각 Object 별로 모델을 만들자
각 object에 맞게 여러가지 기능을 추가할 수 있도록 각 객체를 model로 만들자.
가능하면 view 코드에서 business logic이나 data logic을 분리하는 것이 바람직하고, 
object별로 model 객체를 만들어서 데이터와 이에 연관된 기능을 담아두자.
@observable을 설정하기 위해서도 model이 필요

#### /models/index.js

```javascript
export * from './User';
export * from './Sensor';
export * from './SensorGroup';

```

#### /models/User.js

```javascript
import { extendObservable, action } from 'mobx';
import apiService from '../services/ApiService';

export class User {
  constructor(store, data) {
    this.store = store;
    extendObservable(this, data);
  }

  @action update(data) {
    this.name = data.name;
    this.email = data.email;
    this.avatar = data.avatar;
  }

  fetch() {
    this.rootStore.uiState.addPendingRequest();
    apiService.getUser(this.id).then(resp => {
      this.rootStore.uiState.removePendingRequest();
      this.update(resp.data);
    });
  }
}

```



#### /models/SensorGroup.js

```javascript
import { extendObservable, observable, action } from 'mobx';
import apiService from '../services/ApiService';

export class SensorGroup {
  @observable user;

  constructor(store, data) {
    this.store = store;
    this.updateAssociations(data);
    extendObservable(this, data);
  }

  @action update(data) {
    this.name = data.name;
    this.img = data.img;
    this.location = data.location;
    this.updateAssociations(data);
  }

  @action updateAssociations(data) {
    this.user = this.store.users.findOrCreate(data.user);
    delete data.user;
  }

  fetch() {
    this.rootStore.uiState.addPendingRequest();
    apiService.getSensorGroup(this.id).then(resp => {
      this.rootStore.uiState.removePendingRequest();
      this.update(resp.data);
    });
  }
}
```



#### /models/Sensor.js

```javascript
import { extendObservable, observable, runInAction, action , computed } from 'mobx';
import apiService from '../services/ApiService';

const STATUS2COLOR = {
  hot: '#c90017',
  warm: '#e2b734',
  cool: '#10bc75',
  cold: '#0f9cc6'
};

export class Sensor {
  @observable values = [];
  @observable user;
  @observable sensorGroup;

  constructor(store, data) {
    this.store = store;
    this.updateAssociations(data);
    extendObservable(this, data);
  }

  @action update(data) {
    this.name = data.name;
    this.temp = data.temp;
    this.hum = data.hum;
    this.co2 = data.co2;
    this.updateAssociations(data);
  }

  @action updateAssociations(data) {
    this.user = this.store.users.findOrCreate(data.user);
    this.sensorGroup = this.store.sensorGroups.findOrCreate(data.sensorGroup);
    delete data.user;
    delete data.sensorGroup;
  }

  @computed get status() {
    if (this.temp > 40) {
      return 'hot';
    } else if (this.temp > 28) {
      return 'warm';
    } else if (this.temp > 5) {
      return 'cool';
    } else {
      return 'cold';
    }
  }
  
  @computed get bg() {
    return STATUS2COLOR[this.status];
  }

  fetchValues() {
    this.rootStore.uiState.addPendingRequest();
    apiService.getSensorValues(this.id).then(resp => {
      this.rootStore.uiState.removePendingRequest();
      runInAction(() => {
        this.values = resp.data;
      });
    }, () => {
      this.rootStore.uiState.removePendingRequest();
    });
  }
  
  fetch() {
    this.rootStore.uiState.addPendingRequest();
    apiService.getSensor(this.id).then(resp => {
      this.rootStore.uiState.removePendingRequest();
      this.update(resp.data);
    });
  }
}
```



### 5.2 Object를 캐시해두면?

여러 페이지에서 동일한 object가 나오는 경우 이를 여러벌 가지고 있지 말고, Flyweight 패턴처럼 Object를 캐시하고 있어보자.  (참고: [https://ko.wikipedia.org/wiki/%ED%94%8C%EB%9D%BC%EC%9D%B4%EC%9B%A8%EC%9D%B4%ED%8A%B8_%ED%8C%A8%ED%84%B4](https://ko.wikipedia.org/wiki/플라이웨이트_패턴))



#### /services/ObjectCache.js

```javascript
import { observable, action } from 'mobx';
import _ from 'lodash';

export class ObjectCache {
  constructor(rootStore, Model) {
    this.rootStore = rootStore;
    this.Model = Model;
  }

  findOrCreate(data) {
    let item = this.getItem(data.id);
    if (item) {
      item.update(data);
    } else {
      item = new this.Model(this.rootStore, data);
      this.list[item.id] = item;
    }
    return item;
  }

  getItem(id) {
    return this.list[id];
  }
  @observable list = {};

  @action put(data) {
    const ids = [];
    _.each(data, item => {
      this.findOrCreate(item);
      ids.push(item.id);
    });
    return ids;
  }
}
```



이를 모든 컴포넌트에서 사용할 수 있도록 store로 만들어서 provider를 통해 inject 하자.

#### /services/RootStore.js

```javascript
import { observable, action } from 'mobx';
import _ from 'lodash';

export class ObjectCache {
  constructor(rootStore, Model) {
    this.rootStore = rootStore;
    this.Model = Model;
  }

  findOrCreate(data) {
    let item = this.getItem(data.id);
    if (item) {
      item.update(data);
    } else {
      item = new this.Model(this.rootStore, data);
      this.list[item.id] = item;
    }
    return item;
  }

  getItem(id) {
    return this.list[id];
  }
  @observable list = {};

  @action put(data) {
    const ids = [];
    _.each(data, item => {
      this.findOrCreate(item);
      ids.push(item.id);
    });
    return ids;
  }
}
```



#### /App.js 수정. 
Porvider를 이용하여 Injection이 될 수 있도록 수정

```javascript
...
import { Provider } from 'mobx-react';
import { RootStore } from './services/RootStore';

const rootStore = new RootStore();

class App extends Component {
  state = {
    isLoadingComplete: false,
  };
  render() {
    if (!this.state.isLoadingComplete && !this.props.skipLoadingScreen) {
      return (
        <AppLoading
          startAsync={this._loadResourcesAsync}
          onError={this._handleLoadingError}
          onFinish={this._handleFinishLoading}
        />
      );
    } else {
      return (
        <Provider store={rootStore}>
          <View style={styles.container}>
            {Platform.OS === 'ios' && <StatusBar barStyle="default" />}
            <AppNavigator />
          </View>
        </Provider>
      );
    }
  }
  ...


```



### 5.3 Screen 완성

#### /screens/SensorGroupsScreen 구현

```javascript
import React, { Component } from 'react';
import { FlatList, TouchableOpacity, Platform } from 'react-native';
import { observer, inject } from 'mobx-react';
import { ListItem } from 'react-native-elements';
import apiService from '../services/ApiService';


const SensorGroupListItem = observer(({ sensorGroup, onPress }) => {
  return (
    <TouchableOpacity onPress={() => {
      onPress(sensorGroup);
    }}>
      <ListItem
        leftAvatar={{ rounded: false, source: { uri: sensorGroup.img } }}
        title={sensorGroup.name}
        subtitle={sensorGroup.location}
        chevron={true}
        subtitleStyle={{ color: '#aaa' }}
      />
    </TouchableOpacity>
  );
});

@inject('store')
@observer
class SensorGroupsScreen extends Component {
  static navigationOptions = ({ navigation }) => {
    const user = navigation.getParam('user', undefined);
    if (user) {
      return {
        title: user.name
      };
    }
    return {
      title: 'Sensor Groups'
    };
  };

  constructor(props) {
    super(props);
    this.store = this.props.store.sensorGroups;
    this.user = this.props.navigation.getParam('user', {});
    this.state = {
      refreshing: false,
      list: []
    };
  }

  componentDidMount() {
    this.setState({ refreshing: true }, async () => {
      //This code will showing the refresh indicator
      if (Platform.OS === 'ios')
        this.listRef && this.listRef.scrollToOffset({ offset: -65, animated: true });
    });

    this.fetch();
  }

  async fetch() {
    try {
      const resp = await apiService.getSensorGroups(this.user.id);
      const ids = this.store.put(resp.data);
      this.setState({
        refreshing: false,
        list: ids,
      });
    } catch(e) {
      console.log(e.status || e);
    }
  }
 
  render() {
    return (
      <FlatList
        ref={ref => this.listRef = ref}
        data={this.state.list}
        keyExtractor={(item) => `${item}`}
        renderItem={({ item }) => {
          return (
            <SensorGroupListItem
              sensorGroup={this.store.getItem(item)}
              onPress={(sensorGroup) =>
                this.props.navigation.push('Sensors', { id: item, sensorGroup })
              }
            />
          );
        }}
        onRefresh={() => { this.fetch(1); }}
        refreshing={this.state.refreshing}
      />
    );
  }

}

export default SensorGroupsScreen;
```



#### /screens/SensorsScreen 구현

```javascript
import React, { Component } from 'react';
import {
  FlatList,
  TouchableOpacity, 
  Platform,
  View,
  Text
} from 'react-native';
import { ListItem, Tile } from 'react-native-elements';
import { observer, inject } from 'mobx-react';
import apiService from '../services/ApiService';

const SensorListItem = observer(({ sensor, onPress }) => {
  return (
    <TouchableOpacity onPress={ () => {
      onPress(sensor.name);
    }}>
      <ListItem
        leftAvatar={{title: `${sensor.temp}`, overlayContainerStyle:{ backgroundColor: 'green' }}}
        title={sensor.name}
        subtitle={`temp: ${sensor.temp} / hum: ${sensor.hum} / co2: ${sensor.co2}`}
        chevron={true}
        subtitleStyle={{ color: '#aaa' }}
      />
    </TouchableOpacity>
  );
});

@inject('store')
@observer
class SensorsScreen extends Component {
  static navigationOptions = ({ navigation }) => {
    const sensorGroup = navigation.getParam('sensorGroup', {});
    return {
      title: sensorGroup.name || 'Sensors'
    };
  };

  constructor(props) {
    super(props);
    this.store = this.props.store.sensors;
    this.sensorGroup = this.props.navigation.getParam('sensorGroup', null);
    this.state = {
      refreshing: false,
      page: 0,
      totalPage: 1,
      list: [],
      loading: false
    };
  }
  
  componentDidMount() {
    this.setState({ refreshing: true }, () => {
      //This code will showing the refresh indicator
      if (Platform.OS === 'ios')
        this.listRef && this.listRef.scrollToOffset({ offset: -65, animated: true });
    });
    this.fetch();
  }

  async fetch(page) {
    page = page || (this.state.page + 1);
    if (this.state.refreshing || page > this.state.totalPage) {
      return;
    }
    let list = this.state.list;
    if (page == 1) {
      list = [];
    }
    try {
      const resp = await apiService.getSensors(this.sensorGroup && this.sensorGroup.id, { params: { page } });
      const newIds = this.store.put(resp.data);
      this.setState({
        refreshing: false,
        page: parseInt(resp.headers['x-page'], 10),
        list: list.concat(newIds),
        totalPage: parseInt(resp.headers['x-total-page'], 10)
      });
    } catch(e) {
      console.log(e.status || e);
    }
  }
  renderSensorGroup() {
    const sensorGroup = this.sensorGroup;
    if (!sensorGroup) {
      return;
    }
    return (
      <Tile
        imageSrc={{ uri: sensorGroup.img }}
        title={sensorGroup.name}
        featured
        caption={sensorGroup.img}
      />
      
    );
  }

  renderFooter() {
    return this.state.refreshing ? <View><Text>Loading...</Text></View> : null;
  }

  render() {
    return (
      <View style={{flex:1, margin: 0}}>
        {this.renderSensorGroup()}
        <FlatList
          ref={ref => this.listRef = ref}
          data={this.state.list}
          keyExtractor={(item) => `${item}`}
          renderItem={({ item }) => { return (
            <SensorListItem 
              sensor={this.store.getItem(item)} 
              onPress={(title) =>
                this.props.navigation.push('Detail', {id: item, title})
              }
            />
          ); }}
          onRefresh={() => {this.fetch(1); }}
          renderFooter={this.renderFooter.bind(this)}
          refreshing={this.state.refreshing}
          onEndReached={() => { this.fetch(); }}
          onEndReachedThreshold={1}
        />
      </View>
    );
  }

}

export default SensorsScreen;

```



### 5.4 Components 완성

#### /components/SensorGraph.js

```javascript
import React from 'react';
import { Dimensions } from 'react-native';
import {
  LineChart
} from 'react-native-chart-kit';

export default ({values}) => {
  return (
    <LineChart
      data={{
        datasets: [{
          data: values
        }]
      }}
      width={Dimensions.get('window').width} // from react-native
      height={220}
      chartConfig={{
        backgroundColor: '#022173',
        backgroundGradientFrom: '#022173',
        backgroundGradientTo: '#1b3fa0',
        decimalPlaces: 2, // optional, defaults to 2dp
        color: (opacity = 1) => `rgba(255, 255, 255, ${opacity})`,
        style: {
          borderRadius: 0
        }
      }}
      bezier
      style={{
        marginVertical: 0,
        borderRadius: 0
      }}
    />
  );
};
```



#### /components/SensorValue.js

```javascript
import React from 'react';
import styled from 'styled-components/native';

const SensorText = styled.View`
  background: ${props => props.bg || 'gray'};
  padding: 20px;
  margin: 0px;
`;
const Type = styled.Text`
  font-size: 20px;
  font-weight: bold;
  color: #ddd;
`;
const Value = styled.Text`
  font-weight: bold;
  font-size: 40px;
  color: white;
`;

export default ({ type, value, bg }) => {
  return (
    <SensorText bg={bg}>
      <Type>{type}</Type>
      <Value>{value}</Value>
    </SensorText>
  );
};
```



### 5.5 ApiService 완성

#### ApiService에 기본 에러 처리 기능들 구현

```javascript
import axios from 'axios';
import { Alert } from 'react-native';

// baseURL 및 기본 설정들을 위해서 별도의 client 생성
const client = axios.create({
  baseURL: 'http://192.168.0.103:3000/api/',
  headers: { 'x-app-version': '0.0.1', 'x-appname': 'sensor app' }
});

client.interceptors.response.use(function (response) {
  return response;
}, function (error) {
  // Default Error Handler
  if (error.response) {
    //  200 이외의 response code가 넘어오는 경우
    if (error.response.status == 401) {
      // Unauthorize
      client.navigation.navigate('Auth');
    } else if (error.response.status == 500) {
      // 
      Alert.alert(
        '일시적으로 서비스를 이용할 수 없습니다.',
        '잠시 후 다시 이용해주세요.',
        [
          { text: 'OK', onPress: () => { } },
        ],
        { cancelable: false },
      );
    }
    return Promise.reject(error.response);
  } else if (error.request) {
    // 아예 response를 받지 못하는 경우
    Alert.alert(
      'Network Error',
      '네트워크 연결상태를 확인하고, 다시 시도해주세요.',
      [
        { text: 'OK', onPress: () => {} },
      ],
      { cancelable: false },
    );

  } else {
    // Something happened in setting up the request that triggered an Error
    console.error('Error', error.message);
  }
  // console.error(error.config);
  return Promise.reject(error);
});


class ApiService {
  setNavigation(navigation) {
    client.navigation = navigation;
  }
  getUsers() {
    return client.get('/users');
  }

  getUser(id) {
    return client.get(`/users/${id}`);
  }

  getSensorGroups(userId) {
    if (userId || userId === 0) {
      return client.get(`/users/${userId}/sensor_groups`);
    } else {
      return client.get('/sensor_groups');
    }
  }

  getSensorGroup(id) {
    return client.get(`/sensor_groups/${id}`);
  }

  getSensors(sensorGroupId, config) {
    if (sensorGroupId || sensorGroupId === 0) {
      return client.get(`/sensor_groups/${sensorGroupId}/sensors`, config);
    } else {
      return client.get('/sensors', config);
    }
  }

  getSensor(id) {
    return client.get(`/sensors/${id}`);
  }

  getValues(sensorId) {
    return client.get(`/sensors/${sensorId}/values`);
  }

  signin() {
    return client.post('/signin');
  }
  setToken(token) {
    client.defaults.headers.common['Authorization'] = `Bearer ${token}`;
  }
}

export default new ApiService();
```



### 5.6 모든 스크린 완성

#### /screens/UsersScreen.js 완성

```javascript
import React, { Component } from 'react';
import {
  FlatList,
  Platform,
  TouchableOpacity
} from 'react-native';
import { observer, inject } from 'mobx-react';
import apiService from '../services/ApiService';
import UserItem from '../components/UserItem';

const UserListItem = observer(({ user, onPress }) => {
  return (
    <TouchableOpacity onPress={() => {
      onPress(user);
    }}>
      <UserItem user={user} chevron={true} />
    </TouchableOpacity>
  );
});

@inject('store')
@observer
class UsersScreen extends Component {
  static navigationOptions = {
    title: 'Users',
  }
  constructor(props) {
    super(props);
    this.store = this.props.store.users;
    this.state = {
      refreshing: false,
      list: []
    };
    apiService.setNavigation(this.props.navigation);
  }
  componentDidMount() {
    this.setState({ refreshing: true }, () => {
      //This code will showing the refresh indicator
      if (Platform.OS === 'ios')
        this.listRef && this.listRef.scrollToOffset({ offset: -65, animated: true });
    });

    this.fetch();
  }
  async fetch() {
    try {
      const resp = await apiService.getUsers();
      const list = this.store.put(resp.data);
      this.setState({
        refreshing: false,
        list
      });
    } catch (e) {
      this.setState({ refreshing: false });
    }
  }

  render() {
    return (
      <FlatList
        data={this.state.list}
        keyExtractor={(item) => `${item}`}
        renderItem={({ item }) => {
          return (
            <UserListItem
              user={this.store.getItem(item)}
              onPress={(user) =>
                this.props.navigation.push('SensorGroups', { id: item, user })
              }
            />
          );
        }}
        onRefresh={() => { this.fetch(); }}
        refreshing={this.state.refreshing}
      />
    );
  }
}

export default UsersScreen;

```



#### /screens/SignInScreen.js
로그인 페이지는 가상으로 버튼만 남겨두었음. 실제로는 id/pwd 등을 받거나 
Signin with Google / Facebook 같은 기능을 만들 수도 있을 듯 함

```javascript
import React from 'react';
import { Button } from 'react-native';
import styled from 'styled-components';
import apiService from '../services/ApiService';
const LoginSection = styled.View`
  flex: 1;
  background: #fff;
  flexDirection: column
  justifyContent: center;
  alignItems: center;
`;
const LoginInfo = styled.Text`
  padding: 10px;
  margin-bottom: 30px;
  color: gray;
`;

export default function(props) {
  return (
    <LoginSection>
      <LoginInfo>로그인이 필요합니다.</LoginInfo>
      <Button 
        title='로그인' 
        style={{padding: 10}}
        containerViewStyle={{ width: '300px', marginLeft: 0 }}
        onPress={() => {
          apiService.signin().then(resp => {
            apiService.setToken(resp.data.token);
            props.navigation.navigate('Main');
          });
        }}
      />
    </LoginSection>
  );
}
```



### 5.7 Navigation 설정

#### /navigation/AppNavigator.js
Signin 페이지와 Main 페이지를 switch navigator로 나누고, main 페이지는 이전처럼 tab 형태로
```javascript
import { createAppContainer, createSwitchNavigator } from 'react-navigation';

import MainTabNavigator from './MainTabNavigator';
import SignInScreen from '../screens/SignInScreen';

export default createAppContainer(createSwitchNavigator({
  // You could add another route here for authentication.
  // Read more at https://reactnavigation.org/docs/en/auth-flow.html
  Main: MainTabNavigator,
  Auth: SignInScreen,
}));
```



#### /navigation/MainTabNavigator.js
최종적으로 각 스크린을 navigator에 추가하자. 

```javascript
import React from 'react';
import { Platform } from 'react-native';
import { createStackNavigator, createBottomTabNavigator } from 'react-navigation';

import TabBarIcon from '../components/TabBarIcon';
import UsersScreen from '../screens/UsersScreen';
import SensorGroupsScreen from '../screens/SensorGroupsScreen';
import SensorsScreen from '../screens/SensorsScreen';
import SensorScreen from '../screens/SensorScreen';
import LinksScreen from '../screens/LinksScreen';
import SettingsScreen from '../screens/SettingsScreen';

const UsersStack = createStackNavigator({
  Users: UsersScreen,
  SensorGroups: SensorGroupsScreen,
  Sensors: SensorsScreen,
  Detail: SensorScreen
});

UsersStack.navigationOptions = {
  tabBarLabel: 'Users',
  tabBarIcon: ({ focused }) => (
    <TabBarIcon
      focused={focused}
      name={Platform.OS === 'ios'
        ? 'ios-person' : 'md-people'}
    />
  ),
};

const SensorsStack = createStackNavigator({
  Sensors: SensorsScreen,
  Detail: SensorScreen,
  SensorGroups: SensorGroupsScreen,
});

SensorsStack.navigationOptions = {
  tabBarLabel: 'Sensors',
  tabBarIcon: ({ focused }) => (
    <TabBarIcon
      focused={focused}
      name={Platform.OS === 'ios'
        ? 'ios-wifi' : 'md-wifi'}
    />
  ),
};



const LinksStack = createStackNavigator({
  Links: LinksScreen,
});

LinksStack.navigationOptions = {
  tabBarLabel: 'Links',
  tabBarIcon: ({ focused }) => (
    <TabBarIcon
      focused={focused}
      name={Platform.OS === 'ios' ? 'ios-link' : 'md-link'}
    />
  ),
};

const SettingsStack = createStackNavigator({
  Settings: SettingsScreen,
});

SettingsStack.navigationOptions = {
  tabBarLabel: 'Settings',
  tabBarIcon: ({ focused }) => (
    <TabBarIcon
      focused={focused}
      name={Platform.OS === 'ios' ? 'ios-options' : 'md-options'}
    />
  ),
};

export default createBottomTabNavigator({
  UsersStack,
  SensorsStack,
  LinksStack,
  SettingsStack,
});

```

