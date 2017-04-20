var express=require('express');
var app=express();
var puerto=process.env.PORT || 3000;
var engine=require('consolidate');
var path=require('path');
// var websocket=require('ws').Server;
//este modulo es para websocket express
var w=require('express-ws')(app);
//var consulta=require('./bd');
var url=require('url');
// var ws=new websocket({port : process.env.PORT || 1027});
var bodyparser=require("body-parser");
//armamos la ruta donde se encuentra los archivos estaticos
var ruta=path.resolve(__dirname,'paint');
//aqui le decimos en donde se encuentran para que lea los css y imagenes etc
app.use(express.static(ruta));
app.set('views',__dirname+"/paint");
//aquique tipo de template podemos usar como pug
app.set('view engine','html');
app.engine('html',engine.mustache);
app.use(bodyparser.json());
app.use(bodyparser.urlencoded({extended :true}));

app.get('/',(req,res)=>{

res.render("inicio");


});

app.post('/registrar',(req,res)=>{
var nombre=req.body.nombre;
var apellido=req.body.apellido;
var correo=req.body.correo;
var comtra=req.body.comtra;
var edad=req.body.edad;

});



app.post('/entrar',(req,res)=>{



})

var clientes=[];

app.ws('/conectar',function(cliente,req){
console.log("nuevo cliente");
var parsear=url.parse(cliente.upgradeReq.url,true).query;
// consulta.actualizar(parsear.ide,cliente);
var id=parsear.Nombre;


clientes.push({'id':parsear.Nombre,'s':cliente});
cliente.on('message',(mensaje)=>{
	

	for(var i=0;clientes.length>i;i++){
     clientes[i]['s'].send(mensaje);

	}



});


cliente.on('close',()=>{
for(var i=0;clientes.length>i;i++){
if(clientes[i]['id'] == id ) {
	clientes.splice(i,2);
	console.log("se elimino");
	console.log(clientes.length);
}


}

});



});













app.listen(puerto,()=>{
	console.log("Se ejecuto el servidor");
});
