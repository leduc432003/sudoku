# ✅ ĐÃ CẬP NHẬT: Hướng Dẫn Sử Dụng AI Hint (SDK Mới)

## 🎉 Thay đổi mới nhất

Đã cập nhật lên **Google GenAI SDK mới** (`@google/genai`) theo hướng dẫn chính thức từ Google.

---

## 📝 Hướng Dẫn Cài Đặt (Đơn Giản)

### Bước 1: Lấy API Key

1. Truy cập: **https://aistudio.google.com/apikey**
2. Đăng nhập Google
3. Click **"Create API Key"**
4. Copy API key (dạng: `AIzaSy...`)

### Bước 2: Thêm API Key vào file `.env`

1. Mở file `.env` ở thư mục gốc project
2. Thay thế dòng:
   ```env
   VITE_GEMINI_API_KEY=your_api_key_here
   ```
   
   Thành:
   ```env
   VITE_GEMINI_API_KEY=AIzaSyXXXXXXXXXXXXXXXXXXXXXXXXXXXXXX
   ```
   *(Dán API key thật của bạn)*

3. **LƯU FILE** (Ctrl + S)

### Bước 3: Khởi Động Lại Server ⚠️

**QUAN TRỌNG:** Phải khởi động lại server!

1. Trong terminal, nhấn **Ctrl + C** để dừng
2. Chạy lại:
   ```bash
   npm run dev
   ```

### Bước 4: Kiểm Tra

1. Mở trình duyệt và nhấn **F12** (DevTools)
2. Vào tab **Console**
3. Refresh trang (F5)
4. Tìm dòng: `🔍 Gemini API Key Status:`

**Nếu thành công, bạn sẽ thấy:**
```
🔍 Gemini API Key Status: {
    exists: true,
    isDefault: false,
    length: 39,
    prefix: "AIzaSy..."
}
✅ Gemini AI initialized successfully!
```

**Nếu thất bại:**
```
⚠️ Gemini API key not configured
```
➡️ Kiểm tra lại Bước 2 và 3

---

## 🎮 Sử Dụng AI Hint

1. Click nút **"🤖 AI Gợi Ý"** trong game
2. Click **"✨ Nhận Gợi Ý AI"**
3. Đợi vài giây
4. Đọc gợi ý từ AI!

---

## ❓ Câu Hỏi Thường Gặp

### Q: Tôi đã thêm API key nhưng vẫn báo "Chưa cấu hình"?

**A:** Bạn chưa khởi động lại server! Hãy:
1. Dừng server (Ctrl + C)
2. Chạy lại: `npm run dev`
3. Refresh trình duyệt

### Q: Console hiển thị `exists: false`?

**A:** File `.env` không đúng vị trí hoặc chưa tồn tại. Đảm bảo:
```
sudoku-game/
├── .env          ← File phải ở đây!
├── package.json
├── src/
└── ...
```

### Q: Console hiển thị `isDefault: true`?

**A:** Bạn chưa thay thế `your_api_key_here` bằng API key thật!

### Q: Lỗi "Failed to fetch" hoặc "Network error"?

**A:** 
- Kiểm tra kết nối internet
- API key có thể không hợp lệ → Tạo key mới
- Kiểm tra quota (giới hạn miễn phí)

---

## 🔒 Bảo Mật

- ✅ File `.env` đã được thêm vào `.gitignore`
- ✅ API key KHÔNG được commit lên Git
- ⚠️ KHÔNG chia sẻ API key với người khác
- ⚠️ Nếu key bị lộ → Vô hiệu hóa và tạo key mới

---

## 📊 Giới Hạn Miễn Phí

Gemini API miễn phí:
- **15 requests/phút**
- **1,500 requests/ngày**

Đủ để chơi Sudoku thoải mái! 🎉

---

## 🆘 Vẫn Không Hoạt Động?

1. **Kiểm tra Console** (F12 → Console tab)
2. **Copy toàn bộ log** và gửi cho tôi
3. **Kiểm tra file `.env`**:
   - Có ở đúng vị trí?
   - API key có đúng format?
   - Đã lưu file chưa?
4. **Đã khởi động lại server chưa?**

---

## ✅ Checklist Cuối Cùng

- [ ] Đã lấy API key từ https://aistudio.google.com/apikey
- [ ] Đã mở file `.env` (không phải `.env.example`)
- [ ] Đã thay `your_api_key_here` bằng API key thật
- [ ] Đã LƯU file `.env`
- [ ] Đã KHỞI ĐỘNG LẠI server (Ctrl+C → npm run dev)
- [ ] Đã kiểm tra Console có log `✅ Gemini AI initialized`
- [ ] Đã test nút "🤖 AI Gợi Ý"

---

**Chúc bạn chơi Sudoku vui vẻ với AI! 🎮🤖✨**
