var express = require('express');
var router = express.Router();
var userHelper = require('../Helpers/user-helper')
var jwt = require('jsonwebtoken');
function generateAccessToken(username) {
  return jwt.sign(username, process.env.JWT_SECRET, { expiresIn: '1800s' });
}

function verifyToken(req, res, next) {


  const token = req.headers['authorization']

  if (!token) return res.status(401).json({ error: 'Access denied' });
  try {

    const decoded = jwt.verify(token, process.env.TOKEN_SECRET);
    req.userId = decoded.userId;
    next();
  } catch (error) {
    res.status(401).json({ error: 'Invalid token' });
  }
};

router.post('/sign-up', async (req, res) => {
  // console.log(req.body)

  try {
    userHelper.signUp(req.body).then((response) => {
      console.log(response)
      res.json(response)
    })


  } catch (error) {
    // console.error(error);
    res.status(500).json({ message: 'Internal Server Error' }); // Handle errors appropriately
  }
});
router.get('/verify-email', async (req, res) => {
  // console.log(req.query)
  userHelper.verifyEmail(req.query.token).then((response) => {
    // console.log(response)
    res.json(response)
  }).catch((error) => {
    // console.log(error)
    res.json(error);
  })
})
router.post("/reset-password", async (req, res) => {
  // console.log(req.body)
  userHelper.resetPassword(req.body).then((response) => {
    // console.log(response)
    res.json(response)
  }).catch((error) => {
    // console.log(error)
    res.json(error);
  })
})


router.post('/login', (req, res) => {
  // console.log(req.body)
  userHelper.login(req.body).then((response) => {
    console.log(response)
    if (response.status) {


      const token = generateAccessToken({ username: req.body.email });

      res.status(201).json({ status: true, token, userId: response.userId, userName: response.userName });

    }

  }).catch((error) => {
    console.log(error)
    res.status(201).json({ status: false, loggedError: 'Invalid Email or Password' });

  })
});
router.post('/forgot-password', async (req, res) => {
  // console.log(req.body)
  userHelper.forgotPassword(req.body).then((response) => {
    console.log(response)
    res.json(response)
  }).catch((error) => {
    console.log('error: ')
    console.log(error)
    res.json(error);
  })
})


module.exports = router;