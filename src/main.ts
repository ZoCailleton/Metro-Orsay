import './style.scss'
import { AudioClass, SlideSubtitle } from './voix'
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
const subtitles11: SlideSubtitle = new SlideSubtitle(10)
const subtitles12: SlideSubtitle = new SlideSubtitle(11)
const subtitles13: SlideSubtitle = new SlideSubtitle(12)

const scene1Voix = new AudioClass('/assets/audio/slide1.mp3', false)
const scene2Voix = new AudioClass('/assets/audio/slide2.mp3', false)
const scene3Voix = new AudioClass('/assets/audio/slide3.mp3', false)
const scene4Voix = new AudioClass('/assets/audio/slide4.mp3', false)
const scene5Voix = new AudioClass('/assets/audio/slide5.mp3', false)
const scene6Voix = new AudioClass('/assets/audio/slide6.mp3', false)
const scene7Voix = new AudioClass('/assets/audio/slide7.mp3', false)
const scene8Voix = new AudioClass('/assets/audio/slide8.mp3', false)
const scene9Voix = new AudioClass('/assets/audio/slide9.mp3', false)
const scene10Voix = new AudioClass('/assets/audio/slide10.mp3', false)
const scene11Voix = new AudioClass('/assets/audio/slide11.mp3', false)
const scene12Voix = new AudioClass('/assets/audio/slide12.mp3', false)
const scene13Voix = new AudioClass('/assets/audio/slide13.mp3', false)

const scene1Ambiance = new AudioClass('/assets/audio/slide1ambiance.mp3', true)

// const scene4Ambiance = new AudioClass('/assets/audio/ambiance_slide_4.mp3', true)

const slide1 = document.querySelector<HTMLInputElement>('.slide-1')
const slide2 = document.querySelector<HTMLInputElement>('.slide-2')
const slide3 = document.querySelector<HTMLInputElement>('.slide-3')
const slide4 = document.querySelector<HTMLInputElement>('.slide-4')
const slide5 = document.querySelector<HTMLInputElement>('.slide-5')
const slide6 = document.querySelector<HTMLInputElement>('.slide-6')
const slide7 = document.querySelector<HTMLInputElement>('.slide-7')
const slide8 = document.querySelector<HTMLInputElement>('.slide-8')
const slide9 = document.querySelector<HTMLInputElement>('.slide-9')
const slide10 = document.querySelector<HTMLInputElement>('.slide-10')
const slide11 = document.querySelector<HTMLInputElement>('.slide-11')
const slide12 = document.querySelector<HTMLInputElement>('.slide-12')
const slide13 = document.querySelector<HTMLInputElement>('.slide-13')

const scene1Parallax = new MouseParallax(slide1!)
const scene2Parallax = new MouseParallax(slide2!)
const scene3Parallax = new MouseParallax(slide3!)
const scene4Parallax = new MouseParallax(slide4!)
const scene5Parallax = new MouseParallax(slide5!)
const scene6Parallax = new MouseParallax(slide6!)
const scene7Parallax = new MouseParallax(slide7!)
const scene8Parallax = new MouseParallax(slide8!)
const scene9Parallax = new MouseParallax(slide9!)
const scene10Parallax = new MouseParallax(slide10!)
const scene11Parallax = new MouseParallax(slide11!)
const scene12Parallax = new MouseParallax(slide12!)
const scene13Parallax = new MouseParallax(slide13!)

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
  voix?: AudioClass
  ambiance?: AudioClass
  delayVoixSubtitle?: number
}

const CONFIG: Array<config> = [
  {
    timecode: 0,
  },
  //Scène 1 - Première scène
  {
    timecode: 2,
    parallax: scene1Parallax,
    date: new Date().getFullYear(),
    subtitle: subtitles1,
    voix: scene1Voix,
    ambiance: scene1Ambiance,
    delayVoixSubtitle: 2000
  },
  //Scène 2 - Paris 1900
  {
    timecode: 5.5,
    parallax: scene1Parallax,
    date: 1900,
    subtitle: subtitles2,
    voix: scene2Voix,
    delayVoixSubtitle: 2000
  },
  //Scene 3 : Construction du metro
  {
    timecode: 10.5,
    parallax: scene2Parallax,
    date: 1900,
    subtitle: subtitles3,
    voix: scene3Voix,
    delayVoixSubtitle: 1900
  },
  // Scène 4 : Contrat sombre
  {
    timecode: 12.25,
    parallax: scene3Parallax,
    date: 1900,
    subtitle: subtitles4,
    voix: scene4Voix,
    delayVoixSubtitle: 2000
  },
  // Scène 4 : 
  {
    timecode: 13.5,
    parallax: scene4Parallax,
    subtitle: subtitles5,
    voix: scene5Voix,
    delayVoixSubtitle: 2000
  },
  // Scène 5 : Herbe
  {
    timecode: 15.5,
    parallax: scene5Parallax,
    subtitle: subtitles6,
    voix: scene6Voix,
    delayVoixSubtitle: 2000
  },
  // Scène 5 : Herbe - Apparition monstre
  {
    timecode: 17.5,
    parallax: scene5Parallax,
    subtitle: subtitles7,
    voix: scene7Voix,
    delayVoixSubtitle: 2000
  },
  // Scène 8 : Usine - Start
  {
    timecode: 19,
    parallax: scene7Parallax,
    subtitle: subtitles8,
    voix: scene8Voix,
    delayVoixSubtitle: 1910
  },
  // Scène 8 : Usine - Ciel
  {
    timecode: 20.5,
    parallax: scene6Parallax,
    subtitle: subtitles9,
    voix: scene9Voix,
    delayVoixSubtitle: 1910
  },
  // Scène 9 : Objets - Apparition
  {
    timecode: 23.5,
    subtitle: subtitles10,
    voix: scene10Voix,
    delayVoixSubtitle: 1920
  },
  // Scène 10 : Portraits artistes Art Nouveau
  {
    timecode: 25.25,
    subtitle: subtitles11,
    voix: scene11Voix,
    delayVoixSubtitle: 2000
  },
  // Scène 12 : Mouvement psychédélique
  {
    timecode: 26.25,
    // parallax: scene13Parallax,
    subtitle: subtitles12,
    voix: scene12Voix,
    delayVoixSubtitle: 2000
  },
  // Scène 13 : Alien
  {
    timecode: 29.25,
    // parallax: scene12Parallax,
    subtitle: subtitles13,
    voix: scene13Voix,
    delayVoixSubtitle: 2000
  },
  // Scène 14 : End
  {
    timecode: 30.25
  }
]

const slideToTransition = (num: number) => {
  const cursorSmall = setInterval(() => cursor.small(), 10)
  setTimeout(() => {
    clearInterval(cursorSmall)
  }, 2000)
  // CURRENT_SCENE = prev scene
  CONFIG[CURRENT_SCENE].parallax?.stop()
  CONFIG[CURRENT_SCENE].subtitle?.stop()
  CONFIG[CURRENT_SCENE].voix?.stop()
  CONFIG[CURRENT_SCENE].ambiance?.stop()

  // CURRENT_SCENE = new scene
  CURRENT_SCENE = num

  GLOBAL_SCENE.time(CONFIG[num].timecode)

}

const slideTo = (num: number, animated: boolean = true) => {

  cursor.small()

  // CURRENT_SCENE = prev scene
  CONFIG[CURRENT_SCENE].parallax?.stop()
  CONFIG[CURRENT_SCENE].subtitle?.stop()
  CONFIG[CURRENT_SCENE].voix?.stop()
  CONFIG[CURRENT_SCENE].ambiance?.stop()

  // CURRENT_SCENE = new scene
  CURRENT_SCENE = num


  if (CONFIG[num].date) date.updateDate(CONFIG[num].date)
  CONFIG[num].ambiance?.init()
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
    CONFIG[CURRENT_SCENE].subtitle?.init()

    tick.querySelector('img')?.setAttribute('src', 'assets/ui/tick-active.png')

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

  document.querySelector('.timeline--tick:first-child img')?.setAttribute('src', 'assets/ui/tick-active.png')

  cursor.draw()
  date.show()
  cursorTrigger()
  slideTo(1)
})

function cursorTrigger() {
  window.addEventListener('click', cursorClicker)
  let listener = true

  const navPoints = document.querySelectorAll('.timeline--tick')

  for (let i = 0; i < navPoints.length; i++) {

    navPoints[i].addEventListener('mouseenter', () => {
      cursor.hover()
    })

    navPoints[i].addEventListener('mouseout', () => {

      if (CONFIG[CURRENT_SCENE].subtitle?.isFinish()) {
        cursor.big()
      } else {
        cursor.small()
      }
    })

    navPoints[i].addEventListener('mouseout', () => {

      if (CONFIG[CURRENT_SCENE].subtitle?.isFinish()) {
        cursor.big()
      } else {
        cursor.small()
      }
    })
    navPoints[i].addEventListener('click', () => {
      console.log('click');

      CONFIG[CURRENT_SCENE].subtitle?.stop()
      cursor.small()
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
      // console.log(cursor.getStatus());
      if (CONFIG[CURRENT_SCENE].subtitle?.isFinish()) {
        if (cursor.getStatus() === 'hover') {
          cursor.hover()
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

function detectDevice() {
  // console.log(!!navigator.maxTouchPoints)
  return !!navigator.maxTouchPoints ? 'mobile' : 'computer'
}

detectDevice()

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

  // Scène 9 - Artistes
  .set('.slide-9 .artiste', { y: 100, opacity: 0 })

  // Scène 10 - Setup
  .set('.slide-10 .layer:nth-child(1)', { y: 200 })

  // Transition Space - Setup
  .set('.slide-11 .spaceship', { x: 800 })

  // Intro - Start
  .to('.wrapper-intro', { y: '-100vh', duration: 1, ease: Power2.easeInOut })
  .to('.timeline--wrapper', { zIndex: 99, duration: 0, ease: Power2.easeInOut })
  .to('.slide-1 .layer', { y: 0, duration: 1, ease: Power2.easeInOut }, '-=1')
  .to('.band', { opacity: 1, duration: 1, ease: Power2.easeInOut })
  .to('.timeline--tick', { opacity: 1, duration: 1, ease: Power2.easeInOut }, '-=1')
  .to('.date', { y: 0, duration: 1, ease: Power2.easeInOut }, '-=1')
  .to('.intro .side:first-child', { rotation: -10, opacity: 0, duration: 1, ease: Power2.easeInOut }, '-=1')
  .to('.intro .side:last-child', { rotation: 10, opacity: 0, duration: 1, ease: Power2.easeInOut }, '-=1')
  .to('.nav--bottom', { bottom: 0, duration: 1, ease: Power2.easeInOut }, '-=1')
  .to('.intro', { opacity: 0 })

  // Scène 1 - Paris 1900
  .to('.slide-1', { filter: 'grayscale(100%)', duration: 1, ease: Power2.easeInOut })
  .to('.slide-1 .layer.tour-eiffel', { opacity: 0, duration: 1, ease: Power2.easeInOut }, '-=1')
  .to('.slide-1 .layer.hidden', { opacity: 1, duration: 1, ease: Power2.easeInOut }, '-=1')
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
  .to('.slide-5 .layer:nth-child(2)', { y: 0, duration: 1, ease: Power2.easeInOut }, '-=0.75')

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
  .to('.transition.smoke', { top: '60%', duration: 1, ease: Power2.easeInOut }, '-=1')
  .to('.slide-6 .layer', { y: 0, duration: 1, ease: Power2.easeInOut }, '-=1')
  .to('.slide-7 .layer:nth-child(1)', { y: -300, duration: 1, ease: Power2.easeInOut })

  // Scène 8 - Objets start
  .to('.slide-8 .item:nth-child(1)', { y: 0, duration: 1, ease: Power2.easeInOut })
  .to('.slide-8 .item:nth-child(2)', { y: 0, duration: 1, ease: Power2.easeInOut }, '-=0.5')
  .to('.slide-8 .item:nth-child(3)', { y: 0, duration: 1, ease: Power2.easeInOut }, '-=0.5')
  .to('.slide-8 .item:nth-child(4)', { y: 0, duration: 1, ease: Power2.easeInOut }, '-=0.5')
  .to('.slide-7 .layer:nth-child(1)', { y: -400, duration: 1, ease: Power2.easeInOut }, '-=1')
  .set('.wrapper-usine', { opacity: 0, duration: 0 })

  // Scène 8 - Objets end
  .to('.wrapper-objets', { y: '-100vh', duration: 1, ease: Power2.easeInOut })
  .to('.slide-9 .artiste:nth-child(1)', { y: 0, opacity: 1, duration: 1, ease: Power2.easeInOut }, '-=0.75')
  .to('.slide-9 .artiste:nth-child(2)', { y: 0, opacity: 1, duration: 1, ease: Power2.easeInOut }, '-=0.75')
  .to('.slide-9 .artiste:nth-child(3)', { y: 0, opacity: 1, duration: 1, ease: Power2.easeInOut }, '-=0.75')

  // Scène 10 - Mouvement psychédélique
  .to('.wrapper-objets', { y: '-200vh', duration: 1, ease: Power2.easeInOut })
  .to('.slide-10 .layer', { y: 0, duration: 1, ease: Power2.easeInOut }, '-=1')

  // Scène 11 - Alien
  .to('.wrapper-space', { y: '-400vh', duration: 3, ease: Power2.easeInOut })
  .to('.slide-11 .spaceship', { x: -200, duration: 3, ease: Power2.easeInOut }, '-=3')

  // Scène 14 - End
  .to('.wrapper-space', { y: '-500vh', duration: 1, ease: Power2.easeInOut })

