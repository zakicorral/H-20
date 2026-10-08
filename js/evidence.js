const Evidence={
items:{
photo:{title:"Photograph",type:"IMAGE",text:"A photograph recovered from the first investigation. Something in the background looks deliberately out of place.",detail:"The visible timestamp is 21:14. The image itself gives no obvious reason for that time."},
note:{title:"Folded Note",type:"DOCUMENT",text:"A short handwritten note. Several words are underlined, but the sentence itself is strangely ordinary.",detail:"The underlined words appear to be: FIRST / AFTER / QUIET / LOOK."},
address:{title:"Address Fragment",type:"LOCATION",text:"A fictional location used by the case: 17 Rue Al Qamar, Hay Al Wifaq, Laayoune, Morocco.",detail:"GAME-ONLY ADDRESS — not a real address."},
phone:{title:"Phone Access",type:"DEVICE",text:"Access to the first phone screen has been recovered.",detail:"The phone contains Messages, Photos, Notes and Files. Some areas are still locked."}
},
add(id){GameState.add(id);GameUI.render()},
open(id){const e=this.items[id];if(!e)return;GameUI.modal('<span class="label">'+e.type+'</span><h2>'+e.title+'</h2><p>'+e.text+'</p><div class="divider"></div><p class="muted">'+e.detail+'</p>')}
};