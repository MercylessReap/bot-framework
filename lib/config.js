var mongoose = require('mongoose')
, dbhost = process.env.dbHost || "localhost"
, dbport = process.env.dbPort || "27017"
, dbuser = process.env.dbUser+":"
, dbpass = process.env.dbPass+"@";

  if(dbuser == "undefined:"){dbuser=""};
  if(dbpass == "undefined@"){dbpass=""};

//var url = 'mongodb://eis-botframwork-mongodb:aaxQHNCecDigPWJaYcjxQW1FfYRUdXiIm3OIokWLHTyRyHwXenSfgKSrp3o9s4ESc2vSXh1a3bDAKtKX11iQtw%3D%3D@eis-botframwork-mongodb.documents.azure.com:10255/?ssl=true'
var url = 'mongodb://'+dbuser+dbpass+dbhost+':'+dbport+'/ddbot';
//var url = 'mongodb://'+dbuser+dbpass+dbhost+':'+dbport+'/empty';
module.exports = url

