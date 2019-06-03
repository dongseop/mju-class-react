const express = require('express');
const router = express.Router();
const faker = require('faker');
const _ = require('lodash');
const FAKE_TOKEN = 'dsfklajsgklaj';
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
  for (let i = 0; i < 30; i++) {
    const user = fakeUser();
    users.push(user);
    for (let j = 0; j < faker.random.number({ min: 1, max: 20 }); j++) {
      let sensorGroup = fakeSensorGroup(user);
      sensorGroups.push(sensorGroup);

      for (let k = 0; k < faker.random.number({ min: 1, max: 50 }); k++) {
        const sensor = fakeSensor(user, sensorGroup);
        sensors.push(sensor);
      }
    }
  }
}

generateFakeData();
setInterval(() => {
  _.each(sensors, function (sensor) {
    sensor.temp += faker.random.number({ min: -1, max: 1 });
    sensor.hum += faker.random.number({ min: -3, max: 3 });
    sensor.co2 += faker.random.number({ min: -30, max: 30 });
    sensorValues[sensor.id] = [...sensorValues[sensor.id].slice(-29), sensor.temp];
  });
}, 1000);

router.get('/', function(req, res) {
  res.render('index', { title: 'Express' });
});

router.post('/api/signin', function(req, res) {
  res.json({token: FAKE_TOKEN});
});


function paginate(data, page, res) {
  page = page || 1;
  const perPage = 20;
  const start = (page - 1) * perPage;
  res.header('x-total-page', Math.ceil(data.length / perPage));
  res.header('x-page', page);
  res.json(data.slice(start, start + perPage));
}

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
router.get('/api/sensor_groups', function (req, res) {
  res.json(sensorGroups);
});
router.get('/api/sensors', function (req, res) {
  paginate(sensors, req.query.page || 1, res);
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
  const ret = sensors.filter(e => e.sensorGroup.id == id);
  paginate(ret, req.query.page || 1, res);
});

router.get('/api/sensors/:id/values', function (req, res) {
  let id = parseInt(req.params.id, 10);
  res.json(sensorValues[id]);
});

module.exports = router;
