export default class Slot {

    element: HTMLElement

    constructor() {
        this.element = document.createElement('div')
        // this.init()
    }

    get X() {
        return this.element.offsetLeft
    }

    get Y() {
        return this.element.offsetTop
    }

    init() {
        this.element.addEventListener('mouseenter', _ => {
            // console.log(this.X, this.Y)
        })
    }
}