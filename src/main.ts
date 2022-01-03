import './style.scss'
import { slideSubtitle } from './voix'

import gsap, { Power2 } from 'gsap'
import { ScrollTrigger } from 'gsap/ScrollTrigger'
import { getShift } from './mouse'

gsap.registerPlugin(ScrollTrigger)

let CURRENT_SCENE: number = 0

/* Intro */

const intro = gsap.timeline({ paused: true })

intro
.to('.intro', {scale: 1.3, duration: 1, ease: Power2.easeInOut})
.to('.intro .btn', {y: 50, opacity: 0, duration: 1, ease: Power2.easeInOut}, '-=1')
.to('.intro .side:first-child', {rotation: -10, opacity: 0, duration: 1, ease: Power2.easeInOut}, '-=1')
.to('.intro .side:last-child', {rotation: 10, opacity: 0, duration: 1, ease: Power2.easeInOut}, '-=1')
.to('.slide-1', {width: '100vw', height: '100vh', marginTop: 0, borderRadius: 0, duration: 1, ease: Power2.easeInOut}, '-=1')
.to('.nav--bottom', {bottom: 0, duration: 1, ease: Power2.easeInOut}, '-=1')

.to('.slide-1 .layer:nth-child(8)', {opacity: 0, duration: 0.5, ease: Power2.easeInOut})
.to('.slide-1 .layer:nth-child(9)', {opacity: 0, duration: 0.5, ease: Power2.easeInOut})
.to('.slide-1 .layer:nth-child(6)', {opacity: 0, duration: 0.5, ease: Power2.easeInOut})
.to('.slide-1 .layer:nth-child(2)', {opacity: 0, duration: 0.5, ease: Power2.easeInOut})
.to('.slide-1 .layer:nth-child(3)', {opacity: 0, duration: 0.5, ease: Power2.easeInOut}, '-=0.5')
.to('.slide-1 .layer:nth-child(4)', {opacity: 0, duration: 0.5, ease: Power2.easeInOut}, '-=0.5')
.to('.slide-1 .layer:nth-child(5)', {opacity: 0, duration: 0.5, ease: Power2.easeInOut}, '-=0.5')

document.querySelector<HTMLInputElement>('.intro .btn')?.addEventListener('click', () => {
  intro.play()
  CURRENT_SCENE = 1
})

/* Scène 1 */

slideSubtitle(1)

const slide1 = document.querySelector<HTMLInputElement>('.slide-1')
slide1?.setAttribute('style', 'margin-top: -100px')

const s1l1 = document.querySelector<HTMLInputElement>('.slide-1 .layer:nth-child(1) img')
const s1l2 = document.querySelector<HTMLInputElement>('.slide-1 .layer:nth-child(2) img')
const s1l3 = document.querySelector<HTMLInputElement>('.slide-1 .layer:nth-child(3) img')
const s1l4 = document.querySelector<HTMLInputElement>('.slide-1 .layer:nth-child(4) img')

slide1?.addEventListener('mousemove', (e: MouseEvent) => {

  if (CURRENT_SCENE === 1 && intro.totalProgress() === 1) {

    let _w = window.innerWidth
    let _h = window.innerHeight
    let _mouseX = e.clientX
    let _mouseY = e.clientY

    s1l1?.setAttribute('style', 'transform: translate(' + getShift(_mouseX, _w, 0.01) + '%,' + getShift(_mouseY, _h, 0.01) + '%)')
    s1l2?.setAttribute('style', 'transform: translate(' + getShift(_mouseX, _w, 0.015) + '%,' + getShift(_mouseY, _h, 0.015) + '%)')
    s1l3?.setAttribute('style', 'transform: translate(' + getShift(_mouseX, _w, 0.02) + '%,' + getShift(_mouseY, _h, 0.02) + '%)')
    s1l4?.setAttribute('style', 'transform: translate(' + getShift(_mouseX, _w, 0.03) + '%,' + getShift(_mouseY, _h, 0.025) + '%)')

  }

})
