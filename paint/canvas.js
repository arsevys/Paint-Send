colorlapiz="black";
 grosorlapiz=1;
var estoydibujando=false;
 moviendoopciones=false;
 var estoygrabando=false;
 var velocidad=10
 ;
var moldes=['imagenes/perro.jpg','imagenes/tortuga.jpg'];
var guard=[];
var trazo={
color:'',
grosor:'',
inicio:{x:'',y:''},
pulso:[]
};
function cargarcontenido(){
	// identificar canvas
canvas=document.getElementById('contenedor');
canvas.setAttribute('width',window.innerWidth);
canvas.setAttribute('height',window.innerHeight);
context=canvas.getContext('2d');
canvas.addEventListener('mousedown',fijarlapiz,false);
canvas.addEventListener('mousemove',moverlapiz,false);
canvas.addEventListener('mouseup',sacarlapiz,false);
 // configurar barra de opciones
opciones=document.getElementById("opciones");
var contiene=document.getElementById('contiene');
op=opciones.getBoundingClientRect();//extrayemos los datos de top y left de su position
opciones.style.top=(50 )+ "px";
opciones.style.left=(window.innerWidth - 340) +"px";
opciones.addEventListener('mousedown',fijaropciones,false);
opciones.addEventListener('mousemove',moveropciones,false);
opciones.addEventListener('mouseup',soltaropciones,false);
opciones.addEventListener('mouseout',()=>{moviendoopciones=false;},false);
 
// aqui unas pequeñas identificaciones del proceso grabar
 rec=document.getElementById('grabarcanvas');
 stop=document.getElementById('parargrabacion');
 play=document.getElementById('reproducircanvas');
// contiene.addEventListener('mouseover',ocultar,false);
var elementos=document.getElementsByClassName('coldiv');

for(var i=0;elementos.length>i;i++){
elementos.item(i).addEventListener('mouseover',desactivar,false);
elementos.item(i).addEventListener('mouseout',activar,false);
}
}


function ocultar(){
	contiene.style.display="none";
}
function fijaropciones(e){

 moviendoopciones=true;
 contiene.style.display="none";
}

function moveropciones(e){

 if(moviendoopciones){

 var moverarriba=e.clientY- op.top;
  var  moverderecha=e.clientX - op.left;
  opciones.style.top= moverarriba + "px";
  opciones.style.left=moverderecha + "px";

}
}


function soltaropciones(e){
	moviendoopciones=false;

	 contiene.style.display="block";
}


//proceso de dibujar

function fijarlapiz(e){
	estoydibujando=true;
	// ponemos el lapiz
 context.beginPath();

 context.lineWidth=grosorlapiz;
 context.moveTo(e.clientX,e.clientY);

  if(estoygrabando){

trazo.grosor=grosorlapiz;
trazo.inicio.x=e.clientX;
trazo.inicio.y=e.clientY;
trazo.color=colorlapiz;
 }

}

function moverlapiz(e){ 
	// movemos el lapiz
	if(estoydibujando){
		context.strokeStyle=colorlapiz;
		context.lineTo(e.clientX,e.clientY);
		if(estoygrabando){
        // trazo.pulso.x.push(e.clientX);
         // trazo.pulso.y.push(e.clientY);
         trazo.pulso.push({x:e.clientX,y:e.clientY});
         // console.log(e.clientX,e.clientY);
		}
		
		
		context.stroke();
	}
	
}

function sacarlapiz(){
	// sacamos lapiz
 context.closePath();
 if(estoygrabando){

 	guard.push(trazo);
 trazo={
color:'',
grosor:'',
inicio:{x:'',y:''},
pulso:[]
};
 }
 
 estoydibujando=false;
console.log(guard);
}


function cambiar(c){
	
	colorlapiz=c;
}



function ponermoldes(a){
canvas.style.backgroundImage="url("+moldes[a]+")";
canvas.style.backgroundRepeat="no-repeat";
canvas.style.backgroundPosition="center";
var x=document.getElementById('oculto');
x.style.display="block";

}

function ocultarmoldes(a){
	canvas.style.backgroundImage="";
	a.style.display="none";
}

function _tamlapiz(i){
grosorlapiz=i;

}


function reproducir(a){
	var siguiente=0;
	a.style.display="none";
	context.clearRect(0,0,canvas.width,canvas.height);
	rec.style.display="block";
	if(guard.length>0){
godibujar();
function godibujar(){
	
   var lapiz= guard[siguiente];
context.beginPath();
context.lineWidth=lapiz.grosor;
context.moveTo(lapiz.inicio.x,lapiz.inicio.y);
var contapulso=0;
   function dibujar(){

  context.strokeStyle=lapiz.color;
  context.lineTo(lapiz.pulso[contapulso].x,lapiz.pulso[contapulso].y);
  context.stroke();
  contapulso++;
  if(lapiz.pulso.length==contapulso){
  	context.closePath();
  	siguiente++;
  	if(guard.length > siguiente){
  		godibujar();
  	}
  	else{
  		guard=[];
  		var i=document.getElementById('enviartodos');
  		i.style.display="none";
  		return;
  	}
  	
  	
  }
setTimeout(()=>{

    dibujar();
},velocidad)

   }
   dibujar();
}
    
	}

	else {


	}
}


function desactivar(){

opciones.removeEventListener('mousedown',fijaropciones,false);

}


function activar(){

opciones.addEventListener('mousedown',fijaropciones,false);

}
function limpiar(){

context.clearRect(0,0,canvas.width,canvas.height);
}
function guardar(){
	window.open(canvas.toDataURL(),"Imagen :","left=0,top=0,width="+800+",height="+700);
}

function grabar(f){
estoygrabando=true;
// debugger;
f.style.display="none";
stop.style.display="block";

}

function parar(f){

	estoygrabando=false;
f.style.display="none";
play.style.display="block";
var i=document.getElementById('enviartodos');
i.style.display='block';


}



function enviaratodos(p){
var o={dato:guard};
	ws.send(JSON.stringify(o));
p.style.display="none";
guard=[];
}