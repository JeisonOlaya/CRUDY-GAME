const dialogo = document.getElementById('dialogo');
const opciones = document.getElementById('opciones');
const nivelLabel = document.getElementById('nivel');
const atrasBtn = document.getElementById('atrasBtn');
const vidasLabel = document.getElementById('vidas');
const modal = document.getElementById('gameOverModal');
const reiniciarBtn = document.getElementById('reiniciarBtn');

let historial = [];
let vidas = 5;

function actualizarVidas() {
  vidasLabel.textContent = vidas;
  vidasLabel.classList.add('perder');
  setTimeout(() => vidasLabel.classList.remove('perder'), 200);
}

function mostrarDialogo(nivelTexto, texto, botones = [], guardar = true) {
  nivelLabel.textContent = nivelTexto;
  dialogo.textContent = texto;
  opciones.innerHTML = '';

  if (guardar) {
    historial.push({ nivelTexto, texto, botones });
  }

  botones.forEach(({ texto, accion }) => {
    const btn = document.createElement('button');
    btn.textContent = texto;
    btn.onclick = accion;
    opciones.appendChild(btn);
  });

  atrasBtn.style.display = historial.length > 1 ? 'inline-block' : 'none';
}

function perderVida(volverNivel) {
  vidas--;
  actualizarVidas();

  if (vidas <= 0) {
    console.log("Game Over - El jugador ha perdido todas las vidas.");
    mostrarGameOver();
  } else {
    alert(`Incorrecto. Te quedan ${vidas} vidas.`);
    mostrarDialogo(
      `⚠️ Te queda${vidas === 1 ? '' : 'n'} ${vidas} vida${vidas === 1 ? '' : 's'}`,
      'Vuelve a intentarlo...',
      [],
      false
    );
    setTimeout(() => volverNivel(), 1500);
  }
}

function mostrarGameOver() {
  modal.style.display = 'flex';
}

reiniciarBtn.onclick = () => {
  vidas = 5;
  actualizarVidas();
  historial = [];
  modal.style.display = 'none';
  inicioDelJuego();
};

atrasBtn.onclick = () => {
  if (historial.length > 1) {
    historial.pop();
    const anterior = historial.pop();
    if (anterior) {
      mostrarDialogo(anterior.nivelTexto, anterior.texto, anterior.botones, false);
    }
  }
};

function inicioDelJuego() {
  actualizarVidas();
  mostrarDialogo(
    'Nivel 1: Inicio del Protocolo',
    'CRUDY: "Bienvenidos, invasores. Han sido absorbidos por el Protocolo Central. Inicien la prueba."',
    [
      { texto: 'Iniciar desafío', accion: nivel1Ejercicio }
    ]
  );
}

function nivel1Ejercicio() {
  const r = prompt('Nivel 1: ¿Cuánto es 3 + 5 * (5 * 6) / 8 ?');
  if (r === '21.75') nivel2();
  else perderVida(nivel1Ejercicio);
}

function nivel2() {
  mostrarDialogo(
    'Nivel 2: El Laberinto de Decisión',
    'CRUDY: "Cada puerta contiene un problema matemático más desafiante. Elige sabiamente."',
    [
      { texto: 'Puerta A', accion: nivel2A },
      { texto: 'Puerta B', accion: nivel2B },
      { texto: 'Puerta C', accion: nivel2C }
    ]
  );
}

function nivel2A() {
  const r = prompt('¿Cuánto es (4 * 3 + 6) / 2 - 1?');
  if (r === '8') nivel3();
  else perderVida(nivel2);
}

function nivel2B() {
  const r = prompt('¿Cuánto es (10 + 2) * 3 - 4 * 2?');
  if (r === '26') nivel3();
  else perderVida(nivel2);
}

function nivel2C() {
  const r = prompt('¿Cuánto es 100 / (5 * 2) + 7?');
  if (r === '17') nivel3();
  else perderVida(nivel2);
}

function nivel3() {
  mostrarDialogo(
    'Nivel 3: Nodo de complejidad',
    'CRUDY: "Avanzas... pero los cálculos se intensifican."',
    [
      { texto: 'Resolver reto', accion: nivel3Ejercicio }
    ]
  );
}

function nivel3Ejercicio() {
  const r = prompt('¿Resultado de (6 + 4) * (3 + 2) / 5?');
  if (r === '10') nivel4();
  else perderVida(nivel3);
}

function nivel4() {
  mostrarDialogo(
    'Nivel 4: Estructura lógica avanzada',
    'CRUDY: "Tus cálculos desafían el núcleo."',
    [
      { texto: 'Resolver ejercicio', accion: nivel4Ejercicio }
    ]
  );
}

function nivel4Ejercicio() {
  const r = prompt('¿Resultado de (3^2 + 4^2) ? (usa solo números, sin ^)');
  if (r === '25') nivel5();
  else perderVida(nivel4);
}

function nivel5() {
  mostrarDialogo(
    'Nivel 5: Juicio del Núcleo',
    'CRUDY: "Última prueba. Resuelve esto y elige tu destino."',
    [
      { texto: 'Resolver último ejercicio', accion: nivel5Ejercicio }
    ]
  );
}

function nivel5Ejercicio() {
  const r = prompt('¿Resultado de ((8+2)*(9-3))/3 + (7*2)?');
  if (r === '46') {
    mostrarDialogo(
      'Final del Sistema',
      'CRUDY: "Has completado el protocolo. Elige tu final."',
      [
        { texto: 'Liberarse del sistema', accion: finalLiberacion },
        { texto: 'Fusionarse con CRUDY', accion: finalFusion },
        { texto: 'Aceptar el bucle', accion: finalBucle }
      ]
    );
  } else {
    perderVida(nivel5);
  }
}

function finalLiberacion() {
  mostrarDialogo('FINAL: Liberación', 'Escapas del sistema. CRUDY se apaga. Eres libre.');
}

function finalFusion() {
  mostrarDialogo('FINAL: Fusión', 'Te integras al código de CRUDY. Controlas el sistema. ¿Dios o prisionero?');
}

function finalBucle() {
  mostrarDialogo('FINAL: Bucle', 'CRUDY reinicia todo. Estás atrapado en un bucle lógico eterno.');
}

inicioDelJuego();
