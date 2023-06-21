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

    // const playBtn = document.querySelector('.video__play');

    const headerHeight = +window.getComputedStyle(header).height.slice(0, -2)
    // playBtn.style.top = `calc(50% - ${headerHeight}px)`

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

  const openModals = () => {
    const btns = document.querySelectorAll('[data-open-modal]');
    const body = document.querySelector('body');
    const html = document.querySelector('html');

    btns.forEach(btn => {
      btn.addEventListener('click', (e) => {
        html.classList.add('_modal-open')
        body.classList.add('_modal-open')
        const value = btn.getAttribute('data-video');
        const iframe = document.querySelector('.modal__card-video iframe');

        if (!iframe.width) {
          let height = 809
          let width = 455

          if (window.innerWidth <= 580) {
            height = 539
            width = 303
          }

          if (window.innerWidth <= 360) {
            height = 490
            width = 275, 45
          }

          iframe.width = width
          iframe.height = height
        }
        iframe.src = value


      })
    })

    const closeBtns = document.querySelectorAll('.modal__card-cross, .modal__content, .modal__card-success-btn');
    closeBtns.forEach(btn => {
      btn.addEventListener('click', (e) => {
        if (e.target.classList[0] == 'modal__card-cross' || e.target.classList[0] == 'modal__content' || e.target.classList[0] == 'modal__card-cross-img' || e.target.classList[0] == 'modal__card-success-btn') {
          html.classList.remove('_modal-open')
          body.classList.remove('_modal-open')
          const iframe = document.querySelector('.modal__card-video iframe');
          iframe.src = ''
        }
      })
    })
  }

  const main = () => {
    loadPage();
    loadVideo();
    checkBtn();
    logoOnClick();
    openModals();


    window.addEventListener('resize', videoHeightCalculate)
  }

  main();
})
