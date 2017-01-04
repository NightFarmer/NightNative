
//测试模块
test()//带有提升效果，导入声明会默认提升到文件顶部
import { hehe, test, abc as bbb } from './testImport'
hehe()
import * as testall from './testImport'
testall.hehe()
import defaultTest from './testImport'
defaultTest()
import ttt, { test as yo } from './testImport'//同时导入默认导出和其他导出并指定别名

// //普通测试
import testNormal from './testNormal'
testNormal()

export default a = 1