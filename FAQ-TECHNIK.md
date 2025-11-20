# 🤔 AS2 Dartturnier – Technische FAQ

## 🔍 Verständnis & Stabilität

### ❓ Was passiert, wenn zwei Teams gleichzeitig einen Score eintragen?

**Antwort:** Bei eurem Volumen (< 20 Teams) ist das **kein Problem**:

```
Team A sendet Score → Apps Script verarbeitet → Schreibt in Sheet
Team B sendet Score → Apps Script verarbeitet → Schreibt in Sheet
```

**Warum es funktioniert:**
- Google Sheets hat interne Locking-Mechanismen
- Jedes Team schreibt in **eigene Zeilen** (Vorrunde) oder **eigene Matches** (Hauptrunde)
- Konflikte sind extrem unwahrscheinlich

**Nur bei > 50 gleichzeitigen Requests:** Dann würde man `LockService` nutzen:
```javascript
const lock = LockService.getScriptLock();
lock.waitLock(30000); // 30 Sek warten
// ... Sheet-Operationen ...
lock.releaseLock();
```

**Für euer Turnier:** ✅ Nicht nötig!

---

### ❓ Kann man Scores nachträglich korrigieren?

**Ja! Es gibt 3 Wege:**

#### **1. Über die Score-Seite (einfach):**
```
Team öffnet /score.html → Team wählen → Neuen Score eintragen
→ Überschreibt den alten Wert (nächste freie Spalte)
```

**Beispiel Vorrunde:**
```
Lauf 1: 12 Legs eingetragen
Lauf 2: 10 Legs eingetragen
→ Team merkt: Lauf 1 war falsch (sollte 11 sein)
→ Kann leider nicht direkt korrigiert werden, nur neue Läufe
```

**Lösung für Korrekturen:** → Weg 2 oder 3

#### **2. Direkt im Google Sheet (schnell):**
```
Google Sheet → "Vorrunde – Eingabe" / "A – Ergebnisse"
→ Wert in Spalte ändern
→ Optional: AS2 Tools → Tabelle neu berechnen
```

**Für Hauptrunde:**
```
A – Ergebnisse → Spalte E/F (Legs 1/2) ändern
→ Script berechnet beim nächsten Score automatisch neu
ODER: AS2 Tools → 🅰️ Gruppe A Tabelle berechnen
```

#### **3. Admin-PIN für Korrekturen (optional):**

**Aktuell nicht implementiert**, aber könnte so aussehen:

```javascript
// In Score_Eingabe.gs
function doPost(e) {
  const data = JSON.parse(e.postData.contents);
  
  // Admin-PIN prüfen (aus Settings-Tab)
  if (data.adminPin) {
    // Erlaube Überschreiben/Löschen
  } else {
    // Nur neue Einträge
  }
}
```

**Für euer Turnier:** ✅ Manuelle Korrektur im Sheet reicht!

---

### ❓ Werden Fehler an der UI angezeigt?

**Ja, aber nur teilweise:**

#### **Was funktioniert:**
```javascript
// In score.html:
if (!legs || legs < 3) {
  showMessage('❌ Bitte mindestens 3 Legs eingeben', 'error');
}
```

#### **Was NICHT funktioniert:**
```javascript
// mode: 'no-cors' → kein Response-Body!
const response = await fetch(SCRIPT_URL, {
  method: 'POST',
  mode: 'no-cors',  // ← verhindert Response-Lesen
  ...
});
```

**Das heißt:**
- ❌ Fehler wie "Team nicht gefunden" oder "Alle 6 Läufe voll" kommen NICHT am Frontend an
- ✅ Nur im Apps Script Log sichtbar: **Apps Script → Ausführungen → Log anzeigen**

**Verbesserung (optional):**
```javascript
// CORS in Apps Script erlauben:
function doPost(e) {
  const output = ContentService.createTextOutput(JSON.stringify({
    ok: true, msg: 'Score gespeichert'
  }));
  output.setMimeType(ContentService.MimeType.JSON);
  
  // CORS-Header setzen
  return output
    .setHeader('Access-Control-Allow-Origin', '*')
    .setHeader('Access-Control-Allow-Methods', 'POST');
}

// In score.html: mode: 'no-cors' → mode: 'cors'
```

**Für euer Turnier:** ✅ Aktuelle Lösung (no-cors + Erfolgs-Toast) reicht!

---

## 🔐 Sicherheit / Missbrauch

### ❓ Ist die Web-App öffentlich? Kann jeder Scores eintragen?

**Ja, aktuell ist sie offen.**

**Risiko:**
```
Jemand findet die URL → Sendet Fake-Scores → Chaos
```

**Lösung 1: PIN-System (einfach):**

```javascript
// In Score_Eingabe.gs:
function doPost(e) {
  const data = JSON.parse(e.postData.contents);
  const ss = SpreadsheetApp.getActiveSpreadsheet();
  const settings = ss.getSheetByName('Settings');
  
  // Admin-PIN aus Settings laden
  const adminPin = settings.getRange('E2').getValue(); // z.B. "ADMIN9999"
  
  if (data.pin !== adminPin) {
    return jsonResponse(false, 'Ungültige PIN');
  }
  
  // ... Score verarbeiten
}
```

```javascript
// In score.html: PIN-Eingabefeld
<input type="password" id="pinInput" placeholder="PIN eingeben" />

body: JSON.stringify({
  mode: 'vorrunde',
  team: selectedTeam,
  legs: legs,
  pin: document.getElementById('pinInput').value
})
```

**Lösung 2: Board-PIN (für Teams):**

```
Settings-Tab:
M1 | 1234 | YES | hauptrunde
M2 | 5678 | YES | hauptrunde
...

Team bekommt PIN für ihr Board → Kann nur Scores für dieses Board eintragen
```

**Für euer Turnier:**
- ✅ **Ohne PIN:** Wenn alle vertrauenswürdig sind (geschlossene Gruppe)
- ✅ **Mit Admin-PIN:** Wenn du auf Nummer sicher gehen willst (5 Min Implementierung)

---

### ❓ Füllt sich das Score-Log endlos?

**Ja, wenn vorhanden!**

**Score-Log-Struktur:**
```
Phase       | Timestamp | Team 1 | Team 2 | Legs 1 | Legs 2 | Match | User
Vorrunde    | 2025...   | Test0  |        | 12     |        |       | user@...
Hauptrunde A| 2025...   | Test0  | Test1  | 2      | 1      | Match7| user@...
```

**Problem:** Nach 1000+ Einträgen wird das Sheet langsam.

**Lösung: Automatisches Archivieren**

```javascript
// Neue Funktion in AS2 MASTER:
function archiveScoreLog() {
  const ss = SpreadsheetApp.getActive();
  const log = ss.getSheetByName('Score-Log');
  if (!log) return;
  
  const lastRow = log.getLastRow();
  if (lastRow <= 100) return; // Nur wenn > 100 Zeilen
  
  // Altes Archiv erstellen
  const archive = ss.getSheetByName('Score-Log-Archiv') || ss.insertSheet('Score-Log-Archiv');
  
  // Zeilen 2-lastRow kopieren
  const data = log.getRange(2, 1, lastRow - 1, log.getLastColumn()).getValues();
  archive.getRange(archive.getLastRow() + 1, 1, data.length, data[0].length).setValues(data);
  
  // Log leeren (außer Header)
  log.getRange(2, 1, lastRow - 1, log.getLastColumn()).clearContent();
  
  SpreadsheetApp.getUi().alert('✅ Score-Log archiviert (' + data.length + ' Einträge)');
}

// Im Menü hinzufügen:
.addItem('📦 Score-Log archivieren', 'archiveScoreLog')
```

**Für euer Turnier:** ✅ Nach dem Turnier manuell löschen reicht!

---

## 🎯 Verhalten bei Matches (Hauptrunde)

### ❓ Wer darf den Score für ein Match eintragen?

**Aktuell: BEIDE Teams können eintragen!**

**Szenario:**
```
Match 7: Team A vs Team B

Team A trägt ein: 2:1 (A gewinnt)
Team B trägt ein: 1:2 (B gewinnt)

→ Letzter Eintrag gewinnt (überschreibt)
```

**Lösungen:**

#### **Option 1: Trust-System (aktuell)**
```
✅ Beide Teams können eintragen
✅ Letzter Eintrag zählt
✅ Bei Streit: Orga korrigiert im Sheet
```

**Vorteile:** Einfach, schnell, flexibel  
**Nachteile:** Vertrauen nötig

#### **Option 2: Heimteam-Regel**
```javascript
// In Score_Eingabe.gs:
function handleHauptrunde(ss, data) {
  // ...
  const row = sh.getRange(rowIndex, 1, 1, 7).getValues()[0];
  const team1 = row[2]; // "Heimteam"
  
  if (data.submittingTeam !== team1) {
    return jsonResponse(false, 'Nur ' + team1 + ' darf Score eintragen');
  }
  
  // ... Score speichern
}
```

**Vorteile:** Klar definiert  
**Nachteile:** Team 2 kann nicht eintragen (falls Team 1 vergisst)

#### **Option 3: Bestätigungs-System**
```javascript
// Match hat Status: "Bereit" / "Team A eingetragen" / "Team B eingetragen" / "Fertig"

if (status === 'Team A eingetragen') {
  // Prüfen: Stimmt Team B's Eingabe mit A überein?
  if (data.legs1 === existingLegs1 && data.legs2 === existingLegs2) {
    // ✅ Beide stimmen überein → Status "Fertig"
  } else {
    // ❌ Diskrepanz → Orga muss klären
    return jsonResponse(false, 'Score stimmt nicht überein! Bitte Orga informieren.');
  }
}
```

**Vorteile:** Doppelte Verifikation  
**Nachteile:** Aufwendiger, braucht beide Teams

**Für euer Turnier:** ✅ **Option 1** (Trust-System) empfohlen!

---

## ⚙️ Live-Monitor / Refresh

### ❓ Wie oft lädt monitor.html die CSVs neu?

**Aktuell: Alle 5 Sekunden**

```javascript
// In monitor.html:
setInterval(refreshAll, 5000); // 5000ms = 5 Sekunden
```

**Anpassbar:**
```javascript
const REFRESH_INTERVAL = 10000; // 10 Sekunden
setInterval(refreshAll, REFRESH_INTERVAL);
```

**Empfehlung:**
- **5s:** Für schnelles Live-Feeling (euer aktueller Wert) ✅
- **10s:** Weniger Server-Last, immer noch "live"
- **15s:** Für sehr langsame Verbindungen

**Google Sheets Rate Limits:**
```
Kostenlos: ~100 Requests/Minute/User
→ Bei 5s = 12 Requests/Min → Kein Problem ✅
```

---

### ❓ Was passiert bei Google/CSV-Fehler?

**Aktuell: Stille Fehler**

```javascript
// In monitor.html:
async function refreshAll() {
  try {
    const res = await fetch(CSV.vorrunde + '&_=' + Date.now());
    const data = await res.text();
    // ... verarbeiten
  } catch (error) {
    console.error(error); // ← Nur in Konsole, nicht sichtbar!
  }
}
```

**Verbesserung:**

```javascript
let failCount = 0;

async function refreshAll() {
  try {
    // ... fetch & parse
    failCount = 0; // Reset bei Erfolg
    document.getElementById('updated').textContent = new Date().toLocaleTimeString();
  } catch (error) {
    failCount++;
    console.error(error);
    
    if (failCount >= 3) {
      // Nach 3 Fehlversuchen Warnung anzeigen
      document.getElementById('updated').innerHTML = 
        '⚠️ <span style="color:#ff6161">Verbindungsfehler</span>';
    }
  }
}
```

**Für euer Turnier:** ✅ Aktuelle Lösung reicht (Fehler sind extrem selten)!

---

## 🚀 Wiederverwendung & Doku

### ❓ Kann ich das Setup für das nächste Turnier kopieren?

**Ja! So geht's:**

#### **1. Google Sheet duplizieren:**
```
Datei → Kopie erstellen
Name: "AS2 Dartturnier 2026"
```

#### **2. Apps Script mit kopieren:**
```
✅ Wird automatisch mit kopiert
✅ ABER: Web-App-URL ändert sich!
```

#### **3. Neue Web-App deployen:**
```
Apps Script → Bereitstellen → Neue Bereitstellung → Web-App
→ Neue URL erhalten
```

#### **4. URL in score.html anpassen:**
```javascript
const SCRIPT_URL = "https://script.google.com/macros/s/NEUE_URL_HIER/exec";
```

#### **5. Netlify neu deployen:**
```
git commit -m "update: neue Apps Script URL für 2026"
git push
```

**Fertig! 🎉**

---

### ❓ Gibt es harte Abhängigkeiten (IDs, Tab-Namen)?

**Ja, diese müssen stimmen:**

#### **Tab-Namen (wichtig!):**
```javascript
// In Score_Eingabe.gs:
const TABS = {
  VOR_EINGABE: 'Vorrunde – Eingabe',  // ← EXAKT so schreiben!
  A_ERG:       'A – Ergebnisse',
  B_ERG:       'B – Ergebnisse',
};
```

**Achtung:** En-Dash (–) U+2013, nicht normaler Bindestrich (-)!

#### **Sheet-ID:**
```javascript
// In score.html & monitor.html:
const SHEET_ID = "11qd00fEEVDIWbXl8Rx6A0vvCD8WHK2FiiXVqaxtuKDk";
```

**Bei neuem Sheet:** ID aus der URL kopieren!

#### **Apps Script URL:**
```javascript
// In score.html:
const SCRIPT_URL = "https://script.google.com/macros/s/.../exec";
```

**Bei neuem Deployment:** Neue URL eintragen!

---

### ❓ Wo sind alle Konfigurationen?

**Checkliste:**

| Was | Wo | Wie ändern |
|-----|----|----|
| **Sheet-ID** | `score.html`, `monitor.html` | Google Sheet URL → ID kopieren |
| **Apps Script URL** | `score.html` | Apps Script → Bereitstellen → URL kopieren |
| **Tab-Namen** | `Score_Eingabe.gs`, AS2 MASTER | Konstanten `TABS` ändern |
| **Refresh-Intervall** | `monitor.html` | `setInterval(..., 5000)` anpassen |
| **Max Läufe** | AS2 MASTER | `const MAX_LEGS = 6` |
| **Board-Liste** | AS2 MASTER | `const AUTO_BOARDS = ['M1','M3','M4','M5']` |

---

## 📋 Turniertag-Workflow

**Siehe:** `TURNIERTAG-CHECKLISTE.md`

Kurzfassung:
```
1. Teams in Vorrunde ziehen
2. Vorrunde-Tabelle berechnen
3. Monitor starten
4. Score-Link an Teams senden
5. [6 Läufe Vorrunde]
6. A/B Spielplan erzeugen
7. [Hauptrunde]
```

---

## 💡 Best Practices

### ✅ DO's
- **Test-Score** vor jedem Turnier eintragen
- **Sheet duplizieren** vor größeren Änderungen
- **Apps Script Logs** bei Problemen checken
- **Browser-Cache leeren** wenn Monitor nicht aktualisiert

### ❌ DON'Ts
- **Nicht** Tab-Namen ändern ohne Code anzupassen
- **Nicht** Apps Script während Turnier ändern
- **Nicht** Sheet-Struktur (Spalten) verändern
- **Nicht** mehrere Web-Apps gleichzeitig aktiv haben

---

**Fragen offen? Siehe `TURNIERTAG-CHECKLISTE.md` für praktische Schritte!** 🎯
