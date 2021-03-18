const PUBLIC_VAPID_KEY = "BJrlA2dRpyhqzKPIkz4JWK_1GTMiXCz2u8-EY5YaBGdgC_Gr60y2--kfnvQg2wzqORVHqjks3fe6T3ZgHsUWVbA";

const urlBase64ToUint8Array = (base64String) => {
  const padding = '='.repeat((4 - base64String.length % 4) % 4);
  const base64 = (base64String + padding)
    .replace(/-/g, '+')
    .replace(/_/g, '/');

  const rawData = window.atob(base64);
  const outputArray = new Uint8Array(rawData.length);

  for (let i = 0; i < rawData.length; ++i) {
    outputArray[i] = rawData.charCodeAt(i);
  }
  return outputArray;
}

// -> Registers the service worker
// -> Registers the Push subscription
// -> Sends the Push subscription
const send = async () => {
  console.log("Registering service worker");
  const registeredSW = await navigator.serviceWorker.register("/worker.js", {
    scope: "/"
  });

  console.log("Service worker registered");

  console.log("Registering push");
  const subscription = registeredSW.pushManager.subscribe({
    userVisibleOnly: true,
    applicationServerKey: urlBase64ToUint8Array(PUBLIC_VAPID_KEY)
  });

  console.log("Push registered");

  console.log("Sending push");
  await fetch("/subscribe", {
    method: "POST",
    body: JSON.stringify(subscription),
    headers: {
      "content-type": "application/json"
    }
  });

  console.log("Push sent");
}

// -> Check for a service worker
if ("serviceWorker" in navigator) {
  send().catch(err => console.log(err));
}
