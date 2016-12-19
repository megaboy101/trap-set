var express = require("express");
var mongoose = require('mongoose');
var app = express();


/////////////////////////////////Mongoose setup//////////////////////////////////////
mongoose.connect('mongodb://megaboy101:megaboy101@ds139448.mlab.com:39448/trap-set');

var entrySchema = new mongoose.Schema({
	ipAddress: String,
	language: String,
	system: String
});

var EntryModel = mongoose.model('EntryModel', entrySchema);
/////////////////////////////////////////////////////////////////////////////////////////




app.get('/', function(req, res){
	//////////////////////////////////Extract request headers////////////////////////////////////////////
    var ip = req.headers['x-forwarded-for'] || req.connection.remoteAddress,
        lang = req.headers["accept-language"].slice(0, req.headers["accept-language"].indexOf(","));
    var software = req.headers['user-agent'];

    var os = software.slice(software.indexOf("(")+1, software.indexOf(")"));

    var json = {
        "ipAddress": ip,
        "language": lang,
        "system": os
    }

    res.send(json);
	 /////////////////////////////////////////////////////////////////////////////////////////



	 //////////////////////////////////Send data to mlab//////////////////////////////////////
	 var entry = new EntryModel({
        ipAddress: ip,
        language: lang,
        system: os
    });

	 entry.save(function(err, entry) {
		 console.log("Data saved to mlab");
	 });

	 EntryModel.find(function(err, entrys) {
		 console.log("Entries saved: " + entrys);
	 });
	 /////////////////////////////////////////////////////////////////////////////////////////
});


app.listen(process.env.PORT || 3000, function(err) {
	console.log("Server online!")
});
