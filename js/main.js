document.addEventListener('DOMContentLoaded', () => {
  let oldWidth = 0;

  const videoHeightCalculate = () => {
    const videoBlock = document.querySelector('.video');
    const header = document.querySelector('.header');

    const headerHeight = +window.getComputedStyle(header).height.slice(0, -2)

    const value = window.innerHeight - headerHeight
    if (window.innerWidth !== oldWidth) {
      videoBlock.style.height = `${value}px`
      videoBlock.style.marginTop = `${headerHeight}px`
      oldWidth = window.innerWidth
    }
  }

  const checkBtn = () => {
    function iOS() {
      return [
        'iPad Simulator',
        'iPhone Simulator',
        'iPod Simulator',
        'iPad',
        'iPhone',
        'iPod'
      ].includes(navigator.platform)
        || (navigator.userAgent.includes("Mac") && "ontouchend" in document)
    }

    const btn = document.querySelector('.header__main-btn');


    const isIOS = iOS()
    if (isIOS) {
      btn.href = 'Ссылка на app store'
    } else {
      btn.href = 'Ссылка на google play'
    }
  }

  const main = () => {
    videoHeightCalculate();
    checkBtn();

    window.addEventListener('resize', videoHeightCalculate)
  }

  main();
})
