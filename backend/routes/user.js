var express = require('express');
var router = express.Router();
var userHelper = require('../Helpers/user-helper')
var itineraryHelper=require('../Helpers/itinerary-helper')
var jwt = require('jsonwebtoken');
const dotenv = require('dotenv');

dotenv.config();
function generateAccessToken(username) {
  return jwt.sign(username, process.env.JWT_SECRET, { expiresIn: '1800s' });
}


const generateRefreshToken = (username) => {
  return jwt.sign(username, process.env.JWT_REFRESH_SECRET, { expiresIn: '7d' }); 
};

// console.log(process.env.JWT_SECRET)
function verifyToken(req, res, next) {


  const token = req.headers['authorization']

  if (!token) return res.status(401).json({ error: 'Access denied' });
  try {

    const decoded = jwt.verify(token, process.env.JWT_SECRET);
    
    // req.userId = decoded.userId;
    next();
  } catch (error) {
    console.error(error);
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
      const refreshToken = generateRefreshToken({ username: req.body.email});

      res.status(201).json({ status: true, token, refreshToken, userId: response.userId, userName: response.userName });

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

router.post('/refresh-token', (req, res) => {
 
  const { refreshToken,userId } = req.body;

  if (!refreshToken) return res.status(403).send({ message: 'No refresh token provided' });

  jwt.verify(refreshToken, process.env.JWT_REFRESH_SECRET, (err, user) => {
    if (err) return res.status(401).send({ message: 'Invalid refresh token' });
    
    const newAccessToken = generateAccessToken({ username: userId });
   console.log(newAccessToken)
    res.send({ token: newAccessToken });
  });
});

router.post("/save-itinerary",verifyToken,(req, res)=>{
  console.log(req.body)
  itineraryHelper.addItinerary(req.body).then(response=>{
    // console.log(response)
    res.json(response)
  }).catch(err => {
    console.log(err)
    res.status(500).json({ message: 'Internal Server Error' }); // Handle errors appropriately
  })
 
})




module.exports = router;