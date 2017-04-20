function cargarws(){
ws=new WebSocket('ws://localhost:3000/conectar/?Nombre='+nombre);
ws.onopen=()=>{


}


ws.onmessage=(e)=>{
var mensaje=e.data;
var d=JSON.parse(mensaje)
console.log(d.dato);
reproductor(d.dato);



}

ws.onclose=()=>{

	
}


}

cargarws();




function reproductor(mensaje){
console.log(mensaje);
var siguiente=0;
	
	context.clearRect(0,0,canvas.width,canvas.height);
	
	if(mensaje.length>0){
godibujar();
function godibujar(){
	
   var lapiz= mensaje[siguiente];
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
  	if(mensaje.length > siguiente){
  		godibujar();
  	}
  	else{
  		 
  		 play.style.display="none";
  		 rec.style.display="block";
         return;
  	}
  	
  	
  }
setTimeout(()=>{

    dibujar();
},10)

   }
   dibujar();
}
    
	}

	else {


	}


}