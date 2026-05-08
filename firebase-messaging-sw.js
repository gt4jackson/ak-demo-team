// Firebase Cloud Messaging Service Worker — AK Adult Demo Team
importScripts('https://www.gstatic.com/firebasejs/10.12.0/firebase-app-compat.js');
importScripts('https://www.gstatic.com/firebasejs/10.12.0/firebase-messaging-compat.js');

firebase.initializeApp({
  apiKey: "AIzaSyCNYwrEPdlqZtBFIg68_pXoSfLCmmpMFI0",
  authDomain: "ak-newtown-demo.firebaseapp.com",
  projectId: "ak-newtown-demo",
  storageBucket: "ak-newtown-demo.firebasestorage.app",
  messagingSenderId: "437125936839",
  appId: "1:437125936839:web:7fe20565cf9c88a303b0e2"
});

const messaging = firebase.messaging();

messaging.onBackgroundMessage((payload) => {
  const notif = payload.notification || payload.data || {};
  self.registration.showNotification(notif.title || 'AK Demo Team', {
    body: notif.body || 'You have a new notification',
    icon: './icon-192.png',
    badge: './icon-192.png',
    data: payload.data || {}
  });
});

self.addEventListener('notificationclick', (e) => {
  e.notification.close();
  e.waitUntil(
    clients.matchAll({ type: 'window', includeUncontrolled: true }).then((clientList) => {
      for (const client of clientList) {
        if (client.url.includes(self.location.origin) && 'focus' in client) return client.focus();
      }
      return clients.openWindow('./');
    })
  );
});
