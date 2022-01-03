function getPercentage(value: number, maxValue: number) {
	return 100 * value / maxValue
}

function getShift(mouse: number, window: number, coef: number) {
	const shift = (mouse - window / 2) * coef
	const mouseShift = getPercentage(shift, window)

	return mouseShift
}

export class MouseParalax {
	scene: number;
	isInit: boolean;
	isStart: boolean;
	containerEl: HTMLInputElement;
	_w: number;
	_h: number;
	_mouseX: number;
	_mouseY: number;
	constructor(scene: number, containerEl: HTMLInputElement) {
		this.scene = scene
		this.isStart = false
		this.containerEl = containerEl
		this._w = window.innerWidth
		this._h = window.innerHeight
		this._mouseX = 0
		this._mouseY = 0
		this.isInit = false
	}

	init() {
		document.addEventListener('mousemove', (e: MouseEvent) => {
			this._mouseX = e.clientX
			this._mouseY = e.clientY
		})

		this.isInit = true
		this.isStart = true
		this.loop()
	}

	start() {
		this.isStart = true
	}

	stop() {
		this.isStart = false
	}

	getInit() {
		if (this.isInit === false) {
			return false
		} else {
			return true
		}
	}

	private loop() {
		if (this.isStart === true) {
			for (let layer of this.containerEl!.querySelectorAll('.layer img')) {
				let _coefBase = (layer as HTMLImageElement).dataset.coef || ''
				let _coef: number = +_coefBase
				layer?.setAttribute('style', 'transform: translate(' + getShift(this._mouseX, this._w, _coef * 0.01) + '%,' + getShift(this._mouseY, this._h, _coef * 0.01) + '%)')
			}
		}
		requestAnimationFrame(this.loop.bind(this));
	}
}
