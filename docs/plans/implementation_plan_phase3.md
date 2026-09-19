# Kế Hoạch Triển Khai Giai Đoạn 3: Nền Tảng Điều Khiển & Giao Diện Chuẩn Obsidian (Command Palette, Outline TOC & Theme Engine)

Kế hoạch này xây dựng nền tảng cốt lõi cho trải nghiệm Obsidian nâng cao, tập trung vào 3 trụ cột vững chắc:
1. **Cửa Sổ Lệnh Nhanh (Command Palette - `Ctrl+P` / `Cmd+P`)**: Hệ thống thực thi lệnh thông minh không cần rời tay khỏi bàn phím.
2. **Bảng Mục Lục Tự Động (Outline / Table of Contents - TOC)**: Cây phân cấp tiêu đề động với khả năng click để cuộn mượt và highlight tiêu đề đang đọc.
3. **Bộ Quản Lý Giao Diện (Theme Engine - Obsidian Dark / Light)**: Hỗ trợ chuyển đổi theme toàn diện, lưu trạng thái vào `localStorage` và đồng bộ cùng các khối Code blocks, Callouts và Mermaid.

> [!NOTE]
> Tài liệu này được lưu vĩnh viễn tại `docs/plans/implementation_plan_phase3.md` để đảm bảo luồng công việc không bị thất lạc.

---

## 🏛️ 1. Thiết Kế Kiến Trúc Nền Tảng Giai Đoạn 3

```
src/js/
├── modules/
│   ├── command-palette.js   # Module quản lý Command Palette & Registry
│   ├── outline-toc.js       # Module trích xuất tiêu đề & Outline Tree
│   ├── theme-manager.js     # Module quản lý Theme (Dark/Light) & Biến CSS
│   ├── parser.js            # Pipeline Parser
│   ├── math-processor.js    # KaTeX Math
│   ├── diagram-processor.js # Mermaid Diagrams
│   └── obsidian-syntax.js   # Callouts, Properties, Wikilinks
└── app.js                   # Entry Point tích hợp
```

---

## 📋 2. Chi Tiết Các Thành Phần Triển Khai

### 2.1 Cửa Sổ Lệnh Thông Minh (Command Palette `Ctrl+P`)
- **Module `src/js/modules/command-palette.js`**:
  - Giao diện Modal nổi (Overlay Modal) xuất hiện khi nhấn `Ctrl+P` hoặc `Cmd+P` (hoặc nút bấm trên Header).
  - Thanh tìm kiếm mờ (Fuzzy Search Input) hỗ trợ gõ không dấu / có dấu tìm nhanh lệnh.
  - Hỗ trợ phím mũi tên `Up` / `Down` để duyệt danh sách lệnh và `Enter` để thực thi, `Esc` để đóng.
- **Danh mục Lệnh Tích Hợp (Command Registry)**:
  - *Chế độ xem*: Bật chế độ Song song (Dual), Chế độ Soạn thảo (Source), Chế độ Đọc (Reading View).
  - *Đổi Theme*: Chuyển sang Obsidian Dark Theme / Light Theme.
  - *Chèn Cú pháp*: Chèn Callout (chọn type: note, tip, warning,...), Chèn Bảng, Chèn Công thức Toán, Chèn Sơ đồ Mermaid, Chèn Wikilink.
  - *Tệp tin*: Mở nhanh tài liệu từ Vault `docs/`, Xuất HTML, Xuất Markdown, Copy HTML.
  - *Thanh bên*: Đóng/Mở Sidebar Vault, Đóng/Mở Outline TOC.

### 2.2 Bảng Mục Lục Tự Động (Outline Panel / TOC)
- **Module `src/js/modules/outline-toc.js`**:
  - Trích xuất tự động toàn bộ tiêu đề `# H1`, `## H2`, `### H3`, `#### H4` từ văn bản theo thời gian thực (Debounced).
  - Hiển thị cây thư mục phân cấp trực quan ở thanh bên phải (Collapsible Right Sidebar).
  - **Scroll Spy**: Tự động đánh dấu (Highlight) mục tiêu đề đang nằm trong tầm mắt khi cuộn khung Preview.
  - **Click to Navigate**: Nhấp vào tiêu đề trong Outline $\rightarrow$ Cuộn mượt (`scrollIntoView({ behavior: 'smooth' })`) cả bên Preview và Editor đến đúng vị trí.

### 2.3 Bộ Quản Lý Giao Diện (Theme Engine)
- **Module `src/js/modules/theme-manager.js`**:
  - Quản lý 2 bộ biến màu CSS hoàn chỉnh:
    - **Obsidian Dark (Mặc định)**: Nền tối `#0f172a`, chữ `#f8fafc`, code block `#0d1117`, tương phản cao.
    - **Obsidian Light**: Nền sáng `#ffffff` / `#f8fafc`, chữ `#0f172a`, thanh công cụ `#f1f5f9`, border `#e2e8f0`.
  - Tự động cập nhật lại giao diện Mermaid (`theme: 'dark'` / `theme: 'default'`) và bộ highlight code khi đổi theme.
  - Lưu trạng thái vào `localStorage('obsidian_theme')` để duy trì cài đặt của người dùng.

---

## 🧪 3. Kế Hoạch Kiểm Thử (Verification Plan)
- **Unit Tests**:
  - Viết bài test `tests/toc.test.js`: Kiểm thử thuật toán trích xuất tiêu đề H1-H6, tính toán cấp bậc thụt dòng và gán slug ID an toàn.
  - Đảm bảo `npm test` vượt qua 100% (tổng cộng $\ge$ 17 test cases).
- **Manual Verification**:
  - Thử nghiệm mở Command Palette bằng `Ctrl+P`, gõ lệnh tìm kiếm và chạy thử.
  - Thử nghiệm click tiêu đề trong Outline để cuộn đến phần nội dung tương ứng.
  - Đổi qua lại giữa Dark và Light theme kiểm tra độ tương phản.
- **Git Commit**:
  - Đóng gói toàn bộ tính năng Giai đoạn 3 vào **đúng 1 commit duy nhất** và push lên GitHub.
  - Tạo file lưu trữ `docs/plans/walkthrough_phase3.md`.
