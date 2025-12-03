import React from 'react';
import SudokuCell from './SudokuCell';

const SudokuBoard = ({
    board,
    initialBoard,
    selectedCell,
    errors,
    notes,
    isPaused,
    onTogglePause,
    onCellClick
}) => {
    const getIsSameNumber = (row, col) => {
        if (isPaused || !selectedCell || board[row][col] === 0) return false;
        return board[selectedCell.row][selectedCell.col] === board[row][col];
    };

    const getIsRelated = (row, col) => {
        if (isPaused || !selectedCell) return false;
        const { row: sRow, col: sCol } = selectedCell;

        // Không highlight chính ô đang chọn
        if (row === sRow && col === sCol) return false;

        // Cùng hàng hoặc cùng cột
        if (row === sRow || col === sCol) return true;

        // Cùng khối 3x3
        const startRow = sRow - (sRow % 3);
        const startCol = sCol - (sCol % 3);
        if (row >= startRow && row < startRow + 3 && col >= startCol && col < startCol + 3) return true;

        return false;
    };

    const hasError = (row, col) => {
        return errors.some(error => error.row === row && error.col === col);
    };

    return (
        <div className="glass-effect rounded-2xl p-6 shadow-2xl relative">
            {isPaused && (
                <div className="absolute inset-0 z-10 bg-gray-900 bg-opacity-95 rounded-2xl flex flex-col items-center justify-center backdrop-blur-sm">
                    <div className="text-6xl mb-4">⏸️</div>
                    <h3 className="text-white text-3xl font-bold mb-6">Đã Tạm Dừng</h3>
                    <button
                        onClick={onTogglePause}
                        className="bg-white text-purple-600 hover:bg-blue-50 font-bold py-3 px-8 rounded-full text-xl transition-all transform hover:scale-105 shadow-lg flex items-center gap-2"
                    >
                        <span>▶️</span> Tiếp Tục Chơi
                    </button>
                </div>
            )}
            <div
                className={`grid grid-cols-9 gap-0 bg-gray-800 p-1 rounded-xl overflow-hidden transition-all duration-300 ${isPaused ? 'blur-sm' : ''}`}
                style={{
                    width: 'min(90vw, 540px)',
                    height: 'min(90vw, 540px)',
                }}
            >
                {board.map((row, rowIndex) =>
                    row.map((cell, colIndex) => (
                        <SudokuCell
                            key={`${rowIndex}-${colIndex}`}
                            value={cell}
                            row={rowIndex}
                            col={colIndex}
                            isGiven={initialBoard[rowIndex][colIndex] !== 0}
                            isSelected={
                                !isPaused && selectedCell?.row === rowIndex && selectedCell?.col === colIndex
                            }
                            isSameNumber={getIsSameNumber(rowIndex, colIndex)}
                            isRelated={getIsRelated(rowIndex, colIndex)}
                            hasError={hasError(rowIndex, colIndex)}
                            notes={notes ? notes[rowIndex][colIndex] : []}
                            onClick={!isPaused ? onCellClick : () => { }}
                        />
                    ))
                )}
            </div>
        </div>
    );
};

export default SudokuBoard;
