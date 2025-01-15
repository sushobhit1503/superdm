export const keyHandleDisable = () => {
    const element = document.activeElement
    if (element.tagName === 'INPUT' || element.tagName === 'TEXTAREA') {
        return true
    }
    return false
}