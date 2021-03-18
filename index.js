const express = require("express");
const webpush = require("web-push");
const bodyParser = require("body-parser");
const path = require("path");

const app = express();

app.use(bodyParser.json());

app.use(express.static(path.join(__dirname, "client")));

// -> VAPID stands for Voluntary Application Server Identification
//   -> Article that discuses VAPID https://labs.bawi.io/web-push-notifications-through-vapid-method-7d4d6927a006
// -> Put these in Env variables if actually deploying a real thing.
const PUBLIC_VAPID_KEY = "BJrlA2dRpyhqzKPIkz4JWK_1GTMiXCz2u8-EY5YaBGdgC_Gr60y2--kfnvQg2wzqORVHqjks3fe6T3ZgHsUWVbA";
const PRIVATE_VAPID_KEY = "Tgc5Ld7gLwheGoBOjh52xBnl53ZyH8V78ZsvWJ_F5wA";

webpush.setVapidDetails("mailto:test@test.com", PUBLIC_VAPID_KEY, PRIVATE_VAPID_KEY);

// -> Subscription Route
app.post("/subscribe", (req, res) => {
  // -> Get pushSubscription object
  const subscription = req.body;

  // -> Send back a 201 status - Resource was successfully created
  res.status(201).json({});

  // -> Create payload
  const payload = JSON.stringify({ title: "Test push notification"});

  // -> Pass object into the sendNotification function
  webpush.sendNotification(subscription, payload).catch(err => console.log(err));
});

const port = 1234;

app.listen(port, () => console.log(`Server is live on port ${port}`));
