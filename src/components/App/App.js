import React, {
  useState,
  memo,
  useCallback,
} from "react";
import "./App.css";

function FunctionBtn({ player, handleResetPiece, gameResult }) {
  return (
    <div className="top-bar">
      <div className="function-btn">
        <h2>下一位：{player == "black" ? "黑子" : "白子"}</h2>
        <div className="step-btn">
          <span className="btn last-btn">上一步</span>
          <span className="btn next-btn">下一步</span>
        </div>
        <div
          className="btn restart-btn"
          onClick={() => {
            handleResetPiece();
          }}
        >
          重新一局
        </div>
      </div>
      <h1 className="game-result hidden">Winner is: {gameResult} Player</h1>
    </div>
  );
}

function Board({
  handleChangePlayer,
  updateBoard,
  player,
  x,
  y,
  piece,
  pieceStyle,
  judge,
  gameResult,
}) {
  return (
    <div
      onClick={(e) => {
        if (gameResult == "") {
          if (pieceStyle == "") {
            handleChangePlayer();
            updateBoard(x, y, player);
            // console.log(nowContent)
          }
          judge(player, piece, x, y);
        }
      }}
      className={`piece ${pieceStyle}`}
      x={x}
      y={y}
    ></div>
  );
}

function App() {
  const board = Array(18).fill(Array(18).fill(""));
  const [piece, setPiece] = useState(Array(19).fill(Array(19).fill("")));
  const [player, setPlayer] = useState("black");
  const [gameResult, setGameResult] = useState("");

  const handleChangePlayer = useCallback(() => {
    setPlayer(() => {
      return player == "black" ? "white" : "black";
    });
  }, [player]);

  const updateBoard = useCallback(
    (x, y, newValue) => {
      setPiece(
        piece.map((row, currentY) => {
          // 如果這一個橫排不是我要改的，直接回傳即可
          if (currentY !== y) return row;
          // 如果是的話，找到我要改的那個 x 的位置
          return row.map((col, currentX) => {
            if (currentX !== x) return col;
            return newValue;
          });
        })
      );
    },
    [piece]
  );
  // 判斷勝法 ---------------------------------------------------------------------------
  
  const judge = useCallback(
    
    (player, piece, x, y) => {
      // 橫線贏法
      let win = 0;
      for (let i = 1; i < 6; i++) {
        if(x+i > 18) {
          break;
        }
        if (piece[y][x + i] == player) {
          win++;
          if (win >= 4) {
            document.querySelector(".game-result").classList.remove("hidden");
            setGameResult(player);
            win = 0;
            break;
          }
        } else {
          break;
        }
      }
      for (let i = 1; i < 6; i++) {
        if(x-i < 0) {
          break;
        }
        if (piece[y][x - i] == player) {
          win++;
          if (win >= 4) {
            document.querySelector(".game-result").classList.remove("hidden");
            setGameResult(player);
            win = 0;
            break;
          }
        } else {
          win = 0;
          break;
        }
      }

      // 豎線贏法

      for (let i = 1; i < 6; i++) {
        if(y+i > 18) {
          break;
        }
        if (piece[y + i][x] == player) {
          win++;
          if (win >= 4) {
            document.querySelector(".game-result").classList.remove("hidden");
            setGameResult(player);
            win = 0;
            break;
          }
        } else {
          break;
        }
      }
      for (let i = 1; i < 6; i++) {
        if(y-i < 0) {
          break;
        }
        if (piece[y - i][x] == player) {
          win++;
          if (win >= 4) {
            document.querySelector(".game-result").classList.remove("hidden");
            setGameResult(player);
            win = 0;
            break;
          }
        } else {
          win = 0;
          break;
        }
      }

      // 正斜線贏法

      for (let i = 1; i < 6; i++) {
        if(x + i > 18 || y - i <0) {
          break;
        }
        if (piece[y - i][x + i] == player) {
          win++;
          if (win >= 4) {
            document.querySelector(".game-result").classList.remove("hidden");
            setGameResult(player);
            win = 0;
            break;
          }
        } else {
          break;
        }
      }
      for (let i = 1; i < 6; i++) {
        if(y + i > 18 || x - i < 0) {
          break;
        }
        if (piece[y + i][x - i] == player) {
          win++;
          if (win >= 4) {
            document.querySelector(".game-result").classList.remove("hidden");
            setGameResult(player);
            win = 0;
            break;
          }
        } else {
          win = 0;
          break;
        }
      }
      // 反斜線贏法

      for (let i = 1; i < 6; i++) {
        if(x - i < 0 || y - i <0) {
          break;
        }
        if (piece[y - i][x - i] == player) {
          win++;
          if (win >= 4) {
            document.querySelector(".game-result").classList.remove("hidden");
            setGameResult(player);
            win = 0;
            break;
          }
        } else {
          break;
        }
      }
      for (let i = 1; i < 6; i++) {
        if(y + i > 18 || x + i > 18) {
          break;
        }
        if (piece[y + i][x + i] == player) {
          win++;
          if (win >= 4) {
            document.querySelector(".game-result").classList.remove("hidden");
            setGameResult(player);
            win = 0;
            break;
          }
        } else {
          win = 0;
          break;
        }
      }
    },
    [player, piece]
  );
  
  // -----------------------------------------------------------------------------------

  const handleResetPiece = useCallback(() => {
    setPiece(Array(19).fill(Array(19).fill("")));
    document.querySelector(".game-result").classList.add("hidden");
    setGameResult("");
  }, []);

  const MemoBoard = memo(Board);

  return (
    <div className="all">
      <FunctionBtn
        player={player}
        handleResetPiece={handleResetPiece}
        gameResult={gameResult}
      />
      <div className="board-piece">
        {piece.map((array, y) =>
          array.map((value, x) => {
            return (
              <MemoBoard
                gameResult={gameResult}
                judge={judge}
                piece={piece}
                pieceStyle={piece[y][x]}
                handleChangePlayer={handleChangePlayer}
                updateBoard={updateBoard}
                player={player}
                x={x}
                y={y}
              />
            );
          })
        )}
      </div>

      <div className="board-background">
        {board.map((array) => array.map(() => <MemoBoard />))}
      </div>
    </div>
  );
}
export default App;
