/*
*
*
*　Main Visual
*
*/
function blueMatrixRain() {
    var canvas = document.getElementById('mv_canvas'),
    width = canvas.width = window.innerWidth,
    height = canvas.height = window.innerHeight,
    context = canvas.getContext('2d');
    num = width / 2,
    matrixArray = [];
    randomText = 'abcdefghijklmnopqrstuvwxyzABCDEFGHIJKLMNOPQRSTUVWXYZ'.split('');
    
    class Matrix {
        constructor(x, y, font, size, speed, color) {
            this.x = x;
            this.y = y;
            this.font = font;
            this.size = size;
            this.speed = speed;
            this.color = color;
        }
        render() {
            // フォントを生成
            context.beginPath();
            context.fillStyle= this.color;
            context.font= this.size + 'px', 'monospace';
            context.fillText(this.font, this.x, this.y);
        }
        update() {
            // yをspeed分プラス
            this.y += this.speed;
            // yがheight分＋height数の半分からなるランダムな数に到達したらyを最初に配置
            if( this.y > height + Math.random() * height/2 ) {
                this.y = 0;
            }
            this.render();
            // context.beginPath();
            // context.fillStyle= this.color;
            // context.font= this.size + 'px', 'monospace';
            // context.fillText(this.font, this.x, this.y);
        }
    }

    init();
    loop();

    // num数分インスタンスを生成
    function init() {
        for( let i = 0; i < num; i ++ ) {
            // filltextのx軸の開始位置
            x = Math.floor(Math.random() * width);
            // filltextのy軸の開始位置
            y = 0;
            // アニメーションの文字を定義
            random = Math.floor( Math.random() * randomText.length);
            font = randomText[random]
            // fontsizeを定義
            size = Math.floor(Math.random() * (16 - 6) + 6);
            // y軸に進むスピードを定義 文字サイズ分進むように
            speed = size * 1.1;
            // font color 設定
            color = 'rgb(43,' + Math.floor(Math.random() * 140) + ', 250)';
            // 上記の設定でMatrixのインスタンスを生成
            matrix = new Matrix(x ,y, font, size, speed, color);
            // 生成したmatrixTextを配列にプッシュ
            matrixArray.push(matrix);
        }
    }

    function loop() {
        // 背景設定、黒を被せ続ける
        context.beginPath();
        context.fillStyle='rgba(12, 12, 12, 0.1)';
        context.fillRect(0, 0, width, height);
        context.fill();
        for( let i = 0; i < matrixArray.length; i ++ ) {
            // initで生成して配列にプッシュしたオブジェクト1つ1つにupdateメソッドを設定
            matrixArray[i].update();
        }
        // この関数をループ
        requestAnimationFrame(loop);
    }
}

window.onload = blueMatrixRain;
let ua = navigator.userAgent;
window.addEventListener('resize', ()=> {
    if ((ua.indexOf('iPhone') > 0 || ua.indexOf('Android') > 0) && ua.indexOf('Mobile') > 0) {
    return false
}
    window.location.reload();
})

////////////////////////////// main visual background end ////////////////////////

////////////////////////////// title animation start ////////////////////////////

// ランダムテキスト
let r = '!#$%&=~¥@*?<>_';
let r2 = 'abcdefghijklmnopqrstuvwxyzABCDEFGHIJKLMNOPQRSTUVWXYZ';
// main visual setInterVal カウント
let c1 = 0;
let c2 = 0;
// emptyArray
let emptyArray = [];
// ttl
const ttls = Array.from(document.getElementsByClassName('js-text-ctrl'));

const splitTtls = ttls.map((v) => {
    // 正しいタイトル
    let ttl = v.innerText.split('');
    // 取得クラス名のテキストを削除
    v.innerText = '';
    // main visualを取得
    const mv = v.getAttribute('data-mv');
    if( mv ) {
        emptyArray.push(ttl);
        for( let i in ttl ) {
        // random setting
        let random = Math.floor(Math.random() * r.length);
        v.insertAdjacentHTML("beforeend", '<span>' + r[random] + '</span>')
        };
        v.classList.add('is-grid');
        v.setAttribute('title', v.innerText);
    }else{
        // 各セクション イベント
        for( let i in ttl) {
            let random = Math.floor(Math.random() * r.length);
            v.insertAdjacentHTML("afterbegin", '<span>' + r[random] + '</span>');
            v.classList.add('is-grid');
            v.setAttribute('title', v.innerText);
        };
        let flag = false;
        let count = 0;
        window.addEventListener('scroll', () => {
            let height = window.innerHeight;
            let ttlHeight = v.getBoundingClientRect().bottom + 200;
            if( ttlHeight < height && flag != true ) {
                flag = true;
                let fakeTtl = v.querySelectorAll('span');
                const ttlRandomText = setInterval(()=> {
                    if( fakeTtl[count].innerText == ttl[count] ) {
                        count ++ ;
                        v.setAttribute('title', v.innerText);
                        if( ttl[count] == undefined ) {
                            clearInterval(ttlRandomText);
                            count = 0;
                        }
                    }
                    else if ( ttl[count] == " " ) {
                        fakeTtl[count].innerText = " ";
                    }
                    else if ( fakeTtl[count].innerText != ttl[count] ) {
                        let random = Math.floor(Math.random() * r2.length);
                        fakeTtl[count].innerText = r2[random];
                    }
                });
            }
        });
    }
});
// main visual strings Array
let mvTtlArray = emptyArray;

// メインビジュアル時限発火アニメーション start
setTimeout(()=> {
    const mvRandomText = setInterval(()=> {
        if( ttls[c1].querySelectorAll('span')[c2].innerText == mvTtlArray[c1][c2] ) {
            c2 ++ ;
            ttls[c1].setAttribute('title', ttls[c1].innerText)
            if( ttls[c1].querySelectorAll('span')[c2] == undefined ) {
                c1 ++ ;
                c2 = 0;
                if( mvTtlArray[c1] == undefined ) {
                    // メインビジュアルのArrayが更新されなくなったらストップ
                    clearInterval(mvRandomText)
                }
            }
        }
        else if( mvTtlArray[c1][c2] == " " ) {
            ttls[c1].querySelectorAll('span')[c2].innerText = " ";
            // c2 ++ ;
        }
        else if( ttls[c1].querySelectorAll('span')[c2].innerText != mvTtlArray[c1][c2] ) {
            let random = Math.floor(Math.random() * r2.length);
            ttls[c1].querySelectorAll('span')[c2].innerText = r2[random];
        }
    }, 10)
}, 2000);
// メインビジュアル時限発火アニメーション end



////////////////////////////// json data control start ////////////////////////////

// card box
let workInsertBox = document.getElementById('js-insert-box')
let card = document.createElement('div');

fetch('./data.json')
.then(response => response.json())
.then(dataArray => {
    dataArray.map((data) => {
        workInsertBox.insertAdjacentHTML("afterbegin",
        // card wrap
        '<div class="work_card">'+
        // card left side
        '<div class="work_info_text">'+
        '<dl><dt>' + data.ttl + '</dt><dd>' + data.charge + '</dd></dl>'+
        '</div>'+
        // card right side
        '<div class="work_link"><a href="' + data.url + '" target=_blank class="a"><img src="' + data.src + '"></a></div>'+
        // card wrap end
        '</div>'
        );
    });
});

////////////////////////////// json data control end ////////////////////////////

////////////////////////////// mouse stalker start ////////////////////////////

const mouseStalker = document.getElementById('mouse_stalker');

window.addEventListener('mousemove', (e)=> {
    setTimeout( () => {
        m_X = e.clientX - 10;
        m_Y = e.clientY - 10;
        mouseStalker.style.top = m_Y + 'px';
        mouseStalker.style.left = m_X + 'px';
    }, 50);
});

document.addEventListener('mouseover', (e) => {
    if (e.target.tagName === "A" || e.target.tagName === 'IMG') {
        mouseStalker.style.transform = 'scale(2)';
    }else {
        mouseStalker.style.transform = 'scale(1)';
    }
});
////////////////////////////// mouse stalker end ////////////////////////////

////////////////////////////// return top end ////////////////////////////

const returnTopBtn = document.getElementById('return_top');
const topPosition = document.pageYOffset

returnTopBtn.addEventListener('click', (e) => {
    window.scroll({
        top: 0,
        behavior: 'smooth'
    });
});

////////////////////////////// return top end ////////////////////////////

////////////////////////////// work title fixed start ////////////////////////////

workFixed();
function workFixed() {
    let workTtl = document.querySelector('.work_ttl');
    window.addEventListener('scroll', (e) => {
        let fixedHeight = document.querySelector('.profile').getBoundingClientRect().bottom;
        if( fixedHeight < 0 ) {
            workTtl.classList.add('is-fixed');
        }else {
            workTtl.classList.remove('is-fixed');
        }
    });
}

////////////////////////////// work title fixed end ////////////////////////////