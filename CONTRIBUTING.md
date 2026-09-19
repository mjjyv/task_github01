# Hướng dẫn Đóng góp (Contributing Guide)

Cảm ơn bạn đã quan tâm đến việc phát triển **Markdown Studio**! Dưới đây là hướng dẫn giúp bạn tham gia đóng góp cho dự án một cách hiệu quả và đúng chuẩn.

---

## 🚀 Quy trình Phát triển

1. **Fork** repository về tài khoản GitHub của bạn.
2. Clone repository về máy cá nhân:
   ```bash
   git clone git@github.com:mjjyv/task_github01.git
   cd task_github01
   ```
3. Tạo nhánh tính năng mới theo quy chuẩn đặt tên:
   - Tính năng mới: `feature/ten-tinh-nang`
   - Sửa lỗi: `fix/ten-loi`
   - Tài liệu: `docs/noi-dung-sua`
   ```bash
   git checkout -b feature/awesome-new-tool
   ```
4. Thực hiện chỉnh sửa mã nguồn tuân theo kiến trúc module trong thư mục `src/`.

---

## 🧪 Kiểm thử bắt buộc (Testing)

Trước khi gửi Pull Request hoặc commit mã nguồn, bạn phải chạy và đảm bảo vượt qua toàn bộ unit test:
```bash
npm test
```

---

## 📝 Quy chuẩn Commit Message

Dự án áp dụng chuẩn **Conventional Commits**:
- `feat:` Thêm tính năng mới.
- `fix:` Sửa lỗi.
- `docs:` Thay đổi tài liệu hướng dẫn.
- `refactor:` Tái cấu trúc mã nguồn nhưng không đổi tính năng.
- `test:` Bổ sung hoặc cập nhật bộ kiểm thử.
- `ci:` Thay đổi cấu hình CI/CD GitHub Actions.

---

## 📬 Gửi Pull Request (PR)

- Đảm bảo nhánh của bạn đã đồng bộ mới nhất với nhánh `main`.
- Mô tả rõ ràng mục đích của PR và các thay đổi đã thực hiện.
- Hệ thống CI trên GitHub sẽ tự động chạy kiểm thử trên các phiên bản Node.js để kiểm tra tính toàn vẹn.
