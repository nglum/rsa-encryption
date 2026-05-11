# 🔐 RSA Encryption Application

**An open-source web application for secure text and file encryption using RSA 2048-bit encryption with digital signatures.**

---

## ✨ Features

✅ **RSA 2048-bit Encryption** - Military-grade security  
✅ **Digital Signatures** - Authenticate sender identity  
✅ **Text Encryption** - Secure messaging  
✅ **File Encryption** - Encrypt any file type  
✅ **Web Interface** - Easy-to-use UI  
✅ **Auto Key Generation** - Generate RSA keys automatically  
✅ **Cross-Platform** - Works on Windows, Mac, Linux  
✅ **CORS Support** - Enable cross-domain requests  

---

## 📁 Project Structure

```
rsa-encryption/
├── server.js                 # Express API Server
├── package.json              # NPM dependencies
├── frontend/
│   ├── sender.html          # Sender interface
│   ├── receiver.html        # Receiver interface
│   └── styles.css           # CSS styles
├── keys/                     # Auto-generated RSA keys
│   ├── sender_public.pem
│   ├── sender_private.pem
│   ├── receiver_public.pem
│   └── receiver_private.pem
├── uploads/                  # File upload directory
└── GUIDE.md                 # Detailed user guide
```

---

## 🚀 Quick Start

### Prerequisites
- Node.js 14+ ([Download](https://nodejs.org/))
- Git ([Download](https://git-scm.com/))

### Installation

**1. Clone the repository:**
```bash
git clone https://github.com/nglum/rsa-encryption.git
cd rsa-encryption
```

**2. Install dependencies:**
```bash
npm install
```

**3. Start the server:**
```bash
npm start
```

**Output:**
```
🚀 Server running at http://localhost:5000
✅ Keys generated for sender
✅ Keys generated for receiver
```

### Usage

**Same Computer:**
- **Sender:** http://localhost:5000/frontend/sender.html
- **Receiver:** http://localhost:5000/frontend/receiver.html

**Different Computers:**
- **Sender:** http://localhost:5000/frontend/sender.html
- **Receiver:** http://<IP_ADDRESS>:5000/frontend/receiver.html

---

## 👥 User Guide

### 🟢 For Sender

#### Encrypt Text Message
1. Open sender page
2. Enter message in text area
3. Click "🔒 Mã hóa" button
4. Copy encrypted message + signature
5. Send to receiver via email, chat, etc.

#### Encrypt File
1. Open sender page
2. Select file to encrypt
3. Click "🔒 Mã hóa File" button
4. Copy encrypted data (JSON)
5. Send to receiver

### 🟠 For Receiver

#### Decrypt Text Message
1. Open receiver page
2. Paste encrypted message in first field
3. Paste signature in second field
4. Click "🔓 Giải mã" button
5. View original message + authentication status

#### Decrypt File
1. Open receiver page
2. Paste encrypted file (JSON) in field
3. Click "🔓 Giải mã File" button
4. Click "📥 Tải file" to download

---

## 🔐 API Endpoints

### Text Encryption
**POST** `/api/encrypt-text`
```json
Request:
{
  "text": "Your message",
  "recipientName": "receiver"
}

Response:
{
  "encrypted": "base64_encrypted_string",
  "signature": "base64_signature",
  "senderName": "sender"
}
```

### Text Decryption
**POST** `/api/decrypt-text`
```json
Request:
{
  "encrypted": "base64_encrypted_string",
  "signature": "base64_signature",
  "senderName": "sender"
}

Response:
{
  "decrypted": "Your message",
  "isValid": true,
  "message": "✅ Chữ ký hợp lệ..."
}
```

### File Encryption
**POST** `/api/encrypt-file` (multipart/form-data)
```
Response:
{
  "fileName": "document.pdf",
  "encrypted": "base64_encrypted_string",
  "signature": "base64_signature",
  "senderName": "sender"
}
```

### File Decryption
**POST** `/api/decrypt-file`
```json
Request:
{
  "encrypted": "base64_encrypted_string",
  "signature": "base64_signature",
  "senderName": "sender",
  "fileName": "document.pdf"
}

Response:
{
  "fileContent": "original_file_content",
  "fileName": "document.pdf",
  "message": "✅ File được xác thực..."
}
```

### Generate New Keys
**POST** `/api/generate-keys`
```json
Response:
{
  "message": "✅ Khóa mới được tạo thành công"
}
```

---

## 🔑 How It Works

### Encryption Process
1. **Sender writes message**
2. **Encrypt using receiver's public key** (only receiver can decrypt)
3. **Sign with sender's private key** (proves sender identity)
4. **Send encrypted message + signature**

### Decryption Process
1. **Receiver receives encrypted message + signature**
2. **Decrypt using receiver's private key**
3. **Verify signature using sender's public key**
4. **✅ Display original message if signature is valid**

---

## 🔒 Security Features

- ✅ **RSA 2048-bit encryption** - Industry standard
- ✅ **SHA256 digital signatures** - Verify authenticity
- ✅ **Private keys never transmitted** - Stays on server
- ✅ **Automatic key generation** - On first run
- ✅ **File auto-deletion** - Original files deleted after encryption

---

## ❓ FAQ

**Q: How secure is RSA 2048-bit?**
A: RSA 2048 is secure for most use cases. It would take thousands of years to crack.

**Q: Can I use on different computers?**
A: Yes! Deploy server to the cloud and use from anywhere.

**Q: What if I lose my private key?**
A: Generate new keys. Old encrypted data won't be recoverable.

**Q: Can I encrypt binary files?**
A: Currently supports text files. For binary, convert to base64.

**Q: Is there a file size limit?**
A: Currently 50MB limit (configurable in multer).

---

## 📚 Detailed Guide

For step-by-step instructions with examples, see **[GUIDE.md](GUIDE.md)**

---

## 🤝 Contributing

Contributions welcome! Please:
1. Fork the repository
2. Create feature branch
3. Submit pull request

---

## 📄 License

MIT License - Feel free to use in your projects

---

## 📞 Support

Create an issue on GitHub or email for support.

---

**Happy Secure Communicating! 🔐**
