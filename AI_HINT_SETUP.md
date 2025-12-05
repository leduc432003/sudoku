# Hướng Dẫn Cài Đặt AI Hint với Gemini API

## 🤖 Tính năng AI Hint

AI Hint sử dụng Gemini AI của Google để cung cấp gợi ý thông minh cho Sudoku. Thay vì chỉ cho bạn đáp án, AI sẽ:
- Phân tích bảng Sudoku
- Giải thích kỹ thuật giải phù hợp
- Hướng dẫn bạn tư duy để tự giải quyết
- Khuyến khích và động viên

## 📝 Các bước cài đặt

### Bước 1: Lấy API Key

1. Truy cập [Google AI Studio](https://makersuite.google.com/app/apikey)
2. Đăng nhập bằng tài khoản Google của bạn
3. Click vào **"Create API Key"** hoặc **"Get API Key"**
4. Copy API key (dạng: `AIzaSy...`)

### Bước 2: Cấu hình API Key

1. Mở file `.env` trong thư mục gốc của project
2. Thay thế `your_api_key_here` bằng API key thật của bạn:

```env
VITE_GEMINI_API_KEY=AIzaSyXXXXXXXXXXXXXXXXXXXXXXXXXXXXXX
```

**LƯU Ý QUAN TRỌNG:**
- Không có dấu ngoặc kép `""` xung quanh API key
- Không có khoảng trắng trước hoặc sau dấu `=`
- API key phải bắt đầu bằng `AIzaSy`

### Bước 3: Khởi động lại Server

**Rất quan trọng:** Vite chỉ đọc file `.env` khi khởi động!

1. Dừng server hiện tại (Ctrl + C trong terminal)
2. Khởi động lại:
```bash
npm run dev
```

### Bước 4: Kiểm tra

1. Mở game trong trình duyệt
2. Click vào nút **"🤖 AI Gợi Ý"**
3. Nếu thành công, bạn sẽ thấy giao diện AI Hint
4. Nếu vẫn báo lỗi, kiểm tra lại các bước trên

## ❌ Xử lý lỗi thường gặp

### Lỗi: "Chưa cấu hình API Key"

**Nguyên nhân:**
- API key vẫn là `your_api_key_here`
- Chưa khởi động lại server sau khi thêm API key
- File `.env` không nằm đúng vị trí (phải ở thư mục gốc)

**Giải pháp:**
1. Kiểm tra file `.env` có đúng API key thật không
2. Dừng server (Ctrl + C)
3. Khởi động lại: `npm run dev`

### Lỗi: "Failed to fetch" hoặc "Network error"

**Nguyên nhân:**
- API key không hợp lệ
- Không có kết nối internet
- API key đã hết hạn hoặc bị vô hiệu hóa

**Giải pháp:**
1. Kiểm tra kết nối internet
2. Tạo API key mới từ Google AI Studio
3. Thay thế API key cũ bằng key mới
4. Khởi động lại server

### Lỗi: "Quota exceeded"

**Nguyên nhân:**
- Đã sử dụng hết quota miễn phí của Gemini API

**Giải pháp:**
- Đợi đến ngày mai (quota sẽ reset)
- Hoặc nâng cấp lên gói trả phí (nếu cần)

## 🔒 Bảo mật

**QUAN TRỌNG:**
- **KHÔNG** commit file `.env` lên Git
- File `.gitignore` đã được cấu hình để bỏ qua `.env`
- **KHÔNG** chia sẻ API key của bạn với người khác
- Nếu API key bị lộ, hãy vô hiệu hóa nó ngay và tạo key mới

## 💡 Sử dụng AI Hint

1. Click vào nút **"🤖 AI Gợi Ý"** trong game
2. Click **"✨ Nhận Gợi Ý AI"**
3. Đợi vài giây để AI phân tích
4. Đọc gợi ý và áp dụng vào game
5. Click **"🔄 Gợi Ý Khác"** nếu muốn gợi ý mới

## 📊 Giới hạn sử dụng

Gemini API miễn phí có giới hạn:
- **60 requests/phút**
- **1,500 requests/ngày**

Đủ để chơi Sudoku thoải mái! 🎉

## 🆘 Vẫn gặp vấn đề?

Nếu vẫn không hoạt động:

1. Kiểm tra console trong trình duyệt (F12 → Console)
2. Tìm lỗi liên quan đến "Gemini" hoặc "AI"
3. Đảm bảo file `.env` có format đúng:
   ```
   VITE_GEMINI_API_KEY=AIzaSyXXXXXXXXXXXXXXXXXXXXXXXXXXXXXX
   ```
4. Thử xóa thư mục `node_modules` và cài lại:
   ```bash
   rm -rf node_modules
   npm install
   npm run dev
   ```

## ✅ Checklist

- [ ] Đã lấy API key từ Google AI Studio
- [ ] Đã thêm API key vào file `.env`
- [ ] API key KHÔNG phải là `your_api_key_here`
- [ ] Đã khởi động lại server sau khi thêm API key
- [ ] File `.env` nằm ở thư mục gốc của project
- [ ] Đã kiểm tra console không có lỗi

---

**Chúc bạn chơi Sudoku vui vẻ với AI Hint! 🎮🤖**
