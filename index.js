import { data } from "./yuwei.js";

let NumberPlace ; // 完整数据
let Number = []; // 填充数据
let Num = [];

/********************************** 对象数据处理 ************************************/

data.data.then(item => {
    NumberPlace = item;
})

function myNumber(){
    return new Promise( (resolve , reject) => {
        setTimeout(() => {
            resolve( data.NumberPlace )    
        } , 0)
    })
}

async function place(){
    return await myNumber();
}
 
place().then( item => {
    for(let i = 0 ; i < 9 ; i ++){
        Num[i] = item.slice(i * 9, (i * 9) + 9);    
        Number[i] = item.slice(i * 9, (i * 9) + 9);
    }

    // 初始化
    init();
} )

/**********************************************************************************/


/********************************  初始化数据 ***************************************/
function init(){
    // simple medium difficult
    cutting("simple")
}

/********************************  截取数据  ****************************************/
/********* 简单空格43【simple】  中等难度49【medium】  高等难度54【difficult】 ***********/
function cutting( name ){
    let emptyNum = name == "simple" ? 43 : name == "medium" ? 49 : 54;
    let arr = []; // 存放随机数
    /**
     * 0 ~ 80 的数据随机抽取 emptyNum 个
     */
    for(let i = 0 ; i < emptyNum ; i ++){
        let randomNumber = getRandom();  //  0 ~ 80
        if(arr.indexOf(randomNumber) != -1){
            // 存在 次数循环不算
            i--;
        } else {
            // 不存在
            arr.push(randomNumber); // 添加进数组 数字形式
            let x = Math.floor( randomNumber / 9 ); // x 轴
            let y = ( randomNumber % 9 ) == 0 ? ( randomNumber % 9 ) : (randomNumber % 9) - 1;
            Number[x][y].num = '';
        }
    }
    arr = arr.sort((a, b) => {
        return a - b;
    } );
    console.log(Number, arr)
}

// 获取随机数 能取到最大和最小值
function getRandom(min = 0 , max = 80) {
    return Math.floor(Math.random() * (max + 1 - min) + min);
}
