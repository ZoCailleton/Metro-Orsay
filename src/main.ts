import './style.scss'
import { Audio, SlideSubtitle } from './voix'
import { MouseParallax } from './mouse'

import gsap, { Power2 } from 'gsap'
import { ScrollTrigger } from 'gsap/ScrollTrigger'
import { DateTrigger } from './date'
import { Cursor } from './cursor'

const date = new DateTrigger()
date.init()

gsap.registerPlugin(ScrollTrigger)

let CURRENT_SCENE: number = 0

const GLOBAL_SCENE = gsap.timeline({ paused: true })

const subtitles1: SlideSubtitle = new SlideSubtitle(0)
const subtitles2: SlideSubtitle = new SlideSubtitle(1)
const subtitles3: SlideSubtitle = new SlideSubtitle(2)
const subtitles4: SlideSubtitle = new SlideSubtitle(3)
const subtitles5: SlideSubtitle = new SlideSubtitle(4)
const subtitles6: SlideSubtitle = new SlideSubtitle(5)
const subtitles7: SlideSubtitle = new SlideSubtitle(6)
const subtitles8: SlideSubtitle = new SlideSubtitle(7)
const subtitles9: SlideSubtitle = new SlideSubtitle(8)
const subtitles10: SlideSubtitle = new SlideSubtitle(9)

const scene1Voix = new Audio('/assets/audio/slide1.mp3', false)
const scene2Voix = new Audio('/assets/audio/slide2.mp3', false)
const scene3Voix = new Audio('/assets/audio/slide3.mp3', false)
const scene4Voix = new Audio('/assets/audio/slide4.mp3', false)
const scene5Voix = new Audio('/assets/audio/slide5.mp3', false)
const scene6Voix = new Audio('/assets/audio/slide6.mp3', false)
// pas encore de voix ici
// const scene7Voix = new Audio('/assets/audio/slide7.mp3', false)
const scene8Voix = new Audio('/assets/audio/slide8.mp3', false)

// const scene4Ambiance = new Audio('/assets/audio/ambiance_slide_4.mp3', true)

const slide1 = document.querySelector<HTMLInputElement>('.slide-1')
const slide2 = document.querySelector<HTMLInputElement>('.slide-2')
const slide3 = document.querySelector<HTMLInputElement>('.slide-3')
const slide4 = document.querySelector<HTMLInputElement>('.slide-4')
const slide5 = document.querySelector<HTMLInputElement>('.slide-5')

const scene1Parallax = new MouseParallax(slide1!)
const scene2Parallax = new MouseParallax(slide2!)
const scene3Parallax = new MouseParallax(slide3!)
const scene4Parallax = new MouseParallax(slide4!)
const scene5Parallax = new MouseParallax(slide5!)



const reset = (collection: string, classe: string) => {
  for (let elt of document.querySelectorAll(collection)) {
    elt.classList.remove(classe)
  }
}

const launchScreenTransition = () => {

  const screenTransition = gsap.timeline()
  screenTransition
    .set('.screen-transition', { y: '100vh' })
    .to('.screen-transition', { y: 0, duration: 1, ease: Power2.easeInOut })
    .to('.screen-transition', { y: '-100vh', duration: 1, ease: Power2.easeInOut })

}

/* Lazy Loading */

const slides: Array<Element> = [];

for (let slide of document.querySelectorAll('.story--slide')) {
  slides.push(slide)
}


interface config {
  timecode: number
  parallax?: MouseParallax
  date?: number
  subtitle?: SlideSubtitle
  voix?: Audio
  delayVoixSubtitle?: number
}

const CONFIG: Array<config> = [
  {
    timecode: 0,
  },
  //Scène 1 - Première scène
  {
    timecode: 1,
    parallax: scene1Parallax,
    date: new Date().getFullYear(),
    subtitle: subtitles1,
    voix: scene1Voix,
    delayVoixSubtitle: 2000
  },
  //Scène 2 - Paris 1900
  {
    timecode: 4.5,
    parallax: scene1Parallax,
    date: 1900,
    subtitle: subtitles2,
    voix: scene2Voix,
    delayVoixSubtitle: 2000
  },
  //Scene 3 : Construction du metro
  {
    timecode: 9.5,
    parallax: scene2Parallax,
    subtitle: subtitles3,
    voix: scene3Voix,
    delayVoixSubtitle: 2000
  },
  // Scène 4 : Contrat sombre
  {
    timecode: 11.25,
    parallax: scene3Parallax,
    subtitle: subtitles4,
    voix: scene4Voix,
    delayVoixSubtitle: 2000
  },
  // Scène 4 : 
  {
    timecode: 12.5,
    parallax: scene4Parallax,
    subtitle: subtitles5,
    voix: scene5Voix,
    delayVoixSubtitle: 2000
  },
  // Scène 5 : Herbe
  {
    timecode: 14.5,
    parallax: scene5Parallax,
    subtitle: subtitles6,
    voix: scene6Voix,
    delayVoixSubtitle: 2000
  },
  // Scène 5 : Herbe - Apparition monstre
  {
    timecode: 16.5,
    subtitle: subtitles7,
    // voix: scene7Voix,
    delayVoixSubtitle: 2000
  },
  // Scène 6 : Usine - Start
  {
    timecode: 18,
    subtitle: subtitles8,
    voix: scene8Voix,
    delayVoixSubtitle: 2000
  },
  // Scène 6 : Usine - Ciel
  {
    timecode: 19.5,
    subtitle: subtitles9,
    delayVoixSubtitle: 2000
  },
  // Scène 8 : Objets - Apparition
  {
    timecode: 22.5,
    subtitle: subtitles10,
    delayVoixSubtitle: 2000
  },
  // Scène 8 : Objets - Disparition
  {
    timecode: 25.25
  }
]

const slideToTransition = (num: number) => {
  // CURRENT_SCENE = prev scene
  CONFIG[CURRENT_SCENE].parallax?.stop()
  CONFIG[CURRENT_SCENE].subtitle?.stop()
  CONFIG[CURRENT_SCENE].voix?.stop()

  // CURRENT_SCENE = new scene
  CURRENT_SCENE = num

  GLOBAL_SCENE.time(CONFIG[num].timecode)

}

const slideTo = (num: number, animated: boolean = true) => {

  // CURRENT_SCENE = prev scene
  CONFIG[CURRENT_SCENE].parallax?.stop()
  CONFIG[CURRENT_SCENE].subtitle?.stop()
  CONFIG[CURRENT_SCENE].voix?.stop()

  // CURRENT_SCENE = new scene
  CURRENT_SCENE = num


  if (CONFIG[num].date) date.updateDate(CONFIG[num].date)
  if (CONFIG[num].subtitle && CONFIG[num].delayVoixSubtitle) {
    CONFIG[num].voix?.init()
    setTimeout(
      () => {
        CONFIG[num].subtitle?.init()
        CONFIG[num].voix?.start()
      }
      ,
      CONFIG[num].delayVoixSubtitle
    )
  }
  CONFIG[num].parallax?.init()
  // CONFIG[num].parallax?.start()

  animated ? GLOBAL_SCENE.tweenTo(CONFIG[num].timecode) : GLOBAL_SCENE.time(CONFIG[num].timecode)
}

if (window.location.hash) {
  let _slide = window.location.hash.replace('#slide', '')
  console.log(_slide)
  var y: number = +_slide;
  slideTo(y, false)
}

for (let tick of document.querySelectorAll('.timeline--wrapper .timeline--tick')) {

  tick.addEventListener('click', () => {

    reset('.timeline--wrapper .timeline--tick', 'active')
    tick.classList.add('active')

    // On récupère le tick choisi
    let _tick = (tick as HTMLInputElement).dataset.tick || ''
    var y: number = +_tick;

    if (y === CURRENT_SCENE + 1 || y === CURRENT_SCENE - 1) {
      slideTo(y)
    } else if (y === CURRENT_SCENE) {
      console.log('On a déjà lancé la scène')
    } else {
      launchScreenTransition()
      setTimeout(() => {
        slideToTransition(y - 1)
      }, 1000)
      setTimeout(() => {
        slideTo(y)
      }, 1000)
    }

  });

}

// const loader = document.querySelector<HTMLInputElement>('.loader')

const cursor = new Cursor()
document.querySelector<HTMLInputElement>('.intro .btn')?.addEventListener('click', () => {
  cursor.draw()
  cursorTrigger()
  ui()

  document.querySelector('.timeline--tick:first-child')?.classList.add('active')

  slideTo(1)
})

function cursorTrigger() {
  window.addEventListener('click', cursorClicker)
  let listener = true

  const navPoints = document.querySelectorAll('.timeline--tick')

  for (let i = 0; i < navPoints.length; i++) {

    navPoints[i].addEventListener('mouseenter', () => {
      cursor.remove()
    })

    navPoints[i].addEventListener('mouseout', () => {
      if (CONFIG[CURRENT_SCENE].subtitle?.isFinish()) {
        cursor.big()
      } else {
        cursor.small()
      }
    })
  }

  function cursorClicker() {

    if (CONFIG[CURRENT_SCENE].subtitle?.isFinish()) {
      cursor.small()
      slideTo(CURRENT_SCENE + 1)
      window.removeEventListener('click', cursorClicker)
      listener = false
    }

  }

  setInterval(
    () => {
      if (CONFIG[CURRENT_SCENE].subtitle?.isFinish()) {
        if (cursor.isHover()) {
          cursor.remove()
        } else {
          cursor.big()
        }

        if (!listener) {
          window.addEventListener('click', cursorClicker)
          listener = true
        }
      }
    },
    10
  )

}

function ui() {
  setTimeout(
    () => {
      const timelineTick = document.querySelectorAll<HTMLElement>('.timeline--tick')

      for (let i = 0; i < timelineTick.length; i++) {
        setTimeout(
          () => {
            timelineTick[i].style.opacity = '0.5'


          },
          i * 200
        )

      }

      date.show()
    },
    2000
  )

}



GLOBAL_SCENE

  // Intro - Setup
  .set('.slide-1 .layer:nth-child(1)', { y: -500 })
  .set('.slide-1 .layer:nth-child(2)', { y: -450 })
  .set('.slide-1 .layer:nth-child(3)', { y: -400 })
  .set('.slide-1 .layer:nth-child(4)', { y: -350 })
  .set('.slide-1 .layer:nth-child(5)', { y: -300 })
  .set('.slide-1 .layer:nth-child(6)', { y: -250 })
  .set('.slide-1 .layer:nth-child(7)', { y: -200 })
  .set('.slide-1 .layer:nth-child(8)', { y: -150 })
  .set('.slide-1 .layer:nth-child(9)', { y: -100 })

  // Scène 5 - Setup
  .set('.slide-5 .layer:nth-child(2)', { y: -200 })
  .set('.slide-5 .layer:nth-child(3)', { y: '100vh' })
  .set('.slide-5 .layer:nth-child(4)', { y: '100vh' })
  .set('.slide-5 .layer:nth-child(5)', { y: '100vh' })
  .set('.slide-5 .layer:nth-child(6)', { y: 200 })
  .set('.slide-5 .layer:nth-child(7)', { y: 250 })
  .set('.slide-5 .layer:nth-child(8)', { y: 300 })

  // Scène 6 - Setup
  .set('.wrapper-usine', { y: '-100vh' })
  .set('.slide-6 .layer:nth-child(1)', { y: 300 })
  .set('.slide-6 .layer:nth-child(2)', { y: 150 })
  .set('.transition.smoke', { top: '25%' })

  // Scène 7 - Setup
  .set('.slide-7 .layer:nth-child(1)', { scale: 0.85 })

  // Scène 8 - Setup
  .set('.slide-8 .item', { y: '100vh' })

  // Intro - Start
  .to('.wrapper-intro', { y: '-100vh', duration: 1, ease: Power2.easeInOut })
  .to('.slide-1 .layer', { y: 0, duration: 1, ease: Power2.easeInOut }, '-=1')
  .to('.band--top', { top: 0, duration: 1, ease: Power2.easeInOut }, '-=1')
  .to('.band--bottom', { bottom: 0, duration: 1, ease: Power2.easeInOut }, '-=1')
  .to('.band--left', { left: 0, duration: 1, ease: Power2.easeInOut }, '-=1')
  .to('.band--right', { right: 0, duration: 1, ease: Power2.easeInOut }, '-=1')
  .to('.intro .side:first-child', { rotation: -10, opacity: 0, duration: 1, ease: Power2.easeInOut }, '-=1')
  .to('.intro .side:last-child', { rotation: 10, opacity: 0, duration: 1, ease: Power2.easeInOut }, '-=1')
  .to('.nav--bottom', { bottom: 0, duration: 1, ease: Power2.easeInOut }, '-=1')
  .to('.intro', { opacity: 0 })

  // Scène 1 - Paris 1900
  .to('.slide-1', { filter: 'grayscale(100%)', duration: 1, ease: Power2.easeInOut })
  .to('.slide-1 .layer.tour-eiffel', { opacity: 0, duration: 1, ease: Power2.easeInOut }, '-=1')
  .to('.slide-1 .layer:nth-child(8)', { opacity: 0, duration: 1, ease: Power2.easeInOut })
  .to('.slide-1 .layer:nth-child(9)', { opacity: 0, duration: 1, ease: Power2.easeInOut }, '-=0.5')
  .to('.slide-1 .layer:nth-child(10)', { opacity: 0, duration: 1, ease: Power2.easeInOut }, '-=0.5')

  // Scène 2 - Concours
  .to('.slide-1 .layer:nth-child(9)', { scale: 1.5, opacity: 0, duration: 1, ease: Power2.easeInOut })
  .to('.slide-1 .layer:nth-child(1)', { scale: 1.25, opacity: 0, duration: 1, ease: Power2.easeInOut }, '-=1')
  .to('.slide-1', { scale: 1.15, opacity: 0, duration: 1, ease: Power2.easeInOut }, '-=1')
  .to('.slide-2 .layer', { scale: 1, duration: 1, ease: Power2.easeInOut }, '-=1')
  .to('.slide-2 .hidden', { opacity: 1, duration: 1, delay: 3, ease: Power2.easeInOut })

  // Scène 3 - Contrat sombre
  .set('.slide-3 .layer:nth-child(1)', { y: -500 })
  .set('.slide-3 .layer:nth-child(2)', { y: -400 })
  .to('.wrapper-concours', { y: '-200vh', duration: 2, ease: Power2.easeInOut })
  .to('.slide-2 .layer:nth-child(1)', { y: 600, duration: 2, ease: Power2.easeInOut }, '-=2')
  .to('.slide-2 .layer:nth-child(2)', { y: 500, duration: 2, ease: Power2.easeInOut }, '-=2')
  .to('.slide-2 .layer:nth-child(3)', { y: 400, duration: 2, ease: Power2.easeInOut }, '-=2')
  .to('.slide-2 .layer:nth-child(4)', { y: 300, duration: 2, ease: Power2.easeInOut }, '-=2')
  .to('.slide-2 .layer:nth-child(5)', { y: 200, duration: 2, ease: Power2.easeInOut }, '-=2')
  .to('.slide-3 .layer', { y: 0, duration: 2, ease: Power2.easeInOut }, '-=2')

  // Scène 4 - Bureau Guimard
  .set('.slide-4 .layer:nth-child(1)', { x: -500 })
  .set('.slide-4 .layer:nth-child(2)', { x: -400 })
  .set('.slide-4 .layer:nth-child(3)', { x: -300 })
  .set('.slide-4 .layer:nth-child(4)', { x: -200 })
  .set('.slide-4 .layer:nth-child(5)', { x: -100 })

  .to('.slide-3 .layer:nth-child(1)', { x: 500, duration: 1, ease: Power2.easeInOut })
  .to('.slide-3 .layer:nth-child(2)', { x: 400, duration: 1, ease: Power2.easeInOut }, '-=1')
  .to('.slide-3 .layer:nth-child(3)', { x: 300, duration: 1, ease: Power2.easeInOut }, '-=1')
  .to('.slide-3 .layer:nth-child(4)', { x: 200, duration: 1, ease: Power2.easeInOut }, '-=1')
  .to('.slide-3 .layer:nth-child(5)', { x: 100, duration: 1, ease: Power2.easeInOut }, '-=1')
  .to('.wrapper-plans', { x: '-100vw', duration: 1, ease: Power2.easeInOut }, '-=1')
  .to('.slide-4 .layer', { x: 0, duration: 1, ease: Power2.easeInOut }, '-=1')

  // Scène 5 - Herbe
  .to('.wrapper-herbe', { y: '100vh', duration: 1, ease: Power2.easeInOut })

  .to('.slide-4 .layer:nth-child(1)', { y: -500, duration: 1, ease: Power2.easeInOut }, '-=1')
  .to('.slide-4 .layer:nth-child(2)', { y: -400, duration: 1, ease: Power2.easeInOut }, '-=1')
  .to('.slide-4 .layer:nth-child(3)', { y: -300, duration: 1, ease: Power2.easeInOut }, '-=1')
  .to('.slide-4 .layer:nth-child(4)', { y: -200, duration: 1, ease: Power2.easeInOut }, '-=1')
  .to('.slide-4 .layer:nth-child(5)', { y: -100, duration: 1, ease: Power2.easeInOut }, '-=1')

  .to('.slide-5 .layer:nth-child(8)', { y: 0, duration: 1, ease: Power2.easeInOut }, '-=1')
  .to('.slide-5 .layer:nth-child(7)', { y: 0, duration: 1, ease: Power2.easeInOut }, '-=1')
  .to('.slide-5 .layer:nth-child(6)', { y: 0, duration: 1, ease: Power2.easeInOut }, '-=0.5')
  .to('.slide-5 .layer:nth-child(5)', { y: 0, duration: 1, ease: Power2.easeInOut }, '-=0.85')
  .to('.slide-5 .layer:nth-child(4)', { y: 0, duration: 1, ease: Power2.easeInOut }, '-=0.85')
  .to('.slide-5 .layer:nth-child(3)', { y: 0, duration: 1, ease: Power2.easeInOut }, '-=1')
  .to('.slide-5 .layer:nth-child(2)', { y: 0, duration: 1, ease: Power2.easeInOut }, '-=0.85')

  // Scène 5 - Apparition monstre
  .to('.slide-5 .monstre', { opacity: 1, duration: 1, ease: Power2.easeInOut })
  .to('.slide-5 .bg-dark', { opacity: 1, duration: 1, ease: Power2.easeInOut })
  .to('.slide-5 .m2', { opacity: 1, duration: 1, ease: Power2.easeInOut }, '-=1')
  .to('.slide-5 .layer.p1', { opacity: 0, duration: 1, ease: Power2.easeInOut }, '-=1')
  .to('.slide-5 .monstre', { opacity: 0, ease: Power2.easeInOut })

  // Scène 6 - Apparition usine
  .to('.slide-5 .m2', { scale: 2.5, duration: 1, ease: Power2.easeInOut })
  .to('.slide-5 .bg-dark', { scale: 1.5, duration: 1, ease: Power2.easeInOut }, '-=1')
  .to('.slide-7 .layer:nth-child(1)', { y: 0, scale: 1, duration: 1, ease: Power2.easeInOut }, '-=1')
  .to('.transition.smoke', { top: '35%', duration: 1, ease: Power2.easeInOut }, '-=1')
  .to('.wrapper-concours', { opacity: 0, duration: 1, ease: Power2.easeInOut }, '-=1')

  // Scène 7 - Apparition ciel
  .to('.wrapper-usine', { y: 0, duration: 1, ease: Power2.easeInOut })
  .to('.transition.smoke', { top: '65%', duration: 1, ease: Power2.easeInOut }, '-=1')
  .to('.slide-6 .layer', { y: 0, duration: 1, ease: Power2.easeInOut }, '-=1')
  .to('.slide-7 .layer:nth-child(1)', { y: -300, duration: 1, ease: Power2.easeInOut })

  // Scène 8 - Objets start
  .to('.slide-8 .item:nth-child(1)', { y: 0, duration: 1, ease: Power2.easeInOut })
  .to('.slide-8 .item:nth-child(2)', { y: 0, duration: 1, ease: Power2.easeInOut }, '-=0.5')
  .to('.slide-8 .item:nth-child(3)', { y: 0, duration: 1, ease: Power2.easeInOut }, '-=0.5')
  .to('.slide-8 .item:nth-child(4)', { y: 0, duration: 1, ease: Power2.easeInOut }, '-=0.5')
  .to('.slide-7 .layer:nth-child(1)', { y: -400, duration: 1, ease: Power2.easeInOut }, '-=1')

  // Scène 8 - Objets end
  .to('.slide-8 .item:nth-child(1)', { y: '-100vh', duration: 1, ease: Power2.easeInOut })
  .to('.slide-8 .item:nth-child(2)', { y: '-100vh', duration: 1, ease: Power2.easeInOut }, '-=0.5')
  .to('.slide-8 .item:nth-child(3)', { y: '-100vh', duration: 1, ease: Power2.easeInOut }, '-=0.5')
  .to('.slide-8 .item:nth-child(4)', { y: '-100vh', duration: 1, ease: Power2.easeInOut }, '-=0.5')
  .to('.wrapper-desk', { y: '-300vh', duration: 1, ease: Power2.easeInOut }, '-=0.5')
