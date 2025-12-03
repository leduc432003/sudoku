import React, { useState, useEffect, useCallback, useMemo } from 'react';
import SudokuBoard from './components/SudokuBoard';
import NumberPad from './components/NumberPad';
import GameStats from './components/GameStats';
import WinModal from './components/WinModal';
import HintModal from './components/HintModal';
import SettingsModal from './components/SettingsModal';
import Toast from './components/Toast';
import { generateSudoku, validateBoard, isComplete, getHint, isValid } from './utils/sudokuGenerator';
import { findSmartHint } from './utils/sudokuSolver';
import { playSound } from './utils/sound';
import './index.css';

function App() {
  // Settings State
  const [showSettingsModal, setShowSettingsModal] = useState(false);
  const [settings, setSettings] = useState(() => {
    const savedSettings = localStorage.getItem('sudoku-settings');
    return savedSettings ? JSON.parse(savedSettings) : {
      soundEnabled: true,
      autoRemoveNotes: true,
      highlightSameNumbers: true
    };
  });

  // Save settings when changed
  useEffect(() => {
    localStorage.setItem('sudoku-settings', JSON.stringify(settings));
  }, [settings]);

  const [gameData, setGameData] = useState(null);
  const [board, setBoard] = useState(null);
  const [initialBoard, setInitialBoard] = useState(null);
  const [notes, setNotes] = useState([]);
  const [isNoteMode, setIsNoteMode] = useState(false);
  const [selectedCell, setSelectedCell] = useState(null);
  const [errors, setErrors] = useState([]);
  const [mistakes, setMistakes] = useState(0);
  const [hintsUsed, setHintsUsed] = useState(0);
  const [difficulty, setDifficulty] = useState('EASY');
  const [timer, setTimer] = useState(0);
  const [isRunning, setIsRunning] = useState(false);
  const [isPaused, setIsPaused] = useState(false);
  const [showWinModal, setShowWinModal] = useState(false);
  const [showHintModal, setShowHintModal] = useState(false);
  const [currentHint, setCurrentHint] = useState(null);
  const [toast, setToast] = useState(null); // { message, type }

  // Undo/Redo History
  const [history, setHistory] = useState([]);
  const [historyStep, setHistoryStep] = useState(-1);

  const showToast = (message, type = 'info') => {
    setToast({ message, type });
  };

  // Initialize game
  const initializeGame = useCallback((diff = difficulty) => {
    const newGame = generateSudoku(diff);
    setGameData(newGame);
    const startBoard = newGame.puzzle.map(row => [...row]);
    const startNotes = Array(9).fill(null).map(() => Array(9).fill([]));

    setBoard(startBoard);
    setInitialBoard(newGame.puzzle.map(row => [...row]));
    setNotes(startNotes);

    // Reset history
    setHistory([{ board: startBoard, notes: startNotes }]);
    setHistoryStep(0);

    setSelectedCell(null);
    setErrors([]);
    setMistakes(0);
    setHintsUsed(0);
    setTimer(0);
    setIsRunning(true);
    setIsPaused(false);
    setShowWinModal(false);
    setIsNoteMode(false);
  }, [difficulty]);

  // Load game from local storage on mount
  useEffect(() => {
    const savedGame = localStorage.getItem('sudoku-game-save');
    if (savedGame) {
      try {
        const parsed = JSON.parse(savedGame);
        if (parsed.board && parsed.gameData) {
          setBoard(parsed.board);
          setInitialBoard(parsed.initialBoard);
          setNotes(parsed.notes);
          setGameData(parsed.gameData);
          setDifficulty(parsed.difficulty);
          setMistakes(parsed.mistakes);
          setHintsUsed(parsed.hintsUsed);
          setTimer(parsed.timer);
          setIsRunning(true);
          setIsPaused(true);
          setIsNoteMode(false);

          // Restore history if possible, or init new
          if (parsed.history && parsed.historyStep !== undefined) {
            setHistory(parsed.history);
            setHistoryStep(parsed.historyStep);
          } else {
            setHistory([{ board: parsed.board, notes: parsed.notes }]);
            setHistoryStep(0);
          }
          return;
        }
      } catch (e) {
        console.error("Failed to load saved game", e);
      }
    }
    initializeGame();
  }, []);

  // Save game to local storage
  useEffect(() => {
    if (board && gameData && isRunning) {
      const gameState = {
        board,
        initialBoard,
        notes,
        gameData,
        difficulty,
        mistakes,
        hintsUsed,
        timer,
        history,
        historyStep
      };
      localStorage.setItem('sudoku-game-save', JSON.stringify(gameState));
    }
  }, [board, notes, timer, mistakes, hintsUsed, difficulty, gameData, isRunning, history, historyStep]);

  // Timer effect
  useEffect(() => {
    let interval;
    if (isRunning && !isPaused) {
      interval = setInterval(() => {
        setTimer(prev => prev + 1);
      }, 1000);
    }
    return () => clearInterval(interval);
  }, [isRunning, isPaused]);

  // Helper to save history
  const saveToHistory = (newBoard, newNotes) => {
    const newHistory = history.slice(0, historyStep + 1);
    newHistory.push({ board: newBoard, notes: newNotes });
    setHistory(newHistory);
    setHistoryStep(newHistory.length - 1);
  };

  // Undo
  const handleUndo = () => {
    if (isPaused || historyStep <= 0) return;
    playSound('click');
    const prevStep = historyStep - 1;
    const prevState = history[prevStep];
    setBoard(prevState.board);
    setNotes(prevState.notes);
    setHistoryStep(prevStep);
    setErrors([]);
  };

  // Redo
  const handleRedo = () => {
    if (isPaused || historyStep >= history.length - 1) return;
    playSound('click');
    const nextStep = historyStep + 1;
    const nextState = history[nextStep];
    setBoard(nextState.board);
    setNotes(nextState.notes);
    setHistoryStep(nextStep);
    setErrors([]);
  };

  // Auto Pencil
  const handleAutoPencil = () => {
    if (isPaused || !board) return;
    playSound('pencil');

    const newNotes = notes.map(row => [...row]);
    let changed = false;

    for (let r = 0; r < 9; r++) {
      for (let c = 0; c < 9; c++) {
        if (board[r][c] === 0) {
          const candidates = [];
          for (let num = 1; num <= 9; num++) {
            if (isValid(board, r, c, num)) {
              candidates.push(num);
            }
          }
          if (JSON.stringify(newNotes[r][c]) !== JSON.stringify(candidates)) {
            newNotes[r][c] = candidates;
            changed = true;
          }
        }
      }
    }

    if (changed) {
      setNotes(newNotes);
      saveToHistory(board, newNotes);
    }
  };

  const getNumberCounts = useCallback(() => {
    if (!board) return {};
    const counts = {};
    for (let i = 1; i <= 9; i++) counts[i] = 0;
    board.forEach(row => row.forEach(cell => { if (cell !== 0) counts[cell]++; }));
    return counts;
  }, [board]);

  const handleCellClick = (row, col) => {
    if (isPaused) return;
    setSelectedCell({ row, col });
    playSound('click');
  };

  const handleNumberSelect = (num) => {
    if (isPaused || !selectedCell || !board) return;

    const { row, col } = selectedCell;
    if (initialBoard[row][col] !== 0) return;

    if (isNoteMode) {
      const newNotes = notes.map(r => [...r]);
      const currentNotes = newNotes[row][col];

      if (currentNotes.includes(num)) {
        newNotes[row][col] = currentNotes.filter(n => n !== num);
        playSound('pencil');
      } else {
        // Conflict check for notes
        let isConflict = false;
        const conflicts = [];
        // Check row, col, box... (simplified for brevity, logic same as before)
        for (let i = 0; i < 9; i++) if (board[row][i] === num) { isConflict = true; conflicts.push({ row, col: i }); }
        for (let i = 0; i < 9; i++) if (board[i][col] === num) { isConflict = true; conflicts.push({ row: i, col }); }
        const startRow = row - (row % 3);
        const startCol = col - (col % 3);
        for (let i = 0; i < 3; i++) for (let j = 0; j < 3; j++) if (board[startRow + i][startCol + j] === num) { isConflict = true; conflicts.push({ row: startRow + i, col: startCol + j }); }

        if (isConflict) {
          setErrors([...conflicts, { row, col }]);
          // Không cộng lỗi khi nhập ghi chú sai, chỉ cảnh báo
          playSound('error');
          setTimeout(() => setErrors([]), 1000);
          return;
        }

        newNotes[row][col] = [...currentNotes, num].sort();
        playSound('pencil');
      }
      setNotes(newNotes);
      saveToHistory(board, newNotes);
    } else {
      const newBoard = board.map(r => [...r]);
      newBoard[row][col] = num;

      const newNotes = notes.map(r => [...r]);
      newNotes[row][col] = []; // Clear notes in current cell

      // Auto-remove notes feature
      if (settings.autoRemoveNotes) {
        // Remove this number from notes in same row, col, and box
        for (let i = 0; i < 9; i++) {
          // Row
          if (newNotes[row][i].includes(num)) {
            newNotes[row][i] = newNotes[row][i].filter(n => n !== num);
          }
          // Col
          if (newNotes[i][col].includes(num)) {
            newNotes[i][col] = newNotes[i][col].filter(n => n !== num);
          }
        }
        // Box
        const startRow = row - (row % 3);
        const startCol = col - (col % 3);
        for (let i = 0; i < 3; i++) {
          for (let j = 0; j < 3; j++) {
            const r = startRow + i;
            const c = startCol + j;
            if (newNotes[r][c].includes(num)) {
              newNotes[r][c] = newNotes[r][c].filter(n => n !== num);
            }
          }
        }
      }

      if (gameData.solution[row][col] !== num) {
        // Thêm ô này vào danh sách lỗi (không xóa sau 1 giây nữa)
        const newErrors = errors.filter(e => !(e.row === row && e.col === col));
        setErrors([...newErrors, { row, col }]);
        setMistakes(prev => prev + 1);
        playSound('error');
        setBoard(newBoard);
        setNotes(newNotes);
        saveToHistory(newBoard, newNotes);
      } else {
        // Xóa ô này khỏi danh sách lỗi nếu nhập đúng
        const newErrors = errors.filter(e => !(e.row === row && e.col === col));
        setErrors(newErrors);
        playSound('number');
        setBoard(newBoard);
        setNotes(newNotes);
        saveToHistory(newBoard, newNotes);

        if (isComplete(newBoard)) {
          setIsRunning(false);
          localStorage.removeItem('sudoku-game-save');
          playSound('win');
          setTimeout(() => setShowWinModal(true), 500);
        }
      }
    }
  };

  const handleErase = () => {
    if (isPaused || !selectedCell || !board) return;
    const { row, col } = selectedCell;
    if (initialBoard[row][col] !== 0) return;

    const newBoard = board.map(r => [...r]);
    newBoard[row][col] = 0;

    const newNotes = notes.map(r => [...r]);
    if (board[row][col] === 0) {
      newNotes[row][col] = []; // Clear notes if cell was empty
    }

    setBoard(newBoard);
    setNotes(newNotes);

    // Xóa lỗi của ô này nếu có
    const newErrors = errors.filter(e => !(e.row === row && e.col === col));
    setErrors(newErrors);

    playSound('delete');
    saveToHistory(newBoard, newNotes);
  };

  const handleSmartHint = () => {
    if (isPaused || !board) return;

    const smartHint = findSmartHint(board);
    if (smartHint) {
      setCurrentHint(smartHint);
      setShowHintModal(true);
      setHintsUsed(prev => prev + 1);
      playSound('click');
    } else {
      // Fallback to old hint if no smart technique found
      const hint = getHint(board, gameData.solution);
      if (hint) {
        setCurrentHint({
          technique: 'Gợi Ý Cơ Bản',
          description: 'Không tìm thấy kỹ thuật đặc biệt. Đây là một ô bạn có thể điền.',
          row: hint.row,
          col: hint.col,
          value: hint.value,
          highlightCells: [{ row: hint.row, col: hint.col }],
          relatedCells: []
        });
        setShowHintModal(true);
        setHintsUsed(prev => prev + 1);
        playSound('click');
      } else {
        showToast('Không tìm thấy gợi ý! Bạn đã giải xong rồi! 🎉', 'success');
      }
    }
  };

  const handleApplyHint = (hint) => {
    const newBoard = board.map(r => [...r]);
    newBoard[hint.row][hint.col] = hint.value;

    const newNotes = notes.map(r => [...r]);
    newNotes[hint.row][hint.col] = [];

    setBoard(newBoard);
    setNotes(newNotes);
    setSelectedCell({ row: hint.row, col: hint.col });
    playSound('number');
    saveToHistory(newBoard, newNotes);

    // Xóa lỗi của ô này nếu có
    const newErrors = errors.filter(e => !(e.row === hint.row && e.col === hint.col));
    setErrors(newErrors);

    if (isComplete(newBoard)) {
      setIsRunning(false);
      localStorage.removeItem('sudoku-game-save');
      playSound('win');
      setTimeout(() => setShowWinModal(true), 500);
    }
  };

  const handleValidate = () => {
    if (isPaused || !board) return;
    const newErrors = [];
    for (let row = 0; row < 9; row++) {
      for (let col = 0; col < 9; col++) {
        // Chỉ kiểm tra các ô đã điền số (1-9)
        const cellValue = board[row][col];
        if (Number.isInteger(cellValue) && cellValue >= 1 && cellValue <= 9) {
          if (cellValue !== gameData.solution[row][col]) {
            newErrors.push({ row, col });
          }
        }
      }
    }

    if (newErrors.length > 0) {
      setErrors(newErrors);
      setMistakes(prev => prev + newErrors.length);
      playSound('error');
      showToast(`Tìm thấy ${newErrors.length} lỗi! Hãy kiểm tra lại các ô màu đỏ.`, 'error');
      // Không tự động xóa lỗi sau 2s nữa, để người dùng tự sửa
    } else {
      setErrors([]); // Xóa hết lỗi nếu kiểm tra thấy đúng
      playSound('win');
      showToast('Tuyệt vời! Tất cả các ô đã điền đều chính xác! 🎉', 'success');
    }
  };

  const handleNewGame = () => {
    localStorage.removeItem('sudoku-game-save');
    initializeGame();
  };

  const handleDifficultyChange = (newDifficulty) => {
    setDifficulty(newDifficulty);
    localStorage.removeItem('sudoku-game-save');
    initializeGame(newDifficulty);
  };

  const handleTogglePause = () => {
    setIsPaused(prev => !prev);
    playSound('click');
  };

  useEffect(() => {
    const handleKeyPress = (e) => {
      if (isPaused) return;
      if (e.ctrlKey || e.metaKey) {
        if (e.key === 'z') {
          e.preventDefault();
          handleUndo();
          return;
        }
        if (e.key === 'y') {
          e.preventDefault();
          handleRedo();
          return;
        }
      }

      if (!selectedCell) return;

      if (e.key >= '1' && e.key <= '9') {
        handleNumberSelect(parseInt(e.key));
      } else if (e.key === 'Backspace' || e.key === 'Delete' || e.key === '0') {
        handleErase();
      } else if (e.key === 'n' || e.key === 'N') {
        setIsNoteMode(prev => !prev);
        playSound('click');
      } else if (e.key === 'ArrowUp' || e.key === 'ArrowDown' ||
        e.key === 'ArrowLeft' || e.key === 'ArrowRight') {
        e.preventDefault();
        const { row, col } = selectedCell;
        let newRow = row;
        let newCol = col;
        if (e.key === 'ArrowUp') newRow = Math.max(0, row - 1);
        if (e.key === 'ArrowDown') newRow = Math.min(8, row + 1);
        if (e.key === 'ArrowLeft') newCol = Math.max(0, col - 1);
        if (e.key === 'ArrowRight') newCol = Math.min(8, col + 1);
        setSelectedCell({ row: newRow, col: newCol });
        playSound('click');
      }
    };
    window.addEventListener('keydown', handleKeyPress);
    return () => window.removeEventListener('keydown', handleKeyPress);
  }, [selectedCell, board, initialBoard, isNoteMode, notes, isPaused, history, historyStep]);

  const handleClearNotes = () => {
    if (isPaused || !selectedCell || !notes) return;
    const { row, col } = selectedCell;

    // Chỉ xóa nếu ô đó có ghi chú
    if (notes[row][col].length > 0) {
      const newNotes = notes.map(r => [...r]);
      newNotes[row][col] = [];
      setNotes(newNotes);
      playSound('delete');
      saveToHistory(board, newNotes);
      showToast('Đã xóa ghi chú ô này', 'info');
    }
  };

  // Kiểm tra xem có thể Auto Finish không (còn ít hơn 15 ô trống và không có lỗi)
  const canAutoFinish = useMemo(() => {
    if (!board || errors.length > 0) return false;
    let emptyCount = 0;
    for (let r = 0; r < 9; r++) {
      for (let c = 0; c < 9; c++) {
        if (board[r][c] === 0) emptyCount++;
      }
    }
    return emptyCount > 0 && emptyCount <= 15;
  }, [board, errors]);

  const handleAutoFinish = () => {
    if (!canAutoFinish) return;

    const newBoard = board.map(r => [...r]);
    // Điền nốt các ô trống bằng đáp án đúng
    for (let r = 0; r < 9; r++) {
      for (let c = 0; c < 9; c++) {
        if (newBoard[r][c] === 0) {
          newBoard[r][c] = gameData.solution[r][c];
        }
      }
    }

    setBoard(newBoard);
    setNotes(Array(9).fill(null).map(() => Array(9).fill([]))); // Xóa hết ghi chú
    playSound('win');
    setIsRunning(false);
    localStorage.removeItem('sudoku-game-save');
    setTimeout(() => setShowWinModal(true), 500);
    showToast('⚡ Đã tự động hoàn thành! Bạn quá đỉnh!', 'success');
  };

  // Tính số lượng còn lại của mỗi số
  const remainingCounts = useMemo(() => {
    if (!board) return {};
    const counts = {};
    for (let i = 1; i <= 9; i++) counts[i] = 9;

    for (let r = 0; r < 9; r++) {
      for (let c = 0; c < 9; c++) {
        const val = board[r][c];
        if (val >= 1 && val <= 9) {
          counts[val]--;
        }
      }
    }
    return counts;
  }, [board]);

  if (!board || !initialBoard || !notes) {
    return (
      <div className="min-h-screen flex items-center justify-center">
        <div className="text-white text-2xl font-bold">Đang tải game...</div>
      </div>
    );
  }

  return (
    <div className="min-h-screen bg-gradient-to-br from-blue-500 to-purple-600 p-4 flex flex-col items-center justify-center font-sans relative">
      {/* Settings Button */}
      <button
        onClick={() => setShowSettingsModal(true)}
        className="absolute top-4 right-4 bg-white/20 hover:bg-white/30 text-white p-3 rounded-full backdrop-blur-sm transition-all shadow-lg z-10"
        title="Cài đặt"
      >
        <span className="text-2xl">⚙️</span>
      </button>

      {toast && (
        <Toast
          message={toast.message}
          type={toast.type}
          onClose={() => setToast(null)}
        />
      )}

      <div className="w-full max-w-7xl mx-auto">
        <div className="text-center mb-4 xl:mb-8 fade-in">
          <h1 className="text-6xl font-bold text-white mb-2 drop-shadow-lg">🎯 Sudoku Game</h1>
          <p className="text-white text-lg opacity-90">Thử thách trí tuệ của bạn với Sudoku!</p>
        </div>

        <div className="grid grid-cols-1 xl:grid-cols-[320px_auto_320px] gap-8 items-start justify-center">
          <div className="w-full max-w-md mx-auto xl:max-w-none order-3 xl:order-1 fade-in">
            <GameStats
              difficulty={difficulty}
              mistakes={mistakes}
              hintsUsed={hintsUsed}
              timer={timer}
              onNewGame={handleNewGame}
              onHint={handleSmartHint}
              onValidate={handleValidate}
              onChangeDifficulty={handleDifficultyChange}
              isPaused={isPaused}
              onTogglePause={handleTogglePause}
            />
          </div>

          <div className="order-1 xl:order-2 flex justify-center fade-in">
            <SudokuBoard
              board={board}
              initialBoard={initialBoard}
              selectedCell={selectedCell}
              errors={errors}
              notes={notes}
              isPaused={isPaused}
              onTogglePause={handleTogglePause}
              onCellClick={handleCellClick}
              highlightSameNumbers={settings.highlightSameNumbers}
            />
          </div>

          <div className="w-full max-w-md mx-auto xl:max-w-none order-2 xl:order-3 fade-in">
            <NumberPad
              onNumberSelect={handleNumberSelect}
              onDelete={handleErase}
              onNoteToggle={() => setIsNoteMode(!isNoteMode)}
              isNoteMode={isNoteMode}
              remainingCounts={remainingCounts}
              onUndo={handleUndo}
              onRedo={handleRedo}
              canUndo={historyStep > 0}
              canRedo={historyStep < history.length - 1}
              onAutoPencil={handleAutoPencil}
              onClearNotes={handleClearNotes}
              canAutoFinish={canAutoFinish}
              onAutoFinish={handleAutoFinish}
            />
          </div>
        </div>
      </div>
      <WinModal
        isOpen={showWinModal}
        onClose={() => setShowWinModal(false)}
        onNewGame={handleNewGame}
        stats={{ timer, mistakes, hintsUsed, difficulty }}
      />
      <HintModal
        isOpen={showHintModal}
        hint={currentHint}
        onClose={() => setShowHintModal(false)}
        onApply={handleApplyHint}
      />
      <SettingsModal
        isOpen={showSettingsModal}
        onClose={() => setShowSettingsModal(false)}
        settings={settings}
        onUpdateSettings={setSettings}
      />
    </div>
  );
}

export default App;
