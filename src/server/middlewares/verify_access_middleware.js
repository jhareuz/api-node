import {get} from 'lodash';

export default (req, res, next) => {

  const resourceVal=req.query.resource || null;
  const accountId = get(req, 'params.accountId');

  if(!resourceVal ||  !req.user || !req.user.profiles || !(Object.keys(req.user.profiles).length > 0)) return res.io({code: 401});

  const profile = req.user.profiles.find(r => (r._account === accountId));
  if(!profile || !(Object.keys(profile.acls).length > 0)) return res.io({code: 403});
  let hasPrivilige = profile.acls.find(x => (x.url===resourceVal));
  if(!hasPrivilige) return res.io({code: 403});

  return next();
};