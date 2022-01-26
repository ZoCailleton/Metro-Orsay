export class LoaderTrigger {

    container: any
    text: any
    imagesList: any
    numberImagesLoad: number
    numberImages: number
    rate: number
    finish: boolean

    constructor() {
        this.container = document.querySelector('#loader')
        this.text = document.querySelector('#loader > p')
        this.numberImages = 0
        this.numberImagesLoad = 0
        this.rate = 0
        this.finish = false
    }

    init() {
        this.imagesList = document.images
        this.numberImages = this.imagesList.length
        this.text.innerHTML = this.rate + ' %'

        console.log('Images List : ', this.imagesList)
        console.log('Nombre total d images ' + this.numberImages)
        this.checkLoad()
    }

    private checkLoad() {
        this.numberImagesLoad = 0
        for (let i = 0; i < this.imagesList.length; i++) {
            this.imagesList[i].complete ? this.numberImagesLoad++ : null

        }
        console.log('Nombre total d images load ' + this.numberImagesLoad)

        this.rate = this.getRate()

        this.text.innerHTML = this.rate + ' %'


        setTimeout(() => {
            this.numberImagesLoad === this.numberImages ? setTimeout(() => {
                this.finish = true
                this.container.style.display = 'none'
            }, 200) : this.checkLoad()
        }, 20)
    }

    isFinish() {
        return this.finish
    }

    private getRate() {
        return Math.round(100 * this.numberImagesLoad / this.numberImages)
    }

}