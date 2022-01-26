export class LoaderTrigger {

    container: any
    text: string
    imagesList: HTMLCollectionOf<HTMLImageElement> | null = null;
    imagesOnLoad: HTMLCollectionOf<HTMLImageElement> | []
    numberImages: number
    numberImagesLoad: number
    domTextParagraph: HTMLElement | null
    lastRate: number
    isFinish: boolean

    constructor() {
        this.container = document.querySelector('#loader')
        this.domTextParagraph = document.querySelector('#loader > p')
        this.text = '0%'
        this.imagesList
        this.numberImages = 0
        this.numberImagesLoad = 0
        this.imagesOnLoad = []
        this.lastRate = 0
        this.isFinish = false
    }

    init() {
        this.imagesList = document.images
        this.numberImages = this.imagesList.length
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

        setTimeout(() => this.updateDom(), 10)
    }

    private updateDom() {
        // console.log('Load state :' + this.getRate())
        const currentRate = this.getRate()

        const increment = setInterval(() => {
            if (currentRate !== this.lastRate && this.lastRate !== 100 && this.domTextParagraph) {
                this.domTextParagraph.innerHTML = this.lastRate + ' %'
                this.lastRate++
            } else if (currentRate !== 100 && this.domTextParagraph) {
                this.lastRate = currentRate
                this.domTextParagraph.innerHTML = currentRate + ' %'
            } else if (currentRate >= 100 || this.lastRate >= 100 && this.domTextParagraph) {
                clearInterval(increment)
                if(this.domTextParagraph)
                this.domTextParagraph.innerHTML = '100%'
                this.lastRate++
                setTimeout(() => {
                    this.container.classList.add('remove')
                    this.isFinish = true
                }, 1000)
            }

        }, 50)

        if (this.numberImagesLoad !== this.numberImages) this.checkLoad()
        if(this.domTextParagraph)
        this.domTextParagraph.innerHTML = currentRate + ' %'
    }

    private getRate() {
        return Math.round(100 * this.numberImagesLoad / this.numberImages)
    }

}