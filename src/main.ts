import './style.scss'
import { slideSubtitle } from './voix'

import gsap, { Power2 } from 'gsap'
import { ScrollTrigger } from 'gsap/ScrollTrigger'
import { getShift } from './mouse'

gsap.registerPlugin(ScrollTrigger)

const cursor = document.querySelector<HTMLInputElement>('.cursor')
window.addEventListener('mousemove', (e: MouseEvent) => {
    let _x = e.clientX - cursor!.offsetWidth / 2
    let _y = e.clientY - cursor!.offsetHeight / 2
    cursor?.setAttribute('style', 'transform: translate(' + _x + 'px, ' + _y + 'px)')
})

let CURRENT_SCENE: number = 0

/* Intro */

const intro = gsap.timeline({ paused: true })

intro
  .to('.intro', { scale: 1.3, duration: 1, ease: Power2.easeInOut })
  .to('.intro .btn', { y: 50, opacity: 0, duration: 1, ease: Power2.easeInOut }, '-=1')
  .to('.intro .side:first-child', { rotation: -10, opacity: 0, duration: 1, ease: Power2.easeInOut }, '-=1')
  .to('.intro .side:last-child', { rotation: 10, opacity: 0, duration: 1, ease: Power2.easeInOut }, '-=1')
  .to('.slide-1', { width: '100vw', height: '100vh', marginTop: 0, borderRadius: 0, duration: 1, ease: Power2.easeInOut }, '-=1')
  .to('.nav--bottom', { bottom: 0, duration: 1, ease: Power2.easeInOut }, '-=1')
  .to('.intro', {opacity: 0})

document.querySelector<HTMLInputElement>('.intro .btn')?.addEventListener('click', () => {
  intro.play()
  CURRENT_SCENE = 1
  setTimeout(() => { slideSubtitle(0) }, 2000)
})

/* Scène 1 */

const scene_1_to_2 = gsap.timeline({ paused: true })

scene_1_to_2
.to('.slide-1 .layer img', {x: 0, y: 0, duration: 0.5, ease: Power2.easeInOut})
.to('.slide-1 .layer:nth-child(8)', {opacity: 0, duration: 0.5, ease: Power2.easeInOut})
.to('.slide-1 .layer:nth-child(7)', {opacity: 0, duration: 0.5, ease: Power2.easeInOut})
.to('.slide-1 .layer:nth-child(6)', {opacity: 0, duration: 0.5, ease: Power2.easeInOut})
.to('.slide-1 .layer:nth-child(2)', {opacity: 0, duration: 0.5, ease: Power2.easeInOut})
.to('.slide-1 .layer:nth-child(3)', {opacity: 0, duration: 0.5, ease: Power2.easeInOut}, '-=0.5')
.to('.slide-1 .layer:nth-child(4)', {opacity: 0, duration: 0.5, ease: Power2.easeInOut}, '-=0.5')
.to('.slide-1 .layer:nth-child(5)', {opacity: 0, duration: 0.5, ease: Power2.easeInOut}, '-=0.5')

document.querySelector<HTMLInputElement>('.slide-1')?.addEventListener('click', () => {
  if(CURRENT_SCENE === 1) {
    // Si l'animation d'intro est terminée
    if(intro.totalProgress() === 1) {
      scene_1_to_2.play()
      CURRENT_SCENE = 2
    }
  } else if(CURRENT_SCENE === 2) {
    // Si la scène 1 est terminée
    if(scene_1_to_2.totalProgress() === 1) {
      scene_2_to_3.play()
      CURRENT_SCENE = 3
    }
  }
})

const scene_2_to_3 = gsap.timeline({ paused: true })

scene_2_to_3
.to('.slide-1 .layer:nth-child(9)', {scale: 1.5, opacity: 0, duration: 1, ease: Power2.easeInOut})
.to('.slide-1 .layer:nth-child(1)', {scale: 1.25, opacity: 0, duration: 1, ease: Power2.easeInOut}, '-=1')
.to('.slide-1', {scale: 1.15, opacity: 0, duration: 1, ease: Power2.easeInOut}, '-=1')
.to('.slide-2', {scale: 1.1, duration: 1, ease: Power2.easeInOut}, '-=1')

const slide1 = document.querySelector<HTMLInputElement>('.slide-1')
slide1?.setAttribute('style', 'margin-top: -100px')

slide1?.addEventListener('mousemove', (e: MouseEvent) => {

  if (CURRENT_SCENE === 1 && intro.totalProgress() === 1) {

    let _w = window.innerWidth
    let _h = window.innerHeight
    let _mouseX = e.clientX
    let _mouseY = e.clientY

    for (let layer of document.querySelectorAll('.slide-1 .layer img')) {
      let _coefBase = (layer as HTMLImageElement).dataset.coef || ''
      let _coef: number = +_coefBase
      layer?.setAttribute('style', 'transform: translate(' + getShift(_mouseX, _w, _coef * 0.01) + '%,' + getShift(_mouseY, _h, _coef * 0.01) + '%)')
    }

  }

})
