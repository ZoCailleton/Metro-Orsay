import './style.scss'
import { AudioVoix, SlideSubtitle } from './voix'
import { MouseParallax } from './mouse'

import gsap, { Power2 } from 'gsap'
import { ScrollTrigger } from 'gsap/ScrollTrigger'

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


const subtitles0: SlideSubtitle = new SlideSubtitle(0)
const subtitles1: SlideSubtitle = new SlideSubtitle(1)
const subtitles2: SlideSubtitle = new SlideSubtitle(2)
const subtitles3: SlideSubtitle = new SlideSubtitle(3)
const subtitles4: SlideSubtitle = new SlideSubtitle(4)
const subtitles5: SlideSubtitle = new SlideSubtitle(5)

const scene0Voix = new AudioVoix('/assets/audio/slide1.mp3')
const scene1Voix = new AudioVoix('/assets/audio/slide2.mp3')
const scene2Voix = new AudioVoix('/assets/audio/slide3.mp3')
const scene3Voix = new AudioVoix('/assets/audio/slide4.mp3')
const scene4Voix = new AudioVoix('/assets/audio/slide5.mp3')
const scene5Voix = new AudioVoix('/assets/audio/slide6.mp3')

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

const checkSlide = () => {

  if (CURRENT_SCENE === 1) {

    // Si l'animation d'intro est terminée
    if (intro.totalProgress() === 1 && subtitles0.isFinish()) {
      scene_1_to_2.play()
      scene0Voix.stop()
      scene1Voix.init()
      CURRENT_SCENE = 2
      setTimeout(() => {
        scene1Voix.start()
        launchSubtitles(subtitles1)
      }, 1000)
    }

  } else if (CURRENT_SCENE === 2) {

    // Si la scène 1 est terminée
    if (scene_1_to_2.totalProgress() === 1 && subtitles1.isFinish()) {
      scene1Parallax.stop()
      scene_2_to_3.play()
      scene1Voix.stop()
      scene2Voix.init()

      CURRENT_SCENE = 3
      setTimeout(() => {
        scene2Voix.start()
        launchSubtitles(subtitles2)
      }, 1000)
    }

  } else if (CURRENT_SCENE === 3) {

    if (scene_2_to_3.totalProgress() === 1 && subtitles2.isFinish()) {
      scene2Parallax.stop()
      scene_3_to_4.play()
      scene2Voix.stop()
      scene3Voix.init()

      CURRENT_SCENE = 4
      setTimeout(() => {
        scene3Voix.start()
        launchSubtitles(subtitles3)
      }, 1000)
    }

  } else if (CURRENT_SCENE === 4) {

    if (scene_3_to_4.totalProgress() === 1 && subtitles3.isFinish()) {
      scene3Parallax.stop()
      scene_4_to_5.play()
      scene3Voix.stop()
      scene4Voix.init()
      CURRENT_SCENE = 5
      setTimeout(() => {
        scene4Voix.start()
        launchSubtitles(subtitles4)
      }, 1000)
    }

  } else if (CURRENT_SCENE === 5) {

    if (scene_4_to_5.totalProgress() === 1 && subtitles4.isFinish()) {
      scene4Parallax.stop()
      scene_5_to_6.play()
      scene4Voix.stop()
      scene5Voix.init()
      CURRENT_SCENE = 6
      setTimeout(() => {
        scene5Voix.start()
        launchSubtitles(subtitles5)
      }, 1000)
    }

  }

}





document.querySelector<HTMLInputElement>('.cursor')?.addEventListener('click', () => { checkSlide() })




/* Intro */

const intro = gsap.timeline({ paused: true })

intro
  .to('.intro', { scale: 1.3, duration: 1, ease: Power2.easeInOut })
  .to('.intro .btn', { y: 50, opacity: 0, duration: 1, ease: Power2.easeInOut }, '-=1')
  .to('.intro .side:first-child', { rotation: -10, opacity: 0, duration: 1, ease: Power2.easeInOut }, '-=1')
  .to('.intro .side:last-child', { rotation: 10, opacity: 0, duration: 1, ease: Power2.easeInOut }, '-=1')
  .to('.slide-1', { width: '100vw', height: '100vh', marginTop: 0, borderRadius: 0, duration: 1, ease: Power2.easeInOut }, '-=1')
  .to('.slide-1 .layer', { scale: 1, duration: 1, ease: Power2.easeInOut }, '-=1')
  .to('.nav--bottom', { bottom: 0, duration: 1, ease: Power2.easeInOut }, '-=1')
  .to('.intro', { opacity: 0 })







const loader = document.querySelector<HTMLInputElement>('.loader')

document.querySelector<HTMLInputElement>('.intro .btn')?.addEventListener('click', () => {

  scene0Voix.init()

  cursor?.classList.add('active')

  intro.play()
  CURRENT_SCENE = 1

  setTimeout(() => {

    launchSubtitles(subtitles0)
    scene0Voix.start()

  }, 1000)

})





/* Scène 1 */

slide1?.setAttribute('style', 'margin-top: -100px')

const scene_1_to_2 = gsap.timeline({ paused: true })

scene_1_to_2
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














/* Scène 2 */

const scene_2_to_3 = gsap.timeline({ paused: true })

scene_2_to_3
  .to('.slide-1 .layer:nth-child(9)', { scale: 1.5, opacity: 0, duration: 1, ease: Power2.easeInOut })
  .to('.slide-1 .layer:nth-child(1)', { scale: 1.25, opacity: 0, duration: 1, ease: Power2.easeInOut }, '-=1')
  .to('.slide-1', { scale: 1.15, opacity: 0, duration: 1, ease: Power2.easeInOut }, '-=1')
  .to('.slide-2 .layer', { scale: 1, duration: 1, ease: Power2.easeInOut }, '-=1')





/* Scène 3 */

const scene_3_to_4 = gsap.timeline({ paused: true })
scene_3_to_4
.set('.slide-3 .layer:nth-child(1)', { y: -500 })
.set('.slide-3 .layer:nth-child(2)', { y: -400 })
.to('.wrapper-concours', { y: '-100vh', duration: 1, ease: Power2.easeInOut })
.to('.slide-2 .layer:nth-child(1)', { y: 500, duration: 1, ease: Power2.easeInOut }, '-=1')
.to('.slide-2 .layer:nth-child(2)', { y: 400, duration: 1, ease: Power2.easeInOut }, '-=1')
.to('.slide-2 .layer:nth-child(3)', { y: 300, duration: 1, ease: Power2.easeInOut }, '-=1')
.to('.slide-2 .layer:nth-child(4)', { y: 200, duration: 1, ease: Power2.easeInOut }, '-=1')
.to('.slide-2 .layer:nth-child(5)', { y: 100, duration: 1, ease: Power2.easeInOut }, '-=1')
.to('.slide-3 .layer', { y: 0, duration: 1, ease: Power2.easeInOut }, '-=1')






/* Scène 4 */

const scene_4_to_5 = gsap.timeline({ paused: true })
scene_4_to_5
.to('.slide-3 .layer:nth-child(1)', { scale: 1.1, opacity: 0, duration: 1, ease: Power2.easeInOut })
.to('.slide-3 .layer:nth-child(2)', { scale: 1.2, opacity: 0, duration: 1, ease: Power2.easeInOut }, '-=1')
.to('.slide-3 .layer:nth-child(3)', { scale: 1.3, opacity: 0, duration: 1, ease: Power2.easeInOut }, '-=1')
.to('.slide-3 .layer:nth-child(4)', { scale: 1.4, opacity: 0, duration: 1, ease: Power2.easeInOut }, '-=1')
.to('.slide-3 .layer:nth-child(5)', { scale: 1.5, opacity: 0, duration: 1, ease: Power2.easeInOut }, '-=1')
.to('.wrapper-concours', { opacity: 0, duration: 1, ease: Power2.easeInOut }, '-=1')
.to('.slide-4 .layer', { scale: 1, duration: 1, ease: Power2.easeInOut }, '-=1')







/* Scène 5 */

const scene_5_to_6 = gsap.timeline({ paused: true })
scene_5_to_6
.set('.slide-5 .layer:nth-child(1)', { y: -500 })
.set('.slide-5 .layer:nth-child(2)', { y: -400 })
.set('.slide-5 .layer:nth-child(3)', { y: -300 })
.set('.slide-5 .layer:nth-child(4)', { y: -200 })
.set('.slide-5 .layer:nth-child(5)', { y: -100 })
.to('.wrapper-desk', {y: '-100vh', duration: 1, ease: Power2.easeInOut})
.to('.wrapper-desk .slide-4 .layer:nth-child(1)', {y: 450, duration: 1, ease: Power2.easeInOut}, '-=1')
.to('.wrapper-desk .slide-4 .layer:nth-child(2)', {y: 400, duration: 1, ease: Power2.easeInOut}, '-=1')
.to('.wrapper-desk .slide-4 .layer:nth-child(2)', {y: 350, duration: 1, ease: Power2.easeInOut}, '-=1')
.to('.wrapper-desk .slide-4 .layer:nth-child(3)', {y: 300, duration: 1, ease: Power2.easeInOut}, '-=1')
.to('.wrapper-desk .slide-4 .layer:nth-child(4)', {y: 250, duration: 1, ease: Power2.easeInOut}, '-=1')
.to('.wrapper-desk .slide-4 .layer:nth-child(5)', {y: 200, duration: 1, ease: Power2.easeInOut}, '-=1')
.to('.wrapper-desk .slide-4 .layer:nth-child(6)', {y: 150, duration: 1, ease: Power2.easeInOut}, '-=1')
.to('.wrapper-desk .slide-4 .layer:nth-child(7)', {y: 100, duration: 1, ease: Power2.easeInOut}, '-=1')
.to('.wrapper-desk .slide-5 .layer', {y: 0, duration: 1, ease: Power2.easeInOut}, '-=1')






/* Parallax sur toutes les sections */



function parallax() {

  if (CURRENT_SCENE === 1 && intro.totalProgress() === 1 && scene1Parallax.getInit() === false) {
    scene1Parallax.init()
  } else if (CURRENT_SCENE === 3 && scene_1_to_2.totalProgress() === 1 && scene2Parallax.getInit() === false) {
    scene2Parallax.init()
  } else if (CURRENT_SCENE === 4 && scene_2_to_3.totalProgress() === 1 && scene3Parallax.getInit() === false) {
    scene3Parallax.init()
  } else if (CURRENT_SCENE === 5 && scene_3_to_4.totalProgress() === 1 && scene4Parallax.getInit() === false) {
    scene4Parallax.init()
  } else if (CURRENT_SCENE === 6 && scene_4_to_5.totalProgress() === 1 && scene5Parallax.getInit() === false) {
    scene5Parallax.init()
  }

  requestAnimationFrame(parallax)
}
parallax()






