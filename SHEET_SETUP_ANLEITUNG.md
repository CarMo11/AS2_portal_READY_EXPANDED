# 🚀 GOOGLE SHEETS KOMPLETT-SETUP - Anleitung

## ⚡ In 3 Minuten alles fertig!

---

## 📋 SCHRITT 1: Sheet vorbereiten (30 Sek)

### **Was du BEHALTEN sollst:**
- ✅ **"LIVE – Teams"** Tab (mit Formular-Antworten)
- ✅ Alle anderen Tabs kannst du löschen (werden neu erstellt)

### **Tabs die GELÖSCHT werden können:**
- Settings
- A – Ergebnisse / B – Ergebnisse
- A – Tabelle / B – Tabelle
- Vorrunde – Eingabe
- Score-Log
- Alle anderen außer "LIVE – Teams"

**→ Du musst sie NICHT löschen, das Script überschreibt sie automatisch!**

---

## 📋 SCHRITT 2: Apps Script öffnen (30 Sek)

```
1. Google Sheets öffnen
2. Erweiterungen → Apps Script
3. Neues Script erstellen (oder bestehendes löschen)
```

---

## 📋 SCHRITT 3: Setup-Code einfügen (1 Min)

### **Code kopieren:**
```
1. Datei öffnen: COMPLETE_SHEET_SETUP.gs
2. ALLES markieren (Cmd+A / Ctrl+A)
3. Kopieren (Cmd+C / Ctrl+C)
```

### **Code einfügen:**
```
1. Apps Script Editor
2. ALLES ersetzen (alten Code löschen)
3. Einfügen (Cmd+V / Ctrl+V)
4. Speichern (Cmd+S / Ctrl+S)
   → Namen: "AS2_Dart_Setup" (egal)
```

---

## 📋 SCHRITT 4: Setup ausführen (1 Min)

### **Funktion ausführen:**
```
1. Funktion auswählen: setupCompleteWorksheet
2. Ausführen (▶️)
3. Berechtigung erteilen (beim ersten Mal)
   → "Erweitert" → "Zu ... wechseln" → "Zulassen"
4. Dialog: "Setup starten?" → JA
5. Warten (~10 Sekunden)
6. ✅ "Setup abgeschlossen!"
```

---

## ✅ WAS WURDE ERSTELLT?

### **Tabs:**
```
✅ Settings           → PINs, Phase, AdminPIN
✅ A – Ergebnisse     → Matches Gruppe A
✅ B – Ergebnisse     → Matches Gruppe B
✅ A – Tabelle        → Tabelle Gruppe A (mit Formeln!)
✅ B – Tabelle        → Tabelle Gruppe B (mit Formeln!)
✅ Vorrunde – Eingabe → Legs 7-14 (automatisch gefüllt)
✅ Score-Log          → Audit-Trail (automatisch gefüllt)
✅ LIVE – Teams       → Bleibt erhalten (Formular-Daten)
```

### **Features:**
```
✅ Header perfekt gesetzt
✅ Formatierung (Farben, Fett, etc.)
✅ Dropdowns (Status, Board)
✅ Bedingte Formatierung (Bereit=Grau, Läuft=Orange, Fertig=Grün)
✅ Formeln in Tabelle (Siege, Legs+/-, Diff)
✅ Beispiel-Daten (3 Matches, 6 Teams)
✅ Spaltenbreiten optimiert
✅ Zentrierung korrekt
```

---

## 📋 SCHRITT 5: PINs & Daten anpassen (2 Min)

### **1. Settings-Tab:**
```
Zeile 2-6:
Board | PIN  | Active | Phase
M1    | 1234 | YES    | hauptrunde  ← PINs ÄNDERN!
M2    | 1234 | YES    | hauptrunde  ← PINs ÄNDERN!
M3    | 1234 | YES    | hauptrunde  ← PINs ÄNDERN!
M4    | 1234 | YES    | vorrunde
M5    | 1234 | YES    | vorrunde

Spalte E (rot):
AdminPIN: ADMIN9999  ← ÄNDERN!
```

### **2. A/B – Ergebnisse:**
```
Beispiel-Matches löschen oder anpassen:
Match | Board | Team 1       | Team 2      | Legs 1 | Legs 2 | Status
1     |       | Team Alpha   | Team Beta   | 0      | 0      | Bereit
2     |       | Team Gamma   | Team Delta  | 0      | 0      | Bereit

→ Eigene Matches eintragen
→ Board kann leer bleiben (Fallback!)
```

### **3. A/B – Tabelle:**
```
Beispiel-Teams anpassen:
Team           | Siege | Legs+ | Legs– | Diff
Team Alpha     | 0     | 0     | 0     | 0
Team Beta      | 0     | 0     | 0     | 0

→ Teams aus "LIVE – Teams" kopieren
→ Formeln NICHT ändern (berechnen automatisch!)
```

---

## 🎯 BONUS: Menü im Sheet!

### **Nach Reload erscheint:**
```
🎯 AS2 Dart (Menü oben)
  ├─ 🚀 Komplett-Setup      ← Nochmal ausführen
  ├─ ✅ Sanity-Check        ← Tabs prüfen
  └─ 📖 Anleitung           ← Hilfe anzeigen
```

**Sanity-Check ausführen:**
```
🎯 AS2 Dart → ✅ Sanity-Check
→ "Sanity-Check OK!" ✅ → Alles perfekt!
→ Fehler? → Screenshot schicken!
```

---

## 🧪 SCHRITT 6: Quick-Test (1 Min)

### **Test 1: Tabs vorhanden?**
```
Unten im Sheet:
[Settings] [A – Ergebnisse] [B – Ergebnisse] [A – Tabelle] [B – Tabelle] [LIVE – Teams] [Vorrunde – Eingabe] [Score-Log]
```

### **Test 2: Header korrekt?**
```
"A – Ergebnisse" Zeile 1:
Match | Board | Team 1 | Team 2 | Legs 1 | Legs 2 | Status
```

### **Test 3: Formatierung?**
```
• Header grün (#00dca6)
• AdminPIN rot (#ff6161)
• Dropdowns in Spalte G (Status)
• Beispiel-Daten vorhanden
```

### **Test 4: Formeln?**
```
"A – Tabelle" Spalte B (Siege):
=SUMPRODUCT(('A – Ergebnisse'!C:C=A2)*...
→ Formel sichtbar? ✅
```

---

## 🚀 SCHRITT 7: Apps Script Web-App deployen

### **Backend aktivieren:**
```
1. Apps Script Editor
2. Kompletten Code aus APPS_SCRIPT_Code.gs kopieren
3. Einfügen (NACH dem Setup-Code oder separates Script)
4. Deploy → New deployment
5. Type: Web app
6. Execute as: Me
7. Who has access: Anyone
8. Deploy → URL kopieren
```

### **URL in score.html:**
```javascript
// Zeile 176:
const SCRIPT_URL = 'https://script.google.com/macros/s/AKfyc.../exec';
```

---

## ✅ CHECKLISTE

### **Vor dem Turnier:**
- [ ] Setup-Script ausgeführt
- [ ] Sanity-Check bestanden
- [ ] PINs geändert (nicht 1234!)
- [ ] AdminPIN geändert (nicht ADMIN9999!)
- [ ] Matches eingetragen (A/B Ergebnisse)
- [ ] Teams eingetragen (A/B Tabelle)
- [ ] LIVE – Teams hat Formular-Daten
- [ ] Apps Script deployed (Web-App)
- [ ] URL in score.html eingefügt
- [ ] QR-Codes erstellt & gedruckt

### **Wenn alles ✅:**
```
╔════════════════════════════════════╗
║  🎯 SHEETS READY! 🎯              ║
║                                    ║
║  Setup: COMPLETE                   ║
║  Tabs: ALL CREATED                 ║
║  Formatting: PERFECT               ║
║  Formulas: WORKING                 ║
║                                    ║
║  → READY FOR EVENT! 🚀🍺          ║
╚════════════════════════════════════╝
```

---

## 🆘 TROUBLESHOOTING

### **"Script-Fehler beim Ausführen"**
```
→ Code komplett kopiert?
→ Berechtigung erteilt?
→ Funktion "setupCompleteWorksheet" gewählt?
```

### **"Tabs werden nicht erstellt"**
```
→ Berechtigung für Sheets erteilt?
→ Sheet ist nicht schreibgeschützt?
→ Nochmal ausführen (überschreibt bestehende)
```

### **"Formeln funktionieren nicht"**
```
→ Tab-Namen exakt? (mit Gedankenstrich –)
→ Header korrekt? (Match, Board, Team 1, ...)
→ Sanity-Check ausführen
```

### **"AdminPIN nicht rot"**
```
→ Normal, wenn Settings-Tab schon existierte
→ Manuell formatieren: Zeile 2, Spalte E
→ Hintergrund: #ff6161, Schrift: #ffffff
```

---

## 🎉 FERTIG!

**Alles eingerichtet?**
→ **Weiter mit Score-App Setup!**
→ **Siehe: SCORE_SETUP.md**

**Probleme?**
→ **Sanity-Check ausführen**
→ **Screenshot schicken**
→ **Ich helfe weiter! 💪**
