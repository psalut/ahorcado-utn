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