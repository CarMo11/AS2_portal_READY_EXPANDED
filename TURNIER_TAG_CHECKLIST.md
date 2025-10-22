# 🎯 TURNIER-TAG CHECKLIST & SCORE-SYSTEM ANLEITUNG

## 📅 VOR DEM TURNIER (1 TAG VORHER)

### ✅ 1. Google Sheet Setup prüfen

```
1. Sheet öffnen:
   https://docs.google.com/spreadsheets/d/11qd00fEEVDIWbXl8Rx6A0vvCD8WHK2FiiXVqaxtuKDk

2. Tab "Settings" prüfen:
   
   Board | PIN  | Phase
   M1    | 1234 | vorrunde
   M2    | 5678 | vorrunde  
   M3    | 9999 | vorrunde
   M4    | 1111 | hauptrunde
   M5    | 2222 | hauptrunde
   
   AdminPIN: 0000

3. Tab "LIVE – Teams" prüfen:
   ✅ Alle Teams vorhanden?
   ✅ Status "bezahlt"?

4. Tab "Vorrunde – Eingabe":
   ✅ Alle Teams aufgelistet?
   ✅ Spalten: Team | Leg 1 | Leg 2 | Leg 3 | Leg 4
```

---

### ✅ 2. QR-Codes erstellen & drucken

```
FÜR JEDES BOARD EINEN ZETTEL:

╔════════════════════════════╗
║      📱 BOARD M1           ║
║                            ║
║     [QR-CODE HIER]         ║
║                            ║
║      PIN: 1234             ║
║                            ║
║  1. QR-Code scannen        ║
║  2. PIN eingeben           ║
║  3. Match starten          ║
║  4. Scores eintragen       ║
╚════════════════════════════╝

QR-Code generieren:
→ URL: https://as2-dartturnier-hochberg.netlify.app/score.html
→ Tool: qr-code-generator.com
→ 5× ausdrucken (für M1-M5)
```

---

### ✅ 3. Apps Script Test

```
1. Sheet öffnen
2. Menü "🎯 AS2 Tools" sichtbar? ✅
3. Klick "🧮 Vorrunde-Tabelle berechnen"
   → Sollte funktionieren!
4. Klick "✅ Sanity-Check"
   → Alle Tabs vorhanden?
```

---

### ✅ 4. Score-System Test

```
1. score.html öffnen:
   https://as2-dartturnier-hochberg.netlify.app/score.html

2. Admin-PIN testen:
   → PIN: 0000
   → Login
   → Siehst du ALLE Boards? ✅

3. Board-PIN testen:
   → PIN: 1234
   → Login
   → Siehst du nur M1 Matches? ✅

4. Dummy-Match erstellen:
   → Sheet "A – Ergebnisse"
   → Zeile hinzufügen:
     Match | Board | Team 1 | Team 2 | Legs 1 | Legs 2 | Status
     99    | M1    | TestA  | TestB  |        |        | Bereit

5. Score eintragen:
   → score.html → PIN 1234
   → Match "TestA vs TestB" auswählen
   → Legs eintragen: 3 - 2
   → Speichern ✅

6. Monitor prüfen:
   → monitor.html öffnen
   → Siehst du TestA vs TestB: 3-2? ✅

7. Cleanup:
   → Test-Match aus Sheet löschen
```

---

## 🎯 AM TURNIER-TAG

### ⏰ 30 MINUTEN VOR START

```
1. MONITOR SETUP:
   □ TV/Beamer anschließen
   □ https://as2-dartturnier-hochberg.netlify.app/monitor.html
   □ F11 (Fullscreen)
   □ Klick "📺 TV-Modus"
   □ Lautstärke checken (Ping bei Live-Match)
   □ Auto-Update läuft? (alle 10 Sek)

2. QR-CODES AUFHÄNGEN:
   □ M1 - PIN 1234
   □ M2 - PIN 5678
   □ M3 - PIN 9999
   □ M4 - PIN 1111
   □ M5 - PIN 2222
   
   → Gut sichtbar an jedem Board!

3. ADMIN-HANDY READY:
   □ score.html als Bookmark
   □ Admin-PIN (0000) parat
   □ Für schnelle Korrekturen

4. LAPTOP BEREIT:
   □ Google Sheet offen
   □ Tab "Settings"
   □ Tab "Vorrunde – Eingabe"
   □ Tab "A/B – Ergebnisse"
```

---

### 🎮 SPIELER-ANLEITUNG (AUSDRUCKEN!)

```
╔════════════════════════════════════════════╗
║  🎯 WIE IHR EURE SCORES EINTRAGT          ║
╠════════════════════════════════════════════╣
║                                            ║
║  1️⃣  QR-CODE AM BOARD SCANNEN            ║
║      → Öffnet Score-App automatisch       ║
║                                            ║
║  2️⃣  PIN EINGEBEN                         ║
║      → Steht auf dem Board-Zettel         ║
║      → Board M1 = PIN 1234                ║
║                                            ║
║  3️⃣  EUER MATCH AUSWÄHLEN                 ║
║      → Ihr seht nur eure eigenen Matches  ║
║                                            ║
║  4️⃣  "MATCH STARTEN" KLICKEN              ║
║      → Status wird "Live ⚡"               ║
║                                            ║
║  5️⃣  LEGS EINTRAGEN                       ║
║      → Nach jedem Leg [+] klicken         ║
║      → "Speichern" → Erscheint im Monitor!║
║                                            ║
║  6️⃣  "MATCH BEENDEN" KLICKEN              ║
║      → Wenn Best-of-5 fertig ist          ║
║      → Status wird "Fertig ✅"             ║
║                                            ║
║  📺 MONITOR CHECKEN                        ║
║      → Euer Score erscheint live!         ║
║      → Tabelle wird automatisch berechnet ║
║                                            ║
║  ❓ PROBLEME?                              ║
║      → Turnierleitung ansprechen          ║
║      → Admin-PIN kann alles korrigieren   ║
║                                            ║
╚════════════════════════════════════════════╝
```

---

### 🏁 VORRUNDE STARTEN

```
1. TEAMS ERKLÄREN:
   "Scannt den QR-Code am Board, gebt die PIN ein,
    wählt euer Match und tragt die Scores ein!"

2. ERSTE MATCHES:
   □ Teams finden ihre Boards
   □ QR-Codes scannen
   □ PINs eingeben ✅
   □ Matches starten ✅

3. MONITOR BEOBACHTEN:
   □ Live-Matches erscheinen? ✅
   □ Scores werden gespeichert? ✅
   □ Ping-Sound bei neuem Match? ✅

4. BEI PROBLEMEN:
   → Admin-Handy → score.html → PIN 0000
   → Match finden → Korrigieren
   → Oder direkt im Sheet
```

---

### 🔄 NACH VORRUNDE

```
1. VORRUNDE ABGESCHLOSSEN:
   □ Alle Scores eingetragen? ✅
   □ Sheet "Vorrunde – Tabelle" aktuell? ✅

2. TABELLE BERECHNEN:
   → Sheet → Menü "🎯 AS2 Tools"
   → "🧮 Vorrunde-Tabelle berechnen"
   → Prüfen: Top 4 = Seed A, Bottom 4 = Seed B ✅

3. HAUPTRUNDE MATCHES ERSTELLEN:
   → Sheet "A – Ergebnisse":
     Gruppe A Teams (Seed A) alle gegen alle
   
   → Sheet "B – Ergebnisse":
     Gruppe B Teams (Seed B) alle gegen alle

4. BOARDS ZUWEISEN:
   → In Spalte "Board" eintragen (M1, M2, M3...)
   → Settings: PINs auf "hauptrunde" setzen (optional)
```

---

### 🏆 HAUPTRUNDE

```
1. GRUPPE A + B PARALLEL:
   □ Verschiedene Boards nutzen
   □ Teams wissen ihre Boards
   □ Gleicher Ablauf wie Vorrunde

2. MONITOR ZEIGT:
   □ Gruppe A Tabelle
   □ Gruppe B Tabelle
   □ Live-Matches
   □ Aktueller Stand

3. FINALE:
   □ Sieger Gruppe A vs Sieger Gruppe B
   □ Best Board nutzen (z.B. M1)
   □ Alle schauen zu! 🍺
```

---

## 🔧 TROUBLESHOOTING

### ❌ "Ich sehe mein Match nicht!"

```
CHECKLISTE:
1. ✅ Richtiger PIN?
   → Board-Zettel prüfen!

2. ✅ Richtige Phase?
   → Settings Tab prüfen
   → Board M1: "vorrunde" oder "hauptrunde"?

3. ✅ Match existiert im Sheet?
   → A/B – Ergebnisse Tab öffnen
   → Zeile mit euren Teams suchen

LÖSUNG:
→ Turnierleitung: Admin-PIN (0000)
→ Oder: Match manuell im Sheet hinzufügen
```

---

### ❌ "Score wird nicht gespeichert!"

```
CHECKLISTE:
1. ✅ Internet?
   → Handy online?

2. ✅ "Speichern" geklickt?
   → Nicht nur eingeben!

3. ✅ Match gestartet?
   → Status muss "Live ⚡" sein

LÖSUNG:
→ Hard Refresh (Browser neu)
→ Nochmal speichern
→ Notfalls: Admin-PIN nutzen
```

---

### ❌ "Monitor zeigt alten Stand!"

```
LÖSUNG:
→ Monitor updated alle 10 Sek automatisch
→ Manuell: F5 drücken
→ TV: Hard Refresh
```

---

### ❌ "Falscher Score eingetragen!"

```
LÖSUNG WÄHREND MATCH:
→ score.html → Board-PIN
→ Match öffnen
→ Legs korrigieren
→ Speichern ✅

LÖSUNG NACH MATCH:
→ score.html → Admin-PIN (0000)
→ ALLE Boards sehen
→ Match suchen
→ Korrigieren
→ Speichern ✅

ODER DIREKT IM SHEET:
→ Google Sheet öffnen
→ "A/B – Ergebnisse"
→ Zeile finden
→ Legs-Spalten ändern
→ Automatisch gespeichert ✅
```

---

## 📊 WICHTIGE URLS

```
HOMEPAGE:
https://as2-dartturnier-hochberg.netlify.app/

SCORE-EINGABE:
https://as2-dartturnier-hochberg.netlify.app/score.html

MONITOR:
https://as2-dartturnier-hochberg.netlify.app/monitor.html

GOOGLE SHEET:
https://docs.google.com/spreadsheets/d/11qd00fEEVDIWbXl8Rx6A0vvCD8WHK2FiiXVqaxtuKDk

APPS SCRIPT:
https://script.google.com/macros/s/AKfycbz9pq4Wz2dSCcPwTZ8uo5ymrR9WtCsnzxkZWs6aCV-XN2ElWAdXkrn52gVe9T9Gs0jTow/exec
```

---

## 🎯 FINALE CHECKLISTE

```
VOR TURNIER:
□ Sheet: Teams, Settings, PINs ✅
□ QR-Codes: Erstellt & gedruckt ✅
□ Apps Script: Deployed & getestet ✅
□ Score-System: Getestet ✅
□ Monitor: Getestet ✅

AM TURNIER-TAG:
□ Monitor: TV-Modus aktiv ✅
□ QR-Codes: An Boards aufgehängt ✅
□ Admin-Handy: score.html ready ✅
□ Laptop: Sheet offen ✅
□ Spieler: Anleitung erklärt ✅

WÄHREND TURNIER:
□ Teams tragen selbst ein ✅
□ Monitor zeigt live ✅
□ Du greifst nur bei Problemen ein ✅
□ Admin-PIN für Korrekturen ✅

NACH TURNIER:
□ Sieger gekürt ✅
□ Preisgeld verteilt ✅
□ Bier getrunken ✅
```

---

## 🚀 DU BIST READY!

**Das System:**
- ✅ Läuft automatisch
- ✅ Teams sind self-service
- ✅ Du kannst easy korrigieren
- ✅ Alles ist live & dynamisch

**VIEL ERFOLG! 🎯🍺**
