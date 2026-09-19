# 📝 Markdown Studio & Live Viewer

> Trình soạn thảo và hiển thị Markdown trực quan thời gian thực (Real-time Markdown Editor & Viewer) với giao diện Dark/Light hiện đại, bộ công cụ định dạng phong phú và khả năng xuất tài liệu đa định dạng.

Repository: [github.com/mjjyv/task_github01](https://github.com/mjjyv/task_github01)

---

## ✨ Tính năng nổi bật

- **⚡ Xem trước thời gian thực (Live Preview):** Soạn thảo đến đâu, kết quả HTML hiển thị ngay lập tức với cơ chế debounce mượt mà.
- **🎨 Tô màu cú pháp Code (Syntax Highlighting):** Tích hợp `highlight.js` hỗ trợ tự động nhận diện và tô màu mã nguồn (JavaScript, Python, C++, HTML, CSS, JSON, Bash,...).
- **📜 Đồng bộ cuộn trang (Synchronized Scrolling):** Cuộn bên khung soạn thảo thì khung xem trước sẽ tự động cuộn theo tương ứng theo tỷ lệ phần trăm.
- **🛠️ Thanh công cụ trực quan (Formatting Toolbar):** 
  - Định dạng cơ bản: In đậm (`**`), In nghiêng (`*`), Gạch ngang (`~~`), Tiêu đề (H1, H2, H3).
  - Khối nội dung: Trích dẫn (`>`), Khối mã (\`\`\`), Chèn Link (`[]()`), Chèn hình ảnh (`![]()`).
  - Cấu trúc: Danh sách chấm, Danh sách số, Task list (`- [x]`), Bảng biểu GFM Table.
- **📊 Thống kê văn bản trực tiếp:** Đếm số từ, số ký tự và tính toán thời gian đọc ước tính (~200 từ/phút).
- **💾 Tự động lưu trữ (Auto-Save):** Tự động đồng bộ nội dung vào `localStorage` của trình duyệt, không bao giờ lo mất dữ liệu khi vô tình đóng tab hoặc tải lại trang.
- **📤 Xuất dữ liệu đa năng:**
  - Tải về file Markdown (`.md`).
  - Xuất ra trang HTML độc lập (`.html`) có đóng gói sẵn CSS để xem offline hoặc chia sẻ.
  - Sao chép nhanh mã HTML đã render vào Clipboard chỉ với 1 click.
- **🛡️ An toàn bảo mật:** Tích hợp `DOMPurify` giúp lọc và ngăn chặn triệt để các nguy cơ tấn công XSS khi render mã HTML.

---

## 🚀 Hướng dẫn sử dụng

### 1. Xem trực tiếp không cần cài đặt
Chỉ cần mở file `index.html` bằng bất kỳ trình duyệt web nào (Google Chrome, Firefox, Edge, Safari,...).

### 2. Chạy với Local Server (Khuyên dùng)
Nếu bạn có cài đặt `npx` hoặc `python`:
```bash
# Sử dụng Python 3
python3 -m http.server 3000

# Hoặc dùng Node / npx
npx serve .
```
Truy cập: `http://localhost:3000`

---

## 🌳 Cấu trúc Git Branch của Dự án

Dự án được xây dựng và phát triển theo mô hình nhánh tính năng (Feature Branching Workflow):
- `main`: Nhánh chính ổn định, sẵn sàng sản phẩm.
- `feature/ui-layout`: Thiết kế giao diện Dual-Pane (Editor vs Preview) và hệ thống nút công cụ Toolbar.
- `feature/markdown-engine`: Tích hợp bộ máy parser `marked.js`, `highlight.js` và tính năng thống kê từ/ký tự.
- `feature/advanced-tools`: Bổ sung tính năng đồng bộ cuộn, xuất file `.md` / `.html`, template mẫu và lưu `localStorage`.

---

## 🛠️ Công nghệ sử dụng
- **HTML5 & Modern CSS3** (CSS Grid, Flexbox, Custom Scrollbars, CSS Variables).
- **Vanilla JavaScript (ES6+)** - Không phụ thuộc framework cồng kềnh.
- **[marked.js](https://marked.js.org/)** - Thư viện chuyển đổi Markdown sang HTML tốc độ cao.
- **[highlight.js](https://highlightjs.org/)** - Tô màu cú pháp mã nguồn.
- **[DOMPurify](https://github.com/cure53/DOMPurify)** - Sanitizer chống XSS chuẩn công nghiệp.
