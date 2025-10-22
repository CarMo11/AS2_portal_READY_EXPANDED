# 📊 Google Sheets Setup-Guide

## 🎯 Auto-Berechnungen für Gruppentabellen

### Struktur der Ergebnis-Tabs
```
Spalten in "A – Ergebnisse" und "B – Ergebnisse":
A = Match (z.B. "1", "2", "3")
B = Board (z.B. "M1", "M2", "M3")
C = Team 1
D = Team 2
E = Legs Team 1 (Score)
F = Legs Team 2 (Score)
G = Status (Dropdown: Bereit | Läuft | Fertig)
```

### Struktur der Tabellen-Tabs
```
Spalten in "A – Tabelle" und "B – Tabelle":
A = Team (Name)
B = Siege
C = Legs+
D = Legs–
E = Diff
```

---

## 📝 Formeln (kopierfertig)

### Für "A – Tabelle" (Zeile 2, nach unten kopieren):

**Siege (B2):**
```excel
=SUMPRODUCT(('A – Ergebnisse'!C:C=A2)*('A – Ergebnisse'!E:E>'A – Ergebnisse'!F:F)) + SUMPRODUCT(('A – Ergebnisse'!D:D=A2)*('A – Ergebnisse'!F:F>'A – Ergebnisse'!E:E))
```

**Legs+ (C2):**
```excel
=SUMIF('A – Ergebnisse'!C:C;A2;'A – Ergebnisse'!E:E) + SUMIF('A – Ergebnisse'!D:D;A2;'A – Ergebnisse'!F:F)
```

**Legs– (D2):**
```excel
=SUMIF('A – Ergebnisse'!C:C;A2;'A – Ergebnisse'!F:F) + SUMIF('A – Ergebnisse'!D:D;A2;'A – Ergebnisse'!E:E)
```

**Diff (E2):**
```excel
=C2-D2
```

### Für "B – Tabelle":
Gleiche Formeln, nur Tab-Namen anpassen:
- `'A – Ergebnisse'` → `'B – Ergebnisse'`

---

## 🎨 Dropdown-Validierung

### 1. Status-Dropdown (Spalte G in Ergebnis-Tabs)
1. Spalte G markieren
2. **Daten → Datenvalidierung**
3. **Kriterien:** Liste der Elemente
4. **Werte:** `Bereit, Läuft, Fertig`

### 2. Board-Dropdown (Spalte B in Ergebnis-Tabs)
1. Spalte B markieren (ab Zeile 2)
2. **Daten → Datenvalidierung**
3. **Kriterien:** Liste der Elemente
4. **Werte:** `M1, M2, M3, M4, M5` (anpassen je nach Anzahl Boards)

---

## 🎨 Bedingte Formatierung (Zeilen einfärben)

### In "A – Ergebnisse" und "B – Ergebnisse":

**1. Laufende Matches (orange):**
- Bereich: `A2:G999`
- **Format → Bedingte Formatierung**
- **Regel:** Benutzerdefinierte Formel
- **Formel:** `=$G2="Läuft"`
- **Hintergrund:** Orange (#ff9800)

**2. Fertige Matches (grün):**
- Bereich: `A2:G999`
- **Regel:** Benutzerdefinierte Formel
- **Formel:** `=$G2="Fertig"`
- **Hintergrund:** Grün (#4caf50)

**3. Bereite Matches (grau):**
- Bereich: `A2:G999`
- **Regel:** Benutzerdefinierte Formel
- **Formel:** `=$G2="Bereit"`
- **Hintergrund:** Grau (#bdbdbd)

---

## 📋 Bonus: Sortierte Ansicht (QUERY-Formel)

Wenn du die Tabelle automatisch sortiert anzeigen willst:

**In einer separaten Spalte (z.B. ab Spalte H):**
```excel
=QUERY(A1:E; "select A,B,C,D,E order by B desc, E desc, C desc"; 1)
```
Sortiert nach: Siege → Diff → Legs+

---

## ✅ Schnell-Checkliste

- [ ] Formeln in "A – Tabelle" eingefügt (B2, C2, D2, E2)
- [ ] Formeln nach unten kopiert für alle Teams
- [ ] Formeln in "B – Tabelle" eingefügt
- [ ] Status-Dropdown (Bereit | Läuft | Fertig)
- [ ] Board-Dropdown (M1, M2, M3...)
- [ ] Bedingte Formatierung: Orange (Läuft)
- [ ] Bedingte Formatierung: Grün (Fertig)
- [ ] Bedingte Formatierung: Grau (Bereit)

---

## 🎯 Beispiel-Sheet-Struktur

```
Tab 1: LIVE – Teams (Anmeldungen)
Tab 2: Vorrunde – Tabelle
Tab 3: A – Ergebnisse (mit Formeln & Dropdowns)
Tab 4: A – Tabelle (Auto-berechnet)
Tab 5: B – Ergebnisse
Tab 6: B – Tabelle
```

**Nach Setup:** Der Monitor zeigt automatisch:
- ✅ Aktuelle Tabellenstände
- 🔴 Live-Matches (orange markiert)
- 🎯 Board-Zuordnungen
- 🔔 Ping-Sound bei neuen Live-Matches

---

## 🍺 Side-Bets Tracking (NEU!)

### **Variante A: Manuell (30 Sekunden)**

Tab "Side-Bets" erstellen mit Spalten:

```
A = Team (Name)
B = 180er
C = High Finish (≥100)
D = Leg ≤6 Runden
E = Big Fish 170
F = Bullseye Finish
```

Beispiel:
```
Team           | 180er | High Finish | Leg ≤6 | Big Fish | Bullseye
Bayern Allstars|   3   |      2      |   1    |    0     |    1
Dart Könige    |   1   |      1      |   0    |    0     |    2
```

**Wichtig:** Teamnamen exakt wie in den Ergebnis-Tabs!

---

### **Variante B: Automatisch per Apps Script** ⚡

**Erstellt und füllt den Tab automatisch mit allen Teams!**

1. **Apps Script öffnen:**
   - In Google Sheets: **Erweiterungen → Apps Script**

2. **Neue Datei erstellen:**
   - Klick auf **+** → "Script"
   - Name: `sidebets_setup`

3. **Code einfügen:**

```javascript
function setupSideBetsTab() {
  const ss = SpreadsheetApp.getActive();
  const name = 'Side-Bets';
  const sh = ss.getSheetByName(name) || ss.insertSheet(name);

  // Header
  sh.clear();
  sh.getRange(1,1,1,6).setValues([[
    'Team','180er','High Finish (≥100)','Leg ≤6','Big Fish 170','Bullseye'
  ]]);

  // Teams aus "LIVE – Teams" holen (Spalte "Bezahlt")
  const shIn = ss.getSheetByName('LIVE – Teams');
  let teams = [];
  if (shIn && shIn.getLastRow()>1) {
    // Suche die Zeile mit "Bezahlt" Header
    const data = shIn.getDataRange().getValues();
    let startRow = data.findIndex(row => row[0] === 'Bezahlt');
    if (startRow > -1) {
      for (let i = startRow + 1; i < data.length; i++) {
        const team = String(data[i][0] || '').trim();
        if (team) teams.push(team);
      }
    }
  }

  if (teams.length){
    const rows = teams.map(t => [t,0,0,0,0,0]);
    sh.getRange(2,1, rows.length, 6).setValues(rows);
  }

  // Formatierung/Validierung
  const last = Math.max(teams.length, 30) + 1;
  const numRule = SpreadsheetApp.newDataValidation().requireNumberGreaterThanOrEqualTo(0).build();
  sh.getRange(2,2,last,5).setDataValidation(numRule); // nur Zahlen ≥0
  sh.setFrozenRows(1);
  sh.autoResizeColumns(1,6);

  SpreadsheetApp.getUi().alert('✅ Side-Bets Tab ist bereit! Zähler einfach hochzählen, der Monitor zeigt sie live.');
}

// (Optional) ins Menü hängen
function onOpen(){
  SpreadsheetApp.getUi()
    .createMenu('🎯 Turnier')
    .addItem('Side-Bets Tab anlegen','setupSideBetsTab')
    .addToUi();
}
```

4. **Speichern:** Strg+S / Cmd+S

5. **Ausführen:**
   - **Oben:** Funktion `setupSideBetsTab` auswählen
   - **Klick:** ▶️ Ausführen
   - **Berechtigung erteilen** (beim ersten Mal)

6. **Fertig!** 🎉
   - Tab "Side-Bets" ist da
   - Alle Teams sind gelistet
   - Zähler auf 0

**Danach:**
- Im Sheets-Menü: **🎯 Turnier → Side-Bets Tab anlegen**
- Jederzeit erneut ausführbar (z.B. wenn neue Teams dazukommen)

**Der Monitor zeigt automatisch:**
- 🥃 **Top 180er** (wer hat die meisten)
- 💯 **Top High Finish** (≥100)
- ⚡ **Top Schnell-Leg** (≤6 Runden)
- 🐟 **Big Fish 170** (170er Checkout)
- 🎯 **Top Bullseye** Finish

**Nur Top-Performer werden angezeigt!**

---

## 💡 Tipps

1. **Teamnamen konsistent:** Genau gleiche Schreibweise in Ergebnis- und Tabellen-Tabs
2. **Status immer setzen:** Monitor zeigt nur Matches mit Status
3. **Scores als Zahlen:** Legs als `0`, `1`, `2` eingeben (nicht als Text)
4. **Best of 3:** Match ist fertig bei Score `2:0`, `2:1` oder `0:2`, `1:2`
5. **Side-Bets live tracken:** Einfach Zahlen erhöhen wenn jemand z.B. eine 180 wirft
