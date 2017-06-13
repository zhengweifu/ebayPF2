/**
 * [IndexOf description]
 * @param  {[type]} list    [description]
 * @param  {[type]} element [description]
 * @return {[type]}         [description]
 */
export default (list, element) => {
    for (let i = 0; i < list.length; i++) {
        if (list[i] === element) {
            return i;
        }
    }
    return -1;
};