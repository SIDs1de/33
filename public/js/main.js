document.addEventListener('DOMContentLoaded', () => {
  const loadPage = () => {
    const html = document.querySelector('html');

    html.classList.add('_loaded')
    window.addEventListener('load', () => {
      videoHeightCalculate();
      const body = document.querySelector('body');


      body.classList.remove('_locked')
      html.classList.remove('_locked')
    })
  }


  let oldWidth = 0;

  const videoHeightCalculate = () => {
    const videoBlock = document.querySelector('.video');
    const header = document.querySelector('.header');

    const headerHeight = +window.getComputedStyle(header).height.slice(0, -2)
    console.log(headerHeight);

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

  const logoOnClick = () => {
    const logo = document.querySelector('.header__logo');

    logo.addEventListener('click', () => {
      window.scrollTo({ top: 0, behavior: 'smooth' });
    })
  }

  const loadVideo = () => {
    const video = document.querySelector('.video__video');

    if (window.innerWidth >= window.innerHeight) {
      video.src = 'videos/video/main-h.mp4'
    } else {
      video.src = 'videos/video/main-v.mp4'
    }
  }

  const main = () => {
    loadPage();
    loadVideo();
    checkBtn();
    logoOnClick();


    window.addEventListener('resize', videoHeightCalculate)
  }

  main();
})
