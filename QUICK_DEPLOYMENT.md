# ⚡ QUICK DEPLOYMENT - In 10 Minuten live!

## 🎯 DIE 3 WICHTIGSTEN SCHRITTE

---

## 1️⃣ APPS SCRIPT URL HOLEN (3 Min)

```
Google Sheets → Erweiterungen → Apps Script
→ Deploy → New deployment → Web app
→ Execute as: Me
→ Who has access: Anyone ⚠️
→ Deploy
→ URL KOPIEREN ✅
```

**URL Format:**
```
https://script.google.com/macros/s/AKfycbzXXX.../exec
```

---

## 2️⃣ SCORE.HTML AKTUALISIEREN (1 Min)

**Öffne:** `score.html` **Zeile 260**

```javascript
// VORHER:
const SCRIPT_URL = 'YOUR_APPS_SCRIPT_URL_HERE';

// NACHHER:
const SCRIPT_URL = 'https://script.google.com/macros/s/AKfycbzXXX.../exec';
                    ↑ Deine URL aus Schritt 1
```

**SPEICHERN!**

---

## 3️⃣ MONITOR.HTML AKTUALISIEREN (2 Min)

### **A) Sheet-ID finden:**

**URL deines Google Sheets:**
```
https://docs.google.com/spreadsheets/d/11qd00fEEVDIWbXl8Rx6A0vvCD8WHK2FiiXVqaxtuKDk/edit
                                          ↑ Das ist deine SHEET_ID
```

### **B) Sheet veröffentlichen:**

```
Google Sheets → Datei → Im Web veröffentlichen
→ Gesamtes Dokument
→ Veröffentlichen
```

### **C) monitor.html aktualisieren:**

**Öffne:** `monitor.html` **Zeile 234-240**

```javascript
const CSV = {
  vorrunde: "https://docs.google.com/spreadsheets/d/DEINE_SHEET_ID/gviz/tq?tqx=out:csv&sheet=Vorrunde%20%E2%80%93%20Tabelle",
  aTable: "https://docs.google.com/spreadsheets/d/DEINE_SHEET_ID/gviz/tq?tqx=out:csv&sheet=A%20%E2%80%93%20Tabelle",
  bTable: "https://docs.google.com/spreadsheets/d/DEINE_SHEET_ID/gviz/tq?tqx=out:csv&sheet=B%20%E2%80%93%20Tabelle",
  aGames: "https://docs.google.com/spreadsheets/d/DEINE_SHEET_ID/gviz/tq?tqx=out:csv&sheet=A%20%E2%80%93%20Ergebnisse",
  bGames: "https://docs.google.com/spreadsheets/d/DEINE_SHEET_ID/gviz/tq?tqx=out:csv&sheet=B%20%E2%80%93%20Ergebnisse",
  sidebets: "https://docs.google.com/spreadsheets/d/DEINE_SHEET_ID/gviz/tq?tqx=out:csv&sheet=Side-Bets",
};
```

**Ersetze `DEINE_SHEET_ID` 6× mit deiner Sheet-ID!**

**SPEICHERN!**

---

## 4️⃣ AUF NETLIFY DEPLOYEN (2 Min)

```
1. Netlify Dashboard
2. Deine Site → Deploys
3. Drag & Drop Projekt-Ordner
4. Warten auf Deploy
5. ✅ FERTIG!
```

---

## ⚡ SUPER-SCHNELL-VERSION

**Copy-Paste Befehle:**

### **1. Apps Script URL:**
```
[Google Sheets] → Erweiterungen → Apps Script → Deploy → Web app → Anyone → [URL kopieren]
```

### **2. score.html Zeile 260:**
```javascript
const SCRIPT_URL = 'PASTE_URL_HERE';
```

### **3. Sheet-ID kopieren aus URL:**
```
https://docs.google.com/spreadsheets/d/[DIESE_ID_KOPIEREN]/edit
```

### **4. monitor.html Zeile 235-240:**
```
Suchen: d/11qd00fEEVDIWbXl8Rx6A0vvCD8WHK2FiiXVqaxtuKDk/
Ersetzen durch: d/DEINE_SHEET_ID/
→ Replace All (6× ersetzt)
```

### **5. Netlify:**
```
Drag & Drop Projekt-Ordner → Deploy
```

---

## ✅ FERTIG!

**Test:**
```
1. score.html?board=M1 → PIN Test ✅
2. monitor.html → Daten angezeigt ✅
```

**GO LIVE! 🚀🍺**
