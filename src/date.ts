export class DateTrigger {
    date: number
    dateContainer: any
    constructor() {
        this.date = new Date().getFullYear()
        this.dateContainer = document.querySelector('#app .nav--wrapper p')
    }

    init() {
        this.dateContainer.innerHTML = this.date
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
            this.dateContainer.innerHTML = this.date
        }, 20)
    }
}