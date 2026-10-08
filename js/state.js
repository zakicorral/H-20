const GameState={
 key:"h20-save-v1",
 data:{chapter:1,view:"case",inventory:[],solved:[],unlocked:["case"],notes:[],flags:{}},
 load(){try{const raw=localStorage.getItem(this.key);if(raw)this.data={...this.data,...JSON.parse(raw)}}catch(e){}},
 save(){localStorage.setItem(this.key,JSON.stringify(this.data))},
 has(item){return this.data.inventory.includes(item)},
 add(item){if(!this.has(item)){this.data.inventory.push(item);this.save()}},
 solve(id){if(!this.data.solved.includes(id)){this.data.solved.push(id);this.save()}},
 isSolved(id){return this.data.solved.includes(id)},
 flag(k,v=true){this.data.flags[k]=v;this.save()},
 reset(){localStorage.removeItem(this.key);location.reload()}
};
GameState.load();