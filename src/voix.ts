import text from './text.json'

export class SlideSubtitle {

  voice: { text: string, duration: number }[];
  finish: boolean;
  numSentences: number;
  duration: number;
  step: number;
  
  constructor(slideStep: number) {
    this.voice = text[slideStep];
    this.finish = false;
    this.numSentences = 0;
    this.duration = 0;
    this.step = 0;
  }

  init() {
    const containerSubtitle = document.querySelector<HTMLInputElement>('.subtitles')
    const textSubtitle = document.createElement('p')

    if (containerSubtitle) {
      containerSubtitle.appendChild(textSubtitle)
    }
    this.durationVoice()
    this.getNewSentence(textSubtitle)
  }

  private getNewSentence(textSubtitle: HTMLParagraphElement) {
    textSubtitle.innerHTML = this.voice[this.step].text
    setTimeout(() => {
      if (this.voice[this.step + 1]) {
        this.step++
        this.getNewSentence(textSubtitle)
      } else {
        this.finish = true
        textSubtitle.innerHTML = ''
      }
    }, this.voice[this.step].duration * 1000);
  }

  private durationVoice() {
    let durationVoice = 0
    let numS = 0

    this.voice.forEach(sentence => {
      numS++
      durationVoice = durationVoice + sentence.duration
    });

    this.numSentences = numS
    this.duration = durationVoice
  }

  getDuration() {
    return this.duration * 1000
  }

  isFinish() {
    if (this.finish === true) {
      return true
    } else {
      return false
    }
  }
}