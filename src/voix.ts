import text from './text.json'

export function slideSubtitle(slideStep: number) {
    let voix = text[slideStep]

    const containerSubtitle = document.createElement('div')
    containerSubtitle.className = 'containerSubtitle'
    document.getElementsByTagName('body')[0].appendChild(containerSubtitle);

    const textSubtitle = document.createElement('p')
    textSubtitle.className = 'TextSubtitle'
    containerSubtitle.appendChild(textSubtitle)

    textSubtitle.innerHTML = voix[1].text
    console.log(voix, containerSubtitle)
}