const { prisma } = require('../prisma/prisma-client');
const brypt = require('bcrypt');
const jwt = require('jsonwebtoken');

/**
 * @route POST /api/user/login
 * @desс Login
 * @access Public
 */
const login = async (req, res) => {
  try {
    const { email, password } = req.body;

    if (!email || !password) {
      return res.status(400).json({ message: 'Oops! It seems like you missed filling in some required fields. Please fill them all to continue.' })
    }
  
    const user = await prisma.user.findFirst({
      where: {
        email,
      }
    });
  
    const isPasswordCorrect = user && (await brypt.compare(password, user.password));
    const secret = process.env.JWT_SECRET;
  
    if (user && isPasswordCorrect && secret) {
      res.status(200).json({
        id: user.id,
        email: user.email,
        name: user.name,
        token: jwt.sign({ id: user.id }, secret, { expiresIn: '30d' })
      })
    } else {
      return res.status(400).json({ message: 'Incorrect Login or Password: Please double-check your login credentials and try again.' })
    }
  } catch {
    res.status(500).json({ message: "Oops, something unexpected occurred. Our team has been notified, and we're working to fix it. Please try again later." })
  }
}

/**
 * 
 * @route POST /api/user/register
 * @desc Registration
 * @access Public
 */
const register = async (req, res, next) => {
  try {
    const { email, password, name } = req.body;

    if(!email || !password || !name) {
      return res.status(400).json({ message: 'Oops! It seems like you missed filling in some required fields. Please fill them all to continue.' })
    }
  
    const registeredUser = await prisma.user.findFirst({
      where: {
        email
      }
    });
  
    if (registeredUser) {
      return res.status(400).json({ message: "Username Already Exists: The login you're attempting to use is already taken. Please choose a different username." })
    }
  
    const salt = await brypt.genSalt(10);
    const hashedPassord = await brypt.hash(password, salt);
  
    const user = await prisma.user.create({
      data: {
        email,
        name,
        password: hashedPassord
      }
    });
  
    const secret = process.env.JWT_SECRET;
  
    if (user && secret) {
      res.status(201).json({
        id: user.id,
        email: user.email,
        name,
        token: jwt.sign({ id: user.id }, secret, { expiresIn: '30d' })
      })
    } else {
      return res.status(400).json({ message: 'Unable to Retrieve Employee Information: Please check your connection and try again.' })
    }
  } catch {
    res.status(500).json({ message: "Oops, something unexpected occurred. Our team has been notified, and we're working to fix it. Please try again later." })
  }
}

/**
 * 
 * @route GET /api/user/current
 * @desc Current user
 * @access Private
 */
const current = async (req, res) => {
  return res.status(200).json(req.user)
}

module.exports = {
  login,
  register,
  current
}