document.addEventListener('DOMContentLoaded', () => {
  const cards = document.querySelectorAll('.resource-card');

  cards.forEach(card => {
    const href       = card.getAttribute('href');
    const previewImg = card.dataset.preview;
    const id         = card.dataset.id;

    const btnPreview = card.querySelector('.btn-preview');
    const btnFav     = card.querySelector('.btn-fav');
    const btnShare   = card.querySelector('.btn-share');

    card.addEventListener('click', e => {
      e.preventDefault();
      e.stopPropagation();
    });

    btnPreview.addEventListener('click', e => {
      e.preventDefault();
      e.stopPropagation();
      const target = href.toLowerCase().endsWith('.pdf') ? href : previewImg;
      window.open(target, '_blank');
    });

    const storageKey = `fav-${id}`;
    if (localStorage.getItem(storageKey) === 'true') {
      btnFav.classList.add('favorited');
    }
    btnFav.addEventListener('click', e => {
      e.preventDefault();
      e.stopPropagation();
      const isFav = btnFav.classList.toggle('favorited');
      localStorage.setItem(storageKey, isFav);
    });

    btnShare.addEventListener('click', e => {
      e.preventDefault();
      e.stopPropagation();
      const a = document.createElement('a');
      a.href     = href;
      a.download = '';        
      a.target   = '_blank';  
      document.body.appendChild(a);
      a.click();
      document.body.removeChild(a);
    });
  });
});
