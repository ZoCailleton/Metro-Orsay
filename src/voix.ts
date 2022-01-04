import text from './dev.json'

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
    const containerSubtitle = document.querySelector<HTMLInputElement>('.subtitles--wrapper')
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
        textSubtitle.classList.remove('hidden')
      } else {
        this.finish = true
        textSubtitle.innerHTML = ''
        textSubtitle.classList.add('hidden')
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

export class Audio {
  url: string
  contexteAudio: any
  yodelBuffer: any
  source: any
  isInit: boolean
  gainNode: any
  constructor(url: string) {
    this.url = url
    this.contexteAudio = new AudioContext()
    this.yodelBuffer
    this.source
    this.isInit = false
    this.gainNode
  }

  init() {
    this.gainNode = this.contexteAudio.createGain();
    this.gainNode.connect(this.contexteAudio.destination);

    window.fetch(this.url)
      .then(response => response.arrayBuffer())
      .then(arrayBuffer => this.contexteAudio.decodeAudioData(arrayBuffer))
      .then(audioBuffer => {
        this.yodelBuffer = audioBuffer
        this.isInit = true
      })
  }

  start() {
    if (this.isInit === true) {
      this.source = this.contexteAudio.createBufferSource();
      this.source.buffer = this.yodelBuffer;
      this.source.connect(this.gainNode)


      this.source.start();
      this.gainNode.gain.setValueAtTime(0.01, this.contexteAudio.currentTime);

      this.gainNode.gain.exponentialRampToValueAtTime(1, this.contexteAudio.currentTime + 0.3)

    }
  }

  stop() {
    if (this.isInit === true) {

      this.gainNode.gain.setValueAtTime(this.gainNode.gain.value, this.contexteAudio.currentTime)

      this.gainNode.gain.exponentialRampToValueAtTime(0.001, this.contexteAudio.currentTime + 0.3)

      setTimeout(
        () => this.source.stop()
        , 2000
      )
    }
  }

}