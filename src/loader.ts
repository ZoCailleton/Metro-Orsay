export class LoaderTrigger {
    container: HTMLDivElement
    text: string
    imagesList: HTMLCollection
    numberImages: number
    constructor() {
        this.container = document.createElement('div')
        this.text = '0%'
        this.imagesList = document.images
        this.numberImages = this.imagesList.length
    }

    init() {
        console.log(this.numberImages)
    }

}