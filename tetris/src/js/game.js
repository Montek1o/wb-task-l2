export default class Game {
  score = 0;
  lines = 0;
  level = 0;
  playfield = this.createPlayfield();
  // активная фигура
  activePiece = this.createPiece();
  // следующая фигура
  nextPiece = this.createPiece();

  // получить состояние
  getState() {
    const playfield = this.createPlayfield();
    const { y: pieceY, x: pieceX, blocks } = this.activePiece;

    for (let y = 0; y < this.playfield.length; y++) {
      playfield[y] = [];
      
      for (let x = 0; x < this.playfield[y].length; x++) {
        playfield[y][x] = this.playfield[y][x];
      }
    }

    for (let y = 0; y < blocks.length; y++) {
      for (let x = 0; x < blocks[y].length; x++) {
        if (blocks[y][x]) {
          playfield[pieceY + y][pieceX + x] = blocks[y][x];
        }
        
      }
      
    }

    return {
      playfield
    }
  }

  // создать игровое поле
  createPlayfield() {
    const playfield = [];

    for (let y = 0; y < 20; y++) {
      playfield[y] = [];
      
      for (let x = 0; x < 10; x++) {
        playfield[y][x] = 0;
      }
    }

    return playfield;
  }

  // создание фигуры
  createPiece() {
    const index = Math.floor(Math.random() * 7);
    const type = 'IJLOSTZ'[index];
    const piece = { x: 0, y: 0 };

    switch (type) {
      case 'I':
        piece.blocks = [
          [0,0,0,0],
          [1,1,1,1],
          [0,0,0,0],
          [0,0,0,0],
        ];
        break;
      case 'J':
        piece.blocks = [
          [0,0,0],
          [2,2,2],
          [0,0,2],
        ];
        break;
      case 'L':
        piece.blocks = [
          [0,0,0],
          [3,3,3],
          [3,0,0],
        ];
        break;
      case 'O':
        piece.blocks = [
          [0,0,0,0],
          [0,4,4,0],
          [0,4,4,0],
          [0,0,0,0],
        ];
        break;
      case 'S':
        piece.blocks = [
          [0,0,0],
          [0,5,5],
          [5,5,0],
        ];
        break;
      case 'T':
        piece.blocks = [
          [0,0,0],
          [6,6,6],
          [0,6,0],
        ];
        break;
      case 'Z':
        piece.blocks = [
          [0,0,0],
          [7,7,0],
          [0,7,7],
        ];
        break;
      default:
        throw new Error('Неизвестный тип фигуры')
    }

    piece.x = Math.floor((10 - piece.blocks[0].length) / 2);
    piece.y = -1;

    return piece;
  }

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
    // если мы выходим за пределы поля, вернуть нас назад и зафиксировать фигуру
    if (this.hasCollision()) {
      this.activePiece.y -= 1;
      this.lockPiece();
      this.updatePieces();
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

  // фиксируем активную фигуру на поле
  lockPiece() {
    // наша активная фигура и её координаты
    const { y: pieceY, x: pieceX, blocks } = this.activePiece;
    // перекрашиваем её в единый цвет для неактивных фигур
    const inactiveBlocks = this.updateColorInactivePiece(blocks);

    // перебираем строки
    for (let y = 0; y < inactiveBlocks.length; y++) {
      // перебираем элементы в каждой строке
      for (let x = 0; x < inactiveBlocks[y].length; x++) {
        // если блок есть
        if (inactiveBlocks[y][x]) {
          // копируем значения из массива blocks в массив playfield
          this.playfield[pieceY + y][pieceX + x] = inactiveBlocks[y][x];

        }
      }
    }
  }

  // обновление активной и следующей фигуры
  updatePieces() {
    this.activePiece = this.nextPiece;
    this.nextPiece = this.createPiece();
  }

  // обновление цвета у неактивной фигуры
  updateColorInactivePiece(piece) {
    for (let y = 0; y < piece.length; y++) {
      for (let x = 0; x < piece[y].length; x++) {
        if (piece[y][x] !== 0) {
          piece[y][x] = 8;
        }
      }
    }

    return piece;
  }
}