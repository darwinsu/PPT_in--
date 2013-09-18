/**
 * User: caolvchong@gmail.com
 * Date: 5/30/13
 * Time: 3:58 PM
 */
define(function(require, exports, module) {
    var $ = require('jquery');
    var fight = require('../../lib/fight');
    var logTpl = require('./tpl/log');

    var helper = {
        bloodView: function(bloodBar, attackName, attackBlood, defenceName, defenceBlood) {
            var attackNameNode = bloodBar.find('.attack-name').eq(0);
            var attackBloodView = bloodBar.find('.attack .progress').eq(0);
            var attackBloodLen = attackBloodView.find('.bar').eq(0);
            var attackBloodNode = bloodBar.find('.attack .blood-len').eq(0);
            var defenceNameNode = bloodBar.find('.defence-name').eq(0);
            var defenceBloodView = bloodBar.find('.defence .progress').eq(0);
            var defenceBloodLen = defenceBloodView.find('.bar').eq(0);
            var defenceBloodNode = bloodBar.find('.defence .blood-len').eq(0);
            attackNameNode.text(attackName);
            attackBloodNode.text(attackBlood);
            attackBloodView.width(attackBlood);
            attackBloodLen.width(attackBlood);
            defenceNameNode.text(defenceName);
            defenceBloodNode.text(defenceBlood);
            defenceBloodView.width(defenceBlood);
            defenceBloodLen.width(defenceBlood);
            bloodBar.show();
        }
    };

    $(function() {
        var attack = $('#attack');
        var defence = $('#defence');
        var fightBtn = $('#fight');
        var bloodBar = $('#bloodBar');
        var box = $('#box');

        fightBtn.click(function() {
            var attackName = $.trim(attack.val());
            var defenceName = $.trim(defence.val());
            var result = fight(attackName, defenceName);
            var attackLog = result.attack.log;
            var defenceLog = result.defence.log;
            var log = [];
            var i;
            var len;
            var item;

            box.clearQueue();

            if(attackName.indexOf('习近平') > -1 || defenceName.indexOf('习近平') > -1) {
                box.html('<div class="fight-result">岂容你造次！</div>');
                box.find('.fight-result').eq(0).show();
                return;
            }

            for(i = 0, len = attackLog.length; i < len; i++) {
                item = attackLog[i];
                log[2 * i] = {
                    attack: true,
                    from: attackName,
                    to: defenceName,
                    type: item.type,
                    hurt: item.hurt,
                    left: item.left
                };
            }
            for(i = 0, len = defenceLog.length; i < len; i++) {
                item = defenceLog[i];
                log[2 * i + 1] = {
                    from: defenceName,
                    to: attackName,
                    type: item.type,
                    hurt: item.hurt,
                    left: item.left
                };
            }

            helper.bloodView(bloodBar, attackName, result.attack.life, defenceName, result.defence.life);
            box.html(logTpl.render({
                result: result,
                log: log
            }));

            var goon = function() {
                box.dequeue('attack');
            };
            var queue = (function() {
                var arr = [];
                var list = $('.attack-item');
                list.each(function(i, n) {
                    arr.push(function() {
                        $(n).delay(2000).fadeIn('slow', function() {
                            var logItem = log[i];
                            bloodBar.find('.' + (i % 2 === 0 ? 'defence' : 'attack') + ' .bar').eq(0).width(logItem.left);
                            if(i === list.length - 1) {
                                box.find('.fight-result').show();
                            } else {
                                goon();
                            }
                        });
                    });
                });
                return arr;
            })();

            box.queue('attack', queue);
            goon();
        });
    });

});