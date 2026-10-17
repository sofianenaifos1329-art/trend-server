const express = require('express');
const admin = require('firebase-admin');
const app = express();

app.use(express.json());

const serviceAccount = require("./serviceAccountKey.json");

admin.initializeApp({
  credential: admin.credential.cert(serviceAccount)
});

app.post('/send-notification', async (req, res) => {
    const { token, title, body, imageUrl } = req.body;

    const message = {
        notification: {
            title: title,
            body: body,
            image: imageUrl
        },
        token: token
    };

    try {
        const response = await admin.messaging().send(message);
        res.status(200).send('Notification sent successfully: ' + response);
    } catch (error) {
        res.status(500).send('Error sending notification: ' + error);
    }
});

const PORT = process.env.PORT || 3000;
app.listen(PORT, () => {
    console.log("Server is running on port " + PORT);
});

