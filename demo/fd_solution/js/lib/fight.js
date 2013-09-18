/**
 * User: caolvchong@gmail.com
 * Date: 5/30/13
 * Time: 2:39 PM
 */
define(function(require, exports, module) {
    var math = require('./math');

    var helper = {
        /**
         * 获取字符串转换出的血量
         * @param str
         */
        getNameNumber: function(str) {
            var i = 0; // 用于循环
            var m = 4; // 最大长度
            var len = str.length;
            if(len < m) {
                for(i = 0; i < m - len; i++) {
                    str += '一';
                }
            } else if(len > m) {
                str = str.slice(0, m);
            }
            var n = math.stringN(str);
            var base = 300;
            return Math.floor(base + (n - base) / 100);
        },
        /**
         * 普通技能伤害
         * @returns {number}
         */
        normal: function() {
            return Math.floor(0.5 * math.random(60, 150));
        },
        /**
         * 必杀技能伤害
         * @returns {number}
         */
        skill: function() {
            return Math.floor(1.25 * math.random(60, 150));
        }
    };

    module.exports = function(attackName, defenceName) {
        var attackBlood = helper.getNameNumber(attackName); // 进攻方血量
        var defenceBlood = helper.getNameNumber(defenceName); // 防守方血量

        var result = {
            attack: {
                name: attackName,
                life: attackBlood,
                blood: attackBlood,
                log: []
            },
            defence: {
                name: defenceName,
                life: defenceBlood,
                blood: defenceBlood,
                log: []
            }
        };

        var n = 1; // 进攻轮数
        var hurt = 0; // 伤害值
        var action = function(type) {
            hurt = helper[type]();
            result.defence.blood -= hurt;
            result.attack.log.push({
                type: type,
                hurt: hurt,
                left: Math.max(0, result.defence.blood) // 对方剩余血量
            });
            if(result.defence.blood > 0) {
                hurt = helper[type]();
                result.attack.blood -= hurt;
                result.defence.log.push({
                    type: type,
                    hurt: hurt,
                    left: Math.max(0, result.attack.blood) // 对方剩余血量
                });
            }
        };

        while(result.attack.blood > 0 && result.defence.blood > 0) {
            action(n % 3 > 0 ? 'normal' : 'skill');
            n++;
        }
        result.result = result.attack.blood > 0 ? true : false;
        return result;
    };
});