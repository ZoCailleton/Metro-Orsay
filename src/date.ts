export class DateTrigger {
    date: number
    dateContainer: HTMLDivElement | null
    constructor() {
        this.date = new Date().getFullYear()
        this.dateContainer = document.querySelector('.date p')
    }

    init() {
        if (this.dateContainer)
        this.dateContainer.innerHTML = this.date.toString()
    }

    updateDate(newDate: number) {
        let update = setInterval(() => {
            if (newDate < this.date) {
                this.date--
            } else if (newDate > this.date) {
                this.date++
            } else {
                clearInterval(update)
            }
            if (this.dateContainer)
            this.dateContainer.innerHTML = this.date.toString()
        }, 20)
    }

    show() {
        if (this.dateContainer)
        this.dateContainer.style.opacity = `1`
    }
}