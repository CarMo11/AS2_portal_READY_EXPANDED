# 🚀 DEPLOYMENT GUIDE - Komplett-Anleitung

## 📦 Was gehört wohin?

### **2 verschiedene Scripts für Apps Script:**

| Script | Zweck | Wann ausführen? |
|--------|-------|-----------------|
| **COMPLETE_SHEET_SETUP.gs** | Erstellt alle Tabs | **1× am Anfang** |
| **APPS_SCRIPT_Code.gs** | Backend für Score-App | **Immer aktiv (deployed)** |

---

## 🎯 WORKFLOW (Step-by-Step)

### **PHASE 1: Sheets aufsetzen (3 Min)**

#### **1.1 Setup-Script einfügen:**
```
1. Google Sheets öffnen
2. Erweiterungen → Apps Script
3. COMPLETE_SHEET_SETUP.gs komplett kopieren
4. Einfügen
5. Speichern
```

#### **1.2 Setup ausführen:**
```
1. Funktion: setupCompleteWorksheet
2. Ausführen (▶️)
3. Berechtigung erteilen
4. Warten
5. ✅ "Setup abgeschlossen!"
```

#### **1.3 Ergebnis prüfen:**
```
✅ Settings vorhanden
✅ A/B – Ergebnisse vorhanden
✅ A/B – Tabelle vorhanden
✅ Header korrekt
✅ Formatierung perfekt
```

---

### **PHASE 2: Backend deployen (5 Min)**

#### **2.1 Backend-Code einfügen:**

**OPTION A: Separates Script (empfohlen)**
```
1. Apps Script Editor
2. Neues Script erstellen (+ Symbol)
3. Namen: "API_Backend"
4. APPS_SCRIPT_Code.gs komplett kopieren
5. Einfügen
6. Speichern
```

**OPTION B: Im gleichen Script**
```
1. Apps Script Editor (bestehendes)
2. UNTER dem Setup-Code einfügen
3. Oder: Alten Setup-Code löschen (nur 1× nötig!)
4. APPS_SCRIPT_Code.gs einfügen
5. Speichern
```

#### **2.2 Web-App deployen:**
```
1. Deploy → New deployment
2. Type: Web app
3. Description: "AS2 Score API"
4. Execute as: Me
5. Who has access: Anyone
6. Deploy
7. ✅ URL kopieren!
```

#### **2.3 URL in score.html:**
```javascript
// Zeile 176 in score.html:
const SCRIPT_URL = 'https://script.google.com/macros/s/AKfycbz.../exec';
                    ↑ HIER deine URL einfügen!
```

---

### **PHASE 3: Frontend deployen (2 Min)**

#### **3.1 Netlify Setup:**
```
1. Netlify Account
2. New site from Git → GitHub
3. Repository: AS2_portal_READY_EXPANDED
4. Build: (leer lassen)
5. Publish directory: /
6. Deploy
```

#### **3.2 Custom Domain (optional):**
```
1. Domain settings
2. Add custom domain
3. as2-dartturnier-hochberg.netlify.app
4. DNS konfigurieren
```

#### **3.3 Ergebnis:**
```
✅ score.html live unter:
   https://deine-site.netlify.app/score.html?board=M1
   
✅ monitor.html live unter:
   https://deine-site.netlify.app/monitor.html
```

---

### **PHASE 4: Testen (5 Min)**

#### **4.1 Sanity-Check:**
```
Google Sheets:
🎯 AS2 Dart → ✅ Sanity-Check
→ "Sanity-Check OK!" ✅
```

#### **4.2 PIN-Test:**
```
1. score.html?board=M1 öffnen
2. Falscher PIN: "Falscher PIN" ✅
3. Richtiger PIN: View lädt ✅
```

#### **4.3 Score-Test:**
```
Vorrunde:
1. Phase = "vorrunde" (Settings)
2. Team wählen
3. Legs 7 eintragen
4. ✅ Landet in "Vorrunde – Eingabe"

Hauptrunde:
1. Phase = "hauptrunde" (Settings)
2. Match in "A – Ergebnisse" anlegen
3. Score 1:0 eintragen
4. ✅ Sheet aktualisiert sich
5. ✅ Board automatisch gesetzt
```

#### **4.4 Monitor-Test:**
```
1. monitor.html öffnen
2. Scores angezeigt? ✅
3. F5 → Update? ✅
4. Auto-Refresh (30s)? ✅
```

---

## 📋 CHECKLISTE (Copy-Paste)

### **Google Sheets:**
- [ ] Setup-Script ausgeführt
- [ ] Tabs erstellt (Settings, A/B Ergebnisse, etc.)
- [ ] PINs geändert (nicht 1234!)
- [ ] AdminPIN geändert (rot markiert)
- [ ] Sanity-Check bestanden

### **Apps Script:**
- [ ] Backend-Code eingefügt (APPS_SCRIPT_Code.gs)
- [ ] Web-App deployed
- [ ] URL kopiert
- [ ] Berechtigung "Anyone" gesetzt

### **score.html:**
- [ ] Apps Script URL eingefügt (Zeile 176)
- [ ] Auf Netlify deployed
- [ ] URL funktioniert

### **Tests:**
- [ ] PIN-Check funktioniert
- [ ] Vorrunde: Score-Eingabe OK
- [ ] Hauptrunde: Score-Eingabe OK
- [ ] Board-Fallback funktioniert
- [ ] Monitor zeigt Daten an

### **QR-Codes:**
- [ ] URLs generiert (score.html?board=M1...)
- [ ] QR-Codes erstellt
- [ ] Gedruckt & laminiert
- [ ] An Boards befestigt

---

## 🎯 FINALE STRUKTUR

### **Apps Script Editor:**
```
Code.gs (oder mehrere Scripts)
├─ COMPLETE_SHEET_SETUP.gs  ← 1× ausführen, dann egal
└─ APPS_SCRIPT_Code.gs      ← Deployed als Web-App
```

### **Google Sheets Tabs:**
```
[Settings]
[A – Ergebnisse] [B – Ergebnisse]
[A – Tabelle] [B – Tabelle]
[LIVE – Teams]
[Vorrunde – Eingabe]
[Score-Log]
```

### **Netlify Deployment:**
```
Website:
├─ index.html              ← Landing Page
├─ score.html              ← Score-Eingabe ⭐
├─ monitor.html            ← Live-Monitor ⭐
└─ dartturnier.ics         ← Kalender
```

---

## 🔗 URL-ÜBERSICHT

### **Produktion:**
```
Score-App:
https://deine-site.netlify.app/score.html?board=M1
https://deine-site.netlify.app/score.html?board=M2
https://deine-site.netlify.app/score.html?board=M3

Monitor:
https://deine-site.netlify.app/monitor.html

Landing:
https://deine-site.netlify.app/

Apps Script API:
https://script.google.com/macros/s/AKfycbz.../exec
```

---

## 🆘 TROUBLESHOOTING

### **"Setup-Script Fehler"**
```
→ COMPLETE_SHEET_SETUP.gs komplett kopiert?
→ Berechtigung erteilt?
→ Funktion "setupCompleteWorksheet" gewählt?
→ Sheet nicht schreibgeschützt?
```

### **"Apps Script 404"**
```
→ Deployed als Web-App?
→ "Who has access" = Anyone?
→ Neue Version deployed? (nach Änderungen!)
→ URL in score.html korrekt?
```

### **"Score wird nicht gespeichert"**
```
→ Apps Script deployed?
→ URL in score.html korrekt?
→ PIN richtig?
→ Match im Sheet vorhanden?
→ Status = "Bereit" oder "Läuft"?
```

### **"Monitor zeigt nichts"**
```
→ Matches in A/B – Ergebnisse?
→ Sheet-Name korrekt (mit –)?
→ 30s warten oder F5
→ Browser-Console prüfen
```

### **"Formeln in Tabelle kaputt"**
```
→ Tab-Namen exakt? (A – Ergebnisse)
→ Header korrekt?
→ Sanity-Check ausführen
→ Notfalls: Setup nochmal ausführen
```

---

## ✅ GO-LIVE CHECKLIST

### **1 Stunde vorher:**
- [ ] Alle Tests durchgeführt
- [ ] QR-Codes an Boards
- [ ] Monitor auf TV/Beamer
- [ ] Laptop mit Sheets offen (Backup)
- [ ] Admin-PIN bereit

### **Bei Event-Start:**
- [ ] Settings: Phase = "vorrunde"
- [ ] Teams scannen QR-Codes
- [ ] Monitor läuft (Auto-Refresh)

### **Nach Vorrunde:**
- [ ] Gruppen bilden (aus Vorrunden-Daten)
- [ ] Settings: Phase = "hauptrunde"
- [ ] Matches in A/B Ergebnisse eintragen
- [ ] Teams in A/B Tabelle eintragen

### **Während Hauptrunde:**
- [ ] Teams scannen QR am Board
- [ ] Scores werden automatisch gespeichert
- [ ] Monitor zeigt live an
- [ ] Bei Problemen: Admin-Override

---

## 🎉 READY!

```
╔════════════════════════════════════════╗
║  🚀 COMPLETE DEPLOYMENT READY! 🚀     ║
║                                        ║
║  ✅ Sheets: CONFIGURED                 ║
║  ✅ Backend: DEPLOYED                  ║
║  ✅ Frontend: LIVE                     ║
║  ✅ Tests: PASSED                      ║
║  ✅ QR-Codes: READY                    ║
║                                        ║
║  → LET'S GO LIVE! 🎯🍺🚀             ║
╚════════════════════════════════════════╝
```

**Alle Systeme GO!** → **TURNIER KANN STARTEN!** 🎯
