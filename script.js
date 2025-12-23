(function(){
  const btnDisney = document.getElementById('btn-disney');
  const btnTech = document.getElementById('btn-tech');
  const planA = document.querySelectorAll('.planA');
  const planB = document.querySelectorAll('.planB');

  function setPlan(plan){
    if(plan === 'A'){
      planA.forEach(el => el.classList.remove('hidden'));
      planB.forEach(el => el.classList.add('hidden'));
      btnDisney.classList.add('primary');
      btnTech.classList.remove('primary');
      localStorage.setItem('day5Plan','A');
    }else{
      planB.forEach(el => el.classList.remove('hidden'));
      planA.forEach(el => el.classList.add('hidden'));
      btnTech.classList.add('primary');
      btnDisney.classList.remove('primary');
      localStorage.setItem('day5Plan','B');
    }
  }

  btnDisney && btnDisney.addEventListener('click', () => setPlan('A'));
  btnTech && btnTech.addEventListener('click', () => setPlan('B'));

  // Load saved plan
  const saved = localStorage.getItem('day5Plan');
  if(saved === 'B'){ setPlan('B'); } else { setPlan('A'); }

  // Checklist persistence
  document.querySelectorAll('.checklist').forEach(list => {
    const key = list.getAttribute('data-checklist');
    const savedState = JSON.parse(localStorage.getItem('checklist:' + key) || '{}');
    list.querySelectorAll('input[type="checkbox"]').forEach((cb, idx) => {
      const id = key + ':' + idx;
      cb.checked = !!savedState[id];
      cb.addEventListener('change', () => {
        savedState[id] = cb.checked;
        localStorage.setItem('checklist:' + key, JSON.stringify(savedState));
      });
    });
  });
})();