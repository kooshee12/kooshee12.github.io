(function(){
var rm=matchMedia('(prefers-reduced-motion: reduce)').matches;

/* 1. Neural network background: nodes + connections that react to the mouse */
var c=document.getElementById('bg'),x=c.getContext('2d'),P=[],W,H,m={x:-999,y:-999};
function size(){
  W=c.width=innerWidth;H=c.height=innerHeight;
  var n=Math.min(80,Math.floor(W*H/16000));P=[];
  for(var i=0;i<n;i++)P.push({x:Math.random()*W,y:Math.random()*H,vx:(Math.random()-.5)*.35,vy:(Math.random()-.5)*.35,r:Math.random()*1.6+.8,cy:Math.random()<.3});
}
function draw(){
  x.clearRect(0,0,W,H);
  for(var i=0;i<P.length;i++){
    var p=P[i];
    if(!rm){p.x+=p.vx;p.y+=p.vy}
    if(p.x<0||p.x>W)p.vx*=-1;
    if(p.y<0||p.y>H)p.vy*=-1;
    for(var j=i+1;j<P.length;j++){
      var q=P[j],d=Math.hypot(p.x-q.x,p.y-q.y);
      if(d<130){x.strokeStyle='rgba(124,131,255,'+.18*(1-d/130)+')';x.lineWidth=1;x.beginPath();x.moveTo(p.x,p.y);x.lineTo(q.x,q.y);x.stroke()}
    }
    var dm=Math.hypot(p.x-m.x,p.y-m.y);
    if(dm<170){x.strokeStyle='rgba(34,211,238,'+.45*(1-dm/170)+')';x.beginPath();x.moveTo(p.x,p.y);x.lineTo(m.x,m.y);x.stroke()}
    x.beginPath();x.arc(p.x,p.y,p.r,0,6.283);
    x.fillStyle=p.cy?'rgba(34,211,238,.85)':'rgba(168,160,255,.8)';x.fill();
  }
  if(!rm)requestAnimationFrame(draw);
}
size();draw();addEventListener('resize',size);
addEventListener('mousemove',function(e){m.x=e.clientX;m.y=e.clientY});
addEventListener('mouseleave',function(){m.x=m.y=-999});

/* 2. Typing effect for roles */
var T=document.getElementById('type');
if(T&&!rm){
  var words=["AI Scientist · Life Sciences","Machine Learning Engineer","Computer Vision Engineer · Medical Imaging","AI for Drug Discovery","Generative AI & LLM Engineer","Data Scientist"],wi=0,ci=0,del=false;
  function tick(){
    var w=words[wi];T.textContent=w.slice(0,ci);
    if(!del&&ci<w.length){ci++;setTimeout(tick,55)}
    else if(!del){del=true;setTimeout(tick,1800)}
    else if(ci>0){ci--;setTimeout(tick,25)}
    else{del=false;wi=(wi+1)%words.length;setTimeout(tick,300)}
  }
  T.textContent='';tick();
}

/* 3. Fade-in on scroll */
var els=document.querySelectorAll('.card,.stat,.job,h2.title,h3.sec,.label');
els.forEach(function(e){e.classList.add('rv')});
var io=new IntersectionObserver(function(en){en.forEach(function(e){if(e.isIntersecting){e.target.classList.add('in');io.unobserve(e.target)}})},{threshold:.12});
els.forEach(function(e){io.observe(e)});

/* 4. Highlight the current section in the nav */
var links=document.querySelectorAll('nav ul a[href^="#"]');
var secs=Array.prototype.map.call(links,function(a){return document.querySelector(a.getAttribute('href'))}).filter(Boolean);
var so=new IntersectionObserver(function(en){
  en.forEach(function(e){
    if(e.isIntersecting){
      links.forEach(function(a){a.classList.toggle('active',a.getAttribute('href')==='#'+e.target.id)});
    }
  });
},{rootMargin:'-45% 0px -50% 0px'});
secs.forEach(function(s){so.observe(s)});
})();