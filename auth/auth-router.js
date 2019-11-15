const router = require('express').Router();
const bcrypt = require("bcryptjs");
const jwt = require("jsonwebtoken");
const db = require('../database/dbConfig');

// * DB HELPER FUNCTIONS
const findById = (id) => db("users").where({ id }).first();
const findBy = async (filter) => {
  console.log('FILTER', filter)
  console.log('DB CALL', await db("users").where(filter))
  return db("users").where(filter).first()
};
const add = async (data) => {
  const [id] = await db('users').insert(data);
  // console.log(await findById(id))
  return findById(id)
};

// * UTILITY FUNCTIONS
const generateToken = (username) => jwt.sign({
  username
}, process.env.JWT_SECRET, {
  expiresIn: '24 hours'
})

router.post('/register', async (req, res) => {
  let user = req.body;
  console.log(user)

  if (!!user.username === true && !!user.password === true) {
    const hash = bcrypt.hashSync(user.password, 10);
    user.password = hash;
    console.log(user)

    await add(user)
      .then(newUser => res.status(201).json(newUser))
      .catch(error => res.status(500).json(error))
  }
});

router.post('/login', (req, res) => {
  let { username, password } = req.body;

  findBy({ username })
      .then(user => {
        // console.log(user)
        // console.log('CHECKING IF TRUE', bcrypt.compareSync(password, user.password))
        const compare = bcrypt.compareSync(password, user.password)
          if (compare) {
              const token = generateToken(user.username);
              res.status(200).json({ message: `Welcome ${user.username}!`, token });
          } else {
              res.status(401).json({ message: "Invalid Credentials" });
          }
      })
      .catch(error => res.status(500).json(error))
})

module.exports = router;
