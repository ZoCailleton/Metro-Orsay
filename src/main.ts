import './style.scss'
import { slideSubtitle } from './voix'

import gsap, { Power0 } from 'gsap'
import { ScrollTrigger } from 'gsap/ScrollTrigger'

gsap.registerPlugin(ScrollTrigger)

slideSubtitle(1)

let tl = gsap.timeline({
  scrollTrigger: {
    trigger: "#slide-1",
    pin: true,
    start: 'top top',
    end: 'bottom top',
    markers: true,
    scrub: true
  }
});

tl
  .to('#slide-1 .layer:nth-child(1)', { scale: 1.25, duration: 1, ease: Power0.easeNone })
  .to('#slide-1 .layer:nth-child(2)', { scale: 1.5, duration: 1, ease: Power0.easeNone }, '-=1')
  .to('#slide-1 .layer:nth-child(3)', { scale: 1.75, duration: 1, ease: Power0.easeNone }, '-=1')
  .to('#slide-1 .layer:nth-child(4)', { scale: 2, duration: 1, ease: Power0.easeNone }, '-=1')
