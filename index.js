const admin = require("firebase-admin");
const express = require("express");
const app = express();

app.use(express.json());

// تحميل ملف المفتاح الخاص بك
const serviceAccount = require("./serviceAccountKey.json");

admin.initializeApp({
  credential: admin.credential.cert(serviceAccount)
});

// مسار استقبال وإرسال الإشارة مع صورة الشارت
app.post("/send-alert", async (req, res) => {
  const { title, body, imageUrl } = req.body;

  const message = {
    notification: {
      title: title || "TrendAlert Pro",
      body: body || "إشارة جديدة - Break & Retest",
      image: imageUrl || ""
    },
    data: {
      title: title || "TrendAlert Pro",
      body: body || "إشارة جديدة - Break & Retest",
      imageURL: imageUrl || ""
    },
    topic: "all" // إرسال لجميع المشتركين في التطبيق
  };

  try {
    const response = await admin.messaging().send(message);
    res.status(200).send({ success: true, response });
  } catch (error) {
    res.status(500).send({ success: false, error: error.message });
  }
});

const PORT = process.env.PORT || 3000;
app.listen(PORT, () => {
  console.log(Server running on port ${PORT});
});