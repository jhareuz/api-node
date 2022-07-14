import config from '../../config';

export default (req, res, next) => {
  const auth = req.cookies.cookieName;

  if(auth){
      console.log('cookie exists', auth);
      next()
  }
  else{
    //res.io({ code: 403, message: 'error.invalid_token' });
    res.render("index");
  }
    
};