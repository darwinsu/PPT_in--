/**
 * User: caolvchong@gmail.com
 * Date: 5/30/13
 * Time: 3:43 PM
 */
define(function(require, exports, module) {
    module.exports = {
        /**
         * 产生[min, max]的随机整数
         * @param max
         * @param min
         * @returns {number}
         */
        random: function(min, max) {
            return Math.ceil(Math.random() * (max - min) + min);
        },
        /**
         * 获取一个字符串的数值
         * @param str
         * @returns {number}
         */
        stringN: function(str) {
            var n = 0;
            var temp = encodeURIComponent(str).split('%');
            for(var i = 1, len = temp.length; i < len; i++) {
                var m = temp[i];
                var p = m[0];
                var q = m[1];
                p = isNaN(+p) ? p.charCodeAt(0) : p;
                q = isNaN(+q) ? q.charCodeAt(0) : q;
                n += (p === 0 || q === 0) ? p + q : p * q;
            }
            return n;
        }
    };
});