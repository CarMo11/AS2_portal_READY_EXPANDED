# 🧪 10-Minuten Smoke-Test

**Vor dem Turnier einmal durchklicken!**

---

## ✅ Vorrunde-Test

### 1. Settings vorbereiten
- [ ] Settings-Tab öffnen
- [ ] Phase für M1 auf `vorrunde` setzen
- [ ] PIN für M1 notieren (z.B. `1234`)

### 2. Score-App testen
- [ ] `score.html?board=M1` öffnen
- [ ] **Falschen PIN** eingeben → ❌ Muss scheitern mit "Falscher PIN"
- [ ] **Richtigen PIN** eingeben → ✅ Muss durchgehen, Vorrunde-View laden

### 3. Score eintragen
- [ ] Team aus Dropdown wählen
- [ ] **Leg 6** auswählen → ❌ Muss abgewiesen werden (nur 7-14)
- [ ] **Leg 7** auswählen → ✅ Sollte funktionieren
- [ ] "Eintragen" klicken
- [ ] Erfolgs-Meldung erscheint

### 4. Verifizieren
- [ ] Sheet "Vorrunde – Eingabe" öffnen
- [ ] Eintrag erscheint (Team, Legs, Board, Timestamp)
- [ ] Sheet "Score-Log" öffnen
- [ ] Log-Eintrag erscheint

---

## ✅ Hauptrunde-Test

### 1. Settings vorbereiten
- [ ] Settings-Tab öffnen
- [ ] Phase für M1 auf `hauptrunde` setzen

### 2. Match vorbereiten
- [ ] Sheet "A – Ergebnisse" öffnen
- [ ] Neue Zeile anlegen:
  ```
  Match | Board | Team1        | Team2        | Legs1 | Legs2 | Status
  1     | (leer)| Bayern       | Eagles       | (leer)| (leer)| Bereit
  ```
- [ ] **Board absichtlich leer lassen!**

### 3. Score eintragen
- [ ] `score.html?board=M1` öffnen
- [ ] PIN eingeben
- [ ] Match wird gefunden und angezeigt ✅
- [ ] Score auswählen: z.B. `1:0`
- [ ] "Eintragen" klicken
- [ ] **Zurück zum Sheet**
- [ ] Board-Spalte ist jetzt automatisch "M1" ✅

### 4. Match beenden
- [ ] Score auf `2:0` setzen (Team1 gewinnt)
- [ ] Status ändert sich auf "Fertig" ✅

### 5. Downgrade-Sperre testen
- [ ] Versuche Score auf `1:0` zurückzusetzen
- [ ] ❌ Muss blockieren: "Match ist bereits abgeschlossen."

### 6. 2:2 Block testen
- [ ] Neues Match anlegen (Match 2, Status Bereit)
- [ ] Score-App: Versuche `2:2` einzutragen
- [ ] ❌ Muss blockieren: "Best of 3: 2:2 ist nicht erlaubt"

---

## ✅ Deduplizierung testen

### 1. Duplikate erstellen
- [ ] Sheet "LIVE – Teams" öffnen
- [ ] Ein Team doppelt in die "Bezahlt"-Spalte eintragen
  ```
  Bezahlt
  Bayern Allstars
  Dart Eagles
  Bayern Allstars  ← Duplikat
  ```

### 2. Score-App prüfen
- [ ] Settings: Phase = `vorrunde`
- [ ] Score-App öffnen, PIN eingeben
- [ ] Team-Dropdown anschauen
- [ ] ✅ "Bayern Allstars" erscheint nur **1×**

---

## ✅ Rate-Limit testen

### 1. Spam-Schutz
- [ ] Score-App: Score eintragen
- [ ] **Sofort nochmal** eintragen (< 3 Sekunden)
- [ ] ❌ Muss blockieren: "Bitte kurz warten und erneut senden."
- [ ] 3 Sekunden warten
- [ ] ✅ Jetzt funktioniert es wieder

---

## ✅ Monitor-Integration

### 1. Monitor öffnen
- [ ] `monitor.html` öffnen
- [ ] Auto-Refresh (30s) oder F5 drücken

### 2. Verifizieren
- [ ] Eingetragene Scores erscheinen
- [ ] Status-Farben korrekt (Bereit/Läuft/Fertig)
- [ ] Board-Zuordnung stimmt
- [ ] Side-Bets Panel lädt (wenn Tab vorhanden)

---

## ✅ Admin-Override (Optional)

### 1. AdminPIN setzen
- [ ] Settings-Tab öffnen
- [ ] Spalte E (rot markiert): AdminPIN notieren

### 2. Override testen (via Apps Script)
```javascript
// Im Apps Script Editor ausführen:
function testAdminOverride() {
  const result = apiAdminSetScore({
    adminPin: 'ADMIN9999',
    sheet: 'A – Ergebnisse',
    row: 3,
    legs1: 2,
    legs2: 0,
    status: 'Fertig'
  });
  Logger.log(result.getContentText());
}
```
- [ ] Zeile 3 in "A – Ergebnisse" wird aktualisiert ✅
- [ ] Log-Eintrag erscheint

---

## 🎯 Checkliste Komplett?

Wenn alle Tests ✅ sind:

- [ ] **Vorrunde:** PIN, Team-Auswahl, Legs-Validierung ✅
- [ ] **Hauptrunde:** Board-Fallback, Match-Finder, Status-Auto ✅
- [ ] **Downgrade-Sperre:** Fertige Matches gesperrt ✅
- [ ] **2:2 Block:** Frontend + Backend blockiert ✅
- [ ] **Dedupe:** Teams nur 1× in Liste ✅
- [ ] **Rate-Limit:** Spam-Schutz aktiv ✅
- [ ] **Monitor:** Live-Updates funktionieren ✅
- [ ] **Admin-Override:** Notfall-Funktion bereit ✅

**→ System ist production-ready! 🚀**

---

## 📋 Game-Day Checkliste

### 1 Stunde vorher:
- [ ] PINs in Settings prüfen & ändern
- [ ] QR-Codes an alle Boards hängen
- [ ] 1 Test-Score pro Board durchspielen
- [ ] Monitor: TV-Modus + Vollbild (F11)
- [ ] Monitor: Boards "Jetzt/Nächstes" check

### Während Turnier:
- [ ] Monitor läuft auf TV/Beamer
- [ ] Eine Person hat Laptop mit Sheets offen
- [ ] Fallback: Bei WLAN-Ausfall → direkt ins Sheet

### Nach Match:
- [ ] Score-Log checken (optional)
- [ ] Side-Bets updaten (wenn genutzt)

---

## 🆘 Troubleshooting

| Problem | Lösung |
|---------|--------|
| "Falscher PIN" | Settings-Tab: PIN prüfen (Leerzeichen?) |
| "Match nicht gefunden" | Board-Name im Sheet prüfen (M1 vs. m1) |
| "Score wird nicht gespeichert" | Apps Script: Deployment als "Anyone"? |
| "Match bereits abgeschlossen" | Im Sheet: Status "Fertig" → "Läuft" ändern |
| Monitor zeigt Score nicht | 30s warten oder F5 drücken |
| Rate-Limit zu aggressiv | Apps Script: `withRateLimit` Sekunden erhöhen |

---

## ✅ DONE!

**Smoke-Test erfolgreich?** → System ready für's Turnier! 🎯🍺🚀
