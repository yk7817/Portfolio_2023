////////////////////////////// main visual background start ////////////////////////
window.onload = function () {
    let ua = navigator.userAgent;
    function canvasPosUpdate() {
        // canvas find
        const canvasMv = document.getElementById('mv_canvas');
        // Context setting
        const ctxMv = canvasMv.getContext('2d');
        // width height setting
        var widthMv = canvasMv.width = window.innerWidth;
        var heightMv = canvasMv.height = window.innerHeight;
        // start Rect setting
        ctxMv.fillStyle = 'rgb(0, 0, 0)';
        ctxMv.fillRect(0, 0, widthMv, heightMv);
        // canvasMv font size
        let fontSizeMv = 16;
        // empty array
        let arrayRightMv = [];
        // width num push
        for ( let i = 0; i < heightMv; i ++ ) {
            arrayRightMv[i] = 0;
        }
        ////////////////// main visual right animation function ///////////////////
        function horizonRightRain() {
            // background color repeat
            ctxMv.beginPath();
            ctxMv.fillStyle = 'rgba(24, 24, 24, 0.1)';
            ctxMv.fillRect(0, 0, widthMv, heightMv);
            // random text
            let text = 'abcdefghijklmnopqrstuvwxyzABCDEFGHIJKLMNOPQRSTUVWXYZ012345678910ｱｲｳｴｵｶｷｸｹｺｻｼｽｾｿﾀﾁﾂﾃﾄﾅﾆﾇﾈﾉﾊﾋﾌﾍﾎﾏﾐﾑﾒﾓﾔﾕﾖﾗﾘﾙﾚﾛﾜｦﾝ';
                text = text.split('');
            let random = Math.floor(Math.random() * text.length);
                text = text[random];
            // right animation
            for ( let i = 0; i < arrayRightMv.length; i ++ ) {
                ctxMv.fillStyle = 'rgb(11, 80, 219)';
                ctxMv.font = fontSizeMv + 'px monospace';
                ctxMv.fillText(text, arrayRightMv[i], i * fontSizeMv);
                if ( arrayRightMv[i] > widthMv/3 + Math.random() * widthMv ) {
                    arrayRightMv[i] = 0; 
                }
                arrayRightMv[i] += 16 ;
            };
        };
        setInterval(horizonRightRain, 30);
        ////////////////// main visual right animation function ///////////////////
        ////////////////// mai visual left animation function ///////////////////
        let arrayLeftMv = [];
        // width num push
        for( let i = 0; i < heightMv; i ++ ) {
            arrayLeftMv[i] = widthMv;
        }
        // main visual left animation function
        function horizonLeftRain() {
            // background color repeat
            ctxMv.beginPath();
            ctxMv.fillStyle = 'rgb(0, 0, 0, 0.1)';
            ctxMv.fillRect(0, 0, widthMv, heightMv);
            // random text
            let text = 'abcdefghijklmnopqrstuvwxyzABCDEFGHIJKLMNOPQRSTUVWXYZ012345678910ｱｲｳｴｵｶｷｸｹｺｻｼｽｾｿﾀﾁﾂﾃﾄﾅﾆﾇﾈﾉﾊﾋﾌﾍﾎﾏﾐﾑﾒﾓﾔﾕﾖﾗﾘﾙﾚﾛﾜｦﾝ';
                text = text.split('');
            let random = Math.floor(Math.random() * text.length);
                text = text[random];
            // left animation
            for( let i = 0; i < arrayLeftMv.length; i ++ ) {
                ctxMv.fillStyle = 'rgb(11, 80, 219)';
                ctxMv.font = fontSizeMv + 'px monospace';
                ctxMv.fillText( text, arrayLeftMv[i], i * fontSizeMv );
                if ( arrayLeftMv[i] < widthMv / 1.5 - Math.random() * 600) {
                    arrayLeftMv[i] = widthMv;
                }
                arrayLeftMv[i] -= 16;
            }
        }
        // left horizon animation
        setInterval(horizonLeftRain, 30);
        ////////////////// main visual left animation function ///////////////////
        window.addEventListener('resize', ()=> {
            if( ua.indexOf('iPhone') > 0 || ua.indexOf('Android') > 0 && ua.indexOf('Mobile') > 0 ) {
                return false;
            }
            location.reload();
        })
    };
    canvasPosUpdate();
    if( ua.indexOf('iPhone') > 0 || ua.indexOf('Android') > 0 && ua.indexOf('Mobile') > 0 ) {
        return false;
    }
    window.onresize = canvasPosUpdate;
};

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