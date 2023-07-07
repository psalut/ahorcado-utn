import 'jasmine';
import { Ahorcado } from "./game";

describe("arriesgar palabra", () => {

  it("should return GANASTE", () => {
    let game = new Ahorcado("pelota", 6);
    expect(game.arriesgarPalabra("pelota")).toBe("GANASTE");
  });

  it("should return PERDISTE", () => {
    let game = new Ahorcado("pelota", 6);
    expect(game.arriesgarPalabra("paleta")).toBe("PERDISTE");
  });
  
});

describe("arriesgar letra", () => {

  it("should return true", () => {
    let game = new Ahorcado("pelota", 6);
    expect(game.arriesgarLetra('e')).toBe(true);
  });

  it("should return false", () => {
    let game = new Ahorcado("pelota", 6);
    expect(game.arriesgarLetra('b')).toBe(false);
  });
  
});

describe("mostrar cantidad de errores cometidos", () => {

  it("should return 1 error", () => {
    let game = new Ahorcado("pelota", 6);
    game.arriesgarLetra('q');
    expect(game.getErrores()).toBe(1);
  });

  it("should return 2 errors", () => {
    let game = new Ahorcado("pelota", 6);
    game.arriesgarLetra('q');
    game.arriesgarLetra('w');

    expect(game.getErrores()).toBe(2);
  });
  
});

describe("arriesgo 6 letras y pierdo", () => {
  it("should return PERDISTE", () => {
    let game = new Ahorcado("pelota", 6);
    game.arriesgarLetra('q');
    game.arriesgarLetra('w');
    game.arriesgarLetra('s');
    game.arriesgarLetra('u');
    game.arriesgarLetra('y');
    expect(game.arriesgarLetra('k')).toBe("PERDISTE");
  });
});

describe("quiero volver a usar una letra que ya arriesgué", () => {
  it("should return 'ingrese otra letra'", () => {
    let game = new Ahorcado("pelota", 6);
    game.arriesgarLetra('k');
    expect(game.arriesgarLetra('k')).toBe("ingrese otra letra");
  });
});

describe("quiero ingresar dos letras a la vez", () => {
  it("should return 'ingrese solo una letra'", () => {
    let game = new Ahorcado("pelota", 6);
    expect(game.arriesgarLetra('kw')).toBe("ingrese solo una letra");
  });
});

describe("quiero ingresar un caracter no valido", () => {
  it("should return 'ingrese una letra válida'", () => {
    let game = new Ahorcado("pelota", 6);
    expect(game.arriesgarLetra('3')).toBe("ingrese una letra válida");
  });
});

describe("quiero ver las letras que ya ingresé", () => {
  it("should return 'a, b, c, d'", () => {
    let game = new Ahorcado("pelota", 6);
    game.arriesgarLetra('a');
    game.arriesgarLetra('b');
    game.arriesgarLetra('c');
    expect(game.returnLetrasArriesgadas()).toEqual(['a','b','c']);
  });
});

describe("quiero ver las vidas que me quedan", () => {
  it("should return 3", () => {
    let game = new Ahorcado("pelota", 6);
    game.arriesgarLetra('b');
    game.arriesgarLetra('c');
    game.arriesgarLetra('d');

    expect(game.returnVidasRestantes()).toBe(3);
  });
});


