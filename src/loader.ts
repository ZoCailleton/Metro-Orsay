export class LoaderTrigger {
    container: any
    text: string
    imagesList: any
    imagesOnLoad: Array<HTMLImageElement>
    numberImages: number
    numberImagesLoad: number
    domTextParagraph: any
    lastRate: number
    constructor() {
        this.container = document.querySelector('#loader')
        this.domTextParagraph = document.querySelector('#loader > p')
        this.text = '0%'
        this.imagesList = document.images
        this.numberImages = this.imagesList.length
        this.numberImagesLoad = 0
        this.imagesOnLoad = []
        this.lastRate = 0
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

        setTimeout(() => this.updateDom(), 10)
    }

    private updateDom() {
        // console.log('Load state :' + this.getRate())
        const currentRate = this.getRate()

        const increment = setInterval(() => {
            if (currentRate !== this.lastRate) {
                this.domTextParagraph.innerHTML = this.lastRate + ' %'
                this.lastRate++
            } else if (currentRate !== 100) {
                this.lastRate = currentRate
                this.domTextParagraph.innerHTML = currentRate + ' %'
                clearInterval(increment)
            } else {
                this.domTextParagraph.innerHTML = 100 + ' %'
                clearInterval(increment)
                setTimeout(() => {
                    this.domTextParagraph.innerHTML = 'bienvenue'
                }, 900)
                setTimeout(() => {
                    this.container.classList.add('remove')
                    this.lastRate = 0
                }, 1900)
            }
            if (currentRate > 100 || this.lastRate > 100) {
                this.domTextParagraph.innerHTML = 100 + ' %'
                clearInterval(increment)
                setTimeout(() => {
                    this.domTextParagraph.innerHTML = 'bienvenue'
                }, 900)
                setTimeout(() => {
                    this.container.classList.add('remove')
                }, 1900)
            }
        }, 50)

        if (this.numberImagesLoad !== this.numberImages) this.checkLoad()
        this.domTextParagraph.innerHTML = currentRate + ' %'
    }

    private getRate() {
        return Math.round(100 * this.numberImagesLoad / this.numberImages)
    }

}