const express = require('express');
const crypto = require('crypto');
const fs = require('fs');
const path = require('path');
const multer = require('multer');
const cors = require('cors');

const app = express();
const PORT = 5000;

// Middleware
app.use(cors());
app.use(express.json({ limit: '50mb' }));
app.use(express.static(path.join(__dirname)));

// Multer setup for file uploads
const storage = multer.diskStorage({
  destination: (req, file, cb) => {
    const uploadDir = path.join(__dirname, 'uploads');
    if (!fs.existsSync(uploadDir)) {
      fs.mkdirSync(uploadDir);
    }
    cb(null, uploadDir);
  },
  filename: (req, file, cb) => {
    cb(null, `${Date.now()}-${file.originalname}`);
  }
});
const upload = multer({ storage });

// Keys directory
const keysDir = path.join(__dirname, 'keys');
if (!fs.existsSync(keysDir)) {
  fs.mkdirSync(keysDir);
}

// ============= KEY GENERATION =============
function generateKeys(name) {
  const { publicKey, privateKey } = crypto.generateKeyPairSync('rsa', {
    modulusLength: 2048,
  });

  const publicKeyPath = path.join(keysDir, `${name}_public.pem`);
  const privateKeyPath = path.join(keysDir, `${name}_private.pem`);

  fs.writeFileSync(publicKeyPath, crypto.createPublicKey(publicKey).export({ format: 'pem', type: 'spki' }));
  fs.writeFileSync(privateKeyPath, crypto.createPrivateKey(privateKey).export({ format: 'pem', type: 'pkcs8' }));

  console.log(`✅ Keys generated for ${name}`);
}

// Generate keys if they don't exist
['sender', 'receiver'].forEach(name => {
  const publicKeyPath = path.join(keysDir, `${name}_public.pem`);
  if (!fs.existsSync(publicKeyPath)) {
    generateKeys(name);
  }
});

// ============= HELPER FUNCTIONS =============
function loadPublicKey(name) {
  const publicKeyPath = path.join(keysDir, `${name}_public.pem`);
  return fs.readFileSync(publicKeyPath, 'utf8');
}

function loadPrivateKey(name) {
  const privateKeyPath = path.join(keysDir, `${name}_private.pem`);
  return fs.readFileSync(privateKeyPath, 'utf8');
}

function encryptData(data, publicKeyPem) {
  const buffer = Buffer.from(data, 'utf8');
  const encrypted = crypto.publicEncrypt(publicKeyPem, buffer);
  return encrypted.toString('base64');
}

function decryptData(encryptedData, privateKeyPem) {
  const buffer = Buffer.from(encryptedData, 'base64');
  const decrypted = crypto.privateDecrypt(privateKeyPem, buffer);
  return decrypted.toString('utf8');
}

function signData(data, privateKeyPem) {
  const sign = crypto.createSign('SHA256');
  sign.update(data);
  return sign.sign(privateKeyPem, 'base64');
}

function verifySignature(data, signature, publicKeyPem) {
  const verify = crypto.createVerify('SHA256');
  verify.update(data);
  return verify.verify(publicKeyPem, Buffer.from(signature, 'base64'));
}

// ============= ROUTES =============

// 📋 Get public keys
app.get('/api/public-key/:user', (req, res) => {
  try {
    const publicKey = loadPublicKey(req.params.user);
    res.json({ publicKey });
  } catch (error) {
    res.status(500).json({ error: error.message });
  }
});

// 📤 Encrypt text (for sender)
app.post('/api/encrypt-text', (req, res) => {
  try {
    const { text, recipientName } = req.body;
    const receiverPublicKey = loadPublicKey(recipientName);
    const encrypted = encryptData(text, receiverPublicKey);
    const senderPrivateKey = loadPrivateKey('sender');
    const signature = signData(text, senderPrivateKey);

    res.json({
      encrypted,
      signature,
      senderName: 'sender'
    });
  } catch (error) {
    res.status(500).json({ error: error.message });
  }
});

// 📥 Decrypt text (for receiver)
app.post('/api/decrypt-text', (req, res) => {
  try {
    const { encrypted, signature, senderName } = req.body;
    const receiverPrivateKey = loadPrivateKey('receiver');
    const decrypted = decryptData(encrypted, receiverPrivateKey);
    const senderPublicKey = loadPublicKey(senderName);
    const isValid = verifySignature(decrypted, signature, senderPublicKey);

    res.json({
      decrypted,
      isValid,
      message: isValid ? '✅ Chữ ký hợp lệ - Tin nhắn từ người gửi xác thực' : '❌ Chữ ký không hợp lệ'
    });
  } catch (error) {
    res.status(500).json({ error: error.message });
  }
});

// 📁 Encrypt file (for sender)
app.post('/api/encrypt-file', upload.single('file'), (req, res) => {
  try {
    const filePath = req.file.path;
    const fileData = fs.readFileSync(filePath, 'utf8');
    const receiverPublicKey = loadPublicKey('receiver');
    const encrypted = encryptData(fileData, receiverPublicKey);
    const senderPrivateKey = loadPrivateKey('sender');
    const signature = signData(fileData, senderPrivateKey);

    fs.unlinkSync(filePath); // Delete original file

    res.json({
      fileName: req.file.originalname,
      encrypted,
      signature,
      senderName: 'sender'
    });
  } catch (error) {
    res.status(500).json({ error: error.message });
  }
});

// 📁 Decrypt file (for receiver)
app.post('/api/decrypt-file', (req, res) => {
  try {
    const { encrypted, signature, senderName, fileName } = req.body;
    const receiverPrivateKey = loadPrivateKey('receiver');
    const decrypted = decryptData(encrypted, receiverPrivateKey);
    const senderPublicKey = loadPublicKey(senderName);
    const isValid = verifySignature(decrypted, signature, senderPublicKey);

    if (!isValid) {
      return res.status(400).json({ error: 'Chữ ký không hợp lệ' });
    }

    res.json({
      fileContent: decrypted,
      fileName: fileName,
      message: '✅ File được xác thực thành công'
    });
  } catch (error) {
    res.status(500).json({ error: error.message });
  }
});

// 🔐 Generate new keys (admin only)
app.post('/api/generate-keys', (req, res) => {
  try {
    generateKeys('sender');
    generateKeys('receiver');
    res.json({ message: '✅ Khóa mới được tạo thành công' });
  } catch (error) {
    res.status(500).json({ error: error.message });
  }
});

app.listen(PORT, () => {
  console.log(`🚀 Server running at http://localhost:${PORT}`);
});
