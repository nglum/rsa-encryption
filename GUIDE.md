# 📚 HƯỚNG DẪN CHI TIẾT - RSA Encryption

Tài liệu này dành cho **người dùng mới** muốn hiểu rõ cách sử dụng ứng dụng.

---

## 🎯 Mục Tiêu

Bạn sẽ học:
- ✅ Cách **mã hóa** tin nhắn/file an toàn
- ✅ Cách **giải mã** tin nhắn/file nhận được
- ✅ Cách **xác thực** người gửi là ai
- ✅ Cách **bảo vệ** dữ liệu bí mật

---

## 🚀 Bước 1: Cài Đặt & Chạy Server

### Yêu Cầu
- Node.js 14+ (tải từ https://nodejs.org/)
- Git (tải từ https://git-scm.com/)

### Cài Đặt

**1. Clone project:**
```bash
git clone https://github.com/nglum/rsa-encryption.git
cd rsa-encryption
```

**2. Cài dependencies:**
```bash
cd backend
npm install
```

**3. Chạy server:**
```bash
npm start
```

**Kết quả thành công:**
```
🚀 Server running at http://localhost:5000
✅ Keys generated for sender
✅ Keys generated for receiver
```

✅ **Server đã chạy! Đừng đóng terminal này.**

---

## 👥 2 Kịch Bản Sử Dụng

### Kịch Bản 1️⃣: Một máy tính, 2 người dùng

**Người Gửi:**
- Mở tab: http://localhost:5000/frontend/sender.html

**Người Nhận:**
- Mở tab khác: http://localhost:5000/frontend/receiver.html

---

### Kịch Bản 2️⃣: Hai máy tính khác nhau

**Máy 1 (Người Gửi):**
```
http://localhost:5000/frontend/sender.html
```

**Máy 2 (Người Nhận):**
```
http://<IP_máy_1>:5000/frontend/receiver.html

Ví dụ: http://192.168.1.100:5000/frontend/receiver.html
```

---

## 🟢 HƯỚNG DẪN: NGƯỜI GỬI

### 📝 Gửi Tin Nhắn Text

#### **Video hướng dẫn (các bước):**

```
1. Mở: http://localhost:5000/frontend/sender.html
   [Trang NGƯỜI GỬI]

2. Nhập tin nhắn vào ô "Tin nhắn"
   
   Ví dụ:
   ┌─────────────────────────────────────────┐
   │ Tin nhắn:                               │
   │ ┌─────────────────────────────────────┐ │
   │ │ Đây là tin nhắn bí mật của tôi     │ │
   │ └─────────────────────────────────────┘ │
   └─────────────────────────────────────────┘

3. Nhấn nút "🔒 Mã hóa"
   [Server mã hóa tin nhắn]

4. Kết quả xuất hiện:
   ┌─────────────────────────────────────────┐
   │ ✅ Mã hóa thành công                    │
   │                                         │
   │ Tin nhắn mã hóa:                        │
   │ ┌─────────────────────────────────────┐ │
   │ │ fQ7m8N9X2p3K4L5M6N7O8P9Q0...        │ │
   │ │ (dãy ký tự dài, không đọc được)    │ │
   │ └─────────────────────────────────────┘ │
   │                                         │
   │ Chữ ký:                                 │
   │ ┌─────────────────────────────────────┐ │
   │ │ abcd1234efgh5678ijkl9012...         │ │
   │ └─────────────────────────────────────┘ │
   │                                         │
   │ Người gửi: sender                       │
   │                                         │
   │ [📋 Copy để gửi]                        │
   └─────────────────────────────────────────┘

5. Nhấn "📋 Copy để gửi"
   [Dữ liệu được copy vào clipboard]

6. Gửi cho người nhận qua:
   - Email
   - Slack/Discord
   - Facebook Messenger
   - SMS
   - Hoặc bất kỳ phương tiện nào
```

---

#### **Lưu ý Quan Trọng:**

✅ **Gửi cả 3 thứ:**
1. Tin nhắn mã hóa
2. Chữ ký
3. Tên người gửi

❌ **KHÔNG:**
- Gửi chữ ký riêng lẻ
- Gửi tin nhắn gốc (nó đã được mã hóa)

---

### 📁 Gửi File

#### **Các bước:**

```
1. Mở: http://localhost:5000/frontend/sender.html

2. Kéo file vào ô "Chọn file"
   Hoặc nhấn "Chọn file" để chọn từ máy tính
   
   Các loại file hỗ trợ:
   - Văn bản: .txt, .doc, .docx, .pdf
   - Hình ảnh: .jpg, .png, .gif
   - Bảng tính: .xlsx, .csv
   - Bất kỳ file nào (dưới 50MB)

3. Nhấn "🔒 Mã hóa File"

4. Chờ kết quả:
   ┌─────────────────────────────────────────┐
   │ ✅ File mã hóa thành công               │
   │                                         │
   │ Tên file: report.pdf                    │
   │ File mã hóa: fQ7m8N9X2p3K4L5M...      │
   │ Chữ ký: abcd1234efgh5678ijkl...       │
   │ Người gửi: sender                       │
   └─────────────────────────────────────────┘

5. Copy toàn bộ kết quả (bao gồm tên file, 
   mã hóa, chữ ký)

6. Gửi cho người nhận qua email, upload, etc.
```

---

#### **Nâng cao:**

Bạn có thể gửi dữ liệu dưới dạng JSON:
```json
{
  "fileName": "report.pdf",
  "encrypted": "fQ7m8N9X2p3K4L5M...",
  "signature": "abcd1234efgh5678...",
  "senderName": "sender"
}
```

Lưu thành file `data.json` và gửi nó.

---

## 🟠 HƯỚNG DẪN: NGƯỜI NHẬN

### 📝 Nhận & Giải Mã Tin Nhắn Text

#### **Các bước:**

```
1. Mở: http://localhost:5000/frontend/receiver.html
   [Trang NGƯỜI NHẬN]

2. Nhận tin nhắn mã hóa từ người gửi
   (Từ email, chat, tin nhắn, etc.)

3. Dán "Tin nhắn mã hóa" vào ô thứ nhất:
   ┌─────────────────────────────────────────┐
   │ Tin nhắn mã hóa:                        │
   │ ┌─────────────────────────────────────┐ │
   │ │ fQ7m8N9X2p3K4L5M6N7O8P9Q0...        │ │
   │ └─────────────────────────────────────┘ │
   └─────────────────────────────────────────┘

4. Dán "Chữ ký" vào ô thứ hai:
   ┌─────────────────────────────────────────┐
   │ Chữ ký:                                 │
   │ ┌─────────────────────────────────────┐ │
   │ │ abcd1234efgh5678ijkl9012...         │ │
   │ └─────────────────────────────────────┘ │
   └─────────────────────────────────────────┘

5. Ô "Người gửi" tự động điền: sender
   (Không cần thay đổi)

6. Nhấn "🔓 Giải mã"

7. Kết quả:
   ┌─────────────────────────────────────────┐
   │ ✅ Chữ ký hợp lệ - Tin nhắn từ người   │
   │    gửi xác thực                         │
   │                                         │
   │ Tin nhắn gốc:                           │
   │ ┌─────────────────────────────────────┐ │
   │ │ Đây là tin nhắn bí mật của tôi     │ │
   │ └─────────────────────────────────────┘ │
   │                                         │
   │ Xác thực: ✅ Hợp lệ                    │
   │ (Tin nhắn không bị giả mạo)             │
   └─────────────────────────────────────────┘
```

---

#### **⚠️ Nếu Chữ Ký SAI:**

```
❌ Chữ ký không hợp lệ

Tin nhắn gốc:
[Trống hoặc lỗi]

Xác thực: ❌ Không hợp lệ
CẢNH BÁO: Tin nhắn có thể bị giả mạo!
```

**Nguyên nhân:**
- Chữ ký sai → Tin nhắn từ người khác
- Tin nhắn bị sửa đổi trong quá trình gửi
- Sử dụng khóa sai

**Giải pháp:**
- Hỏi lại người gửi để xác nhận
- Kiểm tra tin nhắn có bị thay đổi không

---

### 📁 Nhận & Giải Mã File

#### **Các bước:**

```
1. Mở: http://localhost:5000/frontend/receiver.html

2. Nhận dữ liệu file mã hóa từ người gửi
   (Có thể dạng JSON hoặc text)

3. Nếu là file JSON (ưu tiên):
   {
     "fileName": "report.pdf",
     "encrypted": "fQ7m8N9X2p3K4L5M...",
     "signature": "abcd1234efgh5678...",
     "senderName": "sender"
   }

4. Dán toàn bộ JSON vào ô "File mã hóa (JSON)":
   ┌─────────────────────────────────────────┐
   │ File mã hóa (JSON):                     │
   │ ┌─────────────────────────────────────┐ │
   │ │ {                                   │ │
   │ │   "fileName": "report.pdf",         │ │
   │ │   "encrypted": "fQ7m8N9X2p3K...",  │ │
   │ │   "signature": "abcd1234efgh...",  │ │
   │ │   "senderName": "sender"            │ │
   │ │ }                                   │ │
   │ └─────────────────────────────────────┘ │
   └─────────────────────────────────────────┘

5. Nhấn "🔓 Giải mã File"

6. Chờ kết quả:
   ┌─────────────────────────────────────────┐
   │ ✅ File được xác thực thành công       │
   │                                         │
   │ Tên file: report.pdf                    │
   │                                         │
   │ Nội dung file:                          │
   │ ┌─────────────────────────────────────┐ │
   │ │ [Nội dung file hiển thị ở đây]      │ │
   │ └────────���────────────────────────────┘ │
   │                                         │
   │ [📥 Tải file]                           │
   └─────────────────────────────────────────┘

7. Nhấn "📥 Tải file" để lưu file về máy tính
   [File sẽ tải vào thư mục "Downloads"]
```

---

#### **Cách Tải File:**

**Windows:**
- File xuất hiện ở: `C:\Users\[Tên User]\Downloads\`

**Mac:**
- File xuất hiện ở: `~/Downloads/`

**Linux:**
- File xuất hiện ở: `~/Downloads/`

---

## 🔐 Hiểu Về Mã Hóa RSA

### Chữ Ký Số Là Gì?

**Chữ ký số = Chứng minh thư ký**

Bình thường:
```
Bạn viết: "Tôi đồng ý"
Người khác: "Làm sao tôi biết là bạn viết?"
```

Với chữ ký số:
```
Bạn viết: "Tôi đồng ý"
Bạn ký: [Chữ ký]
Người khác: Kiểm tra chữ ký → ✅ "Chắc chắn là bạn!"
```

**3 tính chất của chữ ký số:**
1. ✅ **Xác thực:** Chắc chắn từ bạn
2. ✅ **Toàn vẹn:** Tin nhắn không bị thay đổi
3. ✅ **Từ chối không được:** Bạn không thể phủ nhận

---

### Cơ Chế Hoạt Động

#### **Người Gửi Mã Hóa:**

```
Bước 1: Viết tin nhắn
        └─ "Xin chào"

Bước 2: Mã hóa bằng khóa công khai của người nhận
        └─ Người nhận là người duy nhất có khóa riêng để giải
        └─ Kết quả: "fQ7m8N9X2p3K..."

Bước 3: Ký bằng khóa riêng của người gửi
        └─ Chứng minh: "Tôi là người gửi"
        └─ Kết quả: "abcd1234efgh..."

Bước 4: Gửi cả 2 thứ cho người nhận
        └─ Tin nhắn mã hóa + Chữ ký
```

#### **Người Nhận Giải Mã:**

```
Bước 1: Nhận tin nhắn mã hóa + Chữ ký

Bước 2: Dùng khóa riêng của mình để giải mã
        └─ Kết quả: "Xin chào"

Bước 3: Dùng khóa công khai của người gửi để kiểm tra chữ ký
        └─ ✅ Hợp lệ: Chắc chắn từ người gửi
        └─ ❌ Không hợp lệ: Bị giả mạo!

Bước 4: Đọc tin nhắn an toàn
```

---

## 🎓 Ví Dụ Thực Tế

### Tình Huống: Gửi Hợp Đồng

**NGƯỜI GỬI (Công ty A):**

```
Tôi có hợp đồng gửi cho Công ty B

Bước 1: Mở sender.html

Bước 2: Chọn file "hop_dong.pdf"

Bước 3: Nhấn "🔒 Mã hóa File"

Bước 4: Copy dữ liệu (encrypted + signature)

Bước 5: Gửi email cho Công ty B:
        
        Chủ đề: Hợp đồng hợp tác
        Nội dung: [Dán dữ liệu mã hóa]
```

---

**NGƯỜI NHẬN (Công ty B):**

```
Tôi nhận email với hợp đồng mã hóa

Bước 1: Mở receiver.html

Bước 2: Copy dữ liệu từ email

Bước 3: Dán vào "File mã hóa (JSON)"

Bước 4: Nhấn "🔓 Giải mã File"

Bước 5: Hệ thống tự động:
        ✅ Kiểm tra chữ ký (✅ Từ Công ty A)
        ✅ Xác thực file không bị sửa đổi
        ✅ Hiển thị hợp đồng gốc

Bước 6: Nhấn "📥 Tải file" để lưu

HOÀN THÀNH! Hợp đồng an toàn! ✅
```

---

## ❓ Các Câu Hỏi Thường Gặp

### Q: Nếu gửi trong cùng một mạng LAN?
**A:** Trên máy A chạy server:
```bash
npm start
# Kết quả: http://localhost:5000
```

Máy B truy cập:
```
http://<IP_máy_A>:5000/frontend/receiver.html
```

Tìm IP máy A:
- **Windows:** `ipconfig` → IPv4 Address
- **Mac/Linux:** `ifconfig` → inet

---

### Q: Nếu gửi qua internet?
**A:** Cần deploy server lên hosting:
- Heroku, Vercel, DigitalOcean, AWS, etc.

---

### Q: File gốc ở đâu sau khi mã hóa?
**A:** **Bị xóa!** Vì bảo mật tối đa.

```
Người Gửi chọn: report.pdf
      ↓
Mã hóa → report.pdf được xóa
      ↓
Chỉ còn: dữ liệu mã hóa
```

---

### Q: Có thể mã hóa 2 lần không?
**A:** Có, nhưng không cần thiết. RSA 2048-bit đã rất an toàn.

```
Tin nhắn
  ↓
[Mã hóa lần 1]
  ↓
[Mã hóa lần 2]
  ↓
Tin nhắn cực kỳ an toàn (nhưng chậm!)
```

---

### Q: Người thứ 3 có thể đọc được tin nhắn?
**A:** Không! Vì:
1. Tin nhắn mã hóa → Không đọc được
2. Chữ ký xác thực → Xác định người gửi thực

Nếu người thứ 3 cắt ngang:
```
Gốc: "Đóng cửa lúc 5h"
        ↓ [Bị sửa]
Giả: "Đóng cửa lúc 10h"
        ↓
Khi giải mã: ❌ Chữ ký sai! 
CẢNH BÁO: Tin nhắn bị thay đổi!
```

---

### Q: Nếu quên khóa private thì sao?
**A:** Không thể khôi phục! Cần tạo mới:

```bash
curl -X POST http://localhost:5000/api/generate-keys
```

⚠️ **Dữ liệu cũ mã hóa sẽ không giải được!**

---

## 📞 Cần Giúp Đỡ?

1. Kiểm tra server chạy chưa: http://localhost:5000
2. Xem console xem có lỗi gì
3. Tạo Issue trên GitHub

---

**Happy Secure Communicating! 🔐**
