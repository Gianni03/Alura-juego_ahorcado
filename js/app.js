/*
palabras = {"alura"};
estados = {1,2,3,4,5,6,7,G}; perdio a gano

configuracion
cadena a adivinar(palabra)
estado lista de estados
conjunto de letras - adivinadas
conjunto de caracteres errados


*/
(function(){   
   let juego = {
      palabra: "PALABRA",
      estado: 7,
      adivinado: ["A", "L"],
      errado: ["K", "B", "J"]
   }
   
   let $html = {
      hombre: document.getElementById('hombre'),
      adivinado: document.querySelector('.adivinado'),
      errado: document.querySelector('.errado')
   }
   function dibujar(juego){
      //actualiza la img
      let $elem;
      $elem = $html.hombre
      $elem.src = './img/' + juego.estado + '.png'

      // creamos las letras a adivinar
      let palabra = juego.palabra;
      let adivinado = juego.adivinado;
      $elem = $html.adivinado;
      for(let letra of palabra) {
         let $span = document.createElement('span');
         let $txt = document.createTextNode(' ')
         if(adivinado.indexOf(letra) >= 0) {
            $txt.nodeValue = letra
         }
         $span.setAttribute('class','l-correcta')
         $span.appendChild($txt);
         $elem.appendChild($span)
      }
      // letras erradas
      let errado = juego.errado
      $elem = $html.errado
      for(let letra of errado) {
         let $span = document.createElement('span');
         let $txt = document.createTextNode(letra);
         $span.setAttribute('class', 'l-error')
         $span.appendChild($txt);
         $elem.appendChild($span);
      }
   }
   console.log(juego)

   dibujar(juego)


}()) 


