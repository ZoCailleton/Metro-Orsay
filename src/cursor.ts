export class Cursor {

    cursor: HTMLInputElement | null
    cursor2: HTMLInputElement | null
    size: number
    x!: number
    y!: number
    isBig: boolean

    constructor() {
        this.cursor = document.querySelector<HTMLInputElement>('.cursor')
        this.cursor2 = document.querySelector<HTMLInputElement>('.cursor-2')
        this.isBig = false
        this.size = 10
    }

    draw() {

        window.addEventListener('mousemove', (e: MouseEvent) => {
            this.x = e.clientX - this.size / 2
            this.y = e.clientY - this.size / 2
            this.cursor?.setAttribute('style', 'transform: translate(' + this.x + 'px, ' + this.y + 'px)')
        })

        this.small()

    }

    small() {
        this.size = 10
        this.cursor2?.classList.add('small')
        this.cursor2?.classList.remove('big')
        this.cursor?.classList.remove('big')
    }

    big() {
        this.size = 100
        this.cursor2?.classList.add('big')
        this.cursor?.classList.add('big')
        this.cursor2?.classList.remove('small')
    }

    getStatus() {
        if (this.cursor2?.classList.contains('big')) {
            return 'big'
        } else if (this.cursor2?.classList.contains('small')) {
            return 'small'
        } else {
            return 'Le cursor n\'a pas de status'
        }
    }

}
