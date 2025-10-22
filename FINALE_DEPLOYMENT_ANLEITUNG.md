# 🚀 FINALE DEPLOYMENT - Sheets mit Webseite verbinden

## ✅ SCHRITT-FÜR-SCHRITT ANLEITUNG

---

## 📋 SCHRITT 1: Apps Script Backend deployen (5 Min)

### **1.1 Apps Script Web-App erstellen:**

```
1. Google Sheets öffnen (dein AS2 Sheet)
2. Erweiterungen → Apps Script
3. Prüfen: Ist AS2_MASTER_SETUP.gs oder dein Setup-Script schon drin?
   → JA: Gut, weiter zu Schritt 4
   → NEIN: Einfügen und speichern
   
4. APPS_SCRIPT_Code.gs öffnen (oder neu erstellen)
5. KOMPLETTEN Code aus APPS_SCRIPT_Code.gs kopieren
6. Einfügen (neues Script oder unter bestehendem)
7. Speichern (Cmd+S / Ctrl+S)
```

### **1.2 Als Web-App deployen:**

```
1. Im Apps Script Editor: Deploy → New deployment
2. Klick auf Zahnrad-Symbol (⚙️) neben "Select type"
3. Wähle: Web app
4. Description: "AS2 Score API v1"
5. Execute as: Me (deine E-Mail)
6. Who has access: Anyone ⚠️ WICHTIG!
7. Deploy klicken
8. Berechtigung erteilen (beim ersten Mal)
9. URL kopieren ✅
```

**Die URL sieht so aus:**
```
https://script.google.com/macros/s/AKfycbzXXXXXXXXXXXXXXXXXXXX/exec
                                    ↑ Deine eindeutige ID
```

---

## 📋 SCHRITT 2: Score-App verbinden (2 Min)

### **2.1 URL in score.html einfügen:**

**Öffne:** `score.html`

**Finde Zeile 260:**
```javascript
const SCRIPT_URL = 'YOUR_APPS_SCRIPT_URL_HERE';
```

**Ersetze durch:**
```javascript
const SCRIPT_URL = 'https://script.google.com/macros/s/AKfycbzXXX.../exec';
                    ↑ Deine URL aus Schritt 1.2
```

**Speichern!**

---

## 📋 SCHRITT 3: Monitor mit Sheet verbinden (3 Min)

### **3.1 Sheet-ID finden:**

**Öffne dein Google Sheet und schau in die URL:**
```
https://docs.google.com/spreadsheets/d/11qd00fEEVDIWbXl8Rx6A0vvCD8WHK2FiiXVqaxtuKDk/edit
                                          ↑ Das ist deine SHEET_ID
```

**Kopiere die ID:** `11qd00fEEVDIWbXl8Rx6A0vvCD8WHK2FiiXVqaxtuKDk`

### **3.2 Sheet als Webseite veröffentlichen:**

```
1. Google Sheets öffnen
2. Datei → Im Web veröffentlichen
3. Gesamtes Dokument auswählen
4. Als Webseite veröffentlichen (nicht CSV!)
5. Veröffentlichen klicken
6. Bestätigen
```

### **3.3 URLs in monitor.html aktualisieren:**

**Öffne:** `monitor.html`

**Finde Zeile 234-241:**
```javascript
const CSV = {
  vorrunde: "https://docs.google.com/spreadsheets/d/11qd00fEEVDIWbXl8Rx6A0vvCD8WHK2FiiXVqaxtuKDk/gviz/tq?tqx=out:csv&sheet=Vorrunde%20%E2%80%93%20Tabelle",
  aTable: "https://docs.google.com/spreadsheets/d/11qd00fEEVDIWbXl8Rx6A0vvCD8WHK2FiiXVqaxtuKDk/gviz/tq?tqx=out:csv&sheet=A%20%E2%80%93%20Tabelle",
  ...
};
```

**Ersetze die SHEET_ID (11qd00...) mit DEINER SHEET_ID aus Schritt 3.1:**

```javascript
const CSV = {
  vorrunde: "https://docs.google.com/spreadsheets/d/DEINE_SHEET_ID_HIER/gviz/tq?tqx=out:csv&sheet=Vorrunde%20%E2%80%93%20Tabelle",
  aTable: "https://docs.google.com/spreadsheets/d/DEINE_SHEET_ID_HIER/gviz/tq?tqx=out:csv&sheet=A%20%E2%80%93%20Tabelle",
  bTable: "https://docs.google.com/spreadsheets/d/DEINE_SHEET_ID_HIER/gviz/tq?tqx=out:csv&sheet=B%20%E2%80%93%20Tabelle",
  aGames: "https://docs.google.com/spreadsheets/d/DEINE_SHEET_ID_HIER/gviz/tq?tqx=out:csv&sheet=A%20%E2%80%93%20Ergebnisse",
  bGames: "https://docs.google.com/spreadsheets/d/DEINE_SHEET_ID_HIER/gviz/tq?tqx=out:csv&sheet=B%20%E2%80%93%20Ergebnisse",
  sidebets: "https://docs.google.com/spreadsheets/d/DEINE_SHEET_ID_HIER/gviz/tq?tqx=out:csv&sheet=Side-Bets",
};
```

**⚠️ WICHTIG:**
- Tab-Namen müssen EXAKT mit deinem Sheet übereinstimmen!
- `%20` = Leerzeichen
- `%E2%80%93` = Gedankenstrich (–)

**Speichern!**

---

## 📋 SCHRITT 4: Auf Netlify deployen (3 Min)

### **4.1 Zu Netlify:**

```
1. Netlify Dashboard öffnen
2. Deine Site auswählen (as2-dartturnier-hochberg)
3. Deploys → Deploy manually
4. Kompletten Projekt-Ordner raufziehen
   ODER
5. Mit GitHub verbinden (Auto-Deploy bei jedem Push)
```

### **4.2 Test:**

```
1. https://deine-site.netlify.app/score.html?board=M1 öffnen
2. PIN eingeben
3. ✅ Funktioniert? → Weiter
4. ❌ Fehler? → Browser Console (F12) prüfen
```

---

## 🧪 SCHRITT 5: Vollständiger Test (5 Min)

### **Test 1: PIN-Check**
```
1. score.html?board=M1 öffnen
2. Falscher PIN → ❌ "Falscher PIN"
3. Richtiger PIN → ✅ View lädt
```

### **Test 2: Vorrunde Score**
```
1. Settings: Phase = "vorrunde"
2. Score-App: Team wählen
3. Legs 7-14 eintragen
4. Sheet prüfen: "Vorrunde – Eingabe" ✅
```

### **Test 3: Hauptrunde Score**
```
1. Settings: Phase = "hauptrunde"
2. Match in "A – Ergebnisse" anlegen
3. Score-App: Score eintragen
4. Sheet prüfen: Aktualisiert? ✅
```

### **Test 4: Monitor**
```
1. monitor.html öffnen
2. Vorrunde-Tabelle angezeigt? ✅
3. A/B Tabellen angezeigt? ✅
4. Matches angezeigt? ✅
5. F5 → Update funktioniert? ✅
```

---

## 🆘 TROUBLESHOOTING

### **"Apps Script 404 / CORS Error"**
```
→ Web-App deployed?
→ "Who has access" = Anyone?
→ Neue Version deployed (nach Änderungen)?
→ URL korrekt in score.html?
```

### **"Monitor zeigt nichts"**
```
→ Sheet als Webseite veröffentlicht?
→ Sheet-ID korrekt in monitor.html?
→ Tab-Namen exakt gleich?
→ Browser Console (F12) prüfen
```

### **"Score wird nicht gespeichert"**
```
→ Apps Script URL korrekt?
→ PIN richtig?
→ Match existiert im Sheet?
→ Status = "Bereit" oder "Läuft"?
→ Browser Console (F12) → Fehler?
```

### **"Tab-Namen stimmen nicht"**
```
Monitor erwartet:
- Vorrunde – Tabelle (mit EN DASH –)
- A – Ergebnisse
- B – Ergebnisse
- A – Tabelle
- B – Tabelle
- Side-Bets

Wenn anders benannt:
→ Entweder Tabs umbenennen
→ Oder URLs in monitor.html anpassen
```

---

## 📋 SCHNELL-CHECKLISTE

### **Vor Go-Live:**
- [ ] Apps Script deployed (Web-App)
- [ ] URL in score.html (Zeile 260)
- [ ] Sheet-ID in monitor.html (Zeile 235-240)
- [ ] Sheet als Webseite veröffentlicht
- [ ] Auf Netlify deployed
- [ ] Settings: PINs geändert
- [ ] Settings: AdminPIN geändert
- [ ] PIN-Test erfolgreich
- [ ] Score-Test erfolgreich
- [ ] Monitor-Test erfolgreich
- [ ] QR-Codes erstellt & gedruckt

---

## ✅ GO-LIVE!

```
╔════════════════════════════════════════╗
║  🎯 SYSTEM CONNECTED & READY! 🎯      ║
║                                        ║
║  ✅ Backend: DEPLOYED                  ║
║  ✅ Frontend: CONNECTED                ║
║  ✅ Monitor: LIVE                      ║
║  ✅ Sheets: PUBLISHED                  ║
║  ✅ Tests: PASSED                      ║
║                                        ║
║  → TURNIER KANN STARTEN! 🚀🍺         ║
╚════════════════════════════════════════╝
```

---

## 🎯 URLs für QR-Codes:

```
M1: https://deine-site.netlify.app/score.html?board=M1
M2: https://deine-site.netlify.app/score.html?board=M2
M3: https://deine-site.netlify.app/score.html?board=M3
M4: https://deine-site.netlify.app/score.html?board=M4
M5: https://deine-site.netlify.app/score.html?board=M5

Monitor: https://deine-site.netlify.app/monitor.html
```

**QR-Code Generator:**
- https://www.qr-code-generator.com/
- https://qrcode.tec-it.com/

---

## 🎉 FERTIG!

**Alle Systeme verbunden! Viel Erfolg beim Turnier! 🎯🍺🚀**
