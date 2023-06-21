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

    const value = window.innerHeight - headerHeight
    if (window.innerWidth !== oldWidth) {
      videoBlock.style.height = `${value}px`
      videoBlock.style.marginTop = `${headerHeight}px`
      oldWidth = window.innerWidth
    }

    setTimeout(() => {
      const video = document.querySelector('.video__video');
      const videoHeight = video.getBoundingClientRect().height

      const videoBlockHeight = videoBlock.offsetHeight
      if (videoHeight < videoBlockHeight) {
        videoBlock.style.height = `${videoHeight}px`
      }
    }, 500)



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
      // btn.href = 'Ссылка на app store'
      btn.removeAttribute('src')
      btn.setAttribute('data-open-modal', 'modal-video')
      btn.setAttribute('data-open-modal-ios', 'true')

      // const body = document.querySelector('body');
      // body.style.display = 'none'
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
    video.play();
  }

  const openModals = () => {
    const btns = document.querySelectorAll('[data-open-modal]');
    const body = document.querySelector('body');
    const html = document.querySelector('html');

    btns.forEach(btn => {
      btn.addEventListener('click', (e) => {
        html.classList.add('_modal-open')
        body.classList.add('_modal-open')

        const inners = document.querySelectorAll('.modal__card-inner');

        inners.forEach(inner => {
          inner.style.display = 'block'
        })

        if (!btn.getAttribute('data-open-modal-ios')) {
          const badInner = document.querySelectorAll('.modal__card-inner')[1];
          badInner.style.display = 'none'
          const iframe = document.querySelector('.modal__card-video iframe');

          if (!iframe.width) {
            let height = 630
            let width = 1120

            if (window.innerWidth <= 1200) {
              height = 420
              width = 746, 67
            }
            if (window.innerWidth <= 800) {
              height = 280
              width = 497, 78
            }

            if (window.innerWidth <= 600) {
              height = 809
              width = 455
            }

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

          if (window.innerWidth <= 680) {
            iframe.src = 'https://www.youtube.com/embed/OQkChc0CWHA'
          } else {
            iframe.src = 'https://www.youtube.com/embed/qnROzO58-n8'
          }
        } else {
          const badInner = document.querySelectorAll('.modal__card-inner')[0];
          badInner.style.display = 'none'
        }
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

  const mouseMoving = () => {
    const video = document.querySelector('.video__video');
    const body = document.querySelector('body');

    body.addEventListener('touchstart', () => {
      video.play()
    })
  }

  const main = () => {
    loadPage();
    loadVideo();
    checkBtn();
    logoOnClick();
    openModals();
    mouseMoving();


    window.addEventListener('resize', videoHeightCalculate)
  }

  main();
})
