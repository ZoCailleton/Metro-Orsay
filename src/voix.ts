import text from './text.json'

export function slideSubtitle(slideStep: number) {
  let voice = text[slideStep]

  const containerSubtitle = document.createElement('div')
  containerSubtitle.className = 'subtitle--container'
  document.getElementsByTagName('body')[0].appendChild(containerSubtitle);

  const textSubtitle = document.createElement('p')
  textSubtitle.className = 'subtitle--text'
  containerSubtitle.appendChild(textSubtitle)

  function getNewSentence(step: number) {
    textSubtitle.innerHTML = voice[step].text
    setTimeout(function () {
      if (voice[step + 1]) {
        step++
        getNewSentence(step)
      } else {
        textSubtitle.innerHTML = 'FIN'
      }
    }, voice[step].duration * 1000);
  }

  getNewSentence(0)
}