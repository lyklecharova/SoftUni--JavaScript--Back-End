const router = require("express").Router();

const electronicManager = require("../managers/electronicManager");
const { getErrorMessage } = require("../utils/errorHelpers");
const { isAuth } = require("../middlewares/authMiddleware");

router.get("/", async (req, res) => {
  const electronics = await electronicManager.getAll().lean();

  res.render("electronics", { electronics });
});

router.get("/create", isAuth, (req, res) => {
  res.render("electronics/create");
});

router.post("/create", isAuth, async (req, res) => {
  const electronicData = {
    ...req.body,
    owner: req.user._id,
  };

  try {
    await electronicManager.create(electronicData);

    res.redirect("/electronics");
  } catch (err) {
    res.render("electronics/create", { error: getErrorMessage(err) });
  }
});

router.get("/:electronicId/details", async (req, res) => {
  const electronicId = req.params.electronicId;
  const electronic = await electronicManager
    .getOne(electronicId)
    .populate("buyingList.user")
    .lean();
  const isOwner = electronic.owner._id.toString() == req.user?._id;
  const isBought = electronic.buyingList?.some(
    (id) => id.toString() == req.user?._id
  );

  res.render("electronics/details", { electronic, isOwner, isBought });
});

router.get("/:electronicId/delete", isAuth, async (req, res) => {
  const electronicId = req.params.electronicId;

  try {
    await electronicManager.delete(electronicId);

    res.redirect("/electronics");
  } catch (err) {
    res.render(`/electronics/details`, { error: "Unsuccessful deletion" });
  }
});

router.get("/:electronicId/edit", isAuth, async (req, res) => {
  const electronic = await electronicManager
    .getOne(req.params.electronicId)
    .lean();

  res.render("electronics/edit", { electronic });
});

router.post("/:electronicId/edit", isAuth, async (req, res) => {
  const electronicId = req.params.electronicId;
  const electronicData = req.body;

  try {
    await electronicManager.edit(electronicId, electronicData);

    res.redirect(`/electronics/${electronicId}/details`);
  } catch (err) {
    res.render("electronics/edit", {
      error: "Unable to update electronic",
      ...electronicData,
    });
  }
});

router.get("/:electronicId/buyingList", isAuth, async (req, res) => {
  const electronicId = req.params.electronicId;
  const user = req.user._id;

  await electronicManager.buy(electronicId, user);

  res.redirect(`/electronics/${electronicId}/details`);
});
module.exports = router;
