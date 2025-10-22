# 🔄 AUTO-SYNC INSTALLATION

## ✨ WAS IST NEU?

**Automatische Synchronisation zwischen Status und Vorrunde!**

Wenn du im Sheet den Status änderst:
- **"bezahlt" → "offen"**: Team wird aus Vorrunde entfernt ❌
- **"offen" → "bezahlt"**: Team wird in Vorrunde hinzugefügt ✅

**Das passiert AUTOMATISCH - kein Button klicken nötig!**

---

## 📋 INSTALLATION (5 MINUTEN)

### **Schritt 1: Google Sheet öffnen**

```
https://docs.google.com/spreadsheets/d/11qd00fEEVDIWbXl8Rx6A0vvCD8WHK2FiiXVqaxtuKDk
```

---

### **Schritt 2: Apps Script Editor öffnen**

```
1. Menü: Erweiterungen → Apps Script
2. Editor öffnet sich
3. Du siehst die bestehende "Code.gs" Datei
```

---

### **Schritt 3: Neuen Code kopieren**

```
1. Öffne die Datei: AS2_MASTER_SETUP.gs
   (In deinem Projekt-Ordner)

2. GESAMTEN Code kopieren (Cmd+A, Cmd+C)

3. Im Apps Script Editor:
   - Alte "Code.gs" komplett löschen
   - Neuen Code einfügen (Cmd+V)
```

---

### **Schritt 4: Speichern & Deployen**

```
1. Klick "💾 Speichern" (Cmd+S)

2. Klick "⚙️ Deploy" → "Manage Deployments"

3. Klick "✏️ Edit" (Stift-Symbol)

4. "New version" → "Deploy"

5. Autorisierung:
   - "Review Permissions"
   - Dein Google Account auswählen
   - "Advanced" → "Go to ... (unsafe)"
   - "Allow"

6. Fertig! ✅
```

---

### **Schritt 5: Testen**

```
1. Sheet "LIVE – Teams" öffnen

2. Ein Team mit Status "bezahlt" auf "offen" ändern
   → Warte 2 Sekunden

3. Sheet "Vorrunde – Eingabe" öffnen
   → ✅ Team sollte WEG sein!

4. Status wieder auf "bezahlt" ändern
   → Warte 2 Sekunden

5. Sheet "Vorrunde – Eingabe" prüfen
   → ✅ Team ist wieder DA!

6. Sheet "Vorrunde – Tabelle"
   → ✅ Automatisch neu berechnet!
```

---

## 🎯 WIE ES FUNKTIONIERT

### **Trigger: onEdit**

```javascript
// Wird AUTOMATISCH ausgeführt bei jeder Änderung im Sheet
function onEdit(e) {
  // Prüft: Ist es "LIVE – Teams"? Spalte P (Status)?
  if (sheetName === 'LIVE – Teams' && col === 16) {
    // Ja! → Vorrunde synchronisieren
    syncVorrundeOnStatusChange();
  }
}
```

### **Sync-Logik:**

```javascript
function syncVorrundeOnStatusChange() {
  1. Alle Teams mit Status "bezahlt" holen
  2. Vergleichen mit aktueller Vorrunde
  3. Teams entfernen die nicht mehr bezahlt sind
  4. Teams hinzufügen die neu bezahlt sind
  5. Vorrunde-Tabelle neu berechnen
}
```

---

## 📊 BEISPIEL-FLOW

### **Ausgangslage:**

```
LIVE – Teams:
- Team A | bezahlt  ✅
- Team B | bezahlt  ✅
- Team C | offen    ❌

Vorrunde – Eingabe:
- Team A  (0, 0, 0, 0)
- Team B  (0, 0, 0, 0)

→ NUR bezahlte Teams!
```

---

### **Änderung 1: Team B → "offen"**

```
LIVE – Teams:
- Team A | bezahlt  ✅
- Team B | offen    ❌ (GEÄNDERT!)
- Team C | offen    ❌

↓ AUTO-SYNC (2 Sek) ↓

Vorrunde – Eingabe:
- Team A  (0, 0, 0, 0)

→ Team B wurde AUTOMATISCH entfernt! ✅
```

---

### **Änderung 2: Team C → "bezahlt"**

```
LIVE – Teams:
- Team A | bezahlt  ✅
- Team B | offen    ❌
- Team C | bezahlt  ✅ (GEÄNDERT!)

↓ AUTO-SYNC (2 Sek) ↓

Vorrunde – Eingabe:
- Team A  (0, 0, 0, 0)
- Team C  (0, 0, 0, 0)

→ Team C wurde AUTOMATISCH hinzugefügt! ✅
```

---

## 🔧 TROUBLESHOOTING

### **❌ "Auto-Sync funktioniert nicht!"**

**CHECKLISTE:**

```
1. ✅ Apps Script gespeichert & deployed?
   → Script Editor → "💾 Speichern"

2. ✅ Autorisierung gegeben?
   → Deploy → "Review Permissions"

3. ✅ Richtige Spalte geändert?
   → Spalte P (16) = "Status"

4. ✅ Richtiges Sheet?
   → Nur "LIVE – Teams" triggert Auto-Sync

5. ✅ 2 Sekunden gewartet?
   → Script braucht kurzen Moment
```

**LÖSUNG:**

```
Manuell triggern:
→ Menü "🎯 AS2 Tools"
→ "📥 Teams in Vorrunde ziehen"
→ Funktioniert das? ✅

Wenn JA: onEdit Trigger funktioniert nicht
→ Apps Script neu deployen
→ Autorisierung prüfen

Wenn NEIN: Generelles Problem
→ "✅ Sanity-Check" laufen lassen
```

---

### **❌ "Team wurde entfernt aber Scores sind weg!"**

**KEINE PANIK! Scores werden NICHT gelöscht!**

```
Was passiert:
1. Team wird aus "Vorrunde – Eingabe" entfernt
2. Scores BLEIBEN im Sheet (Zeile wird gelöscht)
3. Team wieder auf "bezahlt" setzen
4. Team wird neu hinzugefügt
5. Scores sind 0-0-0-0 (RESET!)

→ Deshalb VOR Turnier Status finalisieren!
```

**BEST PRACTICE:**

```
VOR TURNIER:
→ Alle Teams final auf "bezahlt" setzen
→ DANN erst Vorrunde spielen!

WÄHREND TURNIER:
→ Status NICHT mehr ändern!
→ Alle Teams bleiben in Vorrunde

NACH TURNIER:
→ Nicht-Zahler auf "offen" setzen (für Statistik)
```

---

## ⚠️ WICHTIGE HINWEISE

### **1. Scores werden NICHT übertragen!**

```
Wenn Team entfernt und wieder hinzugefügt wird:
→ Alte Scores sind WEG!
→ Team startet bei 0-0-0-0

DESHALB:
→ Status VOR Turnier finalisieren
→ Während Turnier nicht ändern!
```

### **2. Nur "bezahlt" Teams in Vorrunde**

```
Status im Sheet:
- "bezahlt"  → IN Vorrunde ✅
- "offen"    → NICHT in Vorrunde ❌
- (leer)     → NICHT in Vorrunde ❌
- anderes    → NICHT in Vorrunde ❌

→ Genau "bezahlt" schreiben (lowercase)!
```

### **3. Vorrunde-Tabelle wird neu berechnet**

```
Nach jedem Auto-Sync:
→ "Vorrunde – Tabelle" wird automatisch updated
→ Rankings aktualisiert
→ Seed A/B neu verteilt

→ Automatisch! Kein Button nötig!
```

---

## ✅ FINALE CHECKLISTE

```
Installation:
□ Apps Script Editor geöffnet ✅
□ Neuen Code eingefügt ✅
□ Gespeichert & deployed ✅
□ Autorisiert ✅

Test:
□ Status "bezahlt" → "offen": Team entfernt? ✅
□ Status "offen" → "bezahlt": Team hinzugefügt? ✅
□ Vorrunde-Tabelle updated? ✅

Ready:
□ Alle Teams haben finalen Status ✅
□ System funktioniert ✅
```

---

## 🎉 FERTIG!

**Auto-Sync ist jetzt aktiv!**

**Immer wenn du den Status in "LIVE – Teams" änderst:**
- ✅ Vorrunde wird automatisch synchronisiert
- ✅ Tabelle wird automatisch neu berechnet
- ✅ Alles passiert in 2 Sekunden

**KEIN MANUELLER BUTTON-KLICK MEHR NÖTIG! 🚀**
