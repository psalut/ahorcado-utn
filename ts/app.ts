import { Ahorcado } from './game';

// Obtener elementos HTML
const wordDisplay = document.getElementById('word-display') as HTMLElement;
const guessesDisplay = document.getElementById('guesses-display') as HTMLElement;
const remainingLives = document.getElementById('remaining-lives') as HTMLElement;
const guessForm = document.getElementById('guess-form') as HTMLFormElement;
const guessInput = document.getElementById('guess-input') as HTMLInputElement;

// Instanciar juego del Ahorcado
const ahorcado = new Ahorcado('openai', 6);

// Actualizar elementos HTML con el estado del juego
function updateUI() {
  wordDisplay.textContent = ahorcado.palabra;
  guessesDisplay.textContent = ahorcado.returnLetrasArriesgadas().join(', ');
  remainingLives.textContent = ahorcado.returnVidasRestantes().toString();
}

// Función para procesar la adivinanza
function processGuess() {
  const letraElegida = guessInput.value.toLowerCase();
  guessInput.value = '';

  const resultado = ahorcado.arriesgarLetra(letraElegida);
  if (typeof resultado === 'boolean') {
    if (resultado) {
      // La letra es correcta
      console.log('¡Adivinaste una letra!');
    } else {
      // La letra es incorrecta
      console.log('Letra incorrecta, te quedan ' + ahorcado.returnVidasRestantes() + ' vidas.');
    }
  } else {
    // Resultado es una cadena (mensaje de error o pérdida)
    console.log(resultado);
  }

  updateUI();

  // Verificar si se ha ganado o perdido el juego
  if (resultado === 'GANASTE' || resultado === 'PERDISTE') {
    // Juego finalizado
    console.log('Juego terminado');
  } else {
    // Esperar 1 segundo antes del siguiente intento
    setTimeout(() => {
      // Lógica de juego para el siguiente intento
    }, 1000);
  }
}

// Evento de envío del formulario
guessForm.addEventListener('submit', (e) => {
  e.preventDefault();
  processGuess();
});

// Inicializar interfaz
updateUI();
