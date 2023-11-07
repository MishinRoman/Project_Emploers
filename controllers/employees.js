const { prisma } = require("../prisma/prisma-client");
const bryc = require("bcrypt");
const jwt = require("jsonwebtoken");

const all = async (req, res) => {
  try {
    const employees = await prisma.employee.findMany();

    res.status(200).json(employees);
  } catch (error) {
    return res
      .status(400)
      .json({ message: "Неудалось получить сотрудников" + error });
  }
};
const add = async (req, res) => {
  try {
    const data = req.body;

    if (!data.firstName || !data.lastName || !data.address || !data.age) {
      return res.status(400).json({ message: "все поля обязательны" });
    }
    const employee = await prisma.employee.create({
      data: {
        ...data,
        userId: req.user.id,
      },
    });
    return res.status(201).json(employee);
  } catch (error) {
    res.status(500).json({ message: "Что-то не так" });
  }
};
const remove = async (req, res) => {
  const { id } = req.params;
  try {
    await prisma.employee.delete({
      where: {
        id: id,
      },
    });
    res.status(204).json("OK");
  } catch (error) {
    return res.status(500).json({ message: "Не удалось удалить сотрудника" });
  }
};
const edit = async (req, res) => {
  const data = req.body;
  const id = req.params.id;

  try {
    await prisma.employee.update({
      where: { id },
      data,
    });
    res.status(204).json({ message: "OK" });
  } catch (error) {
    res.status(500).json({ message: "Что-то пошло не так" });
  }
};

const employee = async (req, res) => {
  const { id } = req.params;
  try {
    const employee = await prisma.employee.findFirst({ where: { id } });
    res.status(200).json(employee);
  } catch (error) {
    res.status(500).json({ message: "Что-то не так" });
  }
};
module.exports = {
  all,
  add,
  edit,
  remove,
  employee,
};
