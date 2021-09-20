function scroll(scrollTop, {
    dom = document.documentElement,
    totalTime = 1000,
    tick = 16,
    isScroll = false,
    onstart = null,
    onend = null
}) {  
    function startMove(){
        if(isScroll){
            return
        }
        onstart(start)
        function start(){
            let totaldis = scrollTop - dom.scrollTop;
            let totalTimes = parseInt(totalTime / tick);
            let dis = Math.ceil(totaldis / totalTimes)
            let times = 0;
            let time = setInterval(() => {
                isScroll = true;
                dom.scrollTop += dis;
                times++
                if(times === totalTimes){
                    clearInterval(time);
                    onend()
                }
            },tick)
        }
    }
    startMove()
}