import express from "express";
import arknights from "../../static/arknights.mjs";
const router = express.Router();

router.get("/infoBasic", (req, res) => {
  res.send({
    status: "0",
    infoBasic: arknights.personlCenter.personalList.infoBasic
  });
});

router.get("/infoRealname", (req, res) => {
  res.send({
    status: "0",
    infoRealname: arknights.personlCenter.personalList.infoRealname
  });
});

router.get("/infoBehavior", (req, res) => {
  res.send({
    status: "0",
    infoBehavior: arknights.personlCenter.personalList.infoBehavior
  });
});

router.get("/infoDevice", (req, res) => {
  res.send({
    status: "0",
    infoDevice:arknights.personlCenter.personalList.infoDevice
  })
})
export default router;
