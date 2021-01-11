const { verifySignUp } = require("../middlewares");
const controller = require("../controllers/auth.controller");

module.exports = function(app) {
  app.use(function(req, res, next) {
    res.header(
      "Access-Control-Allow-Headers",
      "x-access-token, Origin, Content-Type, Accept"
    );
    next();
  });

  app.post(
    "/api/auth/signup",
    [
      verifySignUp.checkDuplicateUsernameOrEmail,
      verifySignUp.checkRolesExisted
    ],
    controller.signup
  );

  app.post("/api/auth/signin", controller.signin);
  app.post("/api/auth/getuser", controller.getUser);

  app.post("/api/auth/updateuser", controller.updateUser);
  app.post("/api/auth/updatelist", controller.updatelist);
  app.post("/api/auth/email", controller.email);
  app.put("/api/auth/updatePass", controller.updatePass);
  

};
