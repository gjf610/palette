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
        curColor: '',
    }
}
const v = {
    canvas: document.getElementById('canvas'),
    colorChoseDiv: document.querySelector('#penColorChose'),
    sizeBtn: document.querySelector('#penSize'),
    sizeChoseDiv: document.querySelector('#penSizeChose'),
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
    curColor: '',
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
    events: {
        "body": 'closePad',
        "#penColor": 'openColorPad',
        "#penSize": 'openSizePad',
        "#penEraser": 'openEraser',
        "#penClear": 'clearPalette',
        ".colorRed": 'setColor',
        ".colorGreen": 'setColor',
        ".colorBlue": 'setColor',
        ".colorBlack": 'setColor',
    },
    bindEvents: () => {
        for (let key in c.events) {
            if (c.events.hasOwnProperty(key)) {
                const value = c.events[key]
                document.querySelector(key).onclick = c[value]
            }
        }
    },
    closePad: () => {
        startMove(v.colorChoseDiv, {
            height: 0
        });
        startMove(v.sizeChoseDiv, {
            height: 0
        });
    },
    openColorPad: (e) => {
        startMove(v.colorChoseDiv, {
            height: 160
        });
        e.cancelBubble = true;
    },
    openSizePad: (e) => {
        v.ctx.strokeStyle = m.curColor;
        v.sizeBtn.classList.add('navActive');
        penEraser.classList.remove('navActive');
        startMove(v.sizeChoseDiv, {
            height: 140
        });
        e.cancelBubble = true;
    },
    openEraser: () => {
        penEraser.classList.add('navActive');
        v.sizeBtn.classList.remove('navActive');
        v.ctx.strokeStyle = '#fff';
    },
    clearPalette: () => {
        v.ctx.clearRect(0, 0, v.canvas.width, v.canvas.height);
    },
    setColor: (e) => {
        const { backgroundColor } = e.target.style
        v.ctx.strokeStyle = backgroundColor;
        m.curColor = backgroundColor;
    },
    init() {
        v.init()
        m.curColor = v.ctx.strokeStyle
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
        c.bindEvents()
        //尺寸的切换
        let sSizeBtn = document.querySelector('.sSize');
        let mSizeBtn = document.querySelector('.mSize');
        let lSizeBtn = document.querySelector('.lSize');
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


