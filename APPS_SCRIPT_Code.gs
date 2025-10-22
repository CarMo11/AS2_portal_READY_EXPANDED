/**
 * AS2 Dartturnier - Score-Eingabe Backend
 * 
 * Installation:
 * 1. Google Sheets öffnen
 * 2. Erweiterungen → Apps Script
 * 3. Diesen Code in Code.gs einfügen
 * 4. Als Web-App deployen: Deploy → New deployment → Web app
 * 5. Execute as: Me
 * 6. Who has access: Anyone
 * 7. URL kopieren und in score.html einfügen (SCRIPT_URL)
 */

// ========================================
// CONFIG
// ========================================

const CONFIG = {
  SETTINGS_SHEET: 'Settings',
  VORRUNDE_SHEET: 'Vorrunde – Eingabe',
  A_ERGEBNISSE: 'A – Ergebnisse',
  B_ERGEBNISSE: 'B – Ergebnisse',
  LOG_SHEET: 'Score-Log',
  
  // Spalten in Ergebnis-Tabs
  COL_MATCH: 1,     // A
  COL_BOARD: 2,     // B
  COL_TEAM1: 3,     // C
  COL_TEAM2: 4,     // D
  COL_LEGS1: 5,     // E
  COL_LEGS2: 6,     // F
  COL_STATUS: 7,    // G
};

// ========================================
// RATE LIMIT (Spam-Schutz)
// ========================================

function withRateLimit(key, seconds, fn){
  const c = CacheService.getScriptCache();
  if (c.get(key)) return jsonResponse({ok:false, msg:'Bitte kurz warten und erneut senden.'});
  c.put(key, '1', seconds);
  return fn();
}

// ========================================
// MAIN HANDLERS
// ========================================

function doGet(e) {
  const action = e.parameter.action;
  
  if (action === 'checkPIN') {
    return checkPIN(e.parameter.board, e.parameter.pin);
  }
  
  return jsonResponse({ok: false, msg: 'Unknown action'});
}

function doPost(e) {
  try {
    const data = JSON.parse(e.postData.contents);
    const action = data.action;
    
    if (action === 'saveVorrunde') {
      return saveVorrunde(data);
    }
    
    if (action === 'saveHauptrunde') {
      return saveHauptrunde(data);
    }
    
    if (action === 'adminSetScore') {
      return apiAdminSetScore(data);
    }
    
    return jsonResponse({ok: false, msg: 'Unknown action'});
    
  } catch (error) {
    logError('doPost', error);
    return jsonResponse({ok: false, msg: 'Server error'});
  }
}

// ========================================
// PIN & PHASE CHECK
// ========================================

function checkPIN(board, pin) {
  try {
    const ss = SpreadsheetApp.getActive();
    
    // Check if Settings sheet exists
    let settingsSheet = ss.getSheetByName(CONFIG.SETTINGS_SHEET);
    if (!settingsSheet) {
      // Create default settings
      settingsSheet = ss.insertSheet(CONFIG.SETTINGS_SHEET);
      settingsSheet.getRange(1,1,1,4).setValues([['Board','PIN','Active','Phase']]);
      settingsSheet.getRange(2,1,5,4).setValues([
        ['M1','1234','YES','hauptrunde'],
        ['M2','1234','YES','hauptrunde'],
        ['M3','1234','YES','hauptrunde'],
        ['M4','1234','YES','hauptrunde'],
        ['M5','1234','YES','hauptrunde'],
      ]);
    }
    
    // Find board row
    const data = settingsSheet.getDataRange().getValues();
    const boardRow = data.find(row => row[0] === board);
    
    if (!boardRow) {
      return jsonResponse({ok: false, msg: 'Board nicht gefunden'});
    }
    
    const [boardName, correctPIN, active, phase] = boardRow;
    
    if (String(active).toUpperCase() !== 'YES') {
      return jsonResponse({ok: false, msg: 'Board ist nicht aktiv'});
    }
    
    if (String(correctPIN) !== String(pin)) {
      return jsonResponse({ok: false, msg: 'Falscher PIN'});
    }
    
    // Phase bestimmen
    const currentPhase = String(phase).toLowerCase() === 'vorrunde' ? 'vorrunde' : 'hauptrunde';
    
    if (currentPhase === 'vorrunde') {
      // Load teams from LIVE or Vorrunde sheet
      const teams = getVorrundeTeams();
      return jsonResponse({ok: true, phase: 'vorrunde', teams});
    } else {
      // Load current match for this board
      const match = getCurrentMatch(board);
      return jsonResponse({ok: true, phase: 'hauptrunde', match});
    }
    
  } catch (error) {
    logError('checkPIN', error);
    return jsonResponse({ok: false, msg: 'Server error'});
  }
}

// ========================================
// VORRUNDE
// ========================================

function getVorrundeTeams() {
  try {
    const ss = SpreadsheetApp.getActive();
    const liveSheet = ss.getSheetByName('LIVE – Teams');
    
    if (!liveSheet) return [];
    
    const data = liveSheet.getDataRange().getValues();
    const startIdx = data.findIndex(row => String(row[0] || '').toLowerCase() === 'bezahlt');
    
    if (startIdx === -1) return [];
    
    // Set für Deduplizierung
    const set = new Set();
    for (let i = startIdx + 1; i < data.length; i++) {
      const name = String(data[i][0] || '').trim();
      if (name) set.add(name);
    }
    
    return [...set];
    
  } catch (error) {
    logError('getVorrundeTeams', error);
    return [];
  }
}

function saveVorrunde(data) {
  return withRateLimit('save:' + data.board + ':' + data.team, 3, () => {
    try {
      const {board, pin, team, legs} = data;
      
      // Re-check PIN
      const pinCheck = checkPIN(board, pin);
      const pinData = JSON.parse(pinCheck.getContent());
      if (!pinData.ok) {
        return jsonResponse({ok: false, msg: 'PIN ungültig'});
      }
      
      // Validate
      if (!team) {
        return jsonResponse({ok: false, msg: 'Team fehlt'});
      }
      
      if (!legs || legs < 7 || legs > 14) {
        return jsonResponse({ok: false, msg: 'Ungültiger Legs-Wert (7-14)'});
      }
      
      const ss = SpreadsheetApp.getActive();
      let sheet = ss.getSheetByName(CONFIG.VORRUNDE_SHEET);
      
      // Create sheet if not exists
      if (!sheet) {
        sheet = ss.insertSheet(CONFIG.VORRUNDE_SHEET);
        sheet.getRange(1,1,1,4).setValues([['Team','Legs','Board','Timestamp']]);
      }
      
      // Append entry
      sheet.appendRow([
        team,
        legs,
        board,
        new Date()
      ]);
      
      // Log
      logEntry('Vorrunde', board, team, null, null, null, legs, null);
      
      return jsonResponse({ok: true, msg: 'Score gespeichert!'});
      
    } catch (error) {
      logError('saveVorrunde', error);
      return jsonResponse({ok: false, msg: 'Fehler beim Speichern'});
    }
  });
}

// ========================================
// HAUPTRUNDE
// ========================================

function getCurrentMatch(board) {
  try {
    const ss = SpreadsheetApp.getActive();
    
    // Check both groups
    for (const group of ['A', 'B']) {
      const sheetName = `${group} – Ergebnisse`;
      const sheet = ss.getSheetByName(sheetName);
      
      if (!sheet) continue;
      
      const data = sheet.getDataRange().getValues();
      
      // Find match at this board that's not "Fertig"
      for (let i = 1; i < data.length; i++) {
        const row = data[i];
        const matchBoard = String(row[CONFIG.COL_BOARD - 1] || '').trim();
        const status = String(row[CONFIG.COL_STATUS - 1] || '').trim();
        
        if (matchBoard === board && status !== 'Fertig') {
          return {
            group,
            num: row[CONFIG.COL_MATCH - 1],
            team1: row[CONFIG.COL_TEAM1 - 1],
            team2: row[CONFIG.COL_TEAM2 - 1],
            row: i + 1, // 1-indexed
            sheet: sheetName
          };
        }
      }
    }
    
    return null;
    
  } catch (error) {
    logError('getCurrentMatch', error);
    return null;
  }
}

function saveHauptrunde(data) {
  return withRateLimit('save:' + data.board + ':' + data.match, 3, () => {
    try {
      const {board, pin, match, group, legs1, legs2} = data;
    
    // Re-check PIN
    const pinCheck = checkPIN(board, pin);
    const pinData = JSON.parse(pinCheck.getContent());
    if (!pinData.ok) {
      return jsonResponse({ok: false, msg: 'PIN ungültig'});
    }
    
    // Validate
    if (legs1 === undefined || legs2 === undefined) {
      return jsonResponse({ok: false, msg: 'Scores fehlen'});
    }
    
    if (legs1 < 0 || legs1 > 2 || legs2 < 0 || legs2 > 2) {
      return jsonResponse({ok: false, msg: 'Ungültiger Score (0-2)'});
    }
    
    if (legs1 === 2 && legs2 === 2) {
      return jsonResponse({ok: false, msg: '2:2 ist nicht möglich (Best of 3)'});
    }
    
    const ss = SpreadsheetApp.getActive();
    const sheetName = `${group} – Ergebnisse`;
    const sheet = ss.getSheetByName(sheetName);
    
    if (!sheet) {
      return jsonResponse({ok: false, msg: 'Sheet nicht gefunden'});
    }
    
    // Find match row - mit Fallback für leeres Board
    const sheetData = sheet.getDataRange().getValues();
    let targetRow = -1;
    
    // 1) Exakter Treffer: match + board
    for (let i = 1; i < sheetData.length; i++) {
      const row = sheetData[i];
      const matchNum = row[CONFIG.COL_MATCH - 1];
      const matchBoard = String(row[CONFIG.COL_BOARD - 1] || '').trim();
      
      if (String(matchNum) === String(match) && matchBoard === board) {
        targetRow = i + 1; // 1-indexed
        break;
      }
    }
    
    // 2) Fallback: nur match (wenn Board noch leer) → dann Board setzen
    if (targetRow === -1) {
      let found = -1;
      for (let i = 1; i < sheetData.length; i++) {
        const row = sheetData[i];
        const matchNum = row[CONFIG.COL_MATCH - 1];
        const matchBoard = String(row[CONFIG.COL_BOARD - 1] || '').trim();
        
        if (String(matchNum) === String(match) && !matchBoard) {
          if (found !== -1) {
            return jsonResponse({ok: false, msg: 'Mehrere Zeilen mit gleicher Matchnummer – bitte Board im Sheet setzen.'});
          }
          found = i + 1;
        }
      }
      
      if (found !== -1) {
        targetRow = found;
        sheet.getRange(targetRow, CONFIG.COL_BOARD).setValue(board); // Board einmalig setzen
      }
    }
    
    if (targetRow === -1) {
      return jsonResponse({ok: false, msg: 'Match nicht gefunden (Board/Match prüfen).'});
    }
    
    // Check if already finished (auch Downgrade blocken)
    const oldLegs1 = Number(sheet.getRange(targetRow, CONFIG.COL_LEGS1).getValue() || 0);
    const oldLegs2 = Number(sheet.getRange(targetRow, CONFIG.COL_LEGS2).getValue() || 0);
    const currentStatus = String(sheet.getRange(targetRow, CONFIG.COL_STATUS).getValue() || '').trim();
    
    if (currentStatus === 'Fertig' || Math.max(oldLegs1, oldLegs2) >= 2) {
      return jsonResponse({ok: false, msg: 'Match ist bereits abgeschlossen.'});
    }
    
    // Get team names for logging
    const team1 = sheet.getRange(targetRow, CONFIG.COL_TEAM1).getValue();
    const team2 = sheet.getRange(targetRow, CONFIG.COL_TEAM2).getValue();
    
    // Save scores
    sheet.getRange(targetRow, CONFIG.COL_LEGS1).setValue(legs1);
    sheet.getRange(targetRow, CONFIG.COL_LEGS2).setValue(legs2);
    
    // Auto-status
    let newStatus = 'Bereit';
    if (legs1 === 2 || legs2 === 2) {
      newStatus = 'Fertig';
    } else if (legs1 > 0 || legs2 > 0) {
      newStatus = 'Läuft';
    }
    sheet.getRange(targetRow, CONFIG.COL_STATUS).setValue(newStatus);
    
    // Log
    logEntry('Hauptrunde', board, team1, team2, oldLegs1, oldLegs2, legs1, legs2);
    
    return jsonResponse({ok: true, msg: 'Score gespeichert!', status: newStatus});
    
    } catch (error) {
      logError('saveHauptrunde', error);
      return jsonResponse({ok: false, msg: 'Fehler beim Speichern'});
    }
  });
}

// ========================================
// LOGGING
// ========================================

function logEntry(phase, board, team1, team2, oldL1, oldL2, newL1, newL2) {
  try {
    const ss = SpreadsheetApp.getActive();
    let logSheet = ss.getSheetByName(CONFIG.LOG_SHEET);
    
    if (!logSheet) {
      logSheet = ss.insertSheet(CONFIG.LOG_SHEET);
      logSheet.getRange(1,1,1,9).setValues([[
        'Timestamp','Phase','Board','Team1','Team2','Old Score','New Score','User','IP'
      ]]);
    }
    
    const oldScore = (oldL1 !== null && oldL2 !== null) ? `${oldL1}:${oldL2}` : '-';
    const newScore = `${newL1}:${(newL2 ?? '-')}`;
    
    logSheet.appendRow([
      new Date(),
      phase,
      board,
      team1 || '-',
      team2 || '-',
      oldScore,
      newScore,
      Session.getActiveUser().getEmail() || 'Anonymous',
      Session.getTemporaryActiveUserKey() || '-'
    ]);
    
  } catch (error) {
    // Silent fail - logging shouldn't break the main flow
    console.error('Log error:', error);
  }
}

function logError(context, error) {
  console.error(`[${context}]`, error);
}

// ========================================
// ADMIN OVERRIDE (Notfall-Korrektur)
// ========================================

function apiAdminSetScore(payload) {
  try {
    const ss = SpreadsheetApp.getActive();
    
    // AdminPIN aus Settings-Tab holen (Spalte D, Zeile 2)
    const settingsSheet = ss.getSheetByName(CONFIG.SETTINGS_SHEET);
    if (!settingsSheet) {
      return jsonResponse({ok: false, msg: 'Settings-Sheet nicht gefunden'});
    }
    
    const adminPin = String(settingsSheet.getRange(2, 4).getValue() || '').trim(); // D2
    
    if (!adminPin) {
      return jsonResponse({ok: false, msg: 'Kein AdminPIN konfiguriert'});
    }
    
    if (String(payload.adminPin) !== adminPin) {
      return jsonResponse({ok: false, msg: 'AdminPIN falsch'});
    }
    
    // Validate payload
    const {sheet: sheetName, row, legs1, legs2, status} = payload;
    
    if (!sheetName || !row) {
      return jsonResponse({ok: false, msg: 'Sheet und Row erforderlich'});
    }
    
    const targetSheet = ss.getSheetByName(sheetName);
    if (!targetSheet) {
      return jsonResponse({ok: false, msg: `Sheet "${sheetName}" nicht gefunden`});
    }
    
    // Set scores
    if (legs1 !== undefined && legs2 !== undefined) {
      targetSheet.getRange(row, CONFIG.COL_LEGS1, 1, 2).setValues([[legs1, legs2]]);
    }
    
    // Set status
    if (status) {
      targetSheet.getRange(row, CONFIG.COL_STATUS).setValue(status);
    }
    
    // Log
    logEntry('Admin-Override', payload.board || '-', 
             targetSheet.getRange(row, CONFIG.COL_TEAM1).getValue(),
             targetSheet.getRange(row, CONFIG.COL_TEAM2).getValue(),
             null, null, legs1, legs2);
    
    return jsonResponse({ok: true, msg: 'Override gespeichert'});
    
  } catch (error) {
    logError('apiAdminSetScore', error);
    return jsonResponse({ok: false, msg: 'Fehler beim Admin-Override'});
  }
}

// ========================================
// HELPERS
// ========================================

function jsonResponse(obj) {
  return ContentService
    .createTextOutput(JSON.stringify(obj))
    .setMimeType(ContentService.MimeType.JSON);
}

// ========================================
// SETUP HELPERS & UTILITIES
// ========================================

function sanityCheck() {
  const mustHave = ['Settings','A – Ergebnisse','B – Ergebnisse'];
  const ss = SpreadsheetApp.getActive();
  const missing = mustHave.filter(n => !ss.getSheetByName(n));
  if (missing.length) throw new Error('Fehlende Sheets: ' + missing.join(', '));

  const a = ss.getSheetByName('A – Ergebnisse'), b = ss.getSheetByName('B – Ergebnisse');
  const check = sh => {
    const hdr = (sh.getRange(1,1,1,7).getValues()[0]||[]).map(String);
    const ok = hdr[0]==='Match' && hdr[1]==='Board' && hdr[2]==='Team 1' && hdr[3]==='Team 2' && hdr[4]==='Legs 1' && hdr[5]==='Legs 2' && hdr[6]==='Status';
    if (!ok) throw new Error('Header in "'+sh.getName()+'" unerwartet. Erwartet: Match, Board, Team 1, Team 2, Legs 1, Legs 2, Status');
  };
  [a,b].forEach(check);

  const set = ss.getSheetByName('Settings');
  const setHdr = (set.getRange(1,1,1,5).getValues()[0]||[]).map(String);
  const setOk   = setHdr[0]==='Board' && setHdr[1]==='PIN' && setHdr[2]==='Active' && setHdr[3]==='Phase' && setHdr[4]==='AdminPIN';
  if (!setOk) throw new Error('Settings-Header unerwartet.');
  
  SpreadsheetApp.getUi().alert('✅ Sanity-Check OK!\n\nAlle Tabs und Header sind korrekt.');
}

function seedExampleMatches() {
  const ss = SpreadsheetApp.getActive();
  [['A – Ergebnisse','A1'],['B – Ergebnisse','B1']].forEach(([name])=>{
    const sh = ss.getSheetByName(name);
    if (sh.getLastRow()<2){
      sh.getRange(1,1,1,7).setValues([['Match','Board','Team 1','Team 2','Legs 1','Legs 2','Status']]);
      sh.appendRow([1,'', 'Team Alpha', 'Team Beta', 0, 0, 'Bereit']);
      sh.appendRow([2,'', 'Team Gamma', 'Team Delta',0, 0, 'Bereit']);
    }
  });
  SpreadsheetApp.getUi().alert('🌱 Beispielmatches angelegt!\n\nMatch 1 & 2 in beiden Gruppen erstellt.');
}

function setupSettingsSheet() {
  const ss = SpreadsheetApp.getActive();
  let sheet = ss.getSheetByName(CONFIG.SETTINGS_SHEET);
  
  if (!sheet) {
    sheet = ss.insertSheet(CONFIG.SETTINGS_SHEET);
  }
  
  sheet.clear();
  
  // Header mit AdminPIN Spalte
  sheet.getRange(1,1,1,5).setValues([['Board','PIN','Active','Phase','AdminPIN']]);
  
  // Boards
  sheet.getRange(2,1,5,4).setValues([
    ['M1','1234','YES','hauptrunde'],
    ['M2','1234','YES','hauptrunde'],
    ['M3','1234','YES','hauptrunde'],
    ['M4','1234','YES','vorrunde'],
    ['M5','1234','YES','vorrunde'],
  ]);
  
  // AdminPIN in D2 (nur eine Zeile)
  sheet.getRange(2, 5).setValue('ADMIN9999');
  
  // Format
  sheet.setFrozenRows(1);
  sheet.autoResizeColumns(1, 5);
  sheet.getRange(1,1,1,5).setBackground('#00dca6').setFontWeight('bold').setFontColor('#0b0e13');
  
  // AdminPIN Zelle hervorheben
  sheet.getRange(2,5).setBackground('#ff6161').setFontWeight('bold').setFontColor('#ffffff');
  
  SpreadsheetApp.getUi().alert('✅ Settings-Tab erstellt!\n\n⚠️ WICHTIG:\n• Board-PINs ändern (Spalte B)\n• AdminPIN ändern (Spalte E, rot markiert)\n• AdminPIN nur für Notfall-Korrekturen!');
}
