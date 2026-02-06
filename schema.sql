CREATE TABLE memory_index (
  id INTEGER PRIMARY KEY,
  key TEXT UNIQUE,
  layer TEXT, -- 'index', 'timeline', 'observation'
  summary TEXT,
  timestamp DATETIME DEFAULT CURRENT_TIMESTAMP
);

CREATE TABLE memory_timeline (
  id INTEGER PRIMARY KEY,
  event_id TEXT UNIQUE,
  description TEXT,
  date DATETIME,
  tags TEXT,
  index_id INTEGER,
  FOREIGN KEY (index_id) REFERENCES memory_index(id)
);

CREATE TABLE memory_observations (
  id INTEGER PRIMARY KEY,
  timeline_id INTEGER,
  detail TEXT,
  source TEXT,
  confidence REAL,
  FOREIGN KEY (timeline_id) REFERENCES memory_timeline(id)
);

CREATE TABLE workspace_registry (
  id INTEGER PRIMARY KEY,
  path TEXT UNIQUE,
  created_at DATETIME DEFAULT CURRENT_TIMESTAMP,
  context TEXT,
  owner_task_id TEXT,
  status TEXT DEFAULT 'active', -- 'active', 'deprecated', 'ephemeral'
  last_accessed DATETIME,
  FOREIGN KEY (owner_task_id) REFERENCES memory_timeline(event_id)
);

-- Progressive disclosure: Start with index, expand to timeline, then observations