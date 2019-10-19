function fun() {
    var a = 0;
    return function (b) {
        a = a + b;
        return a;
    }
}
var c = fun(2);
var d = c(3);

console.log(c);
console.log(d);