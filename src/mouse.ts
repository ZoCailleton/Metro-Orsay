export function getPercentage(value: number, maxValue: number) {
    return 100 * value / maxValue
}

export function getShift(mouse: number, window: number, coef: number) {
    const shift = (mouse - window / 2) * coef
    const mouseShift = getPercentage(shift, window)

    return mouseShift
}