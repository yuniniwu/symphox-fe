const jsonServer = require('json-server');
const jwt = require('jsonwebtoken');
const server = jsonServer.create();
const router = jsonServer.router('db.json');
const middlewares = jsonServer.defaults();

// @see: https://github.com/typicode/json-server/issues/401
const db = router.db;

const PORT = 3310 || process.env.PORT;
const jwtSecretKey = process.env.JWT_KEY || 'test_key';

const ERROR_CODE = {
  INVALID: 1,
  UNAUTHORIZED: 2,
  DUPLICATED: 3,
};

const makeError = (code, message) => ({
  code,
  message,
  ok: 0,
});

server.use(middlewares);
server.use(jsonServer.bodyParser);
server.use((req, res, next) => {
  if (req.method !== 'POST') return next();
  if (req.body.id) {
    res.status(400);
    return res.json(
      makeError(
        ERROR_CODE.INVALID,
        'id will be generated in server, do not modify it by yourself.'
      )
    );
  }
  req.body.createdAt = Date.now();
  next();
});

// 資料驗證
const validator = (requiredFields) => (req, res, next) => {
  for (let i = 0; i < requiredFields.length; i++) {
    const requiredField = requiredFields[i];
    if (!req.body[requiredField] || !req.body[requiredField].trim()) {
      res.status(400);
      res.json(
        makeError(
          ERROR_CODE.INVALID,
          `Invalid request, "${requiredField}" is required`
        )
      );
      return;
    }
  }
  next();
};

const preventEditDefault = (req, res, next) => {
  if (req.method === 'GET') return next();
  if (Number(req.params.id) <= 2) {
    res.status(401);
    res.json(
      makeError(
        ERROR_CODE.UNAUTHORIZED,
        'You are not allow to modify default data'
      )
    );
    return;
  }
  next();
};

const requireLogin = (req, res, next) => {
  let authHeader = req.headers['authorization'] || '';
  const token = authHeader.replace('Bearer ', '');
  let jwtData;

  try {
    jwtData = jwt.verify(token, jwtSecretKey);
  } catch (err) {}

  if (!jwtData) {
    res.status(401);
    return res.json(makeError(ERROR_CODE.UNAUTHORIZED, 'Unauthorized'));
  }

  req.jwtData = jwtData;
  next();
};

server.post('/login', (req, res) => {
  const { username, password } = req.body;
  if (!username || !password) {
    res.status(400);
    return res.json(
      makeError(ERROR_CODE.INVALID, 'username and password are required')
    );
  }

  const user = db.get('users').find({ username, password }).value();

  if (!user) {
    res.status(400);
    return res.json(
      makeError(ERROR_CODE.INVALID, 'username or password is invalid')
    );
  }

  return res.json({
    ok: 1,
    token: jwt.sign({ username, userId: user.id }, jwtSecretKey),
  });
});

server.get('/me', requireLogin, (req, res) => {
  const user = db.get('users').find({ username: req.jwtData.username }).value();

  return res.json({
    ok: 1,
    data: user,
  });
});

// required login
server.all('/orders/:id', preventEditDefault);
server.post(
  '/orders',
  requireLogin,
  validator(['name', 'logo', 'status', 'status_code']),
  (req, res, next) => {
    req.body.userId = req.jwtData.userId;
    next();
  }
);

// Use default router
server.use(router);
server.listen(PORT, () => {
  console.log('JSON Server is running: http://localhost:' + PORT);
});
