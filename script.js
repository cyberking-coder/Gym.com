/* ---------- Preloader counter ---------- */
(function(){
  const count = document.getElementById('count');
  const pre = document.getElementById('preloader');
  let n = 0;
  const t = setInterval(()=>{
    n += Math.floor(Math.random()*8)+3;
    if(n>=100){n=100;clearInterval(t);setTimeout(()=>{pre.classList.add('done');document.body.style.overflow='';startCounts();},450);}
    count.textContent = n;
  },90);
  document.body.style.overflow='hidden';
})();

/* ---------- Custom cursor ---------- */
(function(){
  const c=document.getElementById('cursor'),d=document.getElementById('cursorDot');
  if(!c)return;
  let x=0,y=0,cx=0,cy=0;
  addEventListener('mousemove',e=>{x=e.clientX;y=e.clientY;d.style.transform=`translate(${x}px,${y}px) translate(-50%,-50%)`;});
  (function loop(){cx+=(x-cx)*.15;cy+=(y-cy)*.15;c.style.transform=`translate(${cx}px,${cy}px) translate(-50%,-50%)`;requestAnimationFrame(loop);})();
  document.querySelectorAll('a,button,.prog,.coach,.rev').forEach(el=>{
    el.addEventListener('mouseenter',()=>c.classList.add('hover'));
    el.addEventListener('mouseleave',()=>c.classList.remove('hover'));
  });
})();

/* ---------- Nav scroll + progress ---------- */
(function(){
  const nav=document.getElementById('nav'),prog=document.getElementById('scrollProgress');
  addEventListener('scroll',()=>{
    nav.classList.toggle('scrolled',scrollY>40);
    const h=document.documentElement.scrollHeight-innerHeight;
    prog.style.width=(scrollY/h*100)+'%';
  });
})();

/* ---------- Mobile menu ---------- */
(function(){
  const b=document.getElementById('burger'),l=document.getElementById('navLinks');
  b.addEventListener('click',()=>{b.classList.toggle('open');l.classList.toggle('open');});
  l.querySelectorAll('a').forEach(a=>a.addEventListener('click',()=>{b.classList.remove('open');l.classList.remove('open');}));
})();

/* ---------- Reveal on scroll ---------- */
(function(){
  const io=new IntersectionObserver((es)=>{es.forEach(e=>{if(e.isIntersecting){e.target.classList.add('in');io.unobserve(e.target);}});},{threshold:.15});
  document.querySelectorAll('[data-reveal]').forEach((el,i)=>{el.style.transitionDelay=(i%6*60)+'ms';io.observe(el);});
})();

/* ---------- Count up ---------- */
function startCounts(){
  document.querySelectorAll('[data-count]').forEach(el=>{
    const target=+el.dataset.count;let cur=0;
    const step=Math.max(1,Math.floor(target/40));
    const t=setInterval(()=>{cur+=step;if(cur>=target){cur=target;clearInterval(t);}el.textContent=cur;},30);
  });
}

/* ---------- Schedule data ---------- */
(function(){
  const data={
    Monday:[['Mat Pilates','07:00'],['Cardio Burn','09:30'],['Crossfit','17:00'],['Hatha Yoga','19:30']],
    Tuesday:[['Power Yoga','08:00'],['Indoor Cycle','10:00'],['Strongman','18:00'],['Pilates','20:00']],
    Wednesday:[['Mat Pilates','07:00'],['Cardio Burn','09:30'],['HIIT / Hit','17:30'],['Steam & Stretch','19:00']],
    Thursday:[['Power Yoga','06:30'],['Mobility','10:00'],['Strongman','18:00'],['Pilates','20:00']],
    Friday:[['Mat Pilates','07:00'],['Cardio Burn','09:30'],['Crossfit','17:00'],['Strongman','18:30']],
    Saturday:[['Power Yoga','08:00'],['Indoor Cycle','10:30'],['HIIT / Hit','17:00'],['Community WOD','19:00']]
  };
  const g=document.getElementById('scheduleGrid');
  g.innerHTML=Object.entries(data).map(([day,rows])=>`
    <div class="day" data-reveal>
      <div class="day__name">${day}</div>
      ${rows.map(r=>`<div class="day__row"><span class="day__cls">${r[0]}</span><span class="day__time">${r[1]}</span></div>`).join('')}
    </div>`).join('');
})();

/* ---------- Reviews (real Google reviews) ---------- */
(function(){
  const reviews=[
    {n:'Aman',s:'2 reviews',t:"I've been a member for a few months now. The facility is always clean, well-organized, and equipped with a wide variety of machines and free weights to suit all types of workouts."},
    {n:'Fardeen Khan',s:'12 reviews · 3 photos',t:'Absolutely the best gym in Mazgaon. Equipment and machines are of great quality (Jerai Equipment & Machines). Trainers always available on floor to guide you with every workout. Aesthetics and air conditioning are remarkable.'},
    {n:'Shobby Toticba',s:'2 reviews',t:'Awesome gym, excellent equipment, friendly trainers and good ambiance — best gym in South Mumbai.'},
    {n:'Hetal Rathod',s:'10 reviews',t:'Very well equipped gym. Good & helpful staff. Cleanliness maintained. Separate female gym & steam.'},
    {n:'Member',s:'Verified',t:'Excellent atmosphere and well-disciplined staff and trainers. Highly recommend for anyone serious about training.'}
  ];
  const t=document.getElementById('reviewsTrack');
  t.innerHTML=reviews.map(r=>`
    <article class="rev">
      <div class="rev__stars">★★★★★</div>
      <p class="rev__text">${r.t}</p>
      <div class="rev__foot">
        <div class="rev__ava">${r.n[0]}</div>
        <div><div class="rev__name">${r.n}</div><div class="rev__meta">${r.s} · Google review</div></div>
      </div>
    </article>`).join('');
})();

/* ---------- Popular times bars ---------- */
(function(){
  const heights=[20,28,45,55,40,58,72,88,70,52,60,80,95,78,55];
  const nowIdx=9;
  const el=document.getElementById('bars');
  el.innerHTML=heights.map((h,i)=>`<i data-h="${h}" ${i===nowIdx?'class="now"':''}></i>`).join('');
  const io=new IntersectionObserver(es=>es.forEach(e=>{if(e.isIntersecting){el.querySelectorAll('i').forEach(b=>b.style.height=b.dataset.h+'%');io.disconnect();}}),{threshold:.4});
  io.observe(el);
})();
