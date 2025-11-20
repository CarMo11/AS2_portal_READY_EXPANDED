# 🎯 AS2 Dartturnier – Turniertag Checkliste

## ⏰ VOR DEM TURNIER (1 Tag vorher)

### ✅ Google Sheet Setup
- [ ] Alle Teams sind in **"LIVE – Teams"** eingetragen
- [ ] Teams-Liste ist aktuell und vollständig
- [ ] Alte Test-Daten wurden gelöscht (optional: **AS2 Tools → Komplett-Reset**)

### ✅ Website-Test
- [ ] [Hauptseite](https://as2-dartturnier-hochberg.netlify.app/) öffnet korrekt
- [ ] [Live-Monitor](https://as2-dartturnier-hochberg.netlify.app/monitor.html) zeigt Daten an
- [ ] [Score-Eingabe](https://as2-dartturnier-hochberg.netlify.app/score.html) ist erreichbar

### ✅ Apps Script Deployment
- [ ] Apps Script ist deployed (Web-App URL ist aktiv)
- [ ] Test-Score wurde eingetragen und erscheint im Sheet
- [ ] Test-Score erscheint im Live-Monitor

---

## 🚀 AM TURNIERTAG (30-60 Min vor Start)

### 1️⃣ Teams in Vorrunde ziehen
```
Google Sheet → AS2 Tools → 📥 Teams in Vorrunde ziehen
```
- [ ] Überprüfen: **"Vorrunde – Eingabe"** enthält alle Teams
- [ ] Board-Spalte ist vorbelegt (M1, M3, M4, M5)

### 2️⃣ Vorrunde-Tabelle berechnen
```
Google Sheet → AS2 Tools → 🧮 Vorrunde-Tabelle berechnen (Seeding A/B)
```
- [ ] **"Vorrunde – Tabelle"** zeigt alle Teams mit Platz 1, 2, 3...
- [ ] Seed (A/B) ist leer (wird nach Vorrunde befüllt)

### 3️⃣ Live-Monitor auf TV/Beamer starten
- [ ] [/monitor.html](https://as2-dartturnier-hochberg.netlify.app/monitor.html) auf TV öffnen
- [ ] Ansicht: **Vorrunde** (Tab 1)
- [ ] Teams werden korrekt angezeigt
- [ ] Vollbild-Modus (F11)

### 4️⃣ Score-Eingabe QR-Code/Link bereitstellen
- [ ] QR-Code für [/score.html](https://as2-dartturnier-hochberg.netlify.app/score.html) ausdrucken
- [ ] Link an Teams per WhatsApp/E-Mail senden
- [ ] Test: Ein Team trägt Probe-Score ein

---

## 🎲 WÄHREND DER VORRUNDE (6 Läufe)

### Score-Eingabe
- [ ] Teams tragen selbst Scores ein über **/score.html**
- [ ] Monitor aktualisiert automatisch (alle 5 Sek.)
- [ ] Bei Fehleintragungen: Team kann zurückkommen und korrigieren

### Nach Lauf 6
```
Google Sheet → AS2 Tools → 🧮 Vorrunde-Tabelle berechnen (Seeding A/B)
```
- [ ] **"Vorrunde – Tabelle"** zeigt finales Ranking
- [ ] Seed (A/B) ist gesetzt (Top 50% → A, Rest → B)
- [ ] Monitor zeigt Seed-Verteilung

---

## 🏆 HAUPTRUNDE VORBEREITEN

### 5️⃣ A/B Spielplan erzeugen
```
Google Sheet → AS2 Tools → 🧩 A/B Spielplan (balanciert) erzeugen
```
- [ ] **"A – Ergebnisse"** enthält alle Matches für Gruppe A
- [ ] **"B – Ergebnisse"** enthält alle Matches für Gruppe B
- [ ] Boards sind vorbelegt (M1, M3, M4, M5 in Wellen)

### 6️⃣ Monitor auf Hauptrunde umschalten
- [ ] Monitor → Tab 2: **Hauptrunde**
- [ ] Ansicht zeigt:
  - Aktuelle Matches (oben)
  - Tabelle Gruppe A
  - Tabelle Gruppe B

---

## 🎮 WÄHREND DER HAUPTRUNDE

### Score-Eingabe
- [ ] Teams wählen Modus: **🏆 Hauptrunde**
- [ ] Teams sehen nur ihre eigenen Matches
- [ ] Score wird eingetragen: z.B. 2:1
- [ ] Tabellen aktualisieren automatisch

### Tabellen prüfen (automatisch!)
- [ ] **"A – Tabelle"** zeigt Ranking Gruppe A
- [ ] **"B – Tabelle"** zeigt Ranking Gruppe B
- [ ] Monitor zeigt Live-Standings

---

## ⚠️ TROUBLESHOOTING

### Problem: Teams können keinen Score eintragen
**Lösung:**
1. Apps Script Status prüfen:
   ```
   https://script.google.com/macros/s/AKfycbzbftMuWhi_2boqFPEYNd7SvswLS-262-o87mi1SMYgKeQd9ttqZHsoTF6d5NC_F620tA/exec
   ```
   → Sollte anzeigen: "AS2 Score API läuft!"
2. Falls nicht: Apps Script neu deployen

### Problem: Monitor zeigt alte Daten
**Lösung:**
1. Browser-Cache leeren (Strg+Shift+R / Cmd+Shift+R)
2. Seite neu laden

### Problem: Tabellen nicht aktualisiert
**Lösung:**
1. Manuell berechnen:
   ```
   Vorrunde: AS2 Tools → 🧮 Vorrunde-Tabelle berechnen
   Gruppe A: AS2 Tools → 🅰️ Gruppe A Tabelle berechnen
   Gruppe B: AS2 Tools → 🅱️ Gruppe B Tabelle berechnen
   ```

### Problem: Falscher Score eingetragen
**Lösung:**
1. Direkt im Google Sheet korrigieren:
   - **"Vorrunde – Eingabe"** → Legs-Spalte ändern
   - **"A/B – Ergebnisse"** → Spalte E/F ändern
2. Tabelle neu berechnen (siehe oben)

### Problem: Team fehlt in Score-Eingabe
**Lösung:**
1. Prüfen: **"Vorrunde – Eingabe"** → Team steht in Spalte A
2. Falls nicht: Manuell eintragen oder "Teams in Vorrunde ziehen" erneut ausführen

---

## 🧹 NACH DEM TURNIER

### Daten sichern
- [ ] Google Sheet duplizieren: **Datei → Kopie erstellen**
- [ ] Umbenennen: "AS2 Dartturnier [DATUM]"

### Für nächstes Turnier vorbereiten
```
Google Sheet → AS2 Tools → 💣 Komplett-Reset (inkl. Teams)
```
- [ ] Alle Daten gelöscht
- [ ] Sheets sind bereit für neue Registrierungen

---

## 📱 WICHTIGE LINKS

| Link | URL |
|------|-----|
| **Hauptseite** | https://as2-dartturnier-hochberg.netlify.app/ |
| **Live-Monitor** | https://as2-dartturnier-hochberg.netlify.app/monitor.html |
| **Score-Eingabe** | https://as2-dartturnier-hochberg.netlify.app/score.html |
| **Google Sheet** | https://docs.google.com/spreadsheets/d/11qd00fEEVDIWbXl8Rx6A0vvCD8WHK2FiiXVqaxtuKDk/ |
| **Apps Script** | https://script.google.com/macros/s/AKfycbzbftMuWhi_2boqFPEYNd7SvswLS-262-o87mi1SMYgKeQd9ttqZHsoTF6d5NC_F620tA/exec |

---

## 📞 SUPPORT

Bei Problemen während des Turniers:
1. Diese Checkliste durchgehen
2. Troubleshooting-Section prüfen
3. Browser-Cache leeren
4. Apps Script Status prüfen

**Viel Erfolg beim Turnier! 🎯🍻**
