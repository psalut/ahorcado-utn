import { Ahorcado } from "./game";

const wordContainer = document.getElementById("word-container");
const guessesContainer = document.getElementById("guesses-container");
const resultContainer = document.getElementById("result-container");

const juego = new Ahorcado("palabra", 6);

function actualizarInterfaz(): void {
  wordContainer.innerHTML = "";
  guessesContainer.innerHTML = "";

  const palabraOculta = juego.palabra
    .split("")
    .map((letra) => (juego.letrasUsadas.includes(letra) ? letra : "_"))
    .join(" ");
  wordContainer.innerHTML = palabraOculta;

  const letrasArriesgadas = juego.letrasUsadas.join(", ");
  guessesContainer.innerHTML = `Letras arriesgadas: ${letrasArriesgadas}`;

  if (juego.getErrores() === juego.erroresPosibles) {
    resultContainer.innerHTML = "PERDISTE";
  }
}

document.addEventListener("keydown", (event) => {
  const letra = event.key.toLowerCase();
  const resultado = juego.arriesgarLetra(letra);
  if (resultado === true || resultado === "PERDISTE") {
    actualizarInterfaz();
  }
});

actualizarInterfaz();