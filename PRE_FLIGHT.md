# 🚀 PRE-FLIGHT CHECKLIST - Final Check vor Event

**5 Minuten vor GO LIVE!**

---

## ✅ 1. Sheet-Namen (exakt mit Gedankenstrich `–`)

### **Erforderliche Tabs:**
- [ ] `Settings` ✅
- [ ] `A – Ergebnisse` ✅ (mit Gedankenstrich!)
- [ ] `B – Ergebnisse` ✅ (mit Gedankenstrich!)
- [ ] `LIVE – Teams` ✅ (für Vorrunde)

### **Auto-erstellt (beim ersten Run):**
- [ ] `Vorrunde – Eingabe` (wird automatisch angelegt)
- [ ] `Score-Log` (wird automatisch angelegt)
- [ ] `Side-Bets` (optional, falls genutzt)

### **Quick-Check:**
```
Apps Script → Funktion: sanityCheck → Ausführen
→ "✅ Sanity-Check OK!" → Alles perfekt!
→ Fehler? → Tab-Namen oder Header prüfen
```

---

## ✅ 2. Settings-Tab konfiguriert

### **Header (Zeile 1):**
```
Board | PIN  | Active | Phase      | AdminPIN
```

### **Beispiel-Daten (ab Zeile 2):**
```
M1    | 1234 | YES    | hauptrunde | ADMIN9999
M2    | 5678 | YES    | hauptrunde | 
M3    | 9012 | YES    | vorrunde   |
```

### **Checks:**
- [ ] **PINs geändert** (nicht 1234!)
- [ ] **Boards aktiv** (Active = YES)
- [ ] **Phase korrekt** (vorrunde oder hauptrunde)
- [ ] **AdminPIN gesetzt** (rot markiert, nur Zeile 2 Spalte E)

---

## ✅ 3. A/B – Ergebnisse vorbereitet

### **Header (Zeile 1):**
```
Match | Board | Team 1 | Team 2 | Legs 1 | Legs 2 | Status
```

### **Beispiel-Matches (ab Zeile 2):**
```
1     | (leer)| Bayern | Eagles | 0      | 0      | Bereit
2     | (leer)| Könige | Hawks  | 0      | 0      | Bereit
```

### **Checks:**
- [ ] **Header exakt** (Match, Board, Team 1, Team 2, Legs 1, Legs 2, Status)
- [ ] **Matches angelegt** (mindestens 1 pro Gruppe)
- [ ] **Board darf leer sein** (Fallback füllt automatisch)
- [ ] **Status = "Bereit"** für neue Matches

### **Quick-Seed:**
```
Apps Script → Funktion: seedExampleMatches → Ausführen
→ Erstellt automatisch 2 Matches pro Gruppe
```

---

## ✅ 4. Apps Script deployed

### **Deployment:**
- [ ] Apps Script Code eingefügt
- [ ] **Gespeichert** (Cmd+S / Ctrl+S)
- [ ] Deploy → **New deployment** (neue Version!)
- [ ] Type: **Web app**
- [ ] Execute as: **Me**
- [ ] Who has access: **Anyone**
- [ ] **URL kopiert**

### **URL in score.html einfügen:**
```javascript
// Zeile 176 in score.html:
const SCRIPT_URL = 'https://script.google.com/macros/s/AKf.../exec';
```

### **Test:**
```
Apps Script → Funktion: setupSettingsSheet → Ausführen
→ Settings-Tab erstellt? ✅
→ Berechtigung erteilt? ✅
```

---

## ✅ 5. QR-Codes vorbereitet

### **URLs für Boards:**
```
M1: https://as2-dartturnier-hochberg.netlify.app/score.html?board=M1
M2: https://as2-dartturnier-hochberg.netlify.app/score.html?board=M2
M3: https://as2-dartturnier-hochberg.netlify.app/score.html?board=M3
M4: https://as2-dartturnier-hochberg.netlify.app/score.html?board=M4
M5: https://as2-dartturnier-hochberg.netlify.app/score.html?board=M5
```

### **QR-Code Generator:**
- https://www.qr-code-generator.com/
- https://qrcode.tec-it.com/

### **Checks:**
- [ ] **QR-Codes generiert** für alle Boards
- [ ] **Gedruckt & laminiert**
- [ ] **An Boards befestigt**

### **Test:**
- [ ] QR scannen → score.html lädt ✅
- [ ] **Falscher PIN** → "Falscher PIN" Fehler ✅
- [ ] **Richtiger PIN** → View lädt ✅

---

## 🧪 LETZTER MINI-TEST (2 Minuten)

### **Test 1: Board-Fallback**
```
1. Sheet "A – Ergebnisse" öffnen
2. Match mit LEEREM Board anlegen (z.B. Match 99)
3. score.html?board=M1 öffnen, PIN eingeben
4. Score für Match 99 eintragen
5. Zurück zum Sheet
→ Board-Spalte ist jetzt "M1"? ✅
```

### **Test 2: Downgrade-Sperre**
```
1. Match auf 2:0 beenden
2. Versuche Score auf 1:0 zu ändern
→ "Match ist bereits abgeschlossen" Fehler? ✅
```

### **Test 3: 2:2 Block**
```
1. Neues Match öffnen
2. Versuche 2:2 einzutragen
→ "Best of 3: 2:2 ist nicht erlaubt" Fehler? ✅
```

### **Test 4: Rate-Limit**
```
1. Score eintragen
2. SOFORT nochmal eintragen (< 3 Sekunden)
→ "Bitte kurz warten" Fehler? ✅
3. 3 Sekunden warten
→ Jetzt funktioniert es? ✅
```

---

## 📋 EVENT-WORKFLOW (Ultra-kurz)

### **Phase 1: Vorrunde** 🎯
```
1. Settings → Phase = "vorrunde"
2. Teams scannen QR-Code
3. Team auswählen, Legs (7-14) eintragen
4. Daten landen in "Vorrunde – Eingabe"
```

### **Phase 2: Gruppen erstellen** 📊
```
1. Aus Vorrunden-Daten Gruppen bilden
2. Settings → Phase = "hauptrunde"
3. Matches in "A – Ergebnisse" und "B – Ergebnisse" eintragen
```

### **Phase 3: Hauptrunde** 🏆
```
1. Teams scannen QR-Code am Board
2. Score (0/1/2) für beide Teams eintragen
3. Status springt automatisch: Bereit → Läuft → Fertig
4. Monitor zeigt live an (30s Refresh)
```

### **Notfall: Admin-Override** 🆘
```
Nur wenn wirklich nötig:
1. Apps Script Editor öffnen
2. Funktion apiAdminSetScore anpassen
3. Mit AdminPIN ausführen
→ Überschreibt alle Sperren!
```

---

## 🔍 SANITY-CHECK SUMMARY

### **Automatischer Check:**
```javascript
// Apps Script ausführen:
sanityCheck()

// Prüft:
✅ Alle Pflicht-Tabs vorhanden
✅ Header in A/B – Ergebnisse korrekt
✅ Settings-Header korrekt
✅ Gedankenstriche (–) konsistent
```

---

## ✅ GO / NO-GO Decision

### **GO wenn:**
- [x] Alle 5 Pre-Flight Checks ✅
- [x] Sanity-Check durchgelaufen ✅
- [x] Mini-Tests bestanden ✅
- [x] QR-Codes funktionieren ✅
- [x] Monitor läuft ✅

### **NO-GO wenn:**
- [ ] Tabs fehlen oder falsch benannt
- [ ] Header nicht exakt
- [ ] Apps Script nicht deployed
- [ ] PINs nicht geändert
- [ ] Tests schlagen fehl

---

## 🎯 FINALER STATUS

**Wenn alle Checks ✅:**

```
╔════════════════════════════════════╗
║   🚀 READY FOR TAKE-OFF! 🚀       ║
║                                    ║
║   System: PRODUCTION-READY         ║
║   Security: 12 LAYERS ACTIVE       ║
║   Tests: ALL PASSED                ║
║   Docs: COMPLETE                   ║
║                                    ║
║   → LET'S GO! 🎯🍺🚀              ║
╚════════════════════════════════════╝
```

---

## 📞 Support-Kontakte

### **Während Event:**
- Sheet-Backup: Einer hat Laptop offen
- Admin-Override: AdminPIN bereit halten
- Monitor: Läuft auf TV/Beamer
- Fallback: Bei WLAN-Ausfall → direkt ins Sheet

### **Troubleshooting:**
- **"Falscher PIN"** → Settings-Tab: PIN prüfen
- **"Match nicht gefunden"** → Board-Name im Sheet prüfen
- **"Score wird nicht gespeichert"** → Apps Script deployed?
- **Monitor zeigt nichts** → 30s warten oder F5

---

## 🎉 FINAL GO!

**Alles bereit?** → **START THE TOURNAMENT! 🎯🍺**
