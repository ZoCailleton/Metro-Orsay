export class Cursor {

    cursor: any
    size: number
    x!: number
    y!: number
    isBig: boolean

    constructor() {
        this.cursor = document.querySelector<HTMLInputElement>('.cursor')
        this.isBig = false
        this.size = 15
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
        this.size = 15
        this.cursor.classList.add('active')
        this.cursor.classList.remove('big')
        this.cursor.classList.remove('hover')
    }

    big() {
        this.size = 120
        this.cursor.classList.add('big')
        this.cursor.classList.remove('active')
        this.cursor.classList.remove('hover')
    }

    remove() {
        this.size = 30
        this.cursor.classList.add('hover')
        this.cursor.classList.remove('active')
        this.cursor.classList.remove('big')
    }

    isHover() {
        return this.cursor.classList.contains('hover') ? true : false
    }

}
