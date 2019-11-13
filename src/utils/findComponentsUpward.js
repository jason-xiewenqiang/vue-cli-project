
// 由一个组件，向上找到所有的指定组件
function findComponentsUpward (context, componentName) {
    let parents = []
    let parent = context.$parent
    if (parent) {
        if (parent.$options.name === componentName) parents.push(parent)
        return parents.concat(findComponentsUpward(parent, componentName))
    } else {
        return []
    }
}
export {findComponentsUpward}