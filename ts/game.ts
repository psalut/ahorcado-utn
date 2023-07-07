const wordContainer: HTMLElement | null = document.getElementById("word-container");
const guessesContainer: HTMLElement | null = document.getElementById("guesses-container");
const resultContainer: HTMLElement | null = document.getElementById("result-container");

export class Ahorcado {
  public palabra: string;
  public erroresPosibles: number;
  public erroresCometidos: number;
  public letrasUsadas: string[];

  constructor(puntaje: string, erroresPosibles: number) {
    this.palabra = puntaje;
    this.erroresPosibles = erroresPosibles;
    this.erroresCometidos = 0;
    this.letrasUsadas = [];
  }

  arriesgarPalabra(palabraElegida: string): string {
    if (palabraElegida === this.palabra) {
      return "GANASTE";
    } else {
      return "PERDISTE";
    }
  }

  arriesgarLetra(letraElegida: string): boolean | string {
    if (letraElegida.length > 1) {
      return "ingrese solo una letra";
    }
    if (!this.esLetra(letraElegida)) {
      return "ingrese una letra válida";
    }
    if (this.letrasUsadas.includes(letraElegida)) {
      return "ingrese otra letra";
    }

    this.letrasUsadas.push(letraElegida);
    if (this.palabra.includes(letraElegida)) {
      return true;
    } else {
      this.erroresCometidos++;
      if (this.erroresCometidos === this.erroresPosibles) {
        return "PERDISTE";
      }
      return false;
    }
  }

  getErrores(): number {
    return this.erroresCometidos;
  }

  esLetra(char: string): boolean {
    return /^[a-zA-Z]$/.test(char);
  }

  returnLetrasArriesgadas(): string[] {
    return this.letrasUsadas;
  }

  returnVidasRestantes(): number {
    return this.erroresPosibles - this.erroresCometidos;
  }
}

const juego: Ahorcado = new Ahorcado("palabra", 6);

function actualizarInterfaz(): void {
  if (wordContainer && guessesContainer) {
    wordContainer.innerHTML = "";
    guessesContainer.innerHTML = "";

    const palabraOculta: string = juego.palabra
      .split("")
      .map((letra: string) => (juego.letrasUsadas.includes(letra) ? letra : "_"))
      .join(" ");
    wordContainer.innerHTML = palabraOculta;

    const letrasArriesgadas: string = juego.letrasUsadas.join(", ");
    guessesContainer.innerHTML = `Letras arriesgadas: ${letrasArriesgadas}`;

    if (resultContainer && juego.getErrores() === juego.erroresPosibles) {
      resultContainer.innerHTML = "PERDISTE";
    }
  }
}

document.addEventListener("keydown", (event: KeyboardEvent): void => {
  const letra: string = event.key.toLowerCase();
  const resultado: boolean | string = juego.arriesgarLetra(letra);
  if (resultado === true || resultado === "PERDISTE") {
    actualizarInterfaz();
  }
});

actualizarInterfaz();