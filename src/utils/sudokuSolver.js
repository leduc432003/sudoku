// Smart Sudoku Solver - Các kỹ thuật giải Sudoku chuyên nghiệp

import { isValid } from './sudokuGenerator';

// Tính toán các số có thể điền vào mỗi ô (candidates)
export function getCandidates(board, row, col) {
    if (board[row][col] !== 0) return [];

    const candidates = [];
    for (let num = 1; num <= 9; num++) {
        if (isValid(board, row, col, num)) {
            candidates.push(num);
        }
    }
    return candidates;
}

// Tính toán candidates cho toàn bộ bàn cờ
export function getAllCandidates(board) {
    const candidates = Array(9).fill(null).map(() => Array(9).fill(null).map(() => []));

    for (let row = 0; row < 9; row++) {
        for (let col = 0; col < 9; col++) {
            if (board[row][col] === 0) {
                candidates[row][col] = getCandidates(board, row, col);
            }
        }
    }
    return candidates;
}

// Kỹ thuật 1: NAKED SINGLE (Ô chỉ có 1 số duy nhất có thể điền)
export function findNakedSingle(board) {
    const candidates = getAllCandidates(board);

    for (let row = 0; row < 9; row++) {
        for (let col = 0; col < 9; col++) {
            if (candidates[row][col].length === 1) {
                return {
                    technique: 'Naked Single',
                    description: `Ô này chỉ có thể điền số ${candidates[row][col][0]} vì tất cả các số khác đều bị loại trừ bởi hàng, cột hoặc vùng 3x3.`,
                    row,
                    col,
                    value: candidates[row][col][0],
                    highlightCells: [{ row, col }],
                    relatedCells: getRelatedCells(row, col)
                };
            }
        }
    }
    return null;
}

// Kỹ thuật 2: HIDDEN SINGLE (Số chỉ xuất hiện ở 1 vị trí duy nhất trong hàng/cột/vùng)
export function findHiddenSingle(board) {
    const candidates = getAllCandidates(board);

    // Kiểm tra trong từng hàng
    for (let row = 0; row < 9; row++) {
        for (let num = 1; num <= 9; num++) {
            const positions = [];
            for (let col = 0; col < 9; col++) {
                if (candidates[row][col].includes(num)) {
                    positions.push(col);
                }
            }
            if (positions.length === 1) {
                const col = positions[0];
                return {
                    technique: 'Hidden Single (Hàng)',
                    description: `Số ${num} chỉ có thể xuất hiện ở vị trí này trong hàng ${row + 1}.`,
                    row,
                    col,
                    value: num,
                    highlightCells: [{ row, col }],
                    relatedCells: Array.from({ length: 9 }, (_, i) => ({ row, col: i }))
                };
            }
        }
    }

    // Kiểm tra trong từng cột
    for (let col = 0; col < 9; col++) {
        for (let num = 1; num <= 9; num++) {
            const positions = [];
            for (let row = 0; row < 9; row++) {
                if (candidates[row][col].includes(num)) {
                    positions.push(row);
                }
            }
            if (positions.length === 1) {
                const row = positions[0];
                return {
                    technique: 'Hidden Single (Cột)',
                    description: `Số ${num} chỉ có thể xuất hiện ở vị trí này trong cột ${col + 1}.`,
                    row,
                    col,
                    value: num,
                    highlightCells: [{ row, col }],
                    relatedCells: Array.from({ length: 9 }, (_, i) => ({ row: i, col }))
                };
            }
        }
    }

    // Kiểm tra trong từng vùng 3x3
    for (let boxRow = 0; boxRow < 3; boxRow++) {
        for (let boxCol = 0; boxCol < 3; boxCol++) {
            for (let num = 1; num <= 9; num++) {
                const positions = [];
                for (let i = 0; i < 3; i++) {
                    for (let j = 0; j < 3; j++) {
                        const row = boxRow * 3 + i;
                        const col = boxCol * 3 + j;
                        if (candidates[row][col].includes(num)) {
                            positions.push({ row, col });
                        }
                    }
                }
                if (positions.length === 1) {
                    const { row, col } = positions[0];
                    return {
                        technique: 'Hidden Single (Vùng 3x3)',
                        description: `Số ${num} chỉ có thể xuất hiện ở vị trí này trong vùng 3x3.`,
                        row,
                        col,
                        value: num,
                        highlightCells: [{ row, col }],
                        relatedCells: getBoxCells(row, col)
                    };
                }
            }
        }
    }

    return null;
}

// Lấy tất cả ô liên quan (hàng, cột, vùng)
function getRelatedCells(row, col) {
    const cells = [];

    // Hàng
    for (let c = 0; c < 9; c++) {
        if (c !== col) cells.push({ row, col: c });
    }

    // Cột
    for (let r = 0; r < 9; r++) {
        if (r !== row) cells.push({ row: r, col });
    }

    // Vùng 3x3
    const startRow = row - (row % 3);
    const startCol = col - (col % 3);
    for (let r = startRow; r < startRow + 3; r++) {
        for (let c = startCol; c < startCol + 3; c++) {
            if (r !== row && c !== col) {
                cells.push({ row: r, col: c });
            }
        }
    }

    return cells;
}

// Lấy tất cả ô trong vùng 3x3
function getBoxCells(row, col) {
    const cells = [];
    const startRow = row - (row % 3);
    const startCol = col - (col % 3);

    for (let r = startRow; r < startRow + 3; r++) {
        for (let c = startCol; c < startCol + 3; c++) {
            cells.push({ row: r, col: c });
        }
    }

    return cells;
}

// Tìm gợi ý thông minh (thử các kỹ thuật theo thứ tự)
export function findSmartHint(board) {
    // Thử Naked Single trước (dễ nhất)
    let hint = findNakedSingle(board);
    if (hint) return hint;

    // Thử Hidden Single
    hint = findHiddenSingle(board);
    if (hint) return hint;

    // Nếu không tìm thấy kỹ thuật nào, trả về null
    return null;
}

// Highlight các ô có thể điền (không cho đáp án)
export function highlightPossibleMoves(board) {
    const candidates = getAllCandidates(board);
    const easyCells = [];

    for (let row = 0; row < 9; row++) {
        for (let col = 0; col < 9; col++) {
            if (candidates[row][col].length === 1) {
                easyCells.push({
                    row,
                    col,
                    candidates: candidates[row][col]
                });
            }
        }
    }

    return easyCells;
}
