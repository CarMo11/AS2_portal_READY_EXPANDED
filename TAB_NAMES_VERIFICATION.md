# ✅ TAB-NAMEN VERIFICATION - Final Check

## 📊 Erforderliche Tabs (1:1 Copy-Paste)

### **EXAKTE Namen (mit Gedankenstrich `–` = U+2013):**

```
Settings
A – Ergebnisse
B – Ergebnisse
A – Tabelle
B – Tabelle
LIVE – Teams
```

### **Auto-erstellt beim ersten Run:**
```
Vorrunde – Eingabe
Score-Log
Side-Bets (optional)
```

---

## 🔍 Gedankenstrich vs. Bindestrich

### **RICHTIG (Gedankenstrich):**
```
A – Ergebnisse   ✅ (Unicode U+2013 EN DASH)
```

### **FALSCH (Bindestrich):**
```
A - Ergebnisse   ❌ (Unicode U+002D HYPHEN-MINUS)
```

### **Wie erkenne ich den Unterschied?**
- **Gedankenstrich:** Breiter, mehr Abstand → `–`
- **Bindestrich:** Schmaler, weniger Abstand → `-`

### **Copy-Paste Test:**
```
Gedankenstrich: –
Bindestrich: -

Vergleich:
A – Ergebnisse (richtig)
A - Ergebnisse (falsch)
```

---

## 📋 Header-Definitionen

### **"A – Ergebnisse" / "B – Ergebnisse":**
```
Spalte A: Match
Spalte B: Board
Spalte C: Team 1
Spalte D: Team 2
Spalte E: Legs 1
Spalte F: Legs 2
Spalte G: Status
```

### **"A – Tabelle" / "B – Tabelle":**
```
Spalte A: Team
Spalte B: Siege
Spalte C: Legs+
Spalte D: Legs–
Spalte E: Diff
```

### **"Settings":**
```
Spalte A: Board
Spalte B: PIN
Spalte C: Active
Spalte D: Phase
Spalte E: AdminPIN
```

### **"LIVE – Teams":**
```
Spalte A: Bezahlt (Team-Namen darunter)
```

---

## 🧪 Sanity-Check Funktion

### **Apps Script ausführen:**
```javascript
sanityCheck()
```

### **Prüft automatisch:**
- ✅ Tab "Settings" vorhanden
- ✅ Tab "A – Ergebnisse" vorhanden
- ✅ Tab "B – Ergebnisse" vorhanden
- ✅ Header in "A – Ergebnisse" korrekt
- ✅ Header in "B – Ergebnisse" korrekt
- ✅ Header in "Settings" korrekt
- ✅ Gedankenstrich (–) wird erkannt

### **Erfolg:**
```
✅ Sanity-Check OK!

Alle Tabs und Header sind korrekt.
```

### **Fehler-Beispiele:**
```
❌ Fehlende Sheets: A - Ergebnisse
→ Lösung: Tab mit Gedankenstrich (–) erstellen

❌ Header in "A – Ergebnisse" unerwartet
→ Lösung: Header exakt wie oben angegeben setzen
```

---

## 🔧 Schnell-Fix wenn Tabs falsch benannt

### **Option 1: Tabs umbenennen (empfohlen)**
```
1. Tab rechtsklick → Umbenennen
2. Aus Copy-Paste oben den exakten Namen einfügen
3. sanityCheck() erneut ausführen
```

### **Option 2: Code anpassen (nicht empfohlen)**
```javascript
// In APPS_SCRIPT_Code.gs ändern:
const CONFIG = {
  A_ERGEBNISSE: 'A - Ergebnisse',  // Bindestrich statt Gedankenstrich
  B_ERGEBNISSE: 'B - Ergebnisse',  // Bindestrich statt Gedankenstrich
  ...
}
```

---

## 📸 Screenshot-Guide

### **Wie sieht's richtig aus?**

**Tabs am unteren Rand:**
```
[Settings] [A – Ergebnisse] [B – Ergebnisse] [A – Tabelle] [B – Tabelle] [LIVE – Teams]
```

**Header in "A – Ergebnisse":**
```
| Match | Board | Team 1 | Team 2 | Legs 1 | Legs 2 | Status |
|-------|-------|--------|--------|--------|--------|--------|
|   1   |       | Bayern | Eagles |   0    |   0    | Bereit |
```

---

## ✅ FINAL GO Confirmation

### **Checklist:**
- [ ] Alle 6 Tabs mit Gedankenstrich (–) vorhanden
- [ ] Header exakt wie definiert
- [ ] `sanityCheck()` läuft ohne Fehler
- [ ] Apps Script deployed
- [ ] QR-Codes funktionieren

### **Wenn alle Checks ✅:**

```
╔══════════════════════════════════════╗
║  🎯 TAB-NAMEN: VERIFIED & READY! 🎯  ║
║                                      ║
║  Alle Tabs korrekt benannt           ║
║  Gedankenstriche konsistent          ║
║  Header verifiziert                  ║
║  Apps Script kompatibel              ║
║                                      ║
║  → FINAL GO! 🚀🍺                   ║
╚══════════════════════════════════════╝
```

---

## 💯 Quick Copy-Paste für neue Tabs

### **Tab-Namen (direkt copy-pasten):**
```
Settings
```
```
A – Ergebnisse
```
```
B – Ergebnisse
```
```
A – Tabelle
```
```
B – Tabelle
```
```
LIVE – Teams
```

**Einfach markieren, Cmd+C / Ctrl+C, dann beim Umbenennen einfügen!**

---

## 🎉 READY!

**Tab-Namen verifiziert?** → **System ist GO! 🚀**
