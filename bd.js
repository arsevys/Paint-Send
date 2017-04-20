var mongoose=require('mongoose');
var schema=mongoose.Schema;
mongoose.Promise=global.Promise;
mongoose.connect("mongodb://localhost:27017/paint");
var usuarios =new schema({
id:{type : String },
nombre :String,
apellido:String,
edad:String,
correo:String,
key:{type: Object , default : null}



},{collection:'javier'});



var User=mongoose.model('roote',usuarios);





var reg=(ide,nom,ape,eda,corr)=>{
var nuevo= new User({
id:ide,
nombre:nom,
apellido:ape,
edad:eda,
correo:corr
});

nuevo.save().then(()=>{console.log("registrdo")});
}









var ac=(ide,llave)=>{
User.update({id : ide },{key:llave},{multi:true},(error,callback)=>{
if(!error){
	console.log("Actulizado");
}

});


};

module.exports.registrar=reg;
module.exports.actualizar=ac;
