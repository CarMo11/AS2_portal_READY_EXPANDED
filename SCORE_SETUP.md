# 📱 Self-Service Score-Eingabe - Setup Guide

## 🎯 Was ist das?

Teams können ihre Scores selbst eintragen via QR-Code → **massiv** weniger Arbeit für die Turnierleitung!

**Funktioniert für:**
- ✅ Vorrunde (Team wählt sich, trägt Legs 7-14 ein)
- ✅ Hauptrunde (Match wird automatisch geladen, Score 0-2)

---

## 🚀 Installation (15 Minuten)

### **Schritt 1: Apps Script deployen**

1. **Google Sheets öffnen**
2. **Erweiterungen → Apps Script**
3. **Code.gs öffnen** (oder neue Datei erstellen)
4. **Inhalt von `APPS_SCRIPT_Code.gs` komplett kopieren**
5. **Einfügen** (alles ersetzen)
6. **Speichern** (Strg+S / Cmd+S)

7. **Deploy als Web-App:**
   ```
   Deploy → New deployment
   → Type: Web app
   → Execute as: Me
   → Who has access: Anyone
   → Deploy
   ```

8. **URL kopieren** (sieht aus wie: `https://script.google.com/macros/s/.../exec`)

---

### **Schritt 2: score.html anpassen**

1. **`score.html` öffnen**
2. **Zeile 176 suchen:**
   ```javascript
   const SCRIPT_URL = 'YOUR_APPS_SCRIPT_URL_HERE';
   ```
3. **URL aus Schritt 1 einfügen:**
   ```javascript
   const SCRIPT_URL = 'https://script.google.com/macros/s/.../exec';
   ```
4. **Speichern**

---

### **Schritt 3: Settings-Tab erstellen**

1. **Apps Script noch offen?** Gut!
2. **Oben:** Funktion `setupSettingsSheet` auswählen
3. **Klick:** ▶️ Ausführen
4. **Berechtigung erteilen** (beim ersten Mal)
5. **Fertig!** → Tab "Settings" ist da

**Tab sieht so aus:**
```
Board | PIN  | Active | Phase
M1    | 1234 | YES    | hauptrunde
M2    | 1234 | YES    | hauptrunde
M3    | 1234 | YES    | vorrunde
M4    | 1234 | YES    | vorrunde
M5    | 1234 | YES    | vorrunde
```

**⚠️ WICHTIG:** PINs ändern vor dem Turnier!

---

### **Schritt 4: score.html deployen**

**Option A: Netlify (wie Monitor)**
```bash
# score.html ist schon im Projekt
npx netlify deploy --prod
```
→ URL: `https://as2-dartturnier-hochberg.netlify.app/score.html`

**Option B: Google Drive**
1. score.html auf Google Drive hochladen
2. Freigabe: "Jeder mit Link"
3. Link kopieren

---

### **Schritt 5: QR-Codes generieren**

**Für jeden Board einen QR-Code mit:**
```
Board M1: https://as2-dartturnier-hochberg.netlify.app/score.html?board=M1
Board M2: https://as2-dartturnier-hochberg.netlify.app/score.html?board=M2
Board M3: https://as2-dartturnier-hochberg.netlify.app/score.html?board=M3
...
```

**Tool:** https://www.qr-code-generator.com/

**Drucken & laminieren** → an Boards befestigen!

---

## 🎮 Wie Teams es nutzen:

### **Vorrunde:**
```
1. QR-Code scannen
2. PIN eingeben (z.B. 1234)
3. Team auswählen
4. Legs auswählen (7-14)
5. "Eintragen" klicken
6. Fertig! ✅
```

### **Hauptrunde:**
```
1. QR-Code scannen
2. PIN eingeben
3. Match wird automatisch geladen
4. Scores auswählen (0-2 für beide Teams)
5. "Eintragen" klicken
6. Fertig! ✅
```

---

## 🔒 Sicherheit & Guardrails:

### **Was automatisch verhindert wird:**

✅ **Falscher PIN** → Zugriff verweigert  
✅ **2:2 Score** → Blockiert (Best of 3)  
✅ **Fertiges Match** → Kann nicht überschrieben werden  
✅ **Ungültige Werte** → Nur 0-2 (Haupt) oder 7-14 (Vor) erlaubt  
✅ **Doppeltes Submit** → Button wird gesperrt während Speichern  

### **Was im Log steht:**

Tab "Score-Log" wird automatisch erstellt:
```
Timestamp | Phase | Board | Team1 | Team2 | Old Score | New Score | User
12:34     | Haupt | M1    | Bayern| Eagles| 0:0       | 1:0       | M1
12:35     | Haupt | M1    | Bayern| Eagles| 1:0       | 2:0       | M1
```

→ **Volle Transparenz!** Ihr könnt jederzeit nachvollziehen wer was eingetragen hat.

---

## ⚙️ Settings-Tab erklärt:

### **Spalten:**

| Spalte | Bedeutung | Werte |
|--------|-----------|-------|
| Board | Board-Name | M1, M2, M3... |
| PIN | Zugangscode | 4-6 Ziffern |
| Active | Board aktiv? | YES / NO |
| Phase | Turnier-Phase | vorrunde / hauptrunde |

### **Beispiel-Konfiguration:**

**Vorrunde läuft:**
```
M1 | 1234 | YES | vorrunde
M2 | 5678 | YES | vorrunde
M3 | 9012 | YES | vorrunde
M4 | 3456 | NO  | vorrunde   ← Board außer Betrieb
```

**Hauptrunde läuft:**
```
M1 | 1234 | YES | hauptrunde
M2 | 5678 | YES | hauptrunde
```

→ **Einfach in Settings ändern, sofort aktiv!**

---

## 🧪 Testen vor dem Turnier:

### **Test-Checkliste:**

1. ☐ **PIN-Test:**
   - Falscher PIN → Fehlermeldung?
   - Richtiger PIN → Weiter?

2. ☐ **Vorrunde-Test:**
   - Team auswählen funktioniert?
   - Legs 7-14 wählbar?
   - Score landet in "Vorrunde – Eingabe"?

3. ☐ **Hauptrunde-Test:**
   - Match wird korrekt geladen?
   - Score 0-2 wählbar?
   - 2:2 wird blockiert?
   - Score landet in "A/B – Ergebnisse"?
   - Status ändert sich automatisch?

4. ☐ **Monitor-Test:**
   - Eingetragene Scores erscheinen nach 30s?
   - Side-Bets werden geladen?

5. ☐ **Log-Test:**
   - Eintrag erscheint in "Score-Log"?

---

## 🛠️ Troubleshooting:

### **"Falscher PIN" obwohl PIN stimmt**
→ Settings-Tab: PIN für Board prüfen (Leerzeichen?)

### **"Match nicht gefunden"**
→ Ergebnis-Tab: Board-Name exakt gleich? (M1 vs. m1)

### **"Score wird nicht gespeichert"**
→ Apps Script: Deployment als "Anyone" freigegeben?

### **"Match ist bereits abgeschlossen"**
→ Korrekt! Ihr müsst im Sheet manuell Status ändern (Fertig → Läuft)

### **Monitor zeigt Score nicht**
→ 30s warten (Auto-Refresh) oder F5 drücken

---

## 📊 Welche Sheets werden verwendet?

### **Gelesen:**
- ✅ `Settings` (PINs & Phase)
- ✅ `LIVE – Teams` (Team-Liste für Vorrunde)
- ✅ `A – Ergebnisse` (Matches Gruppe A)
- ✅ `B – Ergebnisse` (Matches Gruppe B)

### **Geschrieben:**
- ✅ `Vorrunde – Eingabe` (wird erstellt wenn nötig)
- ✅ `A – Ergebnisse` (Spalten E, F, G = Legs1, Legs2, Status)
- ✅ `B – Ergebnisse` (Spalten E, F, G)
- ✅ `Score-Log` (wird erstellt, Audit-Log)

**→ Nichts wird gelöscht, alles ist nachvollziehbar!**

---

## 💡 Best Practices:

### **Vor dem Turnier:**
1. ✅ Alle PINs ändern (nicht 1234!)
2. ✅ QR-Codes drucken & laminieren
3. ✅ 2 Test-Matches durchspielen
4. ✅ Team-Briefing: "Scannt QR, tragt Score ein!"

### **Während dem Turnier:**
1. ✅ Eine Person hat Sheet offen für Korrekturen
2. ✅ Monitor läuft im Hintergrund
3. ✅ Teams tragen selbst ein (Hauptweg)
4. ✅ Ihr greift nur bei Problemen ein

### **Fallback:**
- ✅ Sheet bleibt 100% editierbar
- ✅ Ihr könnt jederzeit manuell korrigieren
- ✅ Scores können überschrieben werden (wenn nicht "Fertig")

---

## 🎯 Vorteile auf einen Blick:

| Vorher | Nachher |
|--------|---------|
| Turnierleitung läuft zu jedem Board | Teams tragen selbst ein |
| Zurufe & Missverständnisse | Wer spielt, trägt ein |
| Stau bei der Eingabe | Parallel an allen Boards |
| Verzögerung bis Monitor aktualisiert | Sofort (30s Auto-Refresh) |
| Viel manuelle Arbeit | Massiv entlastet 🎉 |

---

## 📞 Support während Turnier:

**Wenn Teams Probleme haben:**

1. **PIN vergessen?**
   → Ansage: "Board M1 PIN ist 1234"

2. **App lädt nicht?**
   → Internet-Check, oder: Sheet-Backup nutzen

3. **Score falsch eingetragen?**
   → Ihr korrigiert im Sheet (hat Vorrang)

4. **Match schon "Fertig" aber noch nicht zu Ende?**
   → Sheet: Status von "Fertig" → "Läuft" ändern

---

## ✅ Fertig!

**Ihr habt jetzt:**
- 📱 Self-Service Score-Eingabe
- 🔒 Sichere PINs pro Board
- 📊 Vollständiges Audit-Log
- 🎯 Vorrunde & Hauptrunde Support
- 🚀 Massiv weniger Arbeit!

**Let's gooo! 🎯🍺**
