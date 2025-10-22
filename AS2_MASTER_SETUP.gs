/**
 * AS2 Hochberg – Dartturnier MASTER TOOLKIT
 * Kombiniert Setup + Auto-Berechnung + Formatierung
 *
 * Features:
 *  - Creates/repairs all tabs with formatting (setupAll)
 *  - Auto-imports paid teams from "LIVE – Teams" (pullVorrundeTeams)
 *  - Auto-calculates Vorrunde table from inputs (recalcVorrunde)
 *  - Auto-calculates A/B group tables from results (recalcGroupTables)
 *  - Adds formatted menu "🎯 AS2 Tools"
 *  - Safe to run multiple times (never deletes scores!)
 *
 * EN DASH (–) used in all tab names (U+2013)
 */

// ======= CONFIG =======
const TABS = {
  LIVE_TEAMS: 'LIVE – Teams',
  VOR_EINGABE: 'Vorrunde – Eingabe',
  VOR_TABELLE: 'Vorrunde – Tabelle',
  A_ERG: 'A – Ergebnisse',
  B_ERG: 'B – Ergebnisse',
  A_TAB: 'A – Tabelle',
  B_TAB: 'B – Tabelle',
  SETTINGS: 'Settings',
  SCORE_LOG: 'Score-Log',
  SIDEBETS: 'Side-Bets'
};

// ======= MENU =======
function onOpen() {
  SpreadsheetApp.getUi()
    .createMenu('🎯 AS2 Tools')
    .addItem('🚀 Setup/Repair Tabs & Header', 'setupAll')
    .addSeparator()
    .addItem('📥 Teams in Vorrunde ziehen', 'pullVorrundeTeams')
    .addItem('🧮 Vorrunde-Tabelle berechnen', 'recalcVorrunde')
    .addSeparator()
    .addItem('🅰️ Gruppe A Tabelle berechnen', 'recalcGroupA')
    .addItem('🅱️ Gruppe B Tabelle berechnen', 'recalcGroupB')
    .addItem('♻️ ALLES berechnen (Vor + A/B)', 'recalcAll')
    .addSeparator()
    .addItem('🔄 Reset Hauptrunde (A/B löschen)', 'resetHauptrunde')
    .addSeparator()
    .addItem('✅ Sanity-Check', 'sanityCheck')
    .addItem('📖 Hilfe', 'showHelp')
    .addToUi();
}

// ======= SETUP (with formatting!) =======
function setupAll() {
  const ss = SpreadsheetApp.getActive();

  // 1) Create/repair tabs
  const live = mustGet_(ss, TABS.LIVE_TEAMS);
  const eing = mustGet_(ss, TABS.VOR_EINGABE);
  const vtab = mustGet_(ss, TABS.VOR_TABELLE);
  const aerg = mustGet_(ss, TABS.A_ERG);
  const berg = mustGet_(ss, TABS.B_ERG);
  const atab = mustGet_(ss, TABS.A_TAB);
  const btab = mustGet_(ss, TABS.B_TAB);
  const settings = mustGet_(ss, TABS.SETTINGS);
  const log = mustGet_(ss, TABS.SCORE_LOG);
  const sidebets = mustGet_(ss, TABS.SIDEBETS);

  // 2) Set headers
  setHeader_(live,      ['Bezahlt']);
  setHeader_(eing,      ['Team', 'Leg 1', 'Leg 2', 'Leg 3', 'Leg 4', 'HighCO (optional)']);
  setHeader_(vtab,      ['Platz', 'Team', 'Gesamt-Legs', 'Best-Leg', 'HighCO', 'Seed (A/B)']);
  setHeader_(aerg,      ['Match', 'Board', 'Team 1', 'Team 2', 'Legs 1', 'Legs 2', 'Status']);
  setHeader_(berg,      ['Match', 'Board', 'Team 1', 'Team 2', 'Legs 1', 'Legs 2', 'Status']);
  setHeader_(atab,      ['Team', 'Siege', 'Legs+', 'Legs–', 'Diff']);
  setHeader_(btab,      ['Team', 'Siege', 'Legs+', 'Legs–', 'Diff']);
  setHeader_(settings,  ['Board', 'PIN', 'Active', 'Phase', 'AdminPIN']);
  setHeader_(log,       ['Timestamp', 'Phase', 'Board', 'Team1', 'Team2', 'Old Score', 'New Score', 'User', 'IP']);
  setHeader_(sidebets,  ['Bet', 'Team', 'Odds', 'Status']);

  // 3) Freeze rows
  [live, eing, vtab, aerg, berg, atab, btab, settings, log, sidebets].forEach(sh => sh.setFrozenRows(1));

  // 4) Format headers (green background, bold)
  [live, eing, vtab, aerg, berg, atab, btab, settings, log, sidebets].forEach(sh => {
    const lastCol = sh.getLastColumn() || 1;
    const header = sh.getRange(1, 1, 1, lastCol);
    header.setBackground('#00dca6')
          .setFontWeight('bold')
          .setFontColor('#0b0e13')
          .setHorizontalAlignment('center');
  });

  // 5) Add dropdowns for Ergebnis-Tabs
  addDropdowns_(aerg);
  addDropdowns_(berg);

  // 6) Add conditional formatting for Ergebnis-Tabs
  addConditionalFormatting_(aerg);
  addConditionalFormatting_(berg);

  // 7) Settings: Add example data + AdminPIN formatting
  setupSettings_(settings);

  // 8) Auto-resize columns
  [live, eing, vtab, aerg, berg, atab, btab, settings].forEach(sh => {
    try { sh.autoResizeColumns(1, sh.getLastColumn() || 1); } catch(e) {}
  });

  SpreadsheetApp.getUi().alert(
    '✅ Setup abgeschlossen!\n\n' +
    '📊 Tabs erstellt:\n' +
    '• Settings (PINs anpassen!)\n' +
    '• LIVE – Teams (Formular-Daten)\n' +
    '• Vorrunde – Eingabe/Tabelle\n' +
    '• A/B – Ergebnisse/Tabelle\n' +
    '• Score-Log, Side-Bets\n\n' +
    '🎯 Nächste Schritte:\n' +
    '1. 📥 Teams in Vorrunde ziehen\n' +
    '2. 🧮 Vorrunde-Tabelle berechnen\n' +
    '3. ♻️ ALLES berechnen\n\n' +
    '⚠️ Settings: PINs & AdminPIN ändern!'
  );
}

function setupSettings_(sheet) {
  // Only add example data if sheet is empty (below header)
  if (sheet.getLastRow() < 2) {
    sheet.getRange(2, 1, 5, 4).setValues([
      ['M1', '1234', 'YES', 'hauptrunde'],
      ['M2', '1234', 'YES', 'hauptrunde'],
      ['M3', '1234', 'YES', 'hauptrunde'],
      ['M4', '1234', 'YES', 'vorrunde'],
      ['M5', '1234', 'YES', 'vorrunde']
    ]);
    sheet.getRange(2, 5).setValue('ADMIN9999');
  }

  // Format AdminPIN cell (red)
  sheet.getRange(2, 5)
       .setBackground('#ff6161')
       .setFontWeight('bold')
       .setFontColor('#ffffff');
}

function addDropdowns_(sheet) {
  // Status dropdown (Column G)
  const statusRange = sheet.getRange('G2:G1000');
  const statusRule = SpreadsheetApp.newDataValidation()
    .requireValueInList(['Bereit', 'Läuft', 'Fertig'], true)
    .setAllowInvalid(false)
    .build();
  statusRange.setDataValidation(statusRule);

  // Board dropdown (Column B) - optional
  const boardRange = sheet.getRange('B2:B1000');
  const boardRule = SpreadsheetApp.newDataValidation()
    .requireValueInList(['M1', 'M2', 'M3', 'M4', 'M5'], true)
    .setAllowInvalid(true) // Allow empty for fallback
    .build();
  boardRange.setDataValidation(boardRule);
}

function addConditionalFormatting_(sheet) {
  const range = sheet.getRange('A2:G1000');

  // 1) Bereit = Gray
  const bereitRule = SpreadsheetApp.newConditionalFormatRule()
    .whenFormulaSatisfied('=$G2="Bereit"')
    .setBackground('#bdbdbd')
    .setFontColor('#424242')
    .setRanges([range])
    .build();

  // 2) Läuft = Orange
  const laeuftRule = SpreadsheetApp.newConditionalFormatRule()
    .whenFormulaSatisfied('=$G2="Läuft"')
    .setBackground('#ff9800')
    .setFontColor('#ffffff')
    .setRanges([range])
    .build();

  // 3) Fertig = Green
  const fertigRule = SpreadsheetApp.newConditionalFormatRule()
    .whenFormulaSatisfied('=$G2="Fertig"')
    .setBackground('#4caf50')
    .setFontColor('#ffffff')
    .setRanges([range])
    .build();

  sheet.setConditionalFormatRules([bereitRule, laeuftRule, fertigRule]);
}

// ======= ACTIONS (Original logic preserved!) =======

function pullVorrundeTeams() {
  const ss = SpreadsheetApp.getActive();
  const live = ss.getSheetByName(TABS.LIVE_TEAMS);
  const eing = ss.getSheetByName(TABS.VOR_EINGABE);
  if (!live || !eing) throw new Error('Tabs fehlen: ' + [TABS.LIVE_TEAMS, TABS.VOR_EINGABE].join(', '));

  const vals = live.getDataRange().getValues();
  const header = (vals[0] || []).map(String);
  const colPaidIdx = header.findIndex(h => h.toLowerCase().indexOf('bezahlt') !== -1);
  let names = [];

  if (colPaidIdx !== -1) {
    const maybeTeamCol = (vals[0].length >= colPaidIdx + 2) ? colPaidIdx + 1 : colPaidIdx;
    for (let r = 1; r < vals.length; r++) {
      const name = String(vals[r][maybeTeamCol] || vals[r][0] || '').trim();
      if (!name) continue;
      names.push(name);
    }
  } else {
    // No "Bezahlt" header—just take non-empty values of column A except header row
    for (let r = 1; r < vals.length; r++) {
      const name = String(vals[r][0] || '').trim();
      if (name && name.toLowerCase() !== 'team' && name.toLowerCase() !== 'bezahlt') names.push(name);
    }
  }

  // De-duplicate & sort
  names = [...new Set(names)].sort((a, b) => a.localeCompare(b, 'de'));

  // Write into Eingabe A2:A and clear old leg cells
  eing.getRange('A2:A').clearContent();
  if (names.length) {
    eing.getRange(2, 1, names.length, 1).setValues(names.map(n => [n]));
    // Clear legs / highco beside (B:F) for these rows to ensure a clean start
    eing.getRange(2, 2, Math.max(names.length, 1), 5).clearContent();
  }

  SpreadsheetApp.getUi().alert(`✅ ${names.length} Team(s) nach "Vorrunde – Eingabe" übernommen.`);
}

function recalcVorrunde() {
  const ss = SpreadsheetApp.getActive();
  const eing = ss.getSheetByName(TABS.VOR_EINGABE);
  const vtab = ss.getSheetByName(TABS.VOR_TABELLE);
  if (!eing || !vtab) throw new Error('Tabs fehlen: ' + [TABS.VOR_EINGABE, TABS.VOR_TABELLE].join(', '));

  const vals = eing.getDataRange().getValues();
  if (vals.length < 2) {
    vtab.getRange(2, 1, vtab.getMaxRows() - 1, 6).clearContent();
    SpreadsheetApp.getUi().alert('⚠️ Keine Teams in Vorrunde – Eingabe gefunden.');
    return;
  }

  // Build team rows (skip header)
  const out = []; // [Platz, Team, Gesamt, Best, HighCO, Seed]
  for (let r = 1; r < vals.length; r++) {
    const team = String(vals[r][0] || '').trim();
    if (!team) continue;
    const leg1 = toNum_(vals[r][1]);
    const leg2 = toNum_(vals[r][2]);
    const leg3 = toNum_(vals[r][3]);
    const leg4 = toNum_(vals[r][4]);
    const high = toNum_(vals[r][5]);

    const legs = [leg1, leg2, leg3, leg4].filter(n => isFinite(n) && n > 0);
    const sum = legs.reduce((a, b) => a + b, 0);
    const best = legs.length ? Math.min.apply(null, legs) : '';
    const highco = isFinite(high) ? high : 0;

    out.push([0, team, sum, best, highco, '']); // Platz/Seed later
  }

  // Sort: lower Gesamt better, then lower Best better, then higher HighCO
  out.sort((a, b) => {
    if (a[2] !== b[2]) return a[2] - b[2];
    const abest = (a[3] === '' || a[3] == null) ? 1e9 : a[3];
    const bbest = (b[3] === '' || b[3] == null) ? 1e9 : b[3];
    if (abest !== bbest) return abest - bbest;
    if (a[4] !== b[4]) return b[4] - a[4];
    return a[1].localeCompare(b[1], 'de');
  });

  // Assign place and seed
  const n = out.length;
  const cutoff = Math.ceil(n / 2);
  out.forEach((row, i) => {
    row[0] = i + 1;
    row[5] = (i + 1) <= cutoff ? 'A' : 'B';
  });

  // Write
  vtab.getRange(2, 1, vtab.getMaxRows() - 1, 6).clearContent();
  if (out.length) vtab.getRange(2, 1, out.length, 6).setValues(out);

  SpreadsheetApp.getUi().alert(`✅ Vorrunde-Tabelle berechnet!\n\n${out.length} Teams sortiert.\nGruppe A: ${cutoff}\nGruppe B: ${n - cutoff}`);
}

function recalcGroupA() { recalcGroupTables_('A'); }
function recalcGroupB() { recalcGroupTables_('B'); }
function recalcAll() {
  recalcVorrunde();
  recalcGroupA();
  recalcGroupB();
  SpreadsheetApp.getUi().alert('✅ ALLES berechnet!\n\n• Vorrunde-Tabelle ✅\n• Gruppe A Tabelle ✅\n• Gruppe B Tabelle ✅');
}

// Compute A/B – Tabelle from A/B – Ergebnisse
function recalcGroupTables_(group) {
  const ss = SpreadsheetApp.getActive();
  const ergName = (group === 'A') ? TABS.A_ERG : TABS.B_ERG;
  const tabName = (group === 'A') ? TABS.A_TAB : TABS.B_TAB;
  const erg = ss.getSheetByName(ergName);
  const tab = ss.getSheetByName(tabName);
  if (!erg || !tab) throw new Error('Tabs fehlen: ' + [ergName, tabName].join(', '));

  const rows = erg.getDataRange().getValues();
  if (rows.length < 2) {
    tab.getRange(2, 1, tab.getMaxRows() - 1, 5).clearContent();
    return;
  }

  // Aggregate per team
  const stats = new Map(); // name -> {wins, lp, lm}
  function teamRec_(name) {
    const key = String(name || '').trim();
    if (!key) return null;
    if (!stats.has(key)) stats.set(key, { wins: 0, lp: 0, lm: 0 });
    return stats.get(key);
  }

  for (let r = 1; r < rows.length; r++) {
    const team1 = String(rows[r][2] || '').trim();
    const team2 = String(rows[r][3] || '').trim();
    const l1 = toNum_(rows[r][4]);
    const l2 = toNum_(rows[r][5]);
    if (!team1 && !team2) continue;
    if (!isFinite(l1) && !isFinite(l2)) continue;

    const A = teamRec_(team1);
    const B = teamRec_(team2);
    if (A) { A.lp += (isFinite(l1) ? l1 : 0); A.lm += (isFinite(l2) ? l2 : 0); }
    if (B) { B.lp += (isFinite(l2) ? l2 : 0); B.lm += (isFinite(l1) ? l1 : 0); }

    if (isFinite(l1) && isFinite(l2) && l1 !== l2) {
      if (l1 > l2 && A) A.wins += 1;
      if (l2 > l1 && B) B.wins += 1;
    }
  }

  // Build array
  const out = [];
  [...stats.entries()].forEach(([name, s]) => {
    const diff = s.lp - s.lm;
    out.push([name, s.wins, s.lp, s.lm, diff]);
  });

  // Sort: wins desc, diff desc, legs+ desc, name asc
  out.sort((a, b) => {
    if (a[1] !== b[1]) return b[1] - a[1];
    if (a[4] !== b[4]) return b[4] - a[4];
    if (a[2] !== b[2]) return b[2] - a[2];
    return a[0].localeCompare(b[0], 'de');
  });

  // Write (clear first)
  tab.getRange(2, 1, tab.getMaxRows() - 1, 5).clearContent();
  if (out.length) tab.getRange(2, 1, out.length, 5).setValues(out);
}

// ======= CHECKS & UTILS =======

function sanityCheck() {
  const ss = SpreadsheetApp.getActive();
  const must = [TABS.LIVE_TEAMS, TABS.VOR_EINGABE, TABS.VOR_TABELLE, TABS.A_ERG, TABS.B_ERG, TABS.A_TAB, TABS.B_TAB, TABS.SETTINGS];
  const missing = must.filter(n => !ss.getSheetByName(n));
  if (missing.length) throw new Error('Fehlende Tabs: ' + missing.join(', '));

  const expectHdr = ['Match', 'Board', 'Team 1', 'Team 2', 'Legs 1', 'Legs 2', 'Status'];
  [TABS.A_ERG, TABS.B_ERG].forEach(n => {
    const sh = ss.getSheetByName(n);
    const hdr = (sh.getRange(1, 1, 1, 7).getValues()[0] || []).map(String);
    const ok = expectHdr.every((h, i) => hdr[i] === h);
    if (!ok) throw new Error('Header in "' + n + '" unerwartet. Erwartet: ' + expectHdr.join(', '));
  });

  SpreadsheetApp.getUi().alert('✅ Sanity-Check OK!\n\nAlle Tabs & Header stimmen.');
}

function showHelp() {
  SpreadsheetApp.getUi().alert(
    '📖 AS2 Dartturnier - Hilfe\n\n' +
    '🚀 Setup/Repair:\n' +
    '   Erstellt alle Tabs + Formatierung\n\n' +
    '📥 Teams ziehen:\n' +
    '   Importiert Teams aus LIVE – Teams\n' +
    '   in Vorrunde – Eingabe\n\n' +
    '🧮 Vorrunde berechnen:\n' +
    '   Sortiert Teams nach Legs\n' +
    '   Verteilt in Gruppe A/B\n\n' +
    '🅰️🅱️ Gruppe A/B berechnen:\n' +
    '   Berechnet Tabelle aus Ergebnissen\n\n' +
    '♻️ ALLES berechnen:\n' +
    '   Führt alle Berechnungen durch\n\n' +
    '✅ Sanity-Check:\n' +
    '   Prüft ob Tabs/Header korrekt\n\n' +
    '⚠️ Settings:\n' +
    '   PINs & AdminPIN ändern!'
  );
}

// ======= RESET HAUPTRUNDE =======
function resetHauptrunde() {
  const ui = SpreadsheetApp.getUi();
  const response = ui.alert(
    '🔄 Reset Hauptrunde',
    'Dies löscht ALLE Match-Paarungen und Scores in Gruppe A und B!\n\n' +
    'Vorrunde bleibt unberührt.\n\n' +
    'Fortfahren?',
    ui.ButtonSet.YES_NO
  );

  if (response !== ui.Button.YES) {
    ui.alert('❌ Abgebrochen');
    return;
  }

  const ss = SpreadsheetApp.getActive();
  
  try {
    // Reset A – Ergebnisse
    const aErg = ss.getSheetByName(TABS.A_ERG);
    if (aErg) {
      const lastRow = aErg.getLastRow();
      if (lastRow > 1) {
        // Alle Zeilen außer Header löschen
        aErg.deleteRows(2, lastRow - 1);
      }
      // Header neu setzen
      setHeader_(aErg, ['Match', 'Board', 'Team 1', 'Team 2', 'Legs 1', 'Legs 2', 'Status']);
    }

    // Reset B – Ergebnisse
    const bErg = ss.getSheetByName(TABS.B_ERG);
    if (bErg) {
      const lastRow = bErg.getLastRow();
      if (lastRow > 1) {
        bErg.deleteRows(2, lastRow - 1);
      }
      setHeader_(bErg, ['Match', 'Board', 'Team 1', 'Team 2', 'Legs 1', 'Legs 2', 'Status']);
    }

    // Reset A – Tabelle
    const aTab = ss.getSheetByName(TABS.A_TAB);
    if (aTab) {
      const lastRow = aTab.getLastRow();
      if (lastRow > 1) {
        aTab.deleteRows(2, lastRow - 1);
      }
      setHeader_(aTab, ['Team', 'Siege', 'Legs+', 'Legs–', 'Diff']);
    }

    // Reset B – Tabelle
    const bTab = ss.getSheetByName(TABS.B_TAB);
    if (bTab) {
      const lastRow = bTab.getLastRow();
      if (lastRow > 1) {
        bTab.deleteRows(2, lastRow - 1);
      }
      setHeader_(bTab, ['Team', 'Siege', 'Legs+', 'Legs–', 'Diff']);
    }

    ui.alert(
      '✅ Reset erfolgreich!',
      'Alle Hauptrunden-Daten gelöscht:\n\n' +
      '• A – Ergebnisse: leer\n' +
      '• B – Ergebnisse: leer\n' +
      '• A – Tabelle: leer\n' +
      '• B – Tabelle: leer\n\n' +
      'Vorrunde bleibt unberührt.'
    );
  } catch (err) {
    ui.alert('❌ Fehler beim Reset: ' + err.message);
  }
}

function mustGet_(ss, name) {
  return ss.getSheetByName(name) || ss.insertSheet(name);
}

function setHeader_(sh, a) {
  sh.getRange(1, 1, 1, a.length).setValues([a]);
}

function toNum_(v) {
  if (v === null || v === '' || typeof v === 'boolean') return NaN;
  const n = Number(v);
  return isNaN(n) ? NaN : n;
}
