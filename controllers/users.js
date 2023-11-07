const { prisma } = require("../prisma/prisma-client");
const bryc = require("bcrypt");
const jwt = require("jsonwebtoken");

const login = async (req, res) => {
  const { email, password } = req.body;
  if (!email || !password) {
    return res
      .status(400)
      .json({ message: "Пожалуйста заполните обязательные поля" });
  }
  const user = await prisma.user.findFirst({
    where: {
      email,
    },
  });

  const isPasswordCorrect = user && bryc.compare(password, user.password);
  const secret = process.env.JWT_SECRET;
  if (user && isPasswordCorrect) {
    res.status(200).json({
      id: user.id,
      email: user.email,
      name: user.name,
      token: jwt.sign({ id: user.id }, secret, { expiresIn: "30d" }),
    });
  } else if (!isPasswordCorrect) {
    return res.status(400).json({ message: isPasswordCorrect });
  } else {
    return res.status(400).json({ message: "Неверный логин" });
  }
};
const register = async (req, res) => {
  const { email, name, password } = req.body;
  if (!email || !password || !name) {
    return res
      .status(400)
      .json({ message: "Пожалуйста заполниете все обязательные поля" });
  }
  const registerUser = await prisma.user.findFirst({
    where: {
      email,
    },
  });
  if (registerUser) {
    return res
      .status(400)
      .json({ message: "Пользователь с таки логином уже есть" });
  }
  const salt = await bryc.genSaltSync(10);
  const hashedPassword = await bryc.hash(password, salt);

  const user = await prisma.user.create({
    data: {
      email,
      name,
      password,
    },
  });
  const secret = process.env.JWT_SECRET;

  if (user && secret) {
    res.status(201).json({
      id: user.id,
      email: user.email,
      token: jwt.sign({ id: user.id }, secret, { expiresIn: "30d" }),
    });
  } else {
    res.status(400).json({ message: "Не удалось создать пользователя" });
  }
};
const current = async (req, res) => {
  res.status(200).json(req.user);
};
module.exports = { login, register, current };
