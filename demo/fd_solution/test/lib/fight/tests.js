/**
 * User: caolvchong@gmail.com
 * Date: 4/10/13
 * Time: 3:21 PM
 */

seajs.use(['../../../js/lib/fight'], function(fight) {

    test('fight', function() {
        var attack = '张三';
        var defence = '王大宝';
        var result = fight(attack, defence);
        ok(result.attack.name, attack);
        ok(result.defence.name, defence);
        ok(result.attack.blood > 0 ? result.result : !result.result);
    });
});