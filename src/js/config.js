/**
 * Application Configuration & Default Constants
 */

export const APP_CONFIG = {
    STORAGE_KEY: 'markdown_studio_content',
    WORDS_PER_MINUTE: 200,
    DEBOUNCE_DELAY_MS: 120,
    DEFAULT_SAMPLE: `# Chào mừng bạn đến với Markdown Studio 🚀

**Markdown Studio** là trình xem và biên tập Markdown trực quan với hỗ trợ Live Preview thời gian thực.

---

## 💡 Tính năng nổi bật
- [x] Soạn thảo Markdown với bộ tô màu cú pháp (Syntax Highlighting).
- [x] Hỗ trợ bảng (GFM Table), danh sách việc cần làm (Task List).
- [x] Đồng bộ vị trí cuộn trang giữa Trình soạn thảo và Xem trước.
- [x] Tự động lưu nội dung vào **LocalStorage**.
- [x] Xuất tài liệu ra định dạng **.md** hoặc trang **HTML độc lập**.

---

## 💻 Đoạn mã minh họa (Code Highlight)

\`\`\`javascript
// Hàm tính giai thừa với JavaScript
function factorial(n) {
    if (n === 0 || n === 1) return 1;
    return n * factorial(n - 1);
}

console.log('5! =', factorial(5));
\`\`\`

---

## 📊 Bảng so sánh (GFM Table)

| Tính năng | Markdown Studio | Trình đọc thông thường |
| :--- | :---: | :---: |
| Xem trước thời gian thực | ✅ Có | ❌ Không |
| Tô màu cú pháp Code | ✅ Đầy đủ | ⚠️ Hạn chế |
| Đồng bộ cuộn | ✅ Mượt mà | ❌ Không |
| Xuất HTML đóng gói | ✅ 1-Click | ❌ Không |

---

> ❝ Sự đơn giản là đỉnh cao của sự tinh tế. ❞
> — *Leonardo da Vinci*
`
};
