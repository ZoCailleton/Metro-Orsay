import text from './text.json'

export function slideSubtitle(slideStep: number) {
  let voice = text[slideStep]

  const containerSubtitle = document.querySelector<HTMLInputElement>('.subtitles')

  const textSubtitle = document.createElement('p')
  textSubtitle.className = 'subtitle--text'
  if (containerSubtitle) {
    containerSubtitle.appendChild(textSubtitle)
  }

  function getNewSentence(step: number) {
    textSubtitle.innerHTML = voice[step].text
    setTimeout(function () {
      if (voice[step + 1]) {
        step++
        getNewSentence(step)
      } else {
        textSubtitle.innerHTML = ''
      }
    }, voice[step].duration * 1000);
  }

  getNewSentence(0)
}