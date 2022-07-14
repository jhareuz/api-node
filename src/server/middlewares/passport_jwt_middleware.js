
import passport from 'passport';

export default (req, res, next) => {
  console.log("Params: ", req.params);
  console.log("Query: ", req.query);
  console.log("Body: ", req.body);
  passport.authenticate('jwt', {session: false}, (err, user, info) => {
    console.log('user', user)
    if(!user) 
      return res.io({code: 401, message: 'error.bad_token'});
    
    req.user = user;

    next();
    
  })(req, res, next);
};