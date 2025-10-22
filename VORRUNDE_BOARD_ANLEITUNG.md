# 🎯 VORRUNDE MIT BOARD-ANZEIGE

## Problem:
In der Vorrunde sieht man nicht welches Team an welchem Board spielt.

## Lösung:

### **OPTION A: Board-Spalte in "Vorrunde – Eingabe" hinzufügen**

```
1. Google Sheets öffnen
2. Tab "Vorrunde – Eingabe" öffnen
3. NEUE Spalte B einfügen (vor "Leg 1")
4. Header: "Board"
5. Teams zuweisen:
   - DeTonation: M1
   - Die Hofmann Freaks: M2
   - DieGlatzis: M3
   - Ein Ziel,ein Bier: M4
   - Hartz Bier: M5
   - Hochberger Ferrets: M1
   - Keule & Putter: M2
   - Senior + Junior: M3
```

**Struktur dann:**
```
Team                | Board | Leg 1 | Leg 2 | Leg 3 | Leg 4 | HighCO
DeTonation          | M1    | 0     | 0     | 0     | 0     | 
Die Hofmann Freaks  | M2    | 0     | 0     | 0     | 0     | 
...
```

### **OPTION B: Boards dynamisch rotieren lassen**

Jedes Team spielt an einem festen Board für alle 4 Legs.

---

## Dann: Monitor anpassen

Ich passe den Monitor an um die Board-Info anzuzeigen!
