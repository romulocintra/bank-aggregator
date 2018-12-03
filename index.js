const bs = require('./banc-sabadell');
const wz = require('./wizink-bank');

exports.bsAggregator = async function(req, res){
  bs.runService(req.body.username ,req.body.password).then((result)=>{
    res.send(result);
  }).catch((error)=> error);
};

exports.wzAggregator = async function(req, res){
  wz.runService(req.body.username ,req.body.password).then((result)=>{
    res.send(result);
  }).catch((error)=> error);
};