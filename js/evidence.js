const Evidence = {
  items: {
    photo: {title:"21:14 photograph", type:"IMAGE", chapter:1, text:"A photograph recovered from the room. The visible clock reads 21:14.", detail:"The timestamp and the room clock agree. That makes the time useful rather than decorative."},
    note: {title:"Four-word note", type:"DOCUMENT", chapter:1, text:"FIRST / AFTER / QUIET / LOOK", detail:"The words are underlined individually. Read as an instruction, not a sentence."},
    phone: {title:"Recovered phone", type:"DEVICE", chapter:1, text:"A powered phone with one surviving conversation.", detail:"Several applications are locked behind evidence-dependent access."},
    profile: {title:"Personal profile", type:"DOSSIER", chapter:2, text:"A partial profile of the subject has been reconstructed.", detail:"Cats. Money. Strawberry lipstick. Heat, cooking and chores are listed on the opposite side as dislikes."},
    family: {title:"Family index", type:"ARCHIVE", chapter:3, text:"A five-person family record from Laayoune.", detail:"Fatima 56, Mohamed 61, Zineb 26, Meriem 27, Oumaima 29."},
    internship: {title:"Workplace fragment", type:"DOCUMENT", chapter:4, text:"An internship record points to a workplace connected through the subject's sister.", detail:"The record deliberately omits the workplace name. The relationship chain is the clue."},
    relationship: {title:"Connection file", type:"RELATIONSHIP", chapter:4, text:"A file identifies Zaki Corral as the subject's partner.", detail:"This is the first document that puts Zaki directly inside the case."},
    final: {title:"FILE 020", type:"SEALED", chapter:5, text:"A sealed file with a date encoded into its lock.", detail:"The case has finally converged on one specific day."}
  },
  add(id) { GameState.add(id); GameUI.render(); },
  open(id) {
    const e = this.items[id];
    if (!e) return;
    GameUI.modal(`<span class="label">${e.type}</span><h2>${e.title}</h2><p>${e.text}</p><div class="divider"></div><p class="muted">${e.detail}</p>`);
  }
};