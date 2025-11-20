# 📱 Score-Eingabe Setup - SO EINFACH WIE MÖGLICH!

## 🎯 Was Teams tun müssen:

1. **Link öffnen:** `https://as2-dartturnier-hochberg.netlify.app/score-simple.html`
2. **Match auswählen:** Dropdown zeigt alle offenen Matches
3. **Scores eingeben:** Große Buttons (0, 1, 2)
4. **Absenden:** ✅ Button drücken → Fertig!

---

## 🛠️ SETUP (nur einmal, 5 Minuten):

### Schritt 1: Google Apps Script erstellen

1. Öffne dein Google Sheet: https://docs.google.com/spreadsheets/d/11qd00fEEVDIWbXl8Rx6A0vvCD8WHK2FiiXVqaxtuKDk
2. Klick auf **Erweiterungen** → **Apps Script**
3. Lösche den vorhandenen Code
4. Kopiere den Code aus `APPS-SCRIPT-CODE.gs` (siehe unten)
5. Klick auf **Bereitstellen** → **Neue Bereitstellung**
6. Typ: **Web-App**
7. Einstellungen:
   - "Ausführen als": **Ich**
   - "Zugriff": **Jeder**
8. Klick **Bereitstellen**
9. Kopiere die **Web-App-URL** (sieht aus wie: `https://script.google.com/macros/s/ABC123.../exec`)

### Schritt 2: URL in score-simple.html einfügen

1. Öffne `score-simple.html`
2. Suche Zeile 198: `const FORM_URL = ...`
3. Ersetze durch deine Web-App-URL
4. Speichern & deployen!

---

## 📝 APPS SCRIPT CODE:

```javascript
// KOPIERE DIESEN CODE IN GOOGLE APPS SCRIPT!

function doPost(e) {
  try {
    const data = JSON.parse(e.postData.contents);
    const sheet = SpreadsheetApp.getActiveSpreadsheet();
    
    // Gruppe A oder B?
    const sheetName = data.group === 'A' ? 'A – Ergebnisse' : 'B – Ergebnisse';
    const targetSheet = sheet.getSheetByName(sheetName);
    
    if (!targetSheet) {
      return ContentService.createTextOutput(JSON.stringify({
        ok: false, msg: 'Sheet nicht gefunden'
      })).setMimeType(ContentService.MimeType.JSON);
    }
    
    // Finde die richtige Zeile (Match-Nummer)
    const allData = targetSheet.getDataRange().getValues();
    let rowIndex = -1;
    
    for (let i = 1; i < allData.length; i++) {
      if (allData[i][0] === data.match) { // Spalte A = Match
        rowIndex = i + 1; // +1 weil 1-indexed
        break;
      }
    }
    
    if (rowIndex === -1) {
      return ContentService.createTextOutput(JSON.stringify({
        ok: false, msg: 'Match nicht gefunden'
      })).setMimeType(ContentService.MimeType.JSON);
    }
    
    // Score eintragen: Spalte E = Legs 1, Spalte F = Legs 2
    targetSheet.getRange(rowIndex, 5).setValue(data.score1); // E = 5
    targetSheet.getRange(rowIndex, 6).setValue(data.score2); // F = 6
    
    return ContentService.createTextOutput(JSON.stringify({
      ok: true, msg: 'Score gespeichert!'
    })).setMimeType(ContentService.MimeType.JSON);
    
  } catch (error) {
    return ContentService.createTextOutput(JSON.stringify({
      ok: false, msg: error.toString()
    })).setMimeType(ContentService.MimeType.JSON);
  }
}

function doGet(e) {
  return ContentService.createTextOutput('AS2 Score API läuft!');
}
```

---

## 🧪 TESTEN:

1. **Öffne auf Handy:** `https://as2-dartturnier-hochberg.netlify.app/score-simple.html`
2. **Wähle Match:** Dropdown zeigt alle Matches
3. **Trage Score ein:** Z.B. 2:1
4. **Klick ✅:** Score wird ins Sheet geschrieben
5. **Check Sheet:** Öffne "A – Ergebnisse" → Score steht drin!
6. **Check Monitor:** Öffne Monitor → Score ist live! 🎯

---

## 💡 VORTEILE:

- ✅ **Super einfach:** Nur Match + Scores wählen
- ✅ **Mobil-optimiert:** Große Buttons, perfekt für Handy
- ✅ **Kein Login:** Jeder kann direkt loslegen
- ✅ **Live-Updates:** Monitor zeigt sofort neuen Score
- ✅ **Fehlerproof:** 2:2 wird automatisch blockiert
- ✅ **Kein Backend:** Nutzt dein bestehendes Google Sheet

---

## 🔒 SICHERHEIT (optional):

Falls du willst, dass nur bestimmte Leute Scores eintragen können:

**Option 1: PIN-Code**
- Füge ein Passwort-Feld hinzu
- Prüfe im Apps Script gegen einen festen PIN

**Option 2: QR-Codes**
- Generiere QR-Codes mit eindeutigen Tokens
- Gib jeden Teams ihren QR-Code

Für den Anfang würde ich OHNE Sicherheit starten - in der Praxis manipuliert niemand! 😉
