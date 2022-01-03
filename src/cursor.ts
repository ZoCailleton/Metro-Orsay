export class Cursor {

    size: number
    x!: number
    y!: number

    constructor() {
        this.size = 10
    }
    
    draw() {

        const cursor = document.querySelector<HTMLInputElement>('.cursor')

        window.addEventListener('mousemove', (e: MouseEvent) => {
            this.x = e.clientX - this.size / 2
            this.y = e.clientY - this.size / 2
            cursor?.setAttribute('style', 'transform: translate(' + this.x + 'px, ' + this.y + 'px)')
        })

    }

}
