const H20_DATA={subject:{name:"Hiba Amdaa",birthDate:"26 November 2006",heightCm:183,likes:["cats","money","strawberry lipstick"],dislikes:["heat","cooking","chores"],internship:"at her sister's boyfriend's workplace",relationship:"Zaki Corral",familyCity:"Laayoune, Morocco"},family:[{name:"Fatima",role:"mother",age:56},{name:"Mohamed",role:"father",age:61},{name:"Zineb",role:"sister",age:26},{name:"Meriem",role:"sister",age:27},{name:"Oumaima",role:"sister",age:29}],zaki:{name:"Zaki Corral",profileReady:false},chapters:[{id:1,title:"THE RECOVERY",subtitle:"Something survived the wipe."},{id:2,title:"THE PROFILE",subtitle:"The evidence is becoming personal."},{id:3,title:"THE FAMILY INDEX",subtitle:"Names are not random."},{id:4,title:"THE CONNECTION",subtitle:"Two lives appear in the same file."},{id:5,title:"FILE 020",subtitle:"The date finally makes sense."}]};
const GameUI = {
  init() {
    document.querySelectorAll(".bottom-nav button").forEach(b => b.addEventListener("click", () => {
      GameState.data.view = b.dataset.view; GameState.save(); this.render();
    }));
    document.getElementById("saveBtn").onclick = () => { GameState.save(); this.toast("Progress saved"); };
    this.render();
  },
  render() {
    document.querySelectorAll(".bottom-nav button").forEach(b => b.classList.toggle("active", b.dataset.view === GameState.data.view));
    document.getElementById("evidenceCount").textContent = GameState.data.inventory.length;
    const s = document.getElementById("screen");
    if (GameState.data.view === "evidence") return this.evidence();
    if (GameState.data.view === "phone") return this.phone();
    if (GameState.data.view === "notes") return this.notes();
    this.caseView();
  },
  caseView() {
    const c = GameState.data.chapter;
    const chapter = H20_DATA.chapters[c-1];
    let html = `<div class="case-header"><div><span class="label">CASE H-20 · ACTIVE</span><h1>${chapter.title}</h1><p class="muted">${chapter.subtitle}</p></div><div class="chapter-badge">0${c}</div></div>`;
    if (c === 1) html += `
      <div class="status-strip"><span>STATUS</span><strong>INVESTIGATION OPEN</strong><span>01/05</span></div>
      <div class="card hero-card"><span class="label">RECOVERED MESSAGE</span><h2>Something survived the wipe.</h2><p>A device was recovered with almost everything erased. One conversation remains.</p><button class="btn primary" onclick="Phone.open()">Read messages</button></div>
      <div class="objective"><span class="label">OBJECTIVE</span><strong>Find the first piece of evidence.</strong><p class="tiny">Look through the room. Not everything matters.</p></div>`;
    if (c === 2) html += `
      <div class="status-strip"><span>STATUS</span><strong>PERSONAL PROFILE</strong><span>02/05</span></div>
      <div class="card hero-card"><span class="label">NEW EVIDENCE</span><h2>The message was describing someone.</h2><p>The fragments can be matched against the recovered profile.</p><button class="btn primary" onclick="Puzzles.profilePuzzle()">Reconstruct profile</button></div>
      <div class="card"><span class="label">DEVICE</span><h3>Phone access expanded</h3><p class="muted">Photos and Notes are now available.</p><button class="btn" onclick="Phone.open()">Inspect phone</button></div>`;
    if (c === 3) html += `
      <div class="status-strip"><span>STATUS</span><strong>FAMILY INDEX</strong><span>03/05</span></div>
      <div class="card hero-card"><span class="label">FAMILY / 05</span><h2>Five names. One ordering problem.</h2><p>The archive has separated the family into roles and ages. Reconstruct the only order the note permits.</p><button class="btn primary" onclick="Puzzles.familyPuzzle()">Open index</button></div>
      <div class="card"><span class="label">PHONE</span><h3>Files unlocked</h3><p class="muted">The next record is waiting inside the recovered device.</p><button class="btn" onclick="Phone.open()">Open phone</button></div>`;
    if (c === 4) html += `
      <div class="status-strip"><span>STATUS</span><strong>THE CONNECTION</strong><span>04/05</span></div>
      <div class="card hero-card"><span class="label">RELATIONSHIP CHAIN</span><h2>Follow the connection.</h2><p>Hiba's internship, her sister's connection and Zaki now appear in the same case.</p><button class="btn primary" onclick="Puzzles.connectionPuzzle()">Analyze chain</button></div>
      <div class="connection-board"><div>HIBA</div><span>→</span><div>SISTER</div><span>→</span><div>BOYFRIEND'S WORKPLACE</div><span>+</span><div>ZAKI</div></div>`;
    if (c === 5 && !GameState.data.flags.ending) html += `
      <div class="status-strip"><span>STATUS</span><strong>FINAL FILE</strong><span>05/05</span></div>
      <div class="card hero-card"><span class="label">SEALED</span><h2>There is one date left.</h2><p>The entire chain points to a single record. It has been hidden in plain sight.</p><button class="btn primary" onclick="Puzzles.finalPuzzle()">Open the final lock</button></div>`;
    if (GameState.data.flags.ending) html += `
      <div class="ending"><span class="label">FILE 020 · UNSEALED</span><div class="ending-number">20</div><h1>The date was the clue.</h1><p>The case was never about a missing person. It was about finding the one day that explains every fragment.</p><div class="final-card"><span class="label">SUBJECT</span><h2>Hiba Amdaa</h2><p>26 November 2006</p><div class="divider"></div><p class="muted">20 years. One case. One person.</p></div><p class="tiny">The final personal message is intentionally kept separate from the investigation engine so it can be written with Zaki's own words later.</p></div>`;
    document.getElementById("screen").innerHTML = html;
  },
  scene() {
    document.getElementById("screen").innerHTML = `
      <span class="label">LOCATION · RECOVERY ROOM</span><h1>Search the room.</h1><p class="muted">Four objects can be examined. Only three produce evidence.</p>
      <div class="scene scene-v2">
        <div class="wall-clock object clock" onclick="Puzzles.sceneClue('clock')"><span>21:14</span></div>
        <div class="desk"></div><div class="object bag" onclick="Puzzles.sceneClue('bag')">BAG</div>
        <div class="object notebook" onclick="Puzzles.sceneClue('notebook')">NOTEBOOK</div><div class="object phoneObj" onclick="Puzzles.sceneClue('phone')">PHONE</div>
        <div class="cat-mark">◈</div><div class="desk-line"></div>
      </div>
      <div class="objective"><span class="label">SEARCH RULE</span><strong>Evidence must lead to the next lock.</strong><p class="tiny">You can return to the case at any time.</p></div>`;
  },
  evidence() {
    const inv = GameState.data.inventory;
    let html = '<span class="label">EVIDENCE</span><h1>Evidence board</h1><p class="muted">Every item has a reason to exist. Tap one to inspect it.</p>';
    if (!inv.length) html += '<div class="empty-state">No evidence recovered.</div>';
    else {
      html += '<div class="evidence-grid">';
      inv.forEach(id => { const e=Evidence.items[id]; html += `<div class="card clickable evidence-card" onclick="Evidence.open('${id}')"><span class="tag">${e.type}</span><h3>${e.title}</h3><p class="tiny">${e.text}</p></div>`; });
      html += '</div>';
    }
    if (GameState.has("photo") && GameState.has("note") && GameState.data.chapter===1) html += '<div class="card"><span class="label">LEAD</span><h2>Locked file</h2><p class="muted">The photograph supplies the four digits.</p><button class="btn primary" onclick="Puzzles.openCode()">Attempt access</button></div>';
    document.getElementById("screen").innerHTML = html;
  },
  phone() {
    document.getElementById("screen").innerHTML = '<span class="label">DEVICE</span><h1>Recovered phone</h1><p class="muted">Access expands as evidence is solved.</p><button class="btn primary" onclick="Phone.open()">Open device</button>';
  },
  notes() {
    let html = '<span class="label">CASE NOTES</span><h1>Investigator notes</h1>';
    if (!GameState.data.notes.length) html += '<div class="empty-state">No notes recorded yet.</div>';
    else GameState.data.notes.slice().reverse().forEach((n,i)=>html += `<div class="card note-card"><span class="label">NOTE ${GameState.data.notes.length-i}</span><p>${n}</p></div>`);
    document.getElementById("screen").innerHTML = html;
  },
  modal(html) {
    const m=document.getElementById("modal");
    m.innerHTML='<div class="modal-box"><button class="close" onclick="GameUI.closeModal()">×</button>'+html+'</div>';
    m.classList.remove("hidden");
    const input=m.querySelector("input"); if(input) setTimeout(()=>input.focus(),100);
  },
  closeModal(){document.getElementById("modal").classList.add("hidden");},
  toast(t){const x=document.createElement("div");x.className="toast";x.textContent=t;document.body.appendChild(x);setTimeout(()=>x.remove(),1500);}
};
document.addEventListener("DOMContentLoaded",()=>GameUI.init());