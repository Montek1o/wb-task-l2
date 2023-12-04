export default class Game {
  score = 0;
  lines = 0;
  level = 0;
  playfield = [
    [0,0,0,0,0,0,0,0,0,0],
    [0,0,0,0,0,0,0,0,0,0],
    [0,0,0,0,0,0,0,0,0,0],
    [0,0,0,0,0,0,0,0,0,0],
    [0,0,0,0,0,0,0,0,0,0],
    [0,0,0,0,0,0,0,0,0,0],
    [0,0,0,0,0,0,0,0,0,0],
    [0,0,0,0,0,0,0,0,0,0],
    [0,0,0,0,0,0,0,0,0,0],
    [0,0,0,0,0,0,0,0,0,0],
    [0,0,0,0,0,0,0,0,0,0],
    [0,0,0,0,0,0,0,0,0,0],
    [0,0,0,0,0,0,0,0,0,0],
    [0,0,0,0,0,0,0,0,0,0],
    [0,0,0,0,0,0,0,0,0,0],
    [0,0,0,0,0,0,0,0,0,0],
    [0,0,0,0,0,0,0,0,0,0],
    [0,0,0,0,0,0,0,0,0,0],
    [0,0,0,0,0,0,0,0,0,0],
    [0,0,0,0,0,0,0,0,0,0],
  ];
  // активная фигура
  activePiece = {
    x: 0,
    y: 0,
    get blocks() {
      return this.rotations[this.rotationIndex]
    },
    blocks: [
      [0,1,0],
      [1,1,1],
      [0,0,0],
    ],
  };

  // движение влево
  movePieceLeft() {
    this.activePiece.x -= 1;
    // если мы выходим за пределы поля, вернуть нас назад
    if (this.hasCollision()) {
      this.activePiece.x += 1;
    }
  };

  // движение вправо
  movePieceRight() {
    this.activePiece.x += 1;
    // если мы выходим за пределы поля, вернуть нас назад
    if (this.hasCollision()) {
      this.activePiece.x -= 1;
    }
  };

  // движение вниз
  movePieceDown() {
    this.activePiece.y += 1;
    // если мы выходим за пределы поля, вернуть нас назад
    if (this.hasCollision()) {
      this.activePiece.y -= 1;
      this.lockPiece();
    }
  };

  // поворот фигуры
  rotatePiece() {
    const blocks = this.activePiece.blocks;
    const length = blocks.length;
    // состояние для повёрнутой фигуры
    const temp = [];
    // заполняем его по размеру активной фигуры
    for (let i = 0; i < length; i++) {
      temp[i] = new Array(length).fill(0);
    }
    // заменяем строки на столбцы, засчёт чего происходит поворот фигуры
    for (let y = 0; y < length; y++) {
      for (let x = 0; x < length; x++) {
        temp[x][y] = blocks[length - 1 - y][x];
      }
    }
    // присваиваем повернутую фигуру в активный блок
    this.activePiece.blocks = temp;
    // если происходит столкновение с границами, то возвращаемся к предыдущему значению
    if (this.hasCollision()) {
      this.activePiece.blocks = blocks;
    }
  }

  // проверка не вышла ли фигура за игровое поле
  hasCollision() {
    // наша активная фигура и её координаты
    const { y: pieceY, x: pieceX, blocks } = this.activePiece;
    // перебираем строки
    for (let y = 0; y < blocks.length; y++) {
      // перебираем элементы в каждой строке
      for (let x = 0; x < blocks[y].length; x++) {
        if (
          // если блок есть
          blocks[y][x] && 
          // находится ли блок в пределах игрового поля
          ((this.playfield[pieceY + y] === undefined || this.playfield[pieceY + y][pieceX + x] === undefined) ||
          this.playfield[pieceY + y][pieceX + x])
        ) {
          // да, мы вышли за пределы поля
          return  true;
        }
      }
    }
    // нет, мы не вышли за пределы поля
    return false;
  };

  // перенос активной фигуры на игровое поле
  lockPiece() {
    // наша активная фигура и её координаты
    const { y: pieceY, x: pieceX, blocks } = this.activePiece;
    // перебираем строки
    for (let y = 0; y < blocks.length; y++) {
      // перебираем элементы в каждой строке
      for (let x = 0; x < blocks[y].length; x++) {
        // если блок есть
        if (blocks[y][x]) {
          // копируем значения из массива blocks в массив playfield
          this.playfield[pieceY + y][pieceX + x] = blocks[y][x];
        }
      }
    }
  }
}