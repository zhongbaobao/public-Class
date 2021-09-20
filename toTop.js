let img = document.querySelector('img');
img.onclick = function () {
    scroll(0, {
        onstart: (start) => {
            img.style.transform = "scale(1.5,0.5)"
            img.style.transition = "0.8s";
            let handleScroll = () => {
                start();
                img.style.transform = "scale(1)"
                img.style.bottom = window.innerHeight + 100 + 'px'
                img.removeEventListener("transitionend", handleScroll)
            }
            img.addEventListener("transitionend", handleScroll)
        },
        onend: () => {
            img.style.transition = "none"
            img.style.bottom = "-100px";
            setTimeout(() => {
                img.style.transition = "0.3s"
                img.style.bottom = "30px";
            }, 10)

        }

    })
}