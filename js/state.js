const GameState = {
  key: "h20-save-v2",
  defaults: {
    chapter: 1,
    view: "case",
    inventory: [],
    solved: [],
    unlocked: ["case"],
    notes: [],
    flags: {},
    links: [],
    selected: null
  },
  data: null,
  load() {
    this.data = {...this.defaults};
    try {
      const raw = localStorage.getItem(this.key);
      if (raw) this.data = {...this.data, ...JSON.parse(raw)};
    } catch(e) {}
  },
  save() {
    localStorage.setItem(this.key, JSON.stringify(this.data));
  },
  has(id) { return this.data.inventory.includes(id); },
  add(id) {
    if (!this.has(id)) {
      this.data.inventory.push(id);
      this.save();
    }
  },
  solve(id) {
    if (!this.data.solved.includes(id)) {
      this.data.solved.push(id);
      this.save();
    }
  },
  isSolved(id) { return this.data.solved.includes(id); },
  unlock(id) {
    if (!this.data.unlocked.includes(id)) {
      this.data.unlocked.push(id);
      this.save();
    }
  },
  isUnlocked(id) { return this.data.unlocked.includes(id); },
  flag(key, value=true) { this.data.flags[key] = value; this.save(); },
  note(text) {
    if (!this.data.notes.includes(text)) {
      this.data.notes.push(text);
      this.save();
    }
  },
  link(a,b) {
    const key = [a,b].sort().join("::");
    if (!this.data.links.includes(key)) {
      this.data.links.push(key);
      this.save();
    }
  },
  reset() {
    localStorage.removeItem(this.key);
    location.reload();
  }
};
GameState.load();