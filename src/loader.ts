export class LoaderTrigger {
    container: any
    text: string
    imagesList: any
    imagesOnLoad: Array<HTMLImageElement>
    numberImages: number
    numberImagesLoad: number
    domTextParagraph: any
    constructor() {
        this.container = document.querySelector('#loader')
        this.domTextParagraph = document.querySelector('#loader > p')
        this.text = '0%'
        this.imagesList = document.images
        this.numberImages = this.imagesList.length
        this.numberImagesLoad = 0
        this.imagesOnLoad = []
    }

    init() {
        this.imagesOnLoad = this.imagesList

        console.log('nombre d\'images a load :' + this.numberImages);

        this.checkLoad()
    }

    private checkLoad() {
        this.numberImagesLoad = 0
        for (let i = 0; i < this.imagesOnLoad.length; i++) {
            if (this.imagesOnLoad[i].complete) {
                this.numberImagesLoad++
            }
        }

        setTimeout(() => this.updateDom(), 50)
    }

    private updateDom() {
        // console.log('Load state :' + this.getRate())
        if (this.numberImagesLoad !== this.numberImages) this.checkLoad()
        this.domTextParagraph.innerHTML = this.getRate() + ' %'
        if (this.getRate() === 100) this.container.classList.add('remove')
    }

    private getRate() {
        return Math.round(100 * this.numberImagesLoad / this.numberImages)
    }

}