export default function test() {
    // ES5只有两种声明变量的方法：var命令和function命令。
    // ES6除了添加let和const命令，后面章节还会提到，另外两种声明变量的方法：import命令和class命令。 所以，ES6一共有6种声明变量的方法。
    // 常量
    const aaaa = 444
    const foo = Object.freeze({ b: 123 });
    foo.b = 333 //此行不生效 只读,

    // 函数表达式
    {
        let a = 'secret';
        let f = function () {
            return a;
        };
    }

    //多级嵌套代码块儿
    {
        {
            {
                {
                    let insane = 'Hello World';
                    {
                        let insane = 'Hello World'
                    }
                }
            }
        }
    };

    //默认参数，注意先后顺序
    {
        let bar = function (x = 2, y = x) {
            return [x, y];
        };
        bar(); // [2, 2]
    }

    {
        // var [a, b, c] = [1, 2, 3];
        let [a, b, c] = [1, 2, 3]; //相当于abc分别赋值123
    }

    {
        let [foo, [[bar], baz]] = [1, [[2], 3]];
        foo // 1
        bar // 2
        baz // 3
        // console.info(foo, bar, baz)
    }

    // {
    //     const [a, b, c, d] = "Hello"//这个在Android的release版本会异常
    // }

    {
        let [x, y] = [1, 2]
        [x, y] = [y, x]
    }
    {
        let map = new Map();
        map.set("first", "Hello");
        map.set("second", "World");
        for (let [key, value] of map) {
            //循环map
            // console.info(key, value)
        }

    }
}