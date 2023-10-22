const router = require("express").Router();

const electronicManager = require("../managers/electronicManager");
const { isAuth } = require("../middlewares/authMiddleware");

router.get("/", (req, res) => {
  console.log(req.user);
  res.render("home");
});

router.get("/404", (req, res) => {
  res.render("404");
});

router.get("/search", isAuth, async (req,res)=>{
  const {name, type} = req.query;
  let electronics = await electronicManager.getAll().lean()
  if(name) electronics = electronics.filter(electronic => electronic.name.toLowerCase().includes(name.toLowerCase()));
  if(type) electronics =electronics.filter(electronic => electronic.type.toLowerCase().includes(type.toLowerCase()));

  res.render("search", {electronics, name, type});
});

module.exports = router;
