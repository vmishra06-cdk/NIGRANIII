/* Brand typing */
const text="NIGRANIII";
const el=document.getElementById("brandText");
let i=0;
(function type(){
  if(i<text.length){
    el.textContent+=text[i++];
    setTimeout(type,120);
  }
})();

/* Scroll progress */
window.addEventListener("scroll",()=>{
  const sc=document.documentElement.scrollTop;
  const h=document.documentElement.scrollHeight-window.innerHeight;
  document.getElementById("scrollProgress").style.width=(sc/h)*100+"%";
});

/* Reveal */
window.addEventListener("scroll",()=>{
  document.querySelectorAll(".reveal").forEach(s=>{
    if(s.getBoundingClientRect().top<window.innerHeight-120){
      s.classList.add("active");
    }
  });
});

/* Cursor glow */
const cursor=document.getElementById("cursor");
document.addEventListener("mousemove",e=>{
  cursor.style.left=e.clientX-60+"px";
  cursor.style.top=e.clientY-60+"px";
});

/* Tilt */
document.querySelectorAll(".tilt").forEach(card=>{
  card.addEventListener("mousemove",e=>{
    const r=card.getBoundingClientRect();
    const x=e.clientX-r.left;
    const y=e.clientY-r.top;
    card.style.transform=`rotateX(${(y-r.height/2)/10}deg) rotateY(${(x-r.width/2)/10}deg)`;
  });
  card.addEventListener("mouseleave",()=>{
    card.style.transform="rotateX(0) rotateY(0)";
  });
});
