/**
 * SCORE-EINGABE für AS2 Dartturnier
 * 
 * ENTRYPOINT für die Score-Eingabe von der Website.
 * Erwartet JSON-POST mit:
 *
 *  Vorrunde:
 *    {
 *      "mode": "vorrunde",
 *      "team": "Teamname",
 *      "legs": 12
 *    }
 *
 *  Hauptrunde:
 *    {
 *      "match": "Match 7",  // String!
 *      "group": "A" | "B",
 *      "score1": 2,
 *      "score2": 1
 *    }
 */

function doPost(e) {
  try {
    if (!e || !e.postData || !e.postData.contents) {
      return jsonResponse(false, 'Kein POST-Body empfangen.');
    }

    const data = JSON.parse(e.postData.contents);
    const sheet = SpreadsheetApp.getActiveSpreadsheet();

    // Vorrunde-Modus
    if (data.mode === 'vorrunde') {
      return handleVorrunde(sheet, data);
    }

    // Hauptrunde-Modus (hat kein 'mode' Feld, sondern 'match' + 'group')
    if (data.match && data.group) {
      return handleHauptrunde(sheet, data);
    }

    // Fallback
    return jsonResponse(false, 'Unbekannter Request-Typ');

  } catch (error) {
    Logger.log('doPost ERROR: ' + error);
    return jsonResponse(false, error.toString());
  }
}

/**
 * Helper-Funktion für konsistente JSON-Antworten
 */
function jsonResponse(ok, msg, extra) {
  const payload = Object.assign(
    { ok: !!ok, msg: msg || '' },
    extra || {}
  );
  return ContentService
    .createTextOutput(JSON.stringify(payload))
    .setMimeType(ContentService.MimeType.JSON);
}

/**
 * VORRUNDE:
 * Schreibt Legs in "Vorrunde – Eingabe"
 *
 * Sheet-Struktur "Vorrunde – Eingabe":
 *   Spalte A: Team
 *   Spalte B: Board
 *   Spalte C–H: Leg 1..6
 *   Spalte I: HighCO (optional)
 */
function handleVorrunde(ss, data) {
  const teamName = (data.team || '').trim();
  const legsVal  = Number(data.legs);

  if (!teamName) {
    return jsonResponse(false, 'Kein Teamname übergeben.');
  }
  if (!isFinite(legsVal) || legsVal <= 0) {
    return jsonResponse(false, 'Ungültiger Legs-Wert: ' + data.legs);
  }

  const sh = ss.getSheetByName('Vorrunde – Eingabe');
  if (!sh) {
    return jsonResponse(false, 'Tab "Vorrunde – Eingabe" nicht gefunden.');
  }

  const all = sh.getDataRange().getValues();
  let rowIndex = -1; // 1-basiert

  // Team in Spalte A suchen (Zeile ≥ 2)
  for (let r = 1; r < all.length; r++) {
    const name = String(all[r][0] || '').trim();
    if (name === teamName) {
      rowIndex = r + 1; // getRange ist 1-basiert
      break;
    }
  }

  if (rowIndex === -1) {
    return jsonResponse(false, 'Team "' + teamName + '" nicht in "Vorrunde – Eingabe" gefunden.');
  }

  // Nächste freie Leg-Spalte (C=3 .. H=8)
  let colIndex = -1;
  for (let c = 3; c <= 8; c++) {
    const val = sh.getRange(rowIndex, c).getValue();
    if (val === '' || val === null) {
      colIndex = c;
      break;
    }
  }

  if (colIndex === -1) {
    // Alles voll → max. 6 Legs
    return jsonResponse(false, 'Alle 6 Läufe für dieses Team sind bereits eingetragen.');
  }

  // Wert eintragen
  sh.getRange(rowIndex, colIndex).setValue(legsVal);

  // Optional: Zeitpunkt ins Log-Sheet schreiben
  try {
    const log = ss.getSheetByName('Score-Log');
    if (log) {
      const ts = new Date();
      log.appendRow(['Vorrunde', ts, teamName, '', legsVal, '', '', Session.getActiveUser().getEmail()]);
    }
  } catch (err) {
    Logger.log('Score-Log Fehler (Vorrunde): ' + err);
  }

  return jsonResponse(true, 'Vorrunden-Leg gespeichert.', {
    team: teamName,
    col: colIndex
  });
}

/**
 * HAUPTRUNDE:
 * Schreibt Scores in "A – Ergebnisse" oder "B – Ergebnisse"
 *
 * Erwartetes JSON:
 *  {
 *    match: "Match 7",  // String!
 *    group: 'A' | 'B',
 *    score1: 2,
 *    score2: 1
 *  }
 *
 * Sheet-Struktur "A – Ergebnisse" / "B – Ergebnisse":
 *   Spalte A: Match (String: "Match 1", "Match 2", ...)
 *   Spalte B: Board
 *   Spalte C: Team 1
 *   Spalte D: Team 2
 *   Spalte E: Legs 1
 *   Spalte F: Legs 2
 *   Spalte G: Status (Bereit/Läuft/Fertig)
 */
function handleHauptrunde(ss, data) {
  const group     = (data.group || '').toUpperCase();
  const matchStr  = (data.match || '').trim();
  const score1    = Number(data.score1);
  const score2    = Number(data.score2);

  if (group !== 'A' && group !== 'B') {
    return jsonResponse(false, 'Ungültige Gruppe: ' + data.group);
  }
  if (!matchStr) {
    return jsonResponse(false, 'Keine Match-Bezeichnung übergeben.');
  }
  if (!isFinite(score1) || !isFinite(score2)) {
    return jsonResponse(false, 'Ungültige Score-Werte: ' + data.score1 + '/' + data.score2);
  }

  const tabName = (group === 'A') ? 'A – Ergebnisse' : 'B – Ergebnisse';
  const sh = ss.getSheetByName(tabName);
  if (!sh) {
    return jsonResponse(false, 'Tab "' + tabName + '" nicht gefunden.');
  }

  const all = sh.getDataRange().getValues();
  let rowIndex = -1;

  // Match in Spalte A suchen (Zeile ≥ 2)
  for (let r = 1; r < all.length; r++) {
    const m = String(all[r][0] || '').trim();
    if (m === matchStr) {
      rowIndex = r + 1;
      break;
    }
  }

  if (rowIndex === -1) {
    return jsonResponse(false, 'Match "' + matchStr + '" nicht in "' + tabName + '" gefunden.');
  }

  // Scores eintragen (E/F) + Status setzen (G)
  sh.getRange(rowIndex, 5).setValue(score1);       // E = Legs 1
  sh.getRange(rowIndex, 6).setValue(score2);       // F = Legs 2
  sh.getRange(rowIndex, 7).setValue('Fertig');     // G = Status

  // Optional: Logging
  try {
    const log = ss.getSheetByName('Score-Log');
    if (log) {
      const ts = new Date();
      const row = sh.getRange(rowIndex, 1, 1, 7).getValues()[0];
      const t1 = row[2], t2 = row[3];
      log.appendRow(['Hauptrunde ' + group, ts, t1, t2, score1, score2, matchStr, Session.getActiveUser().getEmail()]);
    }
  } catch (err) {
    Logger.log('Score-Log Fehler (Hauptrunde): ' + err);
  }

  return jsonResponse(true, 'Hauptrunden-Score gespeichert.', {
    group: group,
    match: matchStr
  });
}

function doGet(e) {
  return ContentService.createTextOutput('AS2 Score API läuft!');
}
