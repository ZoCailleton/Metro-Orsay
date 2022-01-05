import './style.scss'
import { Audio, SlideSubtitle } from './voix'
import { MouseParallax } from './mouse'

import gsap, { Power2 } from 'gsap'
import { ScrollTrigger } from 'gsap/ScrollTrigger'
import { DateTrigger } from './date'

const date = new DateTrigger()
date.init()

gsap.registerPlugin(ScrollTrigger)

const getAverage = (first: number, second: number) => {
  return Math.round((first / second) * 100)
}

const cursor = document.querySelector<HTMLInputElement>('.cursor')
window.addEventListener('mousemove', (e: MouseEvent) => {
  let _x = e.clientX - cursor!.offsetWidth / 2
  let _y = e.clientY - cursor!.offsetHeight / 2
  cursor?.setAttribute('style', 'transform: translate(' + _x + 'px, ' + _y + 'px)')
})

let CURRENT_SCENE: number = 0

const GLOBAL_SCENE = gsap.timeline({ paused: true })

const subtitles0: SlideSubtitle = new SlideSubtitle(0)
const subtitles1: SlideSubtitle = new SlideSubtitle(1)
const subtitles2: SlideSubtitle = new SlideSubtitle(2)
const subtitles3: SlideSubtitle = new SlideSubtitle(3)
const subtitles4: SlideSubtitle = new SlideSubtitle(4)
const subtitles5: SlideSubtitle = new SlideSubtitle(5)
const subtitles6: SlideSubtitle = new SlideSubtitle(6)
const subtitles7: SlideSubtitle = new SlideSubtitle(7)
const subtitles8: SlideSubtitle = new SlideSubtitle(8)

const scene0Voix = new Audio('/assets/audio/slide1.mp3', false)
const scene1Voix = new Audio('/assets/audio/slide2.mp3', false)
const scene2Voix = new Audio('/assets/audio/slide3.mp3', false)
const scene3Voix = new Audio('/assets/audio/slide4.mp3', false)
const scene4Voix = new Audio('/assets/audio/slide5.mp3', false)
const scene5Voix = new Audio('/assets/audio/slide6.mp3', false)
// pas encore de voix ici
// const scene6Voix = new Audio('/assets/audio/slide7.mp3', false)
const scene7Voix = new Audio('/assets/audio/slide8.mp3', false)

const scene4Ambiance = new Audio('/assets/audio/ambiance_slide_4.mp3', false)

const slide1 = document.querySelector<HTMLInputElement>('.slide-1')
const slide2 = document.querySelector<HTMLInputElement>('.slide-2')
const slide3 = document.querySelector<HTMLInputElement>('.slide-3')
const slide4 = document.querySelector<HTMLInputElement>('.slide-4')
const slide5 = document.querySelector<HTMLInputElement>('.slide-5')
const slide6 = document.querySelector<HTMLInputElement>('.slide-6')
const slide7 = document.querySelector<HTMLInputElement>('.slide-7')
const slide8 = document.querySelector<HTMLInputElement>('.slide-8')

const scene1Parallax = new MouseParallax(slide1!)
const scene2Parallax = new MouseParallax(slide2!)
const scene3Parallax = new MouseParallax(slide3!)
const scene4Parallax = new MouseParallax(slide4!)
const scene5Parallax = new MouseParallax(slide5!)
const scene6Parallax = new MouseParallax(slide6!)
const scene7Parallax = new MouseParallax(slide7!)
const scene8Parallax = new MouseParallax(slide8!)

/* Lazy Loading */

const slides: Array<Element> = [];

for (let slide of document.querySelectorAll('.story--slide')) {
  slides.push(slide)
}

const loadSlideImg = () => {

  // On décharge les images précédentes
  if (slides[CURRENT_SCENE - 2] != null) {
    for (let layer of slides[CURRENT_SCENE - 2].querySelectorAll('.layer img')) {
      layer.setAttribute('src', '')
    }
  }

  // On charge les images de la slide suivante
  if (slides[CURRENT_SCENE + 1] != null) {
    for (let layer of slides[CURRENT_SCENE + 1].querySelectorAll('.layer img, .item img')) {
      let _src = (layer as HTMLImageElement).dataset.src || ''
      layer.setAttribute('src', _src)
    }
  }

}

//loadSlideImg()

const launchSubtitles = (subtitles: SlideSubtitle) => {

  cursor?.classList.remove('big')

  // On initialise les sous-titres passés en paramètres
  subtitles.init()

  // On lance un compteur toutes les 10ms
  let _i: number = 0
  let _interval = setInterval(() => {
    _i += 10
    loader?.setAttribute('style', 'width: ' + getAverage(_i, subtitles.getDuration()) + '%')
    if (getAverage(_i, subtitles.getDuration()) >= 100) {
      cursor?.classList.add('big')
      clearInterval(_interval)
    }
  }, 10)

}

// document.querySelector<HTMLInputElement>('.cursor')?.addEventListener('click', () => { checkSlide() })




interface config {
  timecode: number
  parallax?: MouseParallax
  date?: number
  subtitle?: SlideSubtitle
  delayVoixSubtitle?: number
}

const CONFIG: Array<config> = [
  {
    timecode: 0,
  },
  {
    timecode: 2,
    parallax: scene1Parallax,
    date: new Date().getFullYear(),
    subtitle: subtitles0,
    delayVoixSubtitle: 2000
  },
  {
    timecode: 3,
    parallax: scene2Parallax,
    date: 1900
  },
  {
    timecode: 4
  },
  {
    timecode: 6
  },
  {
    timecode: 7
  },
  {
    timecode: 8
  },
  {
    timecode: 9
  },
  {
    timecode: 10
  },
  {
    timecode: 12
  }
]



const slideTo = (num: number, animated: boolean = true) => {
  // CURRENT_SCENE = prev scene
  CONFIG[CURRENT_SCENE].parallax?.stop()

  // CURRENT_SCENE = new scene
  CURRENT_SCENE = num
  if (CONFIG[num].date) date.updateDate(CONFIG[num].date)
  GLOBAL_SCENE.tweenTo(CONFIG[num].timecode)
  if (CONFIG[num].subtitle && CONFIG[num].delayVoixSubtitle) {
    setTimeout(
      () => CONFIG[num].subtitle?.init()
      ,
      CONFIG[num].delayVoixSubtitle
    )
  }

  CONFIG[num].parallax?.init()
  CONFIG[num].parallax?.start()
}

if (window.location.hash) {
  let _slide = window.location.hash.replace('#slide', '')
  console.log(_slide)
  var y: number = +_slide;
  slideTo(y, false)
}

for (let tick of document.querySelectorAll('.timeline--wrapper .timeline--tick')) {
  tick.addEventListener('click', () => {
    let _tick = (tick as HTMLInputElement).dataset.tick || ''
    var y: number = +_tick;
    slideTo(y)
  });
}




/* Intro */

const intro = gsap.timeline({ paused: true })



const loader = document.querySelector<HTMLInputElement>('.loader')

document.querySelector<HTMLInputElement>('.intro .btn')?.addEventListener('click', () => {

  scene0Voix.init()

  cursor?.classList.add('active')

  slideTo(1)

})




GLOBAL_SCENE
  // Intro
  .set('.slide-1 .layer:nth-child(1)', { y: -500 })
  .set('.slide-1 .layer:nth-child(2)', { y: -450 })
  .set('.slide-1 .layer:nth-child(3)', { y: -400 })
  .set('.slide-1 .layer:nth-child(4)', { y: -350 })
  .set('.slide-1 .layer:nth-child(5)', { y: -300 })
  .set('.slide-1 .layer:nth-child(6)', { y: -250 })
  .set('.slide-1 .layer:nth-child(7)', { y: -200 })
  .set('.slide-1 .layer:nth-child(8)', { y: -150 })
  .set('.slide-1 .layer:nth-child(9)', { y: -100 })
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

  // Scène 1
  .to('.slide-1 .layer img', { x: 0, y: 0, duration: 0.5, ease: Power2.easeInOut })
  .to('.slide-1 .layer:nth-child(8)', { opacity: 0, duration: 0.5, ease: Power2.easeInOut })
  .to('.slide-1 .layer:nth-child(7)', { opacity: 0, duration: 0.5, ease: Power2.easeInOut })
  .to('.slide-1 .layer:nth-child(6)', { opacity: 0, duration: 0.5, ease: Power2.easeInOut })
  .to('.slide-1 .layer:nth-child(2)', { opacity: 0, duration: 0.5, ease: Power2.easeInOut })
  .to('.slide-1 .layer:nth-child(3)', { opacity: 0, duration: 0.5, ease: Power2.easeInOut }, '-=0.5')
  .to('.slide-1 .layer:nth-child(4)', { opacity: 0, duration: 0.5, ease: Power2.easeInOut }, '-=0.5')
  .to('.slide-1 .layer:nth-child(5)', { opacity: 0, duration: 0.5, ease: Power2.easeInOut }, '-=0.5')
  //.to('.slide-1 .layer:nth-child(9)', {scale: 1.25, duration: 4, ease: Power0.easeNone})
  //.to('.slide-1 .layer:nth-child(1)', {scale: 1.1, duration: 4, ease: Power0.easeNone}, '-=4')

  // Scène 2
  .to('.slide-1 .layer:nth-child(9)', { scale: 1.5, opacity: 0, duration: 1, ease: Power2.easeInOut })
  .to('.slide-1 .layer:nth-child(1)', { scale: 1.25, opacity: 0, duration: 1, ease: Power2.easeInOut }, '-=1')
  .to('.slide-1', { scale: 1.15, opacity: 0, duration: 1, ease: Power2.easeInOut }, '-=1')
  .to('.slide-2 .layer', { scale: 1, duration: 1, ease: Power2.easeInOut }, '-=1')

  // Scène 3
  .set('.slide-3 .layer:nth-child(1)', { y: -500 })
  .set('.slide-3 .layer:nth-child(2)', { y: -400 })
  .to('.wrapper-concours', { y: '-200vh', duration: 2, ease: Power2.easeInOut })
  .to('.slide-2 .layer:nth-child(1)', { y: 500, duration: 2, ease: Power2.easeInOut }, '-=2')
  .to('.slide-2 .layer:nth-child(2)', { y: 400, duration: 2, ease: Power2.easeInOut }, '-=2')
  .to('.slide-2 .layer:nth-child(3)', { y: 300, duration: 2, ease: Power2.easeInOut }, '-=2')
  .to('.slide-2 .layer:nth-child(4)', { y: 200, duration: 2, ease: Power2.easeInOut }, '-=2')
  .to('.slide-2 .layer:nth-child(5)', { y: 100, duration: 2, ease: Power2.easeInOut }, '-=2')
  .to('.slide-3 .layer', { y: 0, duration: 2, ease: Power2.easeInOut }, '-=2')

  // Scène 4
  .to('.slide-3 .layer:nth-child(1)', { scale: 1.1, opacity: 0, duration: 1, ease: Power2.easeInOut })
  .to('.slide-3 .layer:nth-child(2)', { scale: 1.2, opacity: 0, duration: 1, ease: Power2.easeInOut }, '-=1')
  .to('.slide-3 .layer:nth-child(3)', { scale: 1.3, opacity: 0, duration: 1, ease: Power2.easeInOut }, '-=1')
  .to('.slide-3 .layer:nth-child(4)', { scale: 1.4, opacity: 0, duration: 1, ease: Power2.easeInOut }, '-=1')
  .to('.slide-3 .layer:nth-child(5)', { scale: 1.5, opacity: 0, duration: 1, ease: Power2.easeInOut }, '-=1')
  .to('.wrapper-concours', { opacity: 0, duration: 1, ease: Power2.easeInOut }, '-=1')
  .to('.slide-4 .layer', { scale: 1, duration: 1, ease: Power2.easeInOut }, '-=1')

  // Scène 5
  .set('.slide-5 .layer:nth-child(1)', { y: 500 })
  .set('.slide-5 .layer:nth-child(2)', { y: 400 })
  .set('.slide-5 .layer:nth-child(3)', { y: 300 })
  .set('.slide-5 .layer:nth-child(4)', { y: 200 })
  .set('.slide-5 .layer:nth-child(5)', { y: 100 })
  .to('.wrapper-desk', { y: '-100vh', duration: 1, ease: Power2.easeInOut })
  .to('.wrapper-desk .slide-4 .layer:nth-child(1)', { y: 450, duration: 1, ease: Power2.easeInOut }, '-=1')
  .to('.wrapper-desk .slide-4 .layer:nth-child(2)', { y: 400, duration: 1, ease: Power2.easeInOut }, '-=1')
  .to('.wrapper-desk .slide-4 .layer:nth-child(2)', { y: 350, duration: 1, ease: Power2.easeInOut }, '-=1')
  .to('.wrapper-desk .slide-4 .layer:nth-child(3)', { y: 300, duration: 1, ease: Power2.easeInOut }, '-=1')
  .to('.wrapper-desk .slide-4 .layer:nth-child(4)', { y: 250, duration: 1, ease: Power2.easeInOut }, '-=1')
  .to('.wrapper-desk .slide-4 .layer:nth-child(5)', { y: 200, duration: 1, ease: Power2.easeInOut }, '-=1')
  .to('.wrapper-desk .slide-4 .layer:nth-child(6)', { y: 150, duration: 1, ease: Power2.easeInOut }, '-=1')
  .to('.wrapper-desk .slide-4 .layer:nth-child(7)', { y: 100, duration: 1, ease: Power2.easeInOut }, '-=1')
  .to('.wrapper-desk .slide-5 .layer', { y: 0, duration: 1, ease: Power2.easeInOut }, '-=1')

  // Scène 6
  .to('.wrapper-desk', { y: '-200vh', duration: 1, ease: Power2.easeInOut })

  // Scène 7
  .to('.slide-6 .item:nth-child(1)', { y: '-100vh', duration: 1, ease: Power2.easeInOut })
  .to('.slide-6 .item:nth-child(2)', { y: '-100vh', duration: 1, ease: Power2.easeInOut }, '-=0.5')
  .to('.slide-6 .item:nth-child(3)', { y: '-100vh', duration: 1, ease: Power2.easeInOut }, '-=0.5')
  .to('.wrapper-desk', { y: '-300vh', duration: 1, ease: Power2.easeInOut }, '-=0.5')

  // Scène 8
  .to('.wrapper-usine', { y: '-100vh', duration: 1, ease: Power2.easeInOut })


