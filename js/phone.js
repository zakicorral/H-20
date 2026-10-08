const Phone = {
  open() {
    const locked = (id) => !GameState.isUnlocked(id);
    GameUI.modal(`
      <div class="phone">
        <div class="phone-head"><span>21:16</span><span>RECOVERED DEVICE</span></div>
        <div class="phone-profile"><div class="avatar">H</div><div><strong>HIBA</strong><small>partial access</small></div></div>
        <div class="app-tile" onclick="Phone.messages()"><span>MESSAGES</span><small>available</small></div>
        <div class="app-tile ${locked("photos")?"locked":""}" onclick="Phone.photos()"><span>PHOTOS</span><small>${locked("photos")?"LOCKED":"available"}</small></div>
        <div class="app-tile ${locked("notes")?"locked":""}" onclick="Phone.notes()"><span>NOTES</span><small>${locked("notes")?"LOCKED":"available"}</small></div>
        <div class="app-tile ${locked("files")?"locked":""}" onclick="Phone.files()"><span>FILES</span><small>${locked("files")?"LOCKED":"available"}</small></div>
      </div>`);
  },
  messages() {
    GameState.unlock("messages");
    GameUI.modal(`
      <div class="phone compact-phone">
        <div class="phone-head"><button class="close" onclick="Phone.open()">‹</button><span>MESSAGES</span></div>
        <div class="message"><div class="tiny">UNKNOWN · 21:14</div>Do not start with the obvious thing.</div>
        <div class="message"><div class="tiny">UNKNOWN · 21:15</div>Look at what was left behind.</div>
        <div class="message you"><div class="tiny">YOU</div>Who is this?</div>
        <div class="message"><div class="tiny">UNKNOWN · 21:16</div>You already know the first place to look.</div>
        <div class="message"><div class="tiny">UNKNOWN · later</div>Three things survive. A paw. A coin. Something red.</div>
        <button class="btn primary" onclick="GameUI.closeModal();GameUI.scene()">Investigate the room</button>
      </div>`);
  },
  photos() {
    if (!GameState.isUnlocked("photos")) return GameUI.modal('<h2>PHOTOS</h2><p class="muted">Locked. Recover the personal profile first.</p>');
    GameUI.modal('<h2>PHOTOS</h2><div class="photo-clue"><div class="fake-photo paw">PAW</div><div class="fake-photo coin">COIN</div><div class="fake-photo red">RED</div></div><p class="muted">Three fragments. They match the last message.</p>');
  },
  notes() {
    if (!GameState.isUnlocked("notes")) return GameUI.modal('<h2>NOTES</h2><p class="muted">Locked. The four-word note has to be interpreted first.</p>');
    GameUI.modal('<h2>NOTES</h2><p>The profile key is not a password. It is a description.</p><p class="muted">paw → animal. coin → object. red → cosmetic.</p>');
  },
  files() {
    if (!GameState.isUnlocked("files")) return GameUI.modal('<h2>FILES</h2><p class="muted">Locked. The family index must be reconstructed first.</p>');
    GameUI.modal('<h2>FILES</h2><p>The next record is tagged <strong>FAMILY / 05</strong>.</p><button class="btn primary" onclick="Puzzles.familyPuzzle()">Open family index</button>');
  }
};