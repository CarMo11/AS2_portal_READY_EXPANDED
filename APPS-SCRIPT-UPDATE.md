# 📝 APPS SCRIPT UPDATE - Vorrunde-Modus hinzufügen

## 🎯 Was ist neu?

Die Score-Seite unterstützt jetzt zwei Modi:
- **Vorrunde:** Team-basiert (Legs 7-14 eintragen)
- **Hauptrunde:** Match-basiert (wie bisher)

Das Apps Script muss erweitert werden!

---

## 🛠️ APPS SCRIPT CODE

### **Option 1: Komplett ersetzen**

Öffne dein Apps Script und ersetze den kompletten Code mit diesem:

```javascript
function doPost(e) {
  try {
    const data = JSON.parse(e.postData.contents);
    const sheet = SpreadsheetApp.getActiveSpreadsheet();
    
    // MODUS: Vorrunde
    if (data.mode === 'vorrunde') {
      return handleVorrunde(sheet, data);
    }
    
    // MODUS: Hauptrunde (wie bisher)
    return handleHauptrunde(sheet, data);
    
  } catch (error) {
    return ContentService.createTextOutput(JSON.stringify({
      ok: false, msg: error.toString()
    })).setMimeType(ContentService.MimeType.JSON);
  }
}

// VORRUNDE: Legs für Team eintragen
function handleVorrunde(sheet, data) {
  const targetSheet = sheet.getSheetByName('Vorrunde – Eingabe');
  
  if (!targetSheet) {
    return ContentService.createTextOutput(JSON.stringify({
      ok: false, msg: 'Vorrunde-Eingabe Sheet nicht gefunden'
    })).setMimeType(ContentService.MimeType.JSON);
  }
  
  // Finde Team-Zeile (Spalte A = Team)
  const allData = targetSheet.getDataRange().getValues();
  let rowIndex = -1;
  
  for (let i = 1; i < allData.length; i++) {
    if (allData[i][0] === data.team) {
      rowIndex = i + 1; // +1 weil 1-indexed
      break;
    }
  }
  
  if (rowIndex === -1) {
    return ContentService.createTextOutput(JSON.stringify({
      ok: false, msg: 'Team nicht gefunden'
    })).setMimeType(ContentService.MimeType.JSON);
  }
  
  // Finde nächste freie Lauf-Spalte (C, D, E, F, G, H für Leg 1-6)
  let colIndex = -1;
  for (let col = 3; col <= 8; col++) { // C=3, H=8
    const val = targetSheet.getRange(rowIndex, col).getValue();
    if (!val || val === '') {
      colIndex = col;
      break;
    }
  }
  
  if (colIndex === -1) {
    return ContentService.createTextOutput(JSON.stringify({
      ok: false, msg: 'Alle 6 Läufe bereits eingetragen'
    })).setMimeType(ContentService.MimeType.JSON);
  }
  
  // Legs eintragen
  targetSheet.getRange(rowIndex, colIndex).setValue(data.legs);
  
  return ContentService.createTextOutput(JSON.stringify({
    ok: true, msg: 'Vorrunde-Score gespeichert!'
  })).setMimeType(ContentService.MimeType.JSON);
}

// HAUPTRUNDE: Match-Score eintragen (wie bisher)
function handleHauptrunde(sheet, data) {
  const sheetName = data.group === 'A' ? 'A – Ergebnisse' : 'B – Ergebnisse';
  const targetSheet = sheet.getSheetByName(sheetName);
  
  if (!targetSheet) {
    return ContentService.createTextOutput(JSON.stringify({
      ok: false, msg: 'Sheet nicht gefunden'
    })).setMimeType(ContentService.MimeType.JSON);
  }
  
  // Finde Match-Zeile
  const allData = targetSheet.getDataRange().getValues();
  let rowIndex = -1;
  
  for (let i = 1; i < allData.length; i++) {
    if (allData[i][0] === data.match) {
      rowIndex = i + 1;
      break;
    }
  }
  
  if (rowIndex === -1) {
    return ContentService.createTextOutput(JSON.stringify({
      ok: false, msg: 'Match nicht gefunden'
    })).setMimeType(ContentService.MimeType.JSON);
  }
  
  // Score eintragen: E = Legs 1, F = Legs 2
  targetSheet.getRange(rowIndex, 5).setValue(data.score1);
  targetSheet.getRange(rowIndex, 6).setValue(data.score2);
  
  return ContentService.createTextOutput(JSON.stringify({
    ok: true, msg: 'Hauptrunde-Score gespeichert!'
  })).setMimeType(ContentService.MimeType.JSON);
}

function doGet(e) {
  return ContentService.createTextOutput('AS2 Score API läuft!');
}
```

---

### **Option 2: Nur Vorrunde-Funktion hinzufügen**

Falls du schon Code hast, füge nur diese Funktionen hinzu:

1. **In `doPost()` am Anfang:**
```javascript
// MODUS: Vorrunde
if (data.mode === 'vorrunde') {
  return handleVorrunde(sheet, data);
}
```

2. **Neue Funktion `handleVorrunde()`:** (siehe oben)

---

## 📊 WIE ES FUNKTIONIERT:

### **Vorrunde-Modus:**
```
POST-Daten:
{
  "mode": "vorrunde",
  "team": "DeTonation",
  "legs": 12
}

Script:
1. Öffnet "Vorrunde – Eingabe"
2. Findet Team-Zeile (Spalte A = Team)
3. Sucht nächste freie Lauf-Spalte (C-H = Leg 1-6)
4. Trägt Legs ein
5. Gibt Erfolg zurück

WICHTIG: Schreibt in "Vorrunde – Eingabe" (nicht in "Vorrunde – Tabelle")!
"Vorrunde – Tabelle" wird automatisch berechnet aus "Vorrunde – Eingabe".
```

### **Hauptrunde-Modus:**
```
POST-Daten:
{
  "match": "Match 7",
  "group": "A",
  "score1": 2,
  "score2": 1
}

Script:
1. Öffnet "A – Ergebnisse" oder "B – Ergebnisse"
2. Findet Match-Zeile
3. Trägt Score ein (Spalte E & F)
4. Gibt Erfolg zurück
```

---

## ✅ DEPLOYMENT:

1. **Apps Script öffnen:**
   - Google Sheet → Erweiterungen → Apps Script

2. **Code ersetzen/erweitern**

3. **Bereitstellen:**
   - Bereitstellen → Neue Bereitstellung → Web-App
   - "Neue Version" (WICHTIG!)
   - Bereitstellen

4. **Testen:**
   - Score-Seite öffnen
   - Vorrunde-Modus: Team wählen → Legs eintragen
   - Hauptrunde-Modus: Team wählen → Match wählen → Score eintragen

---

## 🧪 TEST-CHECKLISTE:

### **Vorrunde:**
- [ ] Team-Dropdown lädt alle Teams
- [ ] Legs-Buttons (7-14) erscheinen
- [ ] Nach Submit: Legs stehen im Sheet
- [ ] Nächste freie Spalte wird gefunden

### **Hauptrunde:**
- [ ] Team-Dropdown lädt alle Teams
- [ ] Match-Dropdown zeigt nur Matches dieses Teams
- [ ] Score-Eingabe funktioniert
- [ ] Match-Score steht im Sheet

---

## 💡 WICHTIG:

**Nach Code-Änderung IMMER:**
1. **Neue Version** deployen
2. **Nicht** die alte URL ersetzen (bleibt gleich)
3. Einfach "Neue Bereitstellung" klicken

**Die URL bleibt:**
```
https://script.google.com/macros/s/AKfycbw6pv1os8QgMt6nOMiFV6cw3PixRnIm9gPAbib9khUz_wh3um_TFVzOd_69o9I7E-6XNQ/exec
```

**Fertig! 🚀**
