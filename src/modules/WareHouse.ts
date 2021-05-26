import Goods from './Goods'
import Slot from './Slot'
export default class WareHouse {

    element: HTMLElement
    goods: Goods = new Goods()
    slots: NodeList

    // 货物间的间距
    gap: number = 5
    // 仓库最大容量
    max: number = 20

    width: number
    height: number

    constructor() {
        this.element = document.querySelector('.warehouse') as HTMLElement

        // 根据货物宽高设定仓库宽高
        let { row, column } = this.setRowColumn(this.max)
        this.width = column * this.goods.W + (column - 1) * this.gap
        this.height = row * this.goods.H + (row - 1) * this.gap
        this.element.style.width = this.width + 'px'
        this.element.style.height = this.height + 'px'

        // 添加货物插槽
        this.addSlot(row, column)
        this.slots = document.querySelectorAll('.warehouse div') as NodeList
        // console.log(this.element.offsetTop, this.element.offsetLeft)
        // console.log((this.slots[0] as HTMLElement).offsetLeft)
        this.init()
    }

    // 根据最大容量设置每行每列比例
    setRowColumn(num: number) {
        let column = 2
        let row
        for (row = 2; row * row <= num; row++) {
            if (num % row === 0) {
                column = row
            }
        }
        row = num / column
        if (row < column) [row, column] = [column, row]
        return { row, column }
    }

    // 根据列宽添加货物槽
    addSlot(row: number, column: number) {
        this.element.style.gap = this.gap + 'px'
        this.element.style.gridTemplateColumns = `repeat(${column}, ${this.goods.W}px)`
        this.element.style.gridTemplateRows = `repeat(${row}, ${this.goods.H}px)`
        for (let i = 0; i < this.max; i++) {
            let div = new Slot()
            this.element.insertAdjacentElement('beforeend', div.element)
        }
    }

    // 鼠标按下
    mouseDown(event: MouseEvent) {
        this.goods.element.style.cursor = 'move'
        let ofl = this.goods.element.offsetLeft
        let oft = this.goods.element.offsetTop
        let x1 = event.clientX
        let y1 = event.clientY
        // console.log(event.clientX, event.clientY)
        // console.log(ofl, oft)
        document.onmousemove = e => {
            let x2 = e.clientX - x1 + ofl + 'px'
            let y2 = e.clientY - y1 + oft + 'px'
            // console.log(e.clientX, e.clientY)
            this.goods.element.style.left = x2
            this.goods.element.style.top = y2
            // console.log(x2, y2)

            // 货物移出仓库，清空货槽
            if (this.checkGoodsInWarehouse(this.goods.X, this.goods.Y)) {
                this.getNearSlot(this.goods.X, this.goods.Y)
            } else {
                this.clearHighLightSlot()
            }
        }

        // 鼠标抬起
        document.onmouseup = _ => {
            document.onmousemove = null
            document.onmouseup = null
            this.goods.element.style.cursor = 'pointer'

            let activeSlot = document.querySelector('.warehouse div.active')
            if (this.checkGoodsInWarehouse(this.goods.X, this.goods.Y) && activeSlot) {
                activeSlot.classList.add('in')
            }
            this.goods.locationReset()
        }
    }

    // 检查货物是否拖入仓库中
    checkGoodsInWarehouse(x: number, y: number) {
        let left = this.element.offsetLeft - this.goods.W
        let top = this.element.offsetTop - this.goods.H
        let right = this.element.offsetLeft + this.width
        let bottom = this.element.offsetTop + this.height
        return x >= left && x <= right && y >= top && y <= bottom
    }

    // 鼠标抬起获得与货物位置最接近的一个插槽
    getNearSlot(x: number, y: number) {
        let res = 0, minDistance = Number.MAX_SAFE_INTEGER
        // minDistance = 
        for (let i = 0; i < this.slots.length; i++) {
            (this.slots[i] as HTMLElement).classList.remove('active')
            let sx = (this.slots[i] as HTMLElement).offsetLeft
            let sy = (this.slots[i] as HTMLElement).offsetTop
            let distance = this.getDistanceFrom2Points(x, y, sx, sy)
            if (distance < minDistance) {
                minDistance = distance;
                res = i;
            }
        };
        (this.slots[res] as HTMLElement).classList.add('active')
    }

    // 清空高亮货物槽
    clearHighLightSlot() {
        for (let i = 0; i < this.slots.length; i++) {
            (this.slots[i] as HTMLElement).classList.remove('active')
        }
    }

    // 计算两点之间距离
    getDistanceFrom2Points(x1: number, y1: number, x2: number, y2: number) {
        return Math.sqrt(Math.pow(x1 - x2, 2) + Math.pow(y1 - y2, 2))
    }

    // 初始化
    init() {
        // 给货物绑定拖拽事件
        this.goods.element.addEventListener('mousedown', this.mouseDown.bind(this))
    }
}