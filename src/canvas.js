import startMove from "./move.js";

function getPos(ev) { //获取鼠标位置封装成函数
    var scrollTop = document.documentElement.scrollTop || document.body.scrollTop;
    var scrollLeft = document.documentElement.scrollLeft || document.body.scrollLeft;
    return { x: ev.pageX + scrollLeft - 20, y: ev.pageY + scrollTop - 70 }; //JSON形式返回
}

const m = {
    data: {
        isPainting: false,
        last: null,
        isTouchDevice: 'ontouchstart' in window,
    }
}
const v = {
    canvas: document.getElementById('canvas'),
    ctx: null,
    init() {
        this.canvas.width = document.documentElement.clientWidth;
        this.canvas.height = document.documentElement.clientHeight;
        this.ctx = v.canvas.getContext('2d')
        this.ctx.fillStyle = 'black';
        this.ctx.strokeStyle = '#000';
        this.ctx.lineWidth = 12;
        this.ctx.lineCap = "round";
    },
    draw(x1, y1, x2, y2) {
        this.ctx.beginPath();
        this.ctx.moveTo(x1, y1);
        this.ctx.lineTo(x2, y2);
        this.ctx.stroke();
    }
}
const c = {
    mousedown: (e) => {
        const { x, y } = getPos(e);
        m.data.isPainting = true;
        m.data.last = [x, y];
    },
    mousemove: (e) => {
        const { x, y } = getPos(e);
        if (m.data.isPainting) {
            v.draw(m.data.last[0], m.data.last[1], x, y);
            m.data.last = [x, y];
        }
    },
    mouseup: () => {
        m.data.isPainting = false
    },
    touchstart: (e) => {
        m.data.last = [e.touches[0].clientX - 20, e.touches[0].clientY - 70]
    },
    touchmove: (e) => {
        e.preventDefault();
        v.draw(m.data.last[0], m.data.last[1], e.touches[0].clientX - 20, e.touches[0].clientY - 70);
        m.data.last = [e.touches[0].clientX - 20, e.touches[0].clientY - 70]
    },

    init() {
        v.init()
        let curColor = v.ctx.strokeStyle;
        if (m.data.isTouchDevice) {
            //触摸设备
            v.canvas.addEventListener('touchstart', c.touchstart)
            v.canvas.addEventListener('touchmove', c.touchmove)
        } else {
            //鼠标
            v.canvas.addEventListener('mousedown', c.mousedown)
            v.canvas.addEventListener('mousemove', c.mousemove)
            v.canvas.addEventListener('mouseup', c.mouseup)
        }
        //navBar
        let colorBtn = document.querySelector('#penColor');
        let colorChoseDiv = document.querySelector('#penColorChose');
        let sizeBtn = document.querySelector('#penSize');
        let sizeChoseDiv = document.querySelector('#penSizeChose');
        let penEraser = document.querySelector('#penEraser');
        let clearBtn = document.querySelector('#penClear');
        document.onclick = () => {
            console.log(startMove)
            startMove(colorChoseDiv, {
                height: 0
            });
            startMove(sizeChoseDiv, {
                height: 0
            });
        }
        colorBtn.onclick = function (e) {
            startMove(colorChoseDiv, {
                height: 140
            });
            e.cancelBubble = true;
        }
        sizeBtn.onclick = function (e) {
            v.ctx.strokeStyle = curColor;
            sizeBtn.classList.add('navActive');
            penEraser.classList.remove('navActive');
            startMove(sizeChoseDiv, {
                height: 140
            });
            e.cancelBubble = true;
        }
        penEraser.onclick = function (e) {
            penEraser.classList.add('navActive');
            sizeBtn.classList.remove('navActive');
            v.ctx.strokeStyle = '#fff';
        }
        clearBtn.onclick = function () {
            v.ctx.clearRect(0, 0, v.canvas.width, v.canvas.height);
        }

        //颜色的切换
        let redBtn = colorChoseDiv.querySelector('.colorRed');
        let greenBtn = colorChoseDiv.querySelector('.colorGreen');

        let blueBtn = colorChoseDiv.querySelector('.colorBlue');
        let blackBtn = colorChoseDiv.querySelector('.colorBlack');
        redBtn.onclick = function () { //切换红色
            v.ctx.strokeStyle = 'rgb(255,64,0)';
            curColor = v.ctx.strokeStyle;
        }
        greenBtn.onclick = function () {//切换绿色
            v.ctx.strokeStyle = 'rgb(74,222,149)'
        }
        blueBtn.onclick = function () { //切换蓝色
            v.ctx.strokeStyle = 'rgb(0,68,255)';
            curColor = v.ctx.strokeStyle;
        }
        blackBtn.onclick = function () { //切换黑色
            v.ctx.strokeStyle = '#000';
            curColor = v.ctx.strokeStyle;
        }
        //尺寸的切换
        let sSizeBtn = sizeChoseDiv.querySelector('.sSize');
        let mSizeBtn = sizeChoseDiv.querySelector('.mSize');
        let lSizeBtn = sizeChoseDiv.querySelector('.lSize');
        sSizeBtn.onclick = function () {
            v.ctx.lineWidth = 7;
        }
        mSizeBtn.onclick = function () {
            v.ctx.lineWidth = 12;
        }
        lSizeBtn.onclick = function () {
            v.ctx.lineWidth = 17;
        }
    }
}
c.init()


