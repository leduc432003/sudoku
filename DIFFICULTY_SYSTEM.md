# Cập Nhật Hệ Thống Độ Khó - Random Clues

## Thay đổi đã thực hiện

### 1. Cập nhật `sudokuGenerator.js`

**Hệ thống độ khó mới với Random Clues:**

Tất cả các độ khó đều có **khoảng random** số ô cho sẵn để tăng tính đa dạng:

| Mức độ | Số ô cho sẵn | Mô tả |
|--------|--------------|-------|
| Easy | 36-45 | Dễ dàng cho người mới |
| Medium | 32-35 | Thử thách vừa phải |
| Hard | 28-31 | Cần tư duy logic |
| Expert | 22-27 | Kỹ thuật nâng cao |
| Master | 17-21 | Cực kỳ khó |

**Cấu hình mới:**
```javascript
export const DIFFICULTY_LEVELS = {
    EASY: { 
        name: 'Dễ', 
        minClues: 36, 
        maxClues: 45 
    },
    MEDIUM: { 
        name: 'Trung Bình', 
        minClues: 32, 
        maxClues: 35 
    },
    HARD: { 
        name: 'Khó', 
        minClues: 28, 
        maxClues: 31 
    },
    EXPERT: { 
        name: 'Chuyên Gia', 
        minClues: 22, 
        maxClues: 27 
    },
    MASTER: { 
        name: 'Cực Khó', 
        minClues: 17, 
        maxClues: 21 
    }
};
```

**Logic tạo puzzle:**
```javascript
export function generateSudoku(difficulty = 'MEDIUM') {
    const difficultyConfig = DIFFICULTY_LEVELS[difficulty];
    
    // Random số ô cho sẵn trong khoảng min-max
    const cluesCount = Math.floor(
        Math.random() * (difficultyConfig.maxClues - difficultyConfig.minClues + 1)
    ) + difficultyConfig.minClues;
    
    // Tính số ô cần xóa
    const cellsToRemove = 81 - cluesCount;
    
    const completeBoard = generateCompleteBoard();
    const puzzle = createPuzzle(completeBoard, cellsToRemove);

    return {
        puzzle: puzzle.map(row => [...row]),
        solution: completeBoard.map(row => [...row]),
        difficulty,
        cluesCount // Số gợi ý ban đầu (đã random)
    };
}
```

### 2. Tính năng mới

#### Random Clues System
- **Tất cả độ khó** đều có khoảng random số ô cho sẵn
- Mỗi lần chơi game mới sẽ có số lượng clues khác nhau trong khoảng cho phép
- Tăng tính replay value - không có 2 game nào giống hệt nhau
- Vẫn đảm bảo puzzle có lời giải duy nhất

#### Lợi ích
- **Đa dạng hơn**: Mỗi game có độ khó hơi khác nhau
- **Thú vị hơn**: Người chơi không biết chính xác sẽ có bao nhiêu clues
- **Công bằng hơn**: Độ khó được phân bổ theo khoảng, không cố định

### 3. Cập nhật README.md

Đã cập nhật tài liệu để phản ánh hệ thống mới:
- Liệt kê khoảng clues cho mỗi độ khó
- Ghi chú về tính năng random
- Mô tả rõ ràng hơn về từng mức độ

## Cách sử dụng

1. Chọn độ khó bất kỳ trong game
2. Hệ thống sẽ tự động random số ô cho sẵn trong khoảng của độ khó đó
3. Mỗi lần chơi mới sẽ có trải nghiệm khác nhau

## Ví dụ

**Độ khó MASTER:**
- Lần 1: 17 clues (cực kỳ khó)
- Lần 2: 19 clues (khó)
- Lần 3: 21 clues (khó vừa)
- Lần 4: 18 clues (rất khó)

Tất cả đều là độ khó MASTER nhưng có sự đa dạng!

## Lưu ý kỹ thuật

- Thuật toán vẫn đảm bảo puzzle có **duy nhất một lời giải**
- Thời gian tạo puzzle có thể khác nhau tùy số clues
- Với ít clues hơn (MASTER, EXPERT), thời gian tạo có thể lâu hơn
- Hệ thống gợi ý thông minh vẫn hoạt động bình thường

## Kiểm tra

Để kiểm tra hệ thống mới:
1. Chạy game: `npm run dev`
2. Chọn một độ khó bất kỳ
3. Tạo nhiều game mới và quan sát số ô cho sẵn thay đổi
4. Kiểm tra trong console: `gameData.cluesCount`

---

**Tóm lại:** Tất cả các độ khó đã được cập nhật với hệ thống **Random Clues** - mỗi lần chơi sẽ có số lượng ô cho sẵn khác nhau trong khoảng quy định, tạo ra trải nghiệm đa dạng và thú vị hơn cho người chơi! 🎲🎯
