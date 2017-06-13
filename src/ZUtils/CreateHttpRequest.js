/**
 * 创建XMLHttpRequest (兼容ie 6、7)
 * @returns {*}
 */
export default () => {
    var request;
    if (window.XMLHttpRequest) {// code for all new browsers

        request = new XMLHttpRequest();

    } else if (window.ActiveXObject) {// code for IE5 and IE6

        request = new ActiveXObject('Microsoft.XMLHTTP');

        try {
            request = new ActiveXObject('Msxml2.XMLHTTP');

        } catch (e) {

            try {

                request = new ActiveXObject('Microsoft.XMLHTTP');

            } catch (e) {}
        }
    }

    return request;
};