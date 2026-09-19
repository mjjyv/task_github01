# Lộ Trình Tổng Thể: Trải Nghiệm Chuẩn Obsidian (Obsidian-Flavored Markdown Studio)

Tài liệu này lưu trữ vĩnh viễn toàn bộ lộ trình 4 giai đoạn để biến Markdown Studio thành một ứng dụng có trải nghiệm và hỗ trợ 100% cú pháp như Obsidian, dựa trên toàn bộ 6 file tài liệu trong thư mục `docs/`.

---

## 🧭 Ma trận Cú pháp Obsidian Cần Xử lý Toàn Diện

| Nhóm tính năng | Chi tiết cú pháp | Mô tả hành vi chuẩn Obsidian | Trạng thái |
| :--- | :--- | :--- | :---: |
| **Frontmatter / Properties** | `--- \n tags: [...] \n ---` | Bóc tách YAML, hiển thị widget thuộc tính dạng Card ở đầu note | ✅ Đã xong (Giai đoạn 1) |
| **Callouts (13+ loại)** | `> [!tip]`, `> [!warning]` | Hỗ trợ 13+ loại callout, icon Lucide, màu sắc đặc trưng | ✅ Đã xong (Giai đoạn 1) |
| **Foldable Callouts** | `> [!faq]-`, `> [!faq]+` | Cho phép click tiêu đề để đóng/mở nội dung callout | ✅ Đã xong (Giai đoạn 1) |
| **Highlight & Strike** | `==Highlight==`, `~~Strike~~` | Nền vàng `<mark>`, chữ gạch ngang | ✅ Đã xong (Giai đoạn 1) |
| **Wikilinks & Aliases** | `[[Note]]`, `[[Note\|Alias]]` | Liên kết nội bộ, click mở trực tiếp file trong vault | ✅ Đã xong (Giai đoạn 1) |
| **Tags & Nested Tags** | `#tag`, `#nested/tag/sub` | Nhận diện tag hợp lệ, chuyển thành clickable tag | ✅ Đã xong (Giai đoạn 1) |
| **Comments** | `%%Comment%%` | Ẩn nội dung comment trong chế độ xem | ✅ Đã xong (Giai đoạn 1) |
| **Embeds (Images/Files)** | `![[image.png\|300]]` | Nhúng ảnh kèm kích thước chiều rộng | ✅ Đã xong (Giai đoạn 1) |
| **Interactive Tasks** | `- [ ]`, `- [x]` | Click checkbox trong Preview tự động cập nhật Editor | ✅ Đã xong (Giai đoạn 1) |
| **Split Resizer** | Kéo thả chia 2 khung | Điều chỉnh tỷ lệ 15% - 85%, lưu `localStorage` | ✅ Đã xong (Giai đoạn 1) |
| **Vault Sidebar Explorer**| Cột trái danh sách file | Nạp nhanh toàn bộ tài liệu trong `docs/`, tìm kiếm | ✅ Đã xong (Giai đoạn 1) |
| **Obsidian View Modes** | Dual, Source, Reading | Nút chuyển chế độ và phím tắt `Ctrl+E` | ✅ Đã xong (Giai đoạn 1) |
| **Biểu đồ Mermaid** | ```` ```mermaid ```` | Render biểu đồ flowcharts, sequence, Gantt, class diagram | ⏳ **Giai đoạn 2** |
| **Toán học LaTeX KaTeX** | `$inline$` và `$$block$$` | Render công thức toán học sắc nét không làm vỡ layout | ⏳ **Giai đoạn 2** |
| **Bảng Mục Lục (Outline/TOC)** | Tự động quét H1-H6 | Cây mục lục điều hướng nhanh tài liệu dài | ⏳ **Giai đoạn 3** |
| **Command Palette** | `Ctrl+P` / `Cmd+P` | Hộp tìm kiếm lệnh thông minh nổi giữa màn hình | ⏳ **Giai đoạn 3** |
| **Dark / Light Theme Switcher** | Giao diện sáng/tối | Chuyển đổi theme Obsidian Dark / Light | ⏳ **Giai đoạn 3** |
| **Quản lý Đa Tab (Multi-tabs)** | Mở nhiều note cùng lúc | Thanh tab bar phía trên editor | ⏳ **Giai đoạn 4** |
| **Footnotes & Block References** | `[^1]`, `^block-id` | Chú thích chân trang và liên kết đoạn | ⏳ **Giai đoạn 4** |

---

## 📋 Chi tiết Các Giai đoạn Kế tiếp

### 🚀 Giai đoạn 2: Trực quan hóa Biểu đồ Mermaid & Toán LaTeX KaTeX
- Tích hợp thư viện `mermaid.js` xử lý các khối code ```` ```mermaid ````.
- Tích hợp thư viện `katex.min.js` xử lý công thức toán `$E = mc^2$` và khối công thức `$$\int_0^\infty f(x)dx$$`.
- Đảm bảo tương thích hoàn toàn với các ví dụ thực tế trong file `life_obsidian_Advanced formatting syntax.md`.
- Viết unit tests kiểm thử và đóng gói **1 commit duy nhất**.

### 🚀 Giai đoạn 3: Cửa Sổ Lệnh Command Palette & Bảng Mục Lục Outline (TOC)
- **Command Palette (`Ctrl+P`)**: Cho phép gõ tìm lệnh nhanh (chèn callout, đổi theme, đổi view mode, xuất file, tải file vault,...).
- **Outline Panel (TOC)**: Cột mục lục tự động trích xuất các đề mục H1, H2, H3, click để cuộn mượt đến đoạn tương ứng.
- **Theme Switcher**: Chuyển đổi Dark / Light Theme chuẩn phong cách Obsidian.

### 🚀 Giai đoạn 4: Quản lý Đa Tab & Footnotes / Block References Hoàn Chỉnh
- Hỗ trợ thanh Tab bar mở nhiều file tài liệu đồng thời.
- Xử lý footnotes `[^1]` render ở cuối trang kèm nút backlink nhảy về vị trí chú thích.
- Đóng gói tài liệu và release v2.0.
