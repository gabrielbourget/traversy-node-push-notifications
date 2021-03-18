console.log("Service worker loaded");

const self = this;

self.addEventListener("push", (e) => {
  const data = e.data.json();
  console.log("Push received");
  self.registration.showNotification(data.title, {
    body: "Notified by GB",
    icon: "https://www.google.com/url?sa=i&url=https%3A%2F%2Ffreeicons.io%2Fmaterial-icons-social-3%2Fnotifications-icon-16784&psig=AOvVaw0EGMFzdlButtGu1qcXWZju&ust=1616183194966000&source=images&cd=vfe&ved=0CAIQjRxqFwoTCND3-NzNuu8CFQAAAAAdAAAAABAD",
  });
});