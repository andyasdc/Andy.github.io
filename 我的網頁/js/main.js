document.addEventListener('DOMContentLoaded', () => {
  const menuToggle = document.querySelector('.menu-toggle');
  const nav        = document.querySelector('nav');
  menuToggle?.addEventListener('click', () => nav.classList.toggle('open'));

  if (typeof Swiper === 'function') {
    if (document.querySelector('.photo-swiper')) {
      new Swiper('.photo-swiper', {
        slidesPerView: 4,
        spaceBetween: 16,
        pagination: { el: '.swiper-pagination', clickable: true },
        breakpoints: {
          0:   { slidesPerView: 1 },
          640: { slidesPerView: 2 },
          960: { slidesPerView: 3 },
          1280:{ slidesPerView: 4 }
        }
      });
    }

    if (document.querySelector('.gallery-swiper')) {
      const gallerySwiper = new Swiper('.gallery-swiper', {
        slidesPerView:   1,
        spaceBetween:    16,
        allowTouchMove:  false, 
        navigation: {
          prevEl: '.gallery-nav .swiper-prev',
          nextEl: '.gallery-nav .swiper-next'
        },
        pagination: {
          el: '.swiper-pagination',
          clickable: true
        }
      });

      const prevBtn = document.querySelector('.gallery-nav .swiper-prev');
      const nextBtn = document.querySelector('.gallery-nav .swiper-next');
      const updateNav = () => {
        prevBtn.disabled = gallerySwiper.isBeginning;
        nextBtn.disabled = gallerySwiper.isEnd;
      };
      gallerySwiper.on('slideChange', updateNav);
      updateNav();
    }
  }

  const lightbox = document.getElementById('lightbox');
  const lbImg    = document.getElementById('lbImg');
  const lbClose  = document.getElementById('lbClose');
  if (lightbox && lbImg && lbClose) {
    document.querySelectorAll('.gallery-slide-grid img').forEach(img => {
      img.style.cursor = 'zoom-in';
      img.addEventListener('click', () => {
        lbImg.src = img.src;
        lightbox.classList.add('active');
      });
    });
    lbClose.addEventListener('click', () => lightbox.classList.remove('active'));
    lightbox.addEventListener('click', e => {
      if (e.target === lightbox) lightbox.classList.remove('active');
    });
  }

  const btn = document.getElementById('homeBtn');
  if (btn && typeof anime === 'function') {
    btn.addEventListener('click', e => {
      e.preventDefault();
      const { height } = btn.getBoundingClientRect();
      document.documentElement.style.setProperty('--peek-width',  `${height}px`);
      document.documentElement.style.setProperty('--peek-height', `${height}px`);
      const container = document.createElement('div');
      container.className = 'bunny-char-container';
      btn.appendChild(container);
      const img = document.createElement('img');
      img.src       = 'images/bunny-body.png';
      img.className = 'bunny-character';
      container.appendChild(img);
      const tl = anime.timeline();
      tl
        .add({ targets: container, opacity: [0,1], right: [`-${height}px`,'-15px'],   easing: 'easeOutBack', duration: 350 })
        .add({ targets: btn,       scale:   [1,0.96,1],         easing: 'easeInOutSine', duration: 200 }, '-=200')
        .add({ targets: container, opacity: [1,0], right: ['-15px',`-${height}px`], easing: 'easeInQuad',   duration: 300, delay: 100 });
      tl.finished.then(() => {
        container.remove();
        window.location.href = btn.getAttribute('href');
      });
    });
  }

  const images  = [
    'images/collection1.jpg',
    'images/collection2.jpg',
    'images/collection3.jpg',
    'images/collection4.jpg'
  ];
  let idx       = -1; 
  const book    = document.getElementById('book');
  const sideCover = document.querySelector('.page-side.cover');
  const sideFront = document.querySelector('.page-side.front');
  const sideBack  = document.querySelector('.page-side.back');
  const imgEl     = document.getElementById('pageImage');
  const prevBtn   = document.getElementById('prevBtn');
  const nextBtn   = document.getElementById('nextBtn');

  prevBtn.addEventListener('click', () => {
    if (idx > -1) idx--;
    render();
  });
  nextBtn.addEventListener('click', () => {
    if (idx < images.length) {
      idx++;
    } else {
      idx = -1; 
    }
    render();
  });

  render();

  function render() {
    if (idx < 0) {

      sideCover.style.display = 'block';
      sideFront.style.display = 'none';
      sideBack.style.display  = 'none';
      book.classList.remove('flipped');
    } else if (idx < images.length) {
      
      sideCover.style.display = 'none';
      sideFront.style.display = 'block';
      sideBack.style.display  = 'none';
      imgEl.src               = images[idx];
      book.classList.remove('flipped');
    } else {
  
      sideCover.style.display = 'none';
      sideFront.style.display = 'none';
      sideBack.style.display  = 'flex';
      book.classList.add('flipped');
    }
    prevBtn.disabled    = idx <= -1;
    nextBtn.textContent = idx >= images.length ? '回到封面' : '下一頁';
  }
});
