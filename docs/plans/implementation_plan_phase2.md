# Kế Hoạch Triển Khai Giai Đoạn 2: Trực Quan Hóa Sơ Đồ Mermaid & Toán LaTeX KaTeX

Kế hoạch này mở rộng khả năng hiển thị của **Obsidian Studio** với 2 trụ cột trực quan quan trọng nhất theo đúng tài liệu `life_obsidian_Advanced formatting syntax.md`:
1. **Sơ đồ & Biểu đồ Mermaid** (`mermaid.js`): Flowcharts, Sequence Diagrams, Timelines, Class Diagrams.
2. **Công thức Toán học LaTeX KaTeX** (`katex.min.js`): Toán nội dòng `$E = mc^2$` và khối phương trình toán `$$\begin{vmatrix}a & b\\c & d\end{vmatrix}=ad-bc$$`.

> [!NOTE]
> File này cũng được lưu trữ vĩnh viễn tại `docs/plans/implementation_plan_phase2.md` để không bao giờ bị thất lạc qua các lượt prompt.

---

## 🏗️ 1. Phân Tích Kỹ Thuật

### A. Công thức Toán học LaTeX (KaTeX)
- **Cú pháp trong tài liệu Obsidian**:
  - Toán nội dòng (Inline): `$formula$` (ví dụ: `$e^{2i\pi} = 1$`).
  - Khối toán học (Block / Display): `$$\nformula\n$$`.
- **Thách thức**:
  - Nếu đưa `$` trực tiếp vào parser Markdown (`marked.js`), các ký tự toán học như `_` (chỉ số dưới $x_1$), `*` (dấu nhân $a * b$) hoặc `\` (ký hiệu lệnh `\frac`) sẽ bị hiểu nhầm là cú pháp in nghiêng, in đậm hoặc escape markdown.
- **Giải pháp**:
  - Tạo module `src/js/modules/math-processor.js`.
  - Tiền xử lý (Pre-process): Bóc tách các công thức `$inline$` và `$$block$$` thành các token placeholder (ví dụ: `%%KATEX_BLOCK_0%%`, `%%KATEX_INLINE_1%%`).
  - Hậu xử lý (Post-process): Render bằng `katex.renderToString(...)` với chế độ `displayMode: true/false` và thay thế token vào HTML trước khi hiển thị.
  - Tích hợp KaTeX CSS từ CDN để hiển thị font toán học chuẩn xác, sắc nét.

### B. Sơ đồ Biểu đồ Mermaid (Mermaid.js)
- **Cú pháp trong tài liệu Obsidian**:
  ````md
  ```mermaid
  sequenceDiagram
      Alice->>+John: Hello John, how are you?
      John-->>-Alice: Hi Alice, I can hear you!
  ```
  ````
- **Giải pháp**:
  - Tạo module `src/js/modules/diagram-processor.js`.
  - Tích hợp thư viện `mermaid.min.js`.
  - Tự động phát hiện các khối `<pre><code class="language-mermaid">` hoặc mã nguồn `mermaid` sinh ra từ parser.
  - Sử dụng API bất đồng bộ `mermaid.render()` để vẽ SVG đồ họa mượt mà, hỗ trợ dark/light theme linh hoạt.
  - Bắt lỗi cú pháp vẽ sơ đồ hiển thị thân thiện, không làm sập giao diện.

---

## 📋 2. Các Bước Triển Khai Chi Tiết

1. **Nạp Thư viện vào `index.html`**:
   - Thêm KaTeX CSS & JS (`katex.min.css`, `katex.min.js`).
   - Thêm Mermaid JS (`mermaid.min.js`).
   - Thêm nút công cụ mới trên Toolbar: `📐 Toán` (`$$...$$`), `📊 Sơ đồ` (```` ```mermaid ````).
2. **Xây dựng Module Xử lý**:
   - [NEW] `src/js/modules/math-processor.js`: Trích xuất và render KaTeX an toàn.
   - [NEW] `src/js/modules/diagram-processor.js`: Khởi tạo và render Mermaid SVG.
   - [MODIFY] `src/js/modules/parser.js`: Kết hợp luồng xử lý toán và biểu đồ vào pipeline chính.
   - [MODIFY] `src/js/modules/toolbar.js`: Bổ sung phím tắt chèn công thức và biểu đồ.
3. **Bộ Kiểm Thử Tự Động (Unit Tests)**:
   - [NEW] `tests/math.test.js`: Kiểm thử bóc tách toán inline/block và xử lý token placeholder.
   - Đảm bảo `npm test` vượt qua 100% (Node LTS test runner).
4. **Đóng Gói & Lưu Trữ Lịch Sử**:
   - Tạo file lưu trữ `docs/plans/walkthrough_phase2.md` song song với `walkthrough.md`.
   - Thực hiện **đúng 1 commit duy nhất** và push lên nhánh `main` của GitHub.
