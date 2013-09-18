/**
 * User: caolvchong@gmail.com
 * Date: 4/10/13
 * Time: 3:21 PM
 */

seajs.use(['../../../js/lib/math'], function(math) {

    test('random', function() {
        var n = math.random(1, 100);
        ok(n <= 100);
        ok(n >= 1);
    });

    test('stringN', function() {
        var str1 = '张三'; // "E5", "BC", "A0", "E4", "B8", "89" -> 5643
        var str2 = '王大宝'; // "E7", "8E", "8B", "E5", "A4", "A7", "E5", "AE", "9D" -> 8065
        var n1 = math.stringN(str1);
        var n2 = math.stringN(str2);
        equal(n1, 5643);
        equal(n2, 8065);
    });
});