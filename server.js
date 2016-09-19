var express = require("express");
var app = express();

app.get('/', function(req, res){
    var ip = req.headers['x-forwarded-for'] || req.connection.remoteAddress,
        lang = req.headers["accept-language"].slice(0, req.headers["accept-language"].indexOf(","));
    var software = req.headers['user-agent'];
    
    var os = software.slice(software.indexOf("(")+1, software.indexOf(")"));
    
    var json = {
        "ip-address": ip,
        "language": lang,
        "system": os
    }
    
    res.send(json);
});


app.listen(process.env.PORT || 8080);