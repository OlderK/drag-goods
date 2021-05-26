export default class Goods {

    element: HTMLElement
    initX: number
    initY: number

    constructor() {
        this.element = document.querySelector('.goods-wrap .goods') as HTMLElement
        this.initX = this.element.offsetLeft // -63
        this.initY = this.element.offsetTop
        // console.log(this.element.clientWidth, this.element.clientHeight)
        // console.log(this.element.offsetWidth, this.element.offsetHeight)
        // console.log(this.element.offsetLeft, this.element.offsetTop)
        // console.log(this.element.scrollLeft, this.element.scrollTop)
        // this.init()

        this.locationReset()
        /* const { w, h } = this.createRandomGoods()
        this.element.style.width = w + 'px'
        this.element.style.height = h + 'px' */
    }

    get W() {
        return this.element.offsetWidth
    }

    get H() {
        return this.element.offsetHeight
    }

    get X() {
        return this.element.offsetLeft
    }

    get Y() {
        return this.element.offsetTop
    }

    set X(value: number) {
        this.element.style.left = value + 'px'
    }

    set Y(value: number) {
        this.element.style.top = value + 'px'
    }

    locationReset = () => {
        this.element.style.left = this.initX + 'px'
        this.element.style.top = this.initY + 'px'
    }

    // 随机货物大小
    // min: 50 max: 200
    createRandomGoods() {
        let w = Math.round(Math.random() * 4 + 1) * 50
        let h = Math.round(Math.random() * 4 + 1) * 50
        return { w, h }
    }

}