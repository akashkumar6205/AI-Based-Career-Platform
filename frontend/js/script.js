const navbar=document.getElementById('navbar');
window.addEventListener('scroll',()=>navbar.classList.toggle('scrolled',window.scrollY>50));
const mt=document.getElementById('mobileToggle'),nl=document.getElementById('navLinks');
mt.addEventListener('click',()=>{mt.classList.toggle('active');nl.classList.toggle('active');document.body.style.overflow=nl.classList.contains('active')?'hidden':'';});
nl.querySelectorAll('a').forEach(l=>l.addEventListener('click',()=>{mt.classList.remove('active');nl.classList.remove('active');document.body.style.overflow='';}));
const obs=new IntersectionObserver(e=>e.forEach(en=>{if(en.isIntersecting){const d=en.target.getAttribute('data-delay')||0;setTimeout(()=>en.target.classList.add('visible'),d)}}),{threshold:0.15,rootMargin:'0px 0px -50px 0px'});
document.querySelectorAll('[data-aos]').forEach(el=>obs.observe(el));
document.querySelectorAll('a[href^="#"]').forEach(a=>a.addEventListener('click',function(e){const t=document.querySelector(this.getAttribute('href'));if(t){e.preventDefault();t.scrollIntoView({behavior:'smooth'})}}));
function animateCounter(el){const t=el.textContent.trim(),m=t.match(/^(\d+)/);if(!m)return;const target=parseInt(m[1]),suffix=t.replace(m[1],'');let c=0;const s=Math.ceil(target/90),timer=setInterval(()=>{c+=s;if(c>=target){c=target;clearInterval(timer)}el.textContent=c+suffix},16)}
const so=new IntersectionObserver(e=>e.forEach(en=>{if(en.isIntersecting){animateCounter(en.target);so.unobserve(en.target)}}),{threshold:0.5});
document.querySelectorAll('.threat-stat').forEach(el=>so.observe(el));
document.addEventListener('mousemove',e=>{const x=(e.clientX/window.innerWidth-0.5)*2,y=(e.clientY/window.innerHeight-0.5)*2;document.querySelectorAll('.orb').forEach((o,i)=>{const s=(i+1)*12;o.style.transform=`translate(${x*s}px,${y*s}px)`})});
