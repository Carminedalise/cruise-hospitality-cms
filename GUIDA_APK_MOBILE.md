# 📱 Guida Conversione APK - App Mobile Android

## Opzioni per Creare l'App Mobile

### Opzione 1: Progressive Web App (PWA) - Più Veloce ⚡

**Vantaggi**:
- ✅ Installabile su Android/iOS
- ✅ Aggiornamenti automatici
- ✅ Nessun app store necessario
- ✅ Stesso codice React

**Passaggi**:

#### 1. Aggiungi Manifest

Crea `/app/frontend/public/manifest.json`:
```json
{
  "short_name": "Cruise CMS",
  "name": "Cruise Ship Hospitality CMS",
  "description": "Sistema CMS per hospitality desk navi da crociera",
  "icons": [
    {
      "src": "icon-192.png",
      "sizes": "192x192",
      "type": "image/png"
    },
    {
      "src": "icon-512.png",
      "sizes": "512x512",
      "type": "image/png"
    }
  ],
  "start_url": "/",
  "display": "standalone",
  "theme_color": "#020617",
  "background_color": "#020617",
  "orientation": "portrait"
}
```

#### 2. Aggiungi Service Worker

Crea `/app/frontend/public/service-worker.js`:
```javascript
self.addEventListener('install', (event) => {
  event.waitUntil(
    caches.open('cruise-cms-v1').then((cache) => {
      return cache.addAll([
        '/',
        '/index.html',
        '/static/css/main.css',
        '/static/js/main.js',
      ]);
    })
  );
});

self.addEventListener('fetch', (event) => {
  event.respondWith(
    caches.match(event.request).then((response) => {
      return response || fetch(event.request);
    })
  );
});
```

#### 3. Registra Service Worker

In `/app/frontend/src/index.js`:
```javascript
if ('serviceWorker' in navigator) {
  window.addEventListener('load', () => {
    navigator.serviceWorker.register('/service-worker.js');
  });
}
```

#### 4. Installa su Android

1. Apri il sito sul browser Chrome Android
2. Menù → "Aggiungi a schermata Home"
3. L'app si installerà come app nativa!

---

### Opzione 2: React Native con Expo - App Nativa Completa 🚀

**Vantaggi**:
- ✅ Performance native
- ✅ Accesso completo API device
- ✅ Pubblicabile su Play Store/App Store

**Passaggi**:

#### 1. Installa Expo
```bash
npm install -g expo-cli
cd /app
expo init cruise-mobile-app
cd cruise-mobile-app
```

#### 2. Converti Componenti React

Da:
```jsx
import { Button } from '@/components/ui/button';
```

A:
```jsx
import { Button, View, Text } from 'react-native';
```

#### 3. Adatta Navigation
```bash
npm install @react-navigation/native
npm install @react-navigation/native-stack
```

#### 4. Build APK
```bash
expo build:android
```

Ottieni file `.apk` da distribuire!

---

### Opzione 3: Capacitor - Converti React Web in APK 🔌

**Vantaggi**:
- ✅ Usa codice React esistente
- ✅ Minime modifiche
- ✅ Supporto iOS/Android

**Passaggi**:

#### 1. Installa Capacitor
```bash
cd /app/frontend
npm install @capacitor/core @capacitor/cli
npx cap init
```

#### 2. Aggiungi Piattaforma Android
```bash
npm install @capacitor/android
npx cap add android
```

#### 3. Build React
```bash
npm run build
npx cap copy
npx cap sync
```

#### 4. Apri Android Studio
```bash
npx cap open android
```

#### 5. Build APK da Android Studio
- Build → Build Bundle(s) / APK(s) → Build APK(s)
- Trova APK in `app/build/outputs/apk/`

---

## Configurazione Ottimale per Cruise CMS

### File di Configurazione

**capacitor.config.json**:
```json
{
  "appId": "com.carmine.cruisecms",
  "appName": "Cruise Ship CMS",
  "webDir": "build",
  "bundledWebRuntime": false,
  "server": {
    "url": "https://your-backend-url.com",
    "cleartext": true
  }
}
```

### Icone e Splash Screen

1. **Icona App** (1024x1024px)
2. **Splash Screen** (2732x2732px)
3. Usa [capacitor-assets](https://github.com/ionic-team/capacitor-assets)

```bash
npm install @capacitor/assets --save-dev
npx capacitor-assets generate
```

---

## Testing su Dispositivo

### Via USB
```bash
# Abilita USB Debugging su Android
# Collega telefono
adb devices
npx cap run android
```

### Via QR Code (Expo)
```bash
expo start
# Scansiona QR con app Expo Go
```

---

## Pubblicazione

### Google Play Store

1. **Crea account Google Play Console** (€25 una tantum)
2. **Genera Signed APK**:
   ```bash
   cd android
   ./gradlew assembleRelease
   ```
3. **Upload su Play Console**
4. **Compila store listing** (screenshot, descrizione)
5. **Sottometti per review**

### Distribuzione Diretta (Senza Play Store)

1. Build APK
2. Condividi file `.apk`
3. Utenti devono abilitare "Installa da fonti sconosciute"

---

## Confronto Opzioni

| Feature | PWA | React Native | Capacitor |
|---------|-----|--------------|------------|
| Tempo sviluppo | 🟢 1 giorno | 🟡 2 settimane | 🟢 3 giorni |
| Performance | 🟡 Buona | 🟢 Ottima | 🟡 Buona |
| App Store | ❌ No | ✅ Sì | ✅ Sì |
| Offline | 🟡 Limitato | 🟢 Completo | 🟡 Limitato |
| Costo | €0 | €0 | €0 |
| Manutenzione | 🟢 Facile | 🟡 Media | 🟢 Facile |

---

## Raccomandazione per Cruise CMS

### 🎯 Soluzione Migliore: **PWA + Capacitor**

**Fase 1 - Quick Win (1 giorno)**:
- Implementa PWA
- Utenti possono installare subito
- Zero modifiche al codice

**Fase 2 - App Store (1 settimana)**:
- Usa Capacitor per build APK
- Pubblica su Play Store
- Versione iOS per App Store

---

## Checklist Implementazione

### PWA
- [ ] Crea manifest.json
- [ ] Aggiungi service worker
- [ ] Registra service worker
- [ ] Crea icone (192px, 512px)
- [ ] Test su Chrome Android
- [ ] Verifica installazione

### Capacitor APK
- [ ] Installa Capacitor
- [ ] Aggiungi piattaforma Android
- [ ] Configura capacitor.config.json
- [ ] Build frontend (yarn build)
- [ ] Sync con Capacitor
- [ ] Apri Android Studio
- [ ] Build APK
- [ ] Test su dispositivo

---

## Risorse

- [PWA Guide](https://web.dev/progressive-web-apps/)
- [Capacitor Docs](https://capacitorjs.com/docs)
- [React Native Docs](https://reactnative.dev/)
- [Expo Docs](https://docs.expo.dev/)

---

**Creato da: Carmine D'Alise**
**Per: Cruise Ship Hospitality CMS**