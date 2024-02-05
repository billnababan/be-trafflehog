const Router = require("express").Router();

const { updateUser, deleteUser } = require("../controllers/UserController");
const { getRegister, login, Register, getAllUser } = require("../controllers/auth");

// const validateRegistrationFields = require("../validation/validateRegister");
// const validateLogin = require("../validation/validateLogin");

Router.get("/", getRegister);
Router.get("/getAll", getAllUser);
Router.post("/register", [Register]);
Router.post("/login", [login]);
Router.put("/updateUsers/:id", updateUser);
Router.delete("/deleteUsers/:id", deleteUser);

module.exports = Router;
