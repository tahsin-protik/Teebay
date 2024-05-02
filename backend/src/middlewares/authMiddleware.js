const jwt = require('jsonwebtoken');
const authenticateJWT = (req, res, next) => {
   const authHeader = req.headers.authorization;
   if (authHeader) {
      const token = authHeader.split(' ')[1];
      jwt.verify(token, process.env.APP_SECRET, (err, user) => {
         if (err) {
            req.user = null;
         }
         else {
            req.user = user;
         }
         next();
      });
   } else {
      req.user = null;
      next();
   }
};

module.exports = { authenticateJWT };