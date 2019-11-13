
// 由一个组件，向下找到最近的指定组件
function findComponentDownward (context, componentName) {
    let childs = context.$children
    let children = null
    if (childs.length) {
        for (const child of childs) {
            const name = child.$options.name
            if (name === componentName) {
                children = child
                break
            } else {
                children = findComponentDownward(child, componentName)
                if (children) break
            }
        }
    }
    return children
}
export { findComponentDownward }