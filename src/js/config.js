/**
 * Application Configuration & Default Constants
 * Includes comprehensive Obsidian Flavored Markdown (OFM) sample document
 * with Mermaid diagrams and LaTeX KaTeX math equations.
 */

export const APP_CONFIG = {
    STORAGE_KEY: 'markdown_studio_content',
    WORDS_PER_MINUTE: 200,
    DEBOUNCE_DELAY_MS: 150,
    DEFAULT_SAMPLE: `---
aliases:
  - Obsidian Studio
  - OFM Viewer
tags:
  - obsidian
  - pkm/knowledge
  - dev/tools
  - math/latex
author: mjjyv
date: 2026-09-19
status: active
---

# 🚀 Obsidian Flavored Markdown (OFM) Studio

Chào mừng bạn đến với trình soạn thảo và xem trước Markdown chuẩn **Obsidian Flavored Markdown** hỗ trợ đầy đủ **Sơ đồ Mermaid** & **Toán học LaTeX KaTeX**!

---

## 📐 1. Công thức Toán học LaTeX (KaTeX)

Toán học nội dòng: Phương trình nổi tiếng $e^{2i\pi} = 1$ và hệ thức năng lượng $E = mc^2$.

Khối ma trận và tích phân phức tạp:

$$
\\begin{vmatrix}a & b\\\\
c & d
\\end{vmatrix}=ad-bc
$$

Phương trình tích phân phân phối chuẩn Gauss:

$$
\\int_{-\\infty}^{\\infty} e^{-x^2} dx = \\sqrt{\\pi}
$$

---

## 📊 2. Sơ đồ Trực quan hóa (Mermaid Diagrams)

### Biểu đồ Luồng Xử lý (Flowchart)

\`\`\`mermaid
graph TD
    A[Bắt đầu] --> B{Kiểm tra Cú pháp}
    B -->|Hợp lệ| C[Render KaTeX & Mermaid]
    B -->|Sai sót| D[Hiển thị Hộp cảnh báo]
    C --> E[Hiển thị Preview hoàn hảo]
\`\`\`

### Biểu đồ Tuần tự (Sequence Diagram)

\`\`\`mermaid
sequenceDiagram
    Alice->>+John: Chào John, bạn khỏe không?
    Alice->>+John: John, bạn có nghe thấy tôi nói không?
    John-->>-Alice: Chào Alice, tôi nghe rất rõ!
    John-->>-Alice: Tôi cảm thấy rất tuyệt vời!
\`\`\`

---

## 🎨 3. Hộp thông tin (Obsidian Callouts)

> [!tip] Mẹo hay (Foldable Callouts)
> Callouts hỗ trợ đầy đủ các loại bí danh như \`[!hint]\`, \`[!important]\`.

> [!faq]- Hộp thông tin có thể thu gọn được không?
> **Hoàn toàn được!** Khi thêm dấu trừ \`-\` vào sau tên callout (ví dụ \`[!faq]-\`), hộp sẽ mặc định được đóng lại và bạn có thể click vào thanh tiêu đề để mở rộng ra!

> [!success] Hoàn thành xuất sắc
> Đã xử lý trọn vẹn toàn bộ cú pháp Obsidian: Callouts, Properties, LaTeX Math và Mermaid!

---

## 💡 4. Điểm nhấn Cú pháp Khác

- **Tô sáng văn bản**: ==tô sáng văn bản màu vàng đặc trưng== hoặc ~~chữ gạch ngang~~.
- **Thẻ phân cấp (Tags)**: #obsidian #kien-thuc/ghi-chu #du-an/2026
- **Liên kết nội bộ (Wikilinks)**: [[life_obsidian_Advanced formatting syntax|Xem tài liệu nâng cao]]

%% Ghi chú riêng tư: Đoạn văn bản này nằm trong comment Obsidian nên sẽ bị ẩn hoàn toàn khi render %%
`
};
