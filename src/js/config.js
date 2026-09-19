/**
 * Application Configuration & Default Constants
 * Includes comprehensive Obsidian Flavored Markdown (OFM) sample document.
 */

export const APP_CONFIG = {
    STORAGE_KEY: 'markdown_studio_content',
    WORDS_PER_MINUTE: 200,
    DEBOUNCE_DELAY_MS: 120,
    DEFAULT_SAMPLE: `---
aliases:
  - Obsidian Studio
  - OFM Viewer
tags:
  - obsidian
  - pkm/knowledge
  - dev/tools
author: mjjyv
date: 2026-09-19
status: active
---

# 🚀 Obsidian Flavored Markdown (OFM) Studio

Chào mừng bạn đến với trình soạn thảo và xem trước Markdown chuẩn **Obsidian Flavored Markdown**!

---

## 💡 Điểm nhấn Cú pháp Obsidian

### 1. Tô sáng văn bản (Highlight) & Gạch ngang
Bạn có thể dùng ==tô sáng văn bản màu vàng đặc trưng== như trong Obsidian hoặc ~~chữ gạch ngang~~ một cách dễ dàng.

### 2. Thẻ gắn (Tags & Nested Tags)
Hỗ trợ các thẻ phân cấp dạng cây: #obsidian #kien-thuc/ghi-chu #du-an/2026

### 3. Liên kết nội bộ (Wikilinks & Aliases)
- Liên kết trực tiếp: [[life_obsidian_Obsidian Flavored Markdown]]
- Liên kết với tên hiển thị tùy chỉnh: [[life_obsidian_syntax01|Hướng dẫn Callouts & Tags]]

---

## 🎨 Hộp thông tin (Obsidian Callouts)

> [!note] Ghi chú mặc định (Note)
> Đây là hộp thông báo cơ bản với icon note màu xanh dương.

> [!tip] Mẹo hay (Tip / Hint / Important)
> Callouts hỗ trợ đầy đủ các loại bí danh như \`[!hint]\`, \`[!important]\`.

> [!warning] Cảnh báo quan trọng (Warning / Caution)
> Hãy chú ý sao lưu dữ liệu trước khi thực hiện các thay đổi lớn!

> [!faq]- Hộp thông tin có thể thu gọn được không? (Foldable Callout)
> **Hoàn toàn được!** Khi thêm dấu trừ \`-\` vào sau tên callout (ví dụ \`[!faq]-\`), hộp sẽ mặc định được đóng lại và bạn có thể click vào thanh tiêu đề để mở rộng ra!

> [!success] Hoàn thành xuất sắc
> Đã xử lý trọn vẹn toàn bộ cú pháp Obsidian Flavored Markdown!

---

## 📊 Bảng dữ liệu & Danh sách việc (Task List)

- [x] Nhận diện và bóc tách YAML Properties widget
- [x] Hỗ trợ 13+ loại Callouts và Foldable Callout
- [x] Hỗ trợ Wikilinks \`[[...]]\` và Highlights \`==...==\`
- [ ] Chuyển đổi linh hoạt giữa Reading View và Live Preview

| Cú pháp Obsidian | Mô tả | Trạng thái hỗ trợ |
| :--- | :--- | :---: |
| \`--- properties ---\` | YAML Frontmatter | ✅ Sẵn sàng |
| \`> [!type]\` | Obsidian Callouts | ✅ Sẵn sàng |
| \`==highlight==\` | Tô màu chữ | ✅ Sẵn sàng |
| \`[[Link]]\` | Wikilinks nội bộ | ✅ Sẵn sàng |
| \`#tag/subtag\` | Nested Tags | ✅ Sẵn sàng |

%% Ghi chú riêng tư: Đoạn văn bản này nằm trong comment Obsidian nên sẽ bị ẩn hoàn toàn khi render %%
`
};
