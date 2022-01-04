export class LoaderTrigger {
    container: HTMLDivElement
    text: string
    imagesList: any
    imagesOnLoad: Array<HTMLImageElement>
    numberImages: number
    numberImagesLoad: number
    constructor() {
        this.container = document.createElement('div')
        this.text = '0%'
        this.imagesList = document.images
        this.numberImages = this.imagesList.length
        this.numberImagesLoad = 0
        this.imagesOnLoad = []
    }

    init() {
        this.imagesOnLoad = this.imagesList
        this.checkLoad()
    }

    private checkLoad() {
        this.numberImagesLoad = 0
        for (let i = 0; i < this.imagesOnLoad.length; i++) {
            if (this.imagesOnLoad[i].complete) {
                this.numberImagesLoad++
            }
        }
        this.updateDom()
    }

    private updateDom() {
        console.log('Load state :' + this.getRate())
        if (this.numberImagesLoad !== this.numberImages) this.checkLoad()
    }

    private getRate() {
        return Math.round(100 * this.numberImagesLoad / this.numberImages)
    }

}