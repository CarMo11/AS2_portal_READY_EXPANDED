# 🎯 WIE SPIELER SELBST SCORES EINGEBEN

## 📱 DAS KOMPLETTE FLOW:

---

## 1️⃣ VOR DEM TURNIER: BOARDS & PINS EINRICHTEN

### **Settings Tab im Sheet:**

```
Board | PIN  | Phase      | Admin?
M1    | 1234 | vorrunde   | nein
M2    | 5678 | vorrunde   | nein
M3    | 9999 | vorrunde   | nein
M4    | 1111 | hauptrunde | nein
M5    | 2222 | hauptrunde | nein

AdminPIN: 0000 (für Turnierleitung)
```

**Wichtig:**
- Jedes Board = 1 PIN
- Spieler an Board M1 nutzen PIN `1234`
- Turnierleitung nutzt `0000` (kann alles ändern)

---

## 2️⃣ WÄHREND DES TURNIERS: WIE SPIELER SCORES EINGEBEN

### **SCHRITT 1: Score-App öffnen**

**3 Wege:**

**A) QR-Code scannen (empfohlen!)**
```
1. Monitor zeigt QR-Code Button
2. QR-Code auf Handy scannen
3. → Öffnet score.html direkt!
```

**B) Link manuell öffnen**
```
https://as2-dartturnier-hochberg.netlify.app/score.html
```

**C) QR-Code am Board (ausdrucken!)**
```
Vor Turnier:
1. score.html auf PC öffnen
2. Browser → QR-Generator nutzen
3. QR-Code ausdrucken
4. An jedem Board aufhängen mit PIN drauf!

Beispiel-Zettel:
╔══════════════════════╗
║   BOARD M1           ║
║   [QR-CODE]          ║
║   PIN: 1234          ║
╚══════════════════════╝
```

---

### **SCHRITT 2: PIN eingeben**

```
Score-App öffnet sich:
┌──────────────────────┐
│ 🎯 Score-Eingabe     │
├──────────────────────┤
│ PIN: [____]          │ ← Board-PIN eingeben!
│      [Login]         │
└──────────────────────┘

Spieler an M1 → PIN: 1234
Spieler an M2 → PIN: 5678
Turnierleitung → PIN: 0000
```

---

### **SCHRITT 3: Match auswählen**

Nach Login zeigt die App:

```
┌─────────────────────────────┐
│ Board M1 - Vorrunde         │
├─────────────────────────────┤
│ Deine Matches:              │
│                             │
│ □ DeTonation vs Hofmann     │ ← Anklicken!
│ □ DieGlatzis vs Ein Ziel    │
│                             │
└─────────────────────────────┘
```

**Was Spieler sehen:**
- ✅ Nur IHRE Matches (ihres Boards!)
- ✅ Status: Bereit / Live / Fertig
- ✅ Aktueller Score

---

### **SCHRITT 4: Score eingeben**

```
Match angeklickt:
┌─────────────────────────────┐
│ DeTonation vs Hofmann       │
├─────────────────────────────┤
│ Legs Team 1: [5]  [+ -]     │
│ Legs Team 2: [3]  [+ -]     │
│                             │
│ [Match starten]             │ ← Status: Bereit
│ [Speichern]                 │ ← Während Match
│ [Match beenden]             │ ← Am Ende
└─────────────────────────────┘
```

**Ablauf:**
1. **"Match starten"** → Status: Live ⚡
2. **Legs eingeben** (+ / - Buttons)
3. **"Speichern"** → Updates live im Monitor!
4. **"Match beenden"** → Status: Fertig ✅

---

## 3️⃣ STATUS-SYSTEM

### **3 Stati:**

| Status | Symbol | Bedeutung | Wer kann ändern? |
|--------|--------|-----------|------------------|
| **Bereit** | 🔵 | Match noch nicht gestartet | Board-PIN oder Admin |
| **Live** | ⚡ | Match läuft gerade | Board-PIN oder Admin |
| **Fertig** | ✅ | Match beendet | Nur Admin (oder Reset) |

---

### **Status-Übergänge:**

```
Bereit 🔵
  ↓ [Match starten]
Live ⚡
  ↓ [Speichern] → Updates gehen live!
Live ⚡
  ↓ [Match beenden]
Fertig ✅
  ↓ [Admin Reset]
Bereit 🔵
```

---

## 4️⃣ WAS SPIELER AM MONITOR SEHEN

### **Live-Anzeige:**

```
Monitor aktualisiert automatisch alle 10 Sek!

┌─────────────────────────────┐
│ 🏁 Live Matches             │
├─────────────────────────────┤
│ M1: DeTonation 5 - 3 Hofmann│ ← Ihr Match!
│ M2: Hartz Bier 2 - 2 Ferrets│
│ M3: ...                     │
└─────────────────────────────┘

Sound: 🔔 Ping bei neuem Live-Match!
```

---

## 5️⃣ WICHTIGE REGELN

### **Für Spieler:**

✅ **KANN:**
- Eigene Matches starten
- Scores eingeben/ändern (während Live)
- Match beenden

❌ **KANN NICHT:**
- Fremde Boards sehen
- Andere PINs nutzen
- Fertige Matches ändern (nur Admin)

### **Für Turnierleitung (Admin-PIN):**

✅ **KANN:**
- ALLE Boards sehen
- ALLE Matches ändern
- Fertige Matches korrigieren
- Status zurücksetzen

---

## 6️⃣ TYPISCHER ABLAUF AM BOARD

```
👥 2 Teams treffen sich an Board M1:

1. Handy raus
2. QR-Code scannen (am Board aufgehängt)
3. PIN eingeben: 1234
4. Ihr Match anklicken
5. "Match starten" → Status: Live ⚡
6. Legs spielen + eingeben:
   - Team A gewinnt Leg → [+] klicken
   - Live im Monitor sichtbar!
7. Match fertig → "Match beenden" ✅
8. Nächstes Match auswählen
```

---

## 7️⃣ TROUBLESHOOTING

### **"Ich sehe mein Match nicht!"**

**Checkliste:**
1. ✅ Richtiger PIN? (Board-Zettel prüfen!)
2. ✅ Richtige Phase? (Vorrunde/Hauptrunde im Settings)
3. ✅ Match existiert im Sheet? (Settings öffnen)

**Lösung:**
- Turnierleitung: Admin-PIN `0000`
- Sheet prüfen: `A – Ergebnisse` / `B – Ergebnisse`
- Match manuell hinzufügen

---

### **"Score wird nicht gespeichert!"**

**Checkliste:**
1. ✅ Internet-Verbindung?
2. ✅ Apps Script deployed? (siehe DEPLOYMENT_GUIDE.md)
3. ✅ Browser Console: Fehler?

**Lösung:**
- Hard Refresh (Cmd+Shift+R)
- Apps Script URL prüfen in score.html
- Turnierleitung: Admin-Login versuchen

---

### **"Monitor zeigt alten Stand!"**

**Lösung:**
- Monitor auto-updated alle 10 Sek
- Manuell: F5 / Refresh
- TV-Browser: Hard Refresh

---

## 8️⃣ VORBEREITUNG CHECKLIST

### **1 Tag vor Turnier:**

- [ ] Settings Tab: Alle Boards & PINs eingetragen
- [ ] Apps Script deployed & URL in score.html
- [ ] Test: Admin-PIN funktioniert?
- [ ] QR-Codes erstellt & ausgedruckt
- [ ] Monitor auf TV getestet

### **Am Turnier-Tag:**

- [ ] QR-Code-Zettel an Boards aufhängen:
  ```
  Board M1 - PIN: 1234
  [QR-CODE hier]
  ```
- [ ] Monitor im TV-Modus starten
- [ ] Test-Match mit Admin-PIN durchspielen
- [ ] Spielern erklären:
  - "QR-Code scannen"
  - "Board-PIN eingeben"
  - "Match starten/beenden"

---

## 9️⃣ BEISPIEL-DURCHLAUF (KOMPLETT)

```
SPIELER: Team "DeTonation" an Board M1
GEGNER: Team "Die Hofmann Freaks"
PIN: 1234

Schritt 1: QR-Code scannen
→ score.html öffnet sich

Schritt 2: PIN eingeben
→ "1234" → Login

Schritt 3: Match auswählen
→ "DeTonation vs Die Hofmann Freaks" anklicken

Schritt 4: Match starten
→ Button "Match starten" → Status: Live ⚡

Schritt 5: Legs spielen
→ DeTonation gewinnt 1. Leg → [+] bei Team 1
→ Hofmann gewinnt 2. Leg → [+] bei Team 2
→ ... Best-of-5 bis 3 Legs gewonnen

Schritt 6: Während Match
→ Immer "Speichern" → Monitor updated!

Schritt 7: Match Ende
→ DeTonation führt 3-2
→ Button "Match beenden" → Status: Fertig ✅

Schritt 8: Monitor zeigt Endergebnis
→ Tabelle aktualisiert sich automatisch!
```

---

## 🎯 ZUSAMMENFASSUNG

**Spieler brauchen:**
1. Handy mit Kamera (QR-Scan)
2. Board-PIN (auf Zettel am Board)
3. Das war's! ✅

**System macht automatisch:**
- Live-Updates im Monitor
- Tabellen-Berechnung
- Status-Management
- Ping-Sound bei Live-Match

**Turnierleitung braucht:**
- Admin-PIN für Korrektu ren
- Sheet-Zugriff für Setup
- Monitor-PC/TV

---

## 📱 WICHTIGSTER TIPP FÜR SPIELER:

```
╔═══════════════════════════════╗
║  1. QR-Code scannen           ║
║  2. PIN eingeben              ║
║  3. Match starten             ║
║  4. Legs eingeben + Speichern ║
║  5. Match beenden             ║
║                               ║
║  → FERTIG! 🎉                 ║
╚═══════════════════════════════╝
```

**Das System macht den Rest! 🚀**
