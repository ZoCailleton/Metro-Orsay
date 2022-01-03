import text from './text.json'

export function slideSubtitle(slideStep: number) {
  let voice = text[slideStep]

  const containerSubtitle = document.createElement('div')
  containerSubtitle.className = 'subtitle--container'
  document.getElementsByTagName('body')[0].appendChild(containerSubtitle);

  const textSubtitle = document.createElement('p')
  textSubtitle.className = 'subtitle--text'
  containerSubtitle.appendChild(textSubtitle)

  voice.forEach(element => {

  });

  textSubtitle.innerHTML = voice[1].text
  console.log(voice, containerSubtitle)
}