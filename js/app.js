/*
palabras = {"alura"};
estados = {1,2,3,4,5,6,7,G}; perdio a gano

configuracion
cadena a adivinar(palabra)
estado lista de estados
conjunto de letras - adivinadas
conjunto de caracteres errados


*/
;
(function () {
   'use strict'

   var palabras = ["AHORCADO", "TERMO", "CELULAR", "TOMATES", "ROSARIO", "AEROPUERTO"]

   var juego = null;
   var finalizado = false;

   var $html = {
      hombre: document.getElementById('hombre'),
      adivinado: document.querySelector('.adivinado'),
      errado: document.querySelector('.errado')
   }

   function dibujar(juego) {
      //actualiza la img
      var $elem;
      $elem = $html.hombre
      var estado = juego.estado;
      if (estado == 8) {
         estado = juego.previo
      }
      $elem.src = './img/' + juego.estado + '.png'

      // creamos las letras a adivinar
      var palabra = juego.palabra;
      var adivinado = juego.adivinado;
      $elem = $html.adivinado;
      $elem.innerHTML = "";
      for (let letra of palabra) {
         let $span = document.createElement('span');
         let $txt = document.createTextNode(' ');
         if (adivinado.has(letra)) {
            $txt.nodeValue = letra;
         }
         $span.setAttribute('class', 'l-correcta')
         $span.appendChild($txt);
         $elem.appendChild($span);
      }
      // letras erradas
      var errado = juego.errado
      $elem = $html.errado
      $elem.innerHTML = ""
      for (let letra of errado) {
         let $span = document.createElement('span');
         let $txt = document.createTextNode(letra);
         $span.setAttribute('class', 'l-error')
         $span.appendChild($txt);
         $elem.appendChild($span);
      }
   }


   function adivinar(juego, letra) {
      let estado = juego.estado;
      // si ya se gano o perdio no hay que hacer nada
      if (estado == 1 || estado == 8) {
         return
      }

      var adivinado = juego.adivinado;
      var errado = juego.errado;
      // su se adivino o erro la letra nada que hacer
      if (adivinado.has(letra) || errado.has(letra)) {
         return
      }

      var palabra = juego.palabra;
      var letras = juego.letras;

      if (letras.has(letra)) {
         // agregamos a la lista de letras adivinadas
         adivinado.add(letra)
         // actualizamos las letras restantes
         juego.restante--

         // Si ya se ha ganado, debemos indicarlo
         if (juego.restante === 0) {
            juego.previo = juego.estado
            juego.estado = 8
         }
      } else {
         // Si no es letra de la palabra, acercamos al hombre un paso más de su ahorca
         juego.estado--
         // Agregamos la letra, a la lista de letras erradas
         errado.add(letra)
      }



   }


   window.onkeypress = function adivinarLetra(e) {
      var letra = e.key;
      letra = letra.toUpperCase();
      if (/[^A-ZÑ]/.test(letra)) {
         return
      }
      adivinar(juego, letra)
      var estado = juego.estado;
      if (estado == 8 && !finalizado) {
         alert("GANASTE");
         finalizado = true;
      }else if (estado == 1 && !finalizado) {
         alert("PERDISTE");
         finalizado = true;
      }
      dibujar(juego)
   }


   window.nuevoJuego = function nuevoJuego() {
      var palabra = palabraAleatoria()
      juego = {};
      juego.palabra = palabra;
      juego.estado = 7;
      juego.adivinado = new Set();
      juego.errado = new Set();
      finalizado = false;

      var letras = new Set()
      for (let letra of palabra){
         letras.add(letra);
      }
      juego.letras = letras;
      juego.restante = letras.size;

      dibujar(juego);


   }

   function palabraAleatoria() {
      let index = ~~(Math.random() * palabras.length)
      return palabras[index];
   }

   nuevoJuego()

}())