export function addScrollAnimation() {
  const animItems = document.querySelectorAll('.js-scroll');

  animItems.forEach(animItem => {
    createObserver(animItem);
  });
};

function createObserver(target) {
  const options = {
    root: null,
    rootMargin: '0px',
    threshold: target.offsetHeight < window.innerHeight ? 0.4 : 0.2,
  };

  // eslint-disable-next-line no-undef
  const intObserver = new IntersectionObserver(callback, options);

  function callback(entries, observer) {
    entries.forEach(entry => {
      if (!entry.isIntersecting) {
        return;
      }

      if (entry.target.classList.contains('js-background')) {
        entry.target.classList.add('slogan--active');
      }

      const elements = entry.target.querySelectorAll('.js-scroll__element');
      let delayValue = 0;

      elements.forEach(element => {
        element.style['transition-delay'] = `${delayValue += 0.15}s`;
        element.classList.add('scroll--active');
      });

      observer.unobserve(entry.target);
    });
  }

  intObserver.observe(target);
}
