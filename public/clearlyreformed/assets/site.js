(function(){
  var h=document.querySelector('.hdr');
  addEventListener('scroll',function(){h&&h.classList.toggle('scrolled',scrollY>4)},{passive:true});
  var chips=document.getElementById('chips');
  if(chips){chips.addEventListener('click',function(e){
    var b=e.target.closest('.chip'); if(!b) return;
    chips.querySelectorAll('.chip').forEach(function(c){c.classList.toggle('on',c===b)});
    var f=b.getAttribute('data-f');
    document.querySelectorAll('#alist .acard').forEach(function(a){a.classList.toggle('hide',f!=='all'&&a.getAttribute('data-cat')!==f)});
  });}
})();
function cfSub(f){
  f.parentNode.classList.add('sent');
  var t=document.getElementById('toast'); if(t){t.classList.add('show'); setTimeout(function(){t.classList.remove('show')},3200);}
  f.reset(); return false;
}
