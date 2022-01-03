import './style.scss'

import gsap, { Power2 } from 'gsap'
import { ScrollTrigger } from 'gsap/ScrollTrigger'

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
.to('.nav--timeline', {bottom: 0, duration: 1, ease: Power2.easeInOut}, '-=1')

document.querySelector<HTMLInputElement>('.intro .btn')?.addEventListener('click', () => {
  intro.play()
  CURRENT_SCENE = 1
})

/* Scène 1 */

const slide1 = document.querySelector<HTMLInputElement>('.slide-1')
slide1?.setAttribute('style', 'margin-top: -100px')

const s1l1 = document.querySelector<HTMLInputElement>('.slide-1 .layer:nth-child(1) img')
const s1l2 = document.querySelector<HTMLInputElement>('.slide-1 .layer:nth-child(2) img')
const s1l3 = document.querySelector<HTMLInputElement>('.slide-1 .layer:nth-child(3) img')
const s1l4 = document.querySelector<HTMLInputElement>('.slide-1 .layer:nth-child(4) img')

slide1?.addEventListener('mousemove', (e: MouseEvent) => {

  if(CURRENT_SCENE === 1 && intro.totalProgress() === 1) {
  
    let _w = window.innerWidth
    let _h = window.innerHeight
    let _mouseX = e.clientX
    let _mouseY = e.clientY
    console.log((100 * _mouseX / _w));
    

    s1l4?.setAttribute('style', 'transform: translate(' + 100 * _mouseX / _w + '%, 0px)')

  }

})

const loop = () => {

  requestAnimationFrame(loop)
}

requestAnimationFrame(loop)
