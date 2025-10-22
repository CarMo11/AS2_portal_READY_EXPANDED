# 🚀 AS2 MASTER SETUP - Die ultimative Lösung!

## 🎯 Was ist das?

**Ein einziges Apps Script, das ALLES macht:**
- ✅ Tabs erstellen mit Formatierung
- ✅ Teams automatisch importieren
- ✅ Vorrunden-Tabelle berechnen (automatisch!)
- ✅ Gruppen-Tabellen berechnen (automatisch!)
- ✅ Menü-gesteuert (kein manuelles Rechnen!)
- ✅ Safe to run multiple times

**→ Das beste aus beiden Welten kombiniert!**

---

## 📋 QUICK START (3 Minuten)

### **1. Script einfügen:**
```
1. Google Sheets öffnen
2. Erweiterungen → Apps Script
3. AS2_MASTER_SETUP.gs KOMPLETT kopieren
4. Einfügen (alles ersetzen)
5. Speichern (Cmd+S / Ctrl+S)
6. Sheet neu laden (F5)
```

### **2. Menü erscheint:**
```
Nach Reload siehst du oben:
🎯 AS2 Tools
  ├─ 🚀 Setup/Repair Tabs & Header
  ├─ 📥 Teams in Vorrunde ziehen
  ├─ 🧮 Vorrunde-Tabelle berechnen
  ├─ 🅰️ Gruppe A Tabelle berechnen
  ├─ 🅱️ Gruppe B Tabelle berechnen
  ├─ ♻️ ALLES berechnen (Vor + A/B)
  ├─ ✅ Sanity-Check
  └─ 📖 Hilfe
```

### **3. Setup ausführen:**
```
🎯 AS2 Tools → 🚀 Setup/Repair Tabs & Header
→ Berechtigung erteilen (beim ersten Mal)
→ Warten (~10 Sekunden)
→ ✅ "Setup abgeschlossen!"
```

---

## 🔄 WORKFLOW (Step-by-Step)

### **PHASE 1: Vorrunde (vor Event)**

#### **Schritt 1: Teams importieren**
```
📥 Teams in Vorrunde ziehen
→ Liest "LIVE – Teams" (Formular-Daten)
→ Schreibt in "Vorrunde – Eingabe" (Spalte A)
→ Dedupliziert automatisch
→ Sortiert alphabetisch
→ ✅ "X Team(s) übernommen"
```

**Was passiert:**
- Teams aus "LIVE – Teams" Spalte A (oder "Bezahlt"-Spalte)
- Duplikate werden entfernt
- Teams landen in "Vorrunde – Eingabe" A2:A
- Legs-Spalten werden geleert (sauberer Start)

#### **Schritt 2: Legs eintragen (während Vorrunde)**
```
Vorrunde – Eingabe:
Team         | Leg 1 | Leg 2 | Leg 3 | Leg 4 | HighCO
Bayern       |   12  |   10  |   9   |   11  |  120
Eagles       |   14  |   13  |   12  |   15  |  105
...

→ Legs MANUELL eintragen (oder via Score-App, wenn Phase="vorrunde")
```

#### **Schritt 3: Vorrunden-Tabelle berechnen**
```
🧮 Vorrunde-Tabelle berechnen
→ Summiert alle Legs pro Team
→ Findet bestes Leg
→ Sortiert: Niedrigste Gesamt-Legs zuerst, dann Best-Leg, dann HighCO
→ Verteilt in Gruppe A (obere Hälfte) / B (untere Hälfte)
→ ✅ "Vorrunde-Tabelle berechnet!"
```

**Was passiert:**
- "Vorrunde – Tabelle" wird neu berechnet
- Sortierung automatisch
- Seed A/B automatisch vergeben
- **Keine Formeln, sondern feste Werte!**

---

### **PHASE 2: Hauptrunde (während Event)**

#### **Schritt 4: Gruppen bilden (manuell)**
```
1. "Vorrunde – Tabelle" anschauen
2. Teams mit Seed "A" → in "A – Ergebnisse" eintragen
3. Teams mit Seed "B" → in "B – Ergebnisse" eintragen

A – Ergebnisse:
Match | Board | Team 1  | Team 2 | Legs 1 | Legs 2 | Status
1     |       | Bayern  | Eagles | 0      | 0      | Bereit
2     |       | Könige  | Hawks  | 0      | 0      | Bereit
...
```

#### **Schritt 5: Scores eintragen (während Spiel)**
```
Entweder:
- Score-App nutzen (score.html?board=M1)
- Oder direkt im Sheet eintragen

A – Ergebnisse:
Match | Board | Team 1  | Team 2 | Legs 1 | Legs 2 | Status
1     | M1    | Bayern  | Eagles | 2      | 0      | Fertig ← Score eingetragen
```

#### **Schritt 6: Tabellen berechnen**
```
Option A (einzeln):
🅰️ Gruppe A Tabelle berechnen
→ Berechnet nur Gruppe A

🅱️ Gruppe B Tabelle berechnen
→ Berechnet nur Gruppe B

Option B (alles):
♻️ ALLES berechnen (Vor + A/B)
→ Berechnet Vorrunde + A + B in einem Rutsch
→ ✅ "ALLES berechnet!"
```

**Was passiert:**
- Liest alle Matches aus "A – Ergebnisse"
- Zählt Siege, Legs+, Legs–, Diff pro Team
- Sortiert: Siege desc, Diff desc, Legs+ desc
- Schreibt in "A – Tabelle"
- **Keine Formeln, sondern feste Werte!**

---

## 🎯 VORTEILE gegenüber Formeln

### **Problem mit Formeln:**
```
❌ Langsam bei vielen Daten
❌ Können kaputt gehen (Spalten verschoben)
❌ Schwer zu debuggen
❌ Berechnen automatisch (auch bei falschen Daten)
```

### **Vorteil mit Script:**
```
✅ Blitzschnell
✅ Kann nicht kaputt gehen
✅ Einfach zu debuggen (Werte prüfen)
✅ Berechnet nur auf Knopfdruck (Kontrolle!)
✅ Kann komplexe Logik (z.B. Sortierung mit mehreren Kriterien)
```

---

## 📊 TAB-ÜBERSICHT

### **Erstellt beim Setup:**

| Tab | Zweck | Wer füllt? |
|-----|-------|------------|
| **LIVE – Teams** | Formular-Antworten | Formular |
| **Vorrunde – Eingabe** | Teams + Legs | Script + Manuell/Score-App |
| **Vorrunde – Tabelle** | Sortierte Vorrunden-Ergebnisse | Script (berechnet) |
| **A – Ergebnisse** | Matches Gruppe A | Manuell/Score-App |
| **B – Ergebnisse** | Matches Gruppe B | Manuell/Score-App |
| **A – Tabelle** | Tabelle Gruppe A | Script (berechnet) |
| **B – Tabelle** | Tabelle Gruppe B | Script (berechnet) |
| **Settings** | PINs, Phase | Manuell |
| **Score-Log** | Audit-Trail | Score-App |
| **Side-Bets** | Wetten (optional) | Manuell |

---

## 🧮 BERECHNUNGS-LOGIK

### **Vorrunde-Tabelle:**
```javascript
1. Gesamt-Legs = Leg1 + Leg2 + Leg3 + Leg4
2. Best-Leg = Min(Leg1, Leg2, Leg3, Leg4)
3. Sortierung:
   - Niedrigste Gesamt-Legs zuerst
   - Bei Gleichstand: Niedrigster Best-Leg zuerst
   - Bei Gleichstand: Höchster HighCO zuerst
   - Bei Gleichstand: Alphabetisch
4. Seed:
   - Obere Hälfte → Gruppe A
   - Untere Hälfte → Gruppe B
```

### **Gruppen-Tabellen:**
```javascript
1. Siege = Anzahl Matches mit mehr Legs
2. Legs+ = Summe aller eigenen Legs
3. Legs– = Summe aller gegnerischen Legs
4. Diff = Legs+ - Legs–
5. Sortierung:
   - Meiste Siege zuerst
   - Bei Gleichstand: Höchster Diff zuerst
   - Bei Gleichstand: Höchster Legs+ zuerst
   - Bei Gleichstand: Alphabetisch
```

---

## ✅ CHECKLISTE

### **Vor Event:**
- [ ] Script eingefügt (AS2_MASTER_SETUP.gs)
- [ ] Setup ausgeführt (🚀)
- [ ] PINs geändert (Settings-Tab)
- [ ] AdminPIN geändert (Settings-Tab, rot)
- [ ] Teams importiert (📥)
- [ ] Sanity-Check OK (✅)

### **Während Vorrunde:**
- [ ] Legs in "Vorrunde – Eingabe" eintragen
- [ ] Vorrunden-Tabelle berechnen (🧮)
- [ ] Gruppen prüfen (Seed A/B)

### **Vor Hauptrunde:**
- [ ] Teams in A/B – Ergebnisse eintragen
- [ ] Settings: Phase = "hauptrunde"
- [ ] Matches angelegt (Status = "Bereit")

### **Während Hauptrunde:**
- [ ] Scores eintragen (Score-App oder manuell)
- [ ] Regelmäßig Tabellen neu berechnen (♻️)
- [ ] Monitor läuft (monitor.html)

---

## 🆘 TROUBLESHOOTING

### **"Teams werden nicht importiert"**
```
→ "LIVE – Teams" hat Daten?
→ Spalte A nicht leer?
→ Header "Bezahlt" vorhanden (optional)?
→ Nochmal ausführen: 📥 Teams in Vorrunde ziehen
```

### **"Vorrunden-Tabelle leer"**
```
→ "Vorrunde – Eingabe" hat Teams in Spalte A?
→ Legs eingetragen (Spalte B-E)?
→ Legs sind Zahlen (nicht Text)?
→ Nochmal ausführen: 🧮 Vorrunde-Tabelle berechnen
```

### **"Gruppen-Tabelle leer"**
```
→ "A – Ergebnisse" hat Matches?
→ Scores eingetragen (Spalte E+F)?
→ Team-Namen exakt gleich?
→ Nochmal ausführen: 🅰️ Gruppe A Tabelle berechnen
```

### **"Menü erscheint nicht"**
```
→ Sheet neu laden (F5)
→ Script gespeichert?
→ Funktion onOpen() vorhanden?
→ Berechtigung erteilt?
```

---

## 💡 PRO-TIPPS

### **Tip 1: Regelmäßig neu berechnen**
```
Während Hauptrunde alle 5-10 Minuten:
♻️ ALLES berechnen
→ Stellt sicher, dass Tabelle aktuell ist
```

### **Tip 2: Tabelle für Monitor nutzen**
```
monitor.html liest aus:
- A – Ergebnisse / B – Ergebnisse
→ Zeigt Matches + Scores live an

Wenn Tabelle wichtig:
→ Regelmäßig neu berechnen (♻️)
→ Oder: Tabelle als separates Tab für TV/Beamer
```

### **Tip 3: Backup vor Berechnung**
```
Vor ♻️ ALLES berechnen:
→ Sheet kurz prüfen
→ Bei Fehlern: Strg+Z rückgängig machen
```

### **Tip 4: Team-Namen konsistent**
```
WICHTIG: Team-Namen müssen EXAKT gleich sein!

❌ Falsch:
"Bayern Allstars" vs. "Bayern allstars" → 2 Teams!

✅ Richtig:
Immer gleich schreiben (Copy-Paste!)
```

---

## 🎉 READY!

```
╔════════════════════════════════════════╗
║  🚀 MASTER SETUP INSTALLED! 🚀        ║
║                                        ║
║  ✅ Setup: ONE-CLICK                   ║
║  ✅ Import: AUTOMATIC                  ║
║  ✅ Calc: AUTOMATIC                    ║
║  ✅ Menu: BEAUTIFUL                    ║
║  ✅ Logic: BULLETPROOF                 ║
║                                        ║
║  → TURNIER READY! 🎯🍺🚀             ║
╚════════════════════════════════════════╝
```

**Workflow:**
1. 🚀 Setup ausführen
2. 📥 Teams ziehen
3. Legs eintragen (Vorrunde)
4. 🧮 Vorrunde berechnen
5. Matches eintragen (Hauptrunde)
6. ♻️ ALLES berechnen (regelmäßig)
7. 🎉 FERTIG!
