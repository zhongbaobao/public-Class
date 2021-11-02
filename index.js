function createWaterFlow(option) {
    let defaultConfig = {
        width: 200, //图片的宽度
        Gap: 10, //图片之间的最小空隙
    }
    let options = Object.assign({}, defaultConfig, option)


    //1. 页面的整体布局【完成】
    Init()
    //2. 对图片控制
    let debounds = debound(control,100)
    window.onresize = function () {
        debounds()
    }

    function control() {
        let obj = ImgInfo();
        let arr = new Array(obj.number);
        arr.fill(0) //里面记录着距离顶部的距离
        options.ImageSrc.forEach(img => {
            let min = Math.min.apply(null, arr);
            img.style.top = min + 'px';
            let index = arr.indexOf(min);
            arr[index] += img.clientHeight + options.Gap;
            img.style.left = index * (options.width + obj.gap) + 'px';
            img.style.transition = '0.3s'
        })
        let maxTop = Math.max.apply(null, arr)
        options.container.style.height = maxTop - options.Gap + 'px'
    }

    function ImgInfo() { // 记录这一行的图片信息
        let obj = {};
        obj.number = Math.floor(options.container.clientWidth / (options.width + options.Gap)) //每一行图片的数量
        obj.gap = (options.container.clientWidth - options.width * obj.number) / (obj.number - 1)
        return obj
    }

    function Init() {
        let con = debound(control,50)
        options.ImageSrc.forEach(img => {
            img.style.position = 'absolute';
            img.style.width = options.width + 'px';
            img.onload = function(){
                con()
            }
            options.container.appendChild(img)
        })
        if (getComputedStyle(options.container).position === 'static') {
            options.container.style.position = 'relative';
        }
    }


    // 函数防抖
    function debound(callback, time) {
        let timer = null;
        return function(){
            clearTimeout(timer)
            timer = setTimeout(() => {
                callback.apply(null,arguments)
            }, time)
        }
    }

}