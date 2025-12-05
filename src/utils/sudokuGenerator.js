// Sudoku Generator - Tạo bảng Sudoku hợp lệ và không trùng lặp

// Độ khó của Sudoku - Số ô cần xóa để tạo puzzle
// MASTER: Cực kỳ khó - Chỉ có 17-22 số gợi ý ban đầu, cần kỹ thuật nâng cao
export const DIFFICULTY_LEVELS = {
    EASY: { name: 'Dễ', cellsToRemove: 30 },           // 51 clues
    MEDIUM: { name: 'Trung Bình', cellsToRemove: 40 }, // 41 clues
    HARD: { name: 'Khó', cellsToRemove: 50 },          // 31 clues
    EXPERT: { name: 'Chuyên Gia', cellsToRemove: 55 }, // 26 clues
    MASTER: { name: 'Cực Khó', cellsToRemove: 64, minCellsToRemove: 59 } // 17-22 clues
};

// Kiểm tra số có hợp lệ tại vị trí không
export function isValid(board, row, col, num) {
    // Kiểm tra hàng
    for (let x = 0; x < 9; x++) {
        if (board[row][x] === num) return false;
    }

    // Kiểm tra cột
    for (let x = 0; x < 9; x++) {
        if (board[x][col] === num) return false;
    }

    // Kiểm tra ô 3x3
    const startRow = row - (row % 3);
    const startCol = col - (col % 3);
    for (let i = 0; i < 3; i++) {
        for (let j = 0; j < 3; j++) {
            if (board[i + startRow][j + startCol] === num) return false;
        }
    }

    return true;
}

// Giải Sudoku bằng backtracking
function solveSudoku(board) {
    for (let row = 0; row < 9; row++) {
        for (let col = 0; col < 9; col++) {
            if (board[row][col] === 0) {
                for (let num = 1; num <= 9; num++) {
                    if (isValid(board, row, col, num)) {
                        board[row][col] = num;
                        if (solveSudoku(board)) {
                            return true;
                        }
                        board[row][col] = 0;
                    }
                }
                return false;
            }
        }
    }
    return true;
}

// Đếm số lượng giải pháp
function countSolutions(board, count = { value: 0 }) {
    if (count.value > 1) return count.value;

    for (let row = 0; row < 9; row++) {
        for (let col = 0; col < 9; col++) {
            if (board[row][col] === 0) {
                for (let num = 1; num <= 9; num++) {
                    if (isValid(board, row, col, num)) {
                        board[row][col] = num;
                        countSolutions(board, count);
                        board[row][col] = 0;
                    }
                }
                return count.value;
            }
        }
    }
    count.value++;
    return count.value;
}

// Tạo bảng Sudoku đã hoàn thành
function generateCompleteBoard() {
    const board = Array(9).fill(null).map(() => Array(9).fill(0));

    // Điền số ngẫu nhiên vào đường chéo chính (các ô 3x3 không ảnh hưởng lẫn nhau)
    for (let box = 0; box < 9; box += 3) {
        const nums = [1, 2, 3, 4, 5, 6, 7, 8, 9];
        // Shuffle array
        for (let i = nums.length - 1; i > 0; i--) {
            const j = Math.floor(Math.random() * (i + 1));
            [nums[i], nums[j]] = [nums[j], nums[i]];
        }

        let idx = 0;
        for (let i = 0; i < 3; i++) {
            for (let j = 0; j < 3; j++) {
                board[box + i][box + j] = nums[idx++];
            }
        }
    }

    // Giải phần còn lại
    solveSudoku(board);
    return board;
}

// Tạo puzzle từ bảng hoàn chỉnh
function createPuzzle(completeBoard, cellsToRemove) {
    const puzzle = completeBoard.map(row => [...row]);
    let removed = 0;
    const attempts = cellsToRemove * 3; // Giới hạn số lần thử
    let attemptCount = 0;

    while (removed < cellsToRemove && attemptCount < attempts) {
        const row = Math.floor(Math.random() * 9);
        const col = Math.floor(Math.random() * 9);

        if (puzzle[row][col] !== 0) {
            const backup = puzzle[row][col];
            puzzle[row][col] = 0;

            // Kiểm tra xem puzzle còn có giải pháp duy nhất không
            const testBoard = puzzle.map(row => [...row]);
            const solutions = countSolutions(testBoard);

            if (solutions === 1) {
                removed++;
            } else {
                puzzle[row][col] = backup;
            }
        }
        attemptCount++;
    }

    return puzzle;
}

// Tạo Sudoku game mới
export function generateSudoku(difficulty = 'MEDIUM') {
    const difficultyConfig = DIFFICULTY_LEVELS[difficulty];

    // Đối với MASTER, chọn ngẫu nhiên số ô cần xóa trong khoảng minCellsToRemove đến cellsToRemove
    let cellsToRemove = difficultyConfig.cellsToRemove;
    if (difficultyConfig.minCellsToRemove !== undefined) {
        const min = difficultyConfig.minCellsToRemove;
        const max = difficultyConfig.cellsToRemove;
        cellsToRemove = Math.floor(Math.random() * (max - min + 1)) + min;
    }

    const completeBoard = generateCompleteBoard();
    const puzzle = createPuzzle(completeBoard, cellsToRemove);

    return {
        puzzle: puzzle.map(row => [...row]),
        solution: completeBoard.map(row => [...row]),
        difficulty,
        cluesCount: 81 - cellsToRemove // Số gợi ý ban đầu
    };
}

// Kiểm tra xem bảng hiện tại có hợp lệ không
export function validateBoard(board) {
    for (let row = 0; row < 9; row++) {
        for (let col = 0; col < 9; col++) {
            if (board[row][col] !== 0) {
                const num = board[row][col];
                board[row][col] = 0;
                const valid = isValid(board, row, col, num);
                board[row][col] = num;
                if (!valid) return false;
            }
        }
    }
    return true;
}

// Kiểm tra xem đã hoàn thành chưa
export function isComplete(board) {
    for (let row = 0; row < 9; row++) {
        for (let col = 0; col < 9; col++) {
            if (board[row][col] === 0) return false;
        }
    }
    return validateBoard(board);
}

// Lấy gợi ý
export function getHint(currentBoard, solution) {
    const emptyCells = [];
    for (let row = 0; row < 9; row++) {
        for (let col = 0; col < 9; col++) {
            if (currentBoard[row][col] === 0) {
                emptyCells.push({ row, col });
            }
        }
    }

    if (emptyCells.length === 0) return null;

    const randomCell = emptyCells[Math.floor(Math.random() * emptyCells.length)];
    return {
        row: randomCell.row,
        col: randomCell.col,
        value: solution[randomCell.row][randomCell.col]
    };
}
