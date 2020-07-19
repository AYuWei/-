
function NumberCreate(){
    //1。 初始化数据
    // 可选数字
    let NumberList = [1,2,3,4,5,6,7,8,9];
    // 循环次数
    var Calling = {
        y : 0,
        timer : 0
    } 
    // 尝试次数的阀值 用于判断一行中是否没有可选的数字
    let Maximum = 10;
    //  最终返回的数据
    let NumberPlace = [];

    // 循环数据
    function create(){
        // 循环行 y
        for(let y = 1 ; y <= 9 ; y ++){

            if(Calling.y !== y){
                Calling.y = y,
                Calling.timer = 0
            }

            // 逐格循环列
            for(let x = 1; x <= 9 ; x ++){

                // 获取当前单元格
                let z = Math.ceil(x / 3) + (Math.floor((y - 1) / 3) * 3);

                // 可以数值
                let lenba = [...NumberList];

                // 循环结果值
                NumberPlace.forEach( num => {
                    // 判断是否是当前的x y z，是的话那就取出里面响应的数值。
                    if(num.x === x || num.y === y || num.z === z){
                        let index = lenba.findIndex(number => number === num.num);
                        if(index >= 0){
                             // 取出数值
                            lenba.splice(index, 1);
                        }
                    }
                })

                // 当没有可选数值的时候，返回上一条内容
                if(lenba.length == 0){
                    // 删除本行数据
                    for(let r = 0 ; r < x ; r++){
                        NumberPlace.pop();
                    }

                    //  如果重算次数大于阀值， 删除上一行数据， 重算上一行。
                    if(Calling.timer >= Maximum){
                        for(let i = 0 ; i < 9 ; i ++){
                            NumberPlace.pop();
                        }
                        // 返回上一步
                        return Promise.resolve(y - 1).then(create);
                        // y = y - 1;
                        // return create();
                    }

                    Calling.timer += 1;
                    return Promise.resolve(y).then(create);
                    // return create();
                }

                 // 2.1.2.4 选一个数字
                 const index = Math.floor(Math.random() * lenba.length); 
                 const num = {
                     x,
                     y,
                     z,
                     num : lenba[index]
                 }
                //  console.log(`x[${x}] == y[${y}] == num[${num}]`)
                 NumberPlace.push(num);
            }

        }

        // 2.2 成功后渲染成表格
        let rendery = -1
        let renderx = []

        NumberPlace.map(num => {
          if (num.y - 1 !== rendery) {
            rendery += 1
            renderx.push([])
          }
          renderx[rendery].push(num.num)
        })
        // console.log(renderx)
        //  返回结果
        return renderx;
    }
    let data = create();
    
    return  {
        data,  // 数组的数据
        NumberPlace // 数组的数据对象形式
    };
}


// let a = NumberCreate();
// a.then(item => {
//     console.log(item);
// })

let result = NumberCreate();

export const data = result;