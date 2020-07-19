import { data } from "./yuwei.js";


let NumberPlace ; // 完整数据
let Number = []; // 填充数据
let Num = [];
let NumberArr = []; // 存放点击的元素
let EmptyArr = []; // 存放点击空格的元素
let ElementArr = []; // 存放排列后的span
let ElementStyle = []; // 存放点击 空格的下标
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
    cutting("simple");
    // 数据渲染
     createElement();
    //  数据填充ElementArr
    addElement();
    //  添加点击事件
    changeClick();
}

/******************************  数据填充element 排序 ******************************/
function addElement(){
    let _span = document.getElementsByClassName("span");
    let arr = [];
    let resulet = [];
    for(let i = 0 ; i < _span.length ; i++){
        arr.push({
            index : _span[i].getAttribute("data"),
            span : _span[i]
        });
    }
    arr.sort( ( a  , b ) => {
        return a.index - b.index;
    } ) ;
    ElementArr = arr;
}
/*******************************************************************************/

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
            let y = ( randomNumber % 10 ) == 0 ? ( randomNumber % 10 ) : (randomNumber % 10) - 1;
            Number[x][y].num = '';
        }
    }
    arr = arr.sort((a, b) => {
        return a - b;
    } );

}

// 获取随机数 能取到最大和最小值
function getRandom(min = 0 , max = 80) {
    return Math.floor(Math.random() * (max + 1 - min) + min);
}
/************************************************************************************/

/***********************************  创建数据  ***************************************/

// 数据渲染
function createElement(){

    // 父级
    let wrapper = document.getElementsByClassName("wrapper")[0];

    let arr1 = Number.slice(0 , 3);
    let arr2 = Number.slice(3 , 6);
    let arr3 = Number.slice(6 , 9);
    for(let i = 0 ; i < Number.length ; i ++){
        let itemDiv = createDiv("item");
        let start = Math.ceil( (i + 1) / 3 );

        if(start == 1){
            arr1.forEach(data => {
                data.forEach(item => {
                    if(item.z == (i+1)){
                      addSpan(itemDiv, item)
                    }
                })
            })
        }
        else if(start == 2){
            arr2.forEach(data => {
                data.forEach(item => {
                    if(item.z == (i+1)){
                        addSpan(itemDiv, item)
                    }
                })
            })
        } 
        else if(start == 3){
            arr3.forEach(data => {
                data.forEach(item => {
                    if(item.z == (i+1)){
                      addSpan(itemDiv, item)
                    }
                })
            })
        }
        wrapper.appendChild(itemDiv)
    }
}
// 添加span
function addSpan(wrapper, item){
    let span = createDiv("span", item.num);
    let index = ( item.y - 1 ) * 9 + item.x; // 下标
    span.setAttribute('data', index);
    wrapper.appendChild(span);
    return wrapper;
}

// 创建div
function createDiv(myClass,centent = ''){
    let div = document.createElement("div");
    div.classList.add(myClass);
    div.innerText = centent;
    return div;
}

/************************************************************************************/

/********************************   添加点击事件  ************************************/

function changeClick(){
    let wrapper = document.getElementsByClassName("wrapper")[0];
    document.addEventListener("click", function(e){
        let event = e || window.event; //  兼容性处理
        let myTarget = e.target;  // 获取目标元素
        // 清楚NumberArr中的样式
        NumberArr.forEach(item => {
            item.style.background = "white"
        })
       
        ElementStyle.forEach( item => {
            item.style.background = "white";
        });


        // 判断是否点击时当前的单元格
        if( myTarget.classList[0] == "span" ){
           let isEmpty = empty(myTarget); // 判断单元格是否为空
            /*
             * 为空：
             *    - 此单元格 【判断z】是否相同，相同的改变颜色
             *    - 此单元格的行 【判断y】是否相同，相同的改变颜色
             *    - 此单元格的列 【判断x】是否相同，相同的改变颜色
             * 
             * 不为空：
             *    - 找到相同的数字 【num】改变单个单元格的格式
             * 
             * 改变颜色后元素都需要给个属性存放着，后面移除的时候回复原状。
             */    

             isEmpty ? isEmptyEvent( myTarget ) : noEmptyEvent( myTarget);
        }

    }, false);
} 

/**
 * 点击了空单元格
 */
function isEmptyEvent( target){
    let resultNumber = target.getAttribute("data") ; // 获取 的自定义属性数字
    let col = Math.ceil(resultNumber / 9); // 判断第几行
    let row = resultNumber - ( (col - 1) * 9 ) ;
    let data = Number[col - 1][row - 1]; // 应为我的数字是 1 开始的 计算后需要减一

    let _x = data.x;
    let _y = data.y;
    let _z =data.z ;

    // 改变查找的数据
    changeFindData(_x, _y , _z );
}

/**
 *  点击了数字单元格
 * 
 *  找到相同的数字 【num】改变单个单元格的格式
 */
function noEmptyEvent( target){
   
    let resultText = target.innerText.toString() ; // 获取点击的数值 

    let childArr = document.getElementsByClassName('item'); // 获取span

    for(let i = 0 ; i < childArr.length ; i ++){
       let childSpan = childArr[i].getElementsByClassName("span"); // 获取span
       for(let j = 0 ; j < childSpan.length ; j ++){
          let text = childSpan[j].innerText.toString();
          if(text == resultText){
              NumberArr.push(childSpan[j]); // 添加数组钟
              childSpan[j].style.background = "red";
          }
       }
    }
    return NumberArr;
}

/**
 * 查找点击的空白，查找并改变
 */
function changeFindData(x , y , z){
    // 查找数据
    findData({ z : z , x : x , y : y});
}

function findData(data){
    EmptyArr = [];
    // 填充的数据Number
    // 存放选取的数据EmptyArr [ {x: 1, y: 1, z: 1, num: ""}, {x: 1, y: 1, z: 1, num: ""}]
    Number.forEach(item => {
        // 判断z 是否相同
        item.forEach( centent => {
            if(centent.z == data.z || centent.y == data.y || centent.x == data.x){
                EmptyArr.push(centent);
            }
        })
    })
    // 获取每个元素的位置 ( ( y - 1 ) * 9 ) + x
    EmptyArr.forEach( item =>{
        let x = item.x ;
        let y = item.y ;
        let index = ( ( y - 1 ) * 9 ) + x ;
        ElementStyle.push(ElementArr[index - 1].span);
        ElementArr[index - 1].span.style.background = "pink"
    } );

}

/**
 * 判断点击事件钟点击的是否为空的单元格
 */
function empty(item){
   return item.innerText == '' ;
}

/************************************************************************************/

