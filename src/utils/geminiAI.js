// Khởi tạo Gemini AI với API key từ environment variable
const API_KEY = import.meta.env.VITE_GEMINI_API_KEY;
const MODEL_NAME = 'gemini-2.5-flash';
const API_URL = `https://generativelanguage.googleapis.com/v1beta/models/${MODEL_NAME}:generateContent`;

// Debug: Log API key status chi tiết
console.log('🔍 --- DEBUG AI CONFIG (FETCH MODE) ---');
console.log('📍 API URL:', API_URL);
console.log('📍 API Key Exists:', !!API_KEY);
console.log('📍 API Key Length:', API_KEY ? API_KEY.length : 0);
console.log('🔍 -----------------------');

// Kiểm tra AI có sẵn sàng không
export function initializeGeminiAI() {
    if (!API_KEY || API_KEY === 'your_api_key_here' || API_KEY.trim() === '') {
        console.warn('⚠️ Gemini API key not configured properly.');
        return false;
    }
    return true;
}

// Chuyển đổi board thành string
function boardToString(board) {
    let result = '';
    for (let i = 0; i < 9; i++) {
        if (i % 3 === 0 && i !== 0) {
            result += '------+-------+------\n';
        }
        for (let j = 0; j < 9; j++) {
            if (j % 3 === 0 && j !== 0) {
                result += '| ';
            }
            result += (board[i][j] === 0 ? '.' : board[i][j]) + ' ';
        }
        result += '\n';
    }
    return result;
}

// Hàm gọi API dùng fetch
async function callGeminiAPI(prompt) {
    if (!initializeGeminiAI()) {
        throw new Error('Gemini API key is missing. Please check .env file.');
    }

    console.log('🤖 Sending request to Gemini...');
    console.log('📝 Prompt:', prompt);

    try {
        const response = await fetch(API_URL, {
            method: 'POST',
            headers: {
                'x-goog-api-key': API_KEY,
                'Content-Type': 'application/json'
            },
            body: JSON.stringify({
                contents: [{
                    parts: [{
                        text: prompt
                    }]
                }]
            })
        });

        if (!response.ok) {
            const errorData = await response.json();
            console.error('❌ API Error:', errorData);
            throw new Error(errorData.error?.message || `HTTP Error: ${response.status}`);
        }

        const data = await response.json();
        console.log('✅ Response received:', data);

        const text = data.candidates?.[0]?.content?.parts?.[0]?.text;
        if (!text) {
            throw new Error('No text generated from AI');
        }

        return text;
    } catch (error) {
        console.error('❌ Fetch error:', error);
        throw error;
    }
}

// Lấy gợi ý từ Gemini AI
export async function getAIHint(board, difficulty) {
    const boardString = boardToString(board);

    const prompt = `Phân tích bảng Sudoku và đưa ra gợi ý:

${boardString}

Trả lời ngắn gọn theo format:
- Ô cần điền: Hàng X, Cột Y
- Số gợi ý: [số]
- Lý do: [giải thích ngắn 1 câu]

Chỉ trả lời 3 dòng trên, không giới thiệu thêm.`;

    try {
        const text = await callGeminiAPI(prompt);
        return {
            success: true,
            hint: text,
            technique: extractTechnique(text)
        };
    } catch (error) {
        return {
            success: false,
            error: error.message
        };
    }
}

// Trích xuất tên kỹ thuật
function extractTechnique(text) {
    const techniques = [
        'Naked Single', 'Hidden Single', 'Naked Pair', 'Hidden Pair',
        'Naked Triple', 'Hidden Triple', 'X-Wing', 'Swordfish',
        'Coloring', 'Forcing Chain'
    ];

    for (const technique of techniques) {
        if (text.includes(technique)) {
            return technique;
        }
    }
    return 'Gợi ý chung';
}

// Yêu cầu AI giải thích một nước đi
export async function explainMove(board, row, col, value) {
    const boardString = boardToString(board);

    const prompt = `Bảng Sudoku:

${boardString}

Kiểm tra: Điền số ${value} vào ô (${row + 1}, ${col + 1})

Trả lời ngắn gọn:
- Đúng/Sai: 
- Lý do: [1 câu]`;

    try {
        const text = await callGeminiAPI(prompt);
        return {
            success: true,
            explanation: text
        };
    } catch (error) {
        return {
            success: false,
            error: error.message
        };
    }
}

// Kiểm tra xem AI có sẵn sàng không
export function isAIAvailable() {
    const available = API_KEY && API_KEY !== 'your_api_key_here' && API_KEY.trim() !== '';
    return available;
}
