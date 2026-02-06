const { execSync } = require('child_process');
const path = require('path');

const DB_PATH = path.join(__dirname, 'archivist.db');

/**
 * Executes a SQLite query and returns the result as JSON.
 */
function runQuery(query) {
  try {
    const result = execSync(`sqlite3 -json ${DB_PATH} "${query.replace(/"/g, '\\"')}"`).toString();
    return result ? JSON.parse(result) : [];
  } catch (error) {
    return [];
  }
}

/**
 * Retrieves the index summary for a given key.
 */
function getIndex(key) {
  const query = `SELECT * FROM memory_index WHERE key = '${key}';`;
  const rows = runQuery(query);
  return rows[0] || null;
}

/**
 * Retrieves timeline events for a given index ID.
 */
function getTimeline(indexId) {
  const query = `SELECT * FROM memory_timeline WHERE index_id = ${indexId} ORDER BY date ASC;`;
  return runQuery(query);
}

/**
 * Retrieves observations for a given event ID.
 */
function getObservations(eventId) {
  const timelineQuery = `SELECT id FROM memory_timeline WHERE event_id = '${eventId}';`;
  const timelineRows = runQuery(timelineQuery);
  if (timelineRows.length === 0) return [];
  
  const timelineId = timelineRows[0].id;
  const query = `SELECT * FROM memory_observations WHERE timeline_id = ${timelineId};`;
  return runQuery(query);
}

// Export for use as a module
module.exports = {
  getIndex,
  getTimeline,
  getObservations
};

// CLI functionality
if (require.main === module) {
  const args = process.argv.slice(2);
  if (args.length === 0) {
    console.log('Usage: node query_engine.js <key> [--timeline] [--observations <event_id>]');
    process.exit(1);
  }

  const key = args[0];
  const showTimeline = args.includes('--timeline');
  const obsEventIdIdx = args.indexOf('--observations');
  const obsEventId = obsEventIdIdx !== -1 ? args[obsEventIdIdx + 1] : null;

  const index = getIndex(key);
  if (!index) {
    console.error(`Error: Index with key "${key}" not found.`);
    process.exit(1);
  }

  console.log('=== INDEX SUMMARY ===');
  console.log(`Key:       ${index.key}`);
  console.log(`Summary:   ${index.summary}`);
  console.log(`Timestamp: ${index.timestamp}`);
  console.log('');

  if (showTimeline) {
    const timeline = getTimeline(index.id);
    console.log('--- TIMELINE EVENTS ---');
    if (timeline.length === 0) {
      console.log('No timeline events found.');
    } else {
      timeline.forEach(event => {
        console.log(`[${event.event_id}] (${event.date})`);
        console.log(`  Description: ${event.description}`);
        if (event.tags) console.log(`  Tags:        ${event.tags}`);
        console.log('');
      });
    }
  }

  if (obsEventId) {
    const observations = getObservations(obsEventId);
    console.log(`--- OBSERVATIONS FOR ${obsEventId} ---`);
    if (observations.length === 0) {
      console.log('No observations found.');
    } else {
      observations.forEach(obs => {
        console.log(`- Detail:     ${obs.detail}`);
        console.log(`  Source:     ${obs.source}`);
        console.log(`  Confidence: ${obs.confidence}`);
        console.log('');
      });
    }
  }
}
