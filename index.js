// 游戏配置
let config = {
    wrapWidth: 500,
    wrapHieght: 500,
    row: 3,
    col: 3,
    image: "img/lol.png",
    dom: document.getElementById('container'),
    arr: [],
    isGameOver:false
}
config.blockWidth = config.wrapWidth / config.row;
config.blockHeight = config.wrapHieght / config.col;
let block = config.arr;

// 1页面配置初始化
init()
// 2.给数组进行乱序
shuffle()
// 3.点击事件
click()
// 4.判断是否游戏结束


// 点击事件
function click() {
    let visiable = block.find(item => item.isVisable === false);
    block.forEach(item => item.dom.onclick = function () {
        if(config.isGameOver){
            return
        }
        if (item.left === visiable.left && parse(Math.abs(item.top - visiable.top), config.blockHeight) ||
            item.top === visiable.top && parse(Math.abs(item.left - visiable.left), config.blockWidth)) {
            exchange(item, visiable)
            isWin()
        }
    })
}

// 游戏结束
function isWin() {
    let wrong = block.filter(item => !item.isSame());
    if(wrong === 0){
        config.isGameOver = true;
    }
}

// 随机数
function sort(max, min) {
    return Math.floor(Math.random() * (max + 1 - min) + min)
}
//两数交换
function exchange(a, b) {
    let temp = a.left;
    a.left = b.left;
    b.left = temp;

    let temp2 = a.top;
    a.top = b.top;
    b.top = temp2;
    block.forEach(item => item.show())
}
// 转换成整数
function parse(n1, n2) {
    return parseInt(n1) === parseInt(n2)
}

// 循环数组，给每一项left和top交换
function shuffle() {
    for (let i = 0; i < block.length - 1; i++) {
        let index = sort(block.length - 2, 0)
        exchange(block[i], block[index])
    }
}
// 初始化游戏DOM
function init() {
    container.style.width = config.wrapWidth + 'px';
    container.style.height = config.wrapHieght + 'px';
    container.style.border = '1px solid';
    container.style.position = 'relative';
    blockInit()
}

/**
 * 
 * @param {Number} left 距离左面距离
 * @param {Number} top 距离右面距离
 * @param {bloo} isVisable  是否可见
 */
function Block(left, top, isVisable) {
    this.left = left; //记录当前left坐标
    this.top = top; //记录当前top坐标
    this.correctX = this.left;
    this.correctY = this.top;

    this.isVisable = isVisable;
    this.dom = document.createElement('div');
    this.dom.style.width = config.blockWidth + 'px';
    this.dom.style.height = config.blockHeight + 'px';
    this.dom.style.border = '1px solid #fff';
    this.dom.style.background = `url("${config.image}") -${this.correctX}px -${this.correctY}px`;
    this.dom.style.position = 'absolute';
    this.dom.style.boxSizing = "border-box";
    this.dom.style.cursor = 'pointer';
    if (!isVisable) {
        this.dom.style.display = 'none';
    }
    this.show = function () {
        this.dom.style.left = this.left + 'px';
        this.dom.style.top = this.top + 'px';
    }
    this.show()

    this.isSame = function(){
        return parse(this.correctX,this.left) && parse(this.correctY,this.top)
    }

    config.dom.appendChild(this.dom)
}

// 内容初始化
function blockInit() {
    // 生成多个对象形式的小方块，记录着{ 正确位置，当前位置，背景图片的位置 }
    for (let i = 0; i < config.row; i++) {
        for (let j = 0; j < config.col; j++) {
            let isVisable = true;
            if (i === config.row - 1 && j === config.col - 1) {
                isVisable = false;
            }
            config.arr.push(new Block(i * config.blockWidth, j * config.blockHeight, isVisable))
        }
    }
}