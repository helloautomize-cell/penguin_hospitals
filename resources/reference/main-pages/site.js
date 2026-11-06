(function(){
  var $=function(s,r){return (r||document).querySelector(s)},$$=function(s,r){return [].slice.call((r||document).querySelectorAll(s))};
  var reduce=matchMedia('(prefers-reduced-motion: reduce)').matches;
  var nb=$('#navbar');if(nb)addEventListener('scroll',function(){nb.classList.toggle('small',scrollY>40)},{passive:true});
  var sh=$('#msheet'),bu=$('#burger');
  if(sh&&bu){bu.onclick=function(){sh.classList.add('open');document.body.style.overflow='hidden';$('.x',sh).focus()};
    $('.x',sh).onclick=function(){sh.classList.remove('open');document.body.style.overflow='';bu.focus()};
    addEventListener('keydown',function(e){if(e.key==='Escape'&&sh.classList.contains('open'))$('.x',sh).click()})}
  var pv=$('.pv');if(pv){$('button',pv).onclick=function(e){e.stopPropagation();pv.classList.toggle('open');this.setAttribute('aria-expanded',pv.classList.contains('open'))};document.addEventListener('click',function(){pv.classList.remove('open')})}
  /* reveal */
  if(!reduce&&'IntersectionObserver' in window){
    var io=new IntersectionObserver(function(es){es.forEach(function(e){if(e.isIntersecting){e.target.classList.remove('pre');io.unobserve(e.target)}})},{rootMargin:'0px 0px -8% 0px'});
    var vh=innerHeight;$$('.rv').forEach(function(el){if(el.getBoundingClientRect().top>vh*.95){el.classList.add('pre');io.observe(el)}});
  }
  /* table of contents */
  var tl=$$('.toc nav a');if(tl.length&&'IntersectionObserver' in window){
    var so=new IntersectionObserver(function(es){es.forEach(function(e){if(e.isIntersecting){tl.forEach(function(a){a.classList.toggle('on',a.getAttribute('href')==='#'+e.target.id)})}})},{rootMargin:'-30% 0px -60% 0px'});
    tl.forEach(function(a){var s=$(a.getAttribute('href'));if(s)so.observe(s)});
  }
  /* booking form demo */
  var f=$('#bookf');if(f){
    var d=$('#bdate',f);if(d){var t=new Date(),m=new Date(Date.now()+60*864e5),iso=function(x){return x.toISOString().slice(0,10)};d.min=iso(t);d.max=iso(m)}
    var u=$('#u18',f),g=$('#guard',f);if(u&&g){u.onchange=function(){g.hidden=!u.checked}}
    f.addEventListener('submit',function(e){e.preventDefault();$('.okmsg',f).classList.add('show');$('.okmsg',f).focus()});
  }
})();
