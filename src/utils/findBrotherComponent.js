
// 找到指定的兄弟组件
// 第三个参数 排除自身
function findBrotherComponent (context, componentName, exceptMe = true) {
    let res = context.$parent.$children.filter(item => {
        return item.$options.name === componentName
    })
    let index = res.findIndex(item => item._uid === context._uid)
    if (exceptMe) {
        res.splice(index, 1)
    }
    return res
}
export { findBrotherComponent }