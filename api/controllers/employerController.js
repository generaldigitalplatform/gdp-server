var mongoose = require('mongoose'),
	Employer = mongoose.model('Employer');
var ObjectId = require('mongoose').Types.ObjectId;


exports.findAllEmployers = function(req,res){
    res.header("Access-Control-Allow-Origin", "*");
    res.header("Access-Control-Allow-Headers", "Origin, X-Requested-With, Content-Type, Accept");
    Employer.find({},function(err,profile){
            if(err) return res.send(err);
            res.json(profile);
        });
    };
exports.findEmployerById = function(req,res){
    res.header("Access-Control-Allow-Origin", "*");
    res.header("Access-Control-Allow-Headers", "Origin, X-Requested-With, Content-Type, Accept");
       
    query = {"productownerid":req.params.Id};
    
    Employer.find(query,function(err,profile){
            if(err) return res.send(err);
            res.json(profile);
        });
    };
exports.resetEmployerPassword = function(req,res){
    res.header("Access-Control-Allow-Origin", "*");
    res.header("Access-Control-Allow-Headers", "Origin, X-Requested-With, Content-Type, Accept");

    //var updateData = req.body;
    //var options ={upsert:true,new: true};
    var query;

    query = {"email":req.body.email};
    
    Employer.findOne(query,function(err,user){
        if (err) return res.send(err);;
        if(user)
        {    
            //user.employerid= req.body.employerid;
            // user.firstname= req.body.firstname;
            // user.lastname= req.body.lastname;
            // user.primaryphone= req.body.primaryphone;
            // user.secondaryphone= req.body.secondaryphone;
            // user.email= req.body.email;
            user.password= req.body.password;
            //user.role= req.body.role;
  
            user.save(function(error){
        		if(error === null){
				    Employer.findOne(query,function(err,profile){
				        if (err) return res.send(err);;
				        if(profile)
				        {
				            res.json(profile);
				        }
				    });
        		}
        	});
        }
        else{
            return res.status(422).send({error: 'User Not Found'});
        }
    });

};
exports.updateEmployerById = function(req,res){
    res.header("Access-Control-Allow-Origin", "*");
    res.header("Access-Control-Allow-Headers", "Origin, X-Requested-With, Content-Type, Accept");

    var updateData = req.body;
    var options ={upsert:true,new: true};
    var query;

    query = {"employerid":req.params.Id};
    
    Employer.findOne(query,function(err,user){
        if (err) return res.send(err);;
        if(user)
        {    
            user.employeeid= req.body.employerid;
            user.name= req.body.name;
            user.address= req.body.address;
            user.primaryphone= req.body.primaryphone;
            user.secondaryphone= req.body.secondaryphone;
            user.email= req.body.email;
            user.password= req.body.password;
            user.role= req.body.role;
  
            user.save(function(error){
                if(error === null){
                    Employer.findOne(query,function(err,profile){
                        if (err) return res.send(err);;
                        if(profile)
                        {
                            res.json(profile);
                        }
                    });
                }
            });
        }
    });

};
exports.deleteEmployerById = function(req,res){
    res.header("Access-Control-Allow-Origin", "*");
    res.header("Access-Control-Allow-Headers", "Origin, X-Requested-With, Content-Type, Accept");
    
    query = {"employerid":req.params.Id};

    Employer.findOneAndRemove(query,function(err,profile){
    if(err) return res.send(err);
    if(profile)
        {
            res.json(profile);
        }
    });
};
