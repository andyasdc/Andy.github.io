document.addEventListener('DOMContentLoaded', () => {
  const buttons = document.querySelectorAll('.video-btn');
  const frame   = document.getElementById('videoFrame');

  buttons.forEach(btn => {
    btn.addEventListener('click', () => {

      buttons.forEach(b => b.classList.remove('active'));
      btn.classList.add('active');

      frame.src = `https://www.youtube.com/embed/${btn.dataset.video}`;
    });
  });

  if (buttons.length) {
    buttons[0].click();
  }
});
