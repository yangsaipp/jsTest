//参考网址：http://www.w3school.com.cn/js/pro_js_inheritance_implementing.asp
//继承的实现方式
//3.原型链（prototype chaining）缺点:1.不支持多重继承 2.父类中变量无法赋值，下例中objB的值就是undefined
//4.混合类型 解决了父类变量无法复制问题，但是感觉还不够好，
//   a.用firefox中看到objC对象中的_prototype_里面有color=undefined这样的垃圾信息
//   b.不能像java那样调用父类的方法和属性?有必要么？
function ClassA() {
}

function ClassA(sColor) {
    this.color = sColor;
    this.sayColor = function () {
    	console.log(this.color);
    };
}

ClassA.prototype.sayHi = function() {
	console.log("hi");
};

function ClassB(sColor, sName) {
	ClassA.call(this, sColor);	//加上这句就是混合类型继承方式
    this.name = sName;
    this.sayName = function () {
    	console.log(this.name);
    };
}
ClassB.prototype = new ClassA();
ClassB.prototype.constructor = ClassB;

ClassB.prototype.sayHollow = function() {
	console.log("hollow");
};

function ClassC(sColor, sName, sSize) {
	ClassB.call(this,sColor, sName);
	this.sSize = sSize;
}

ClassC.prototype = new ClassB();
ClassC.prototype.constructor = ClassC;

var objA = new ClassA("blue");
var objB = new ClassB("red", "John");
var objC = new ClassC("yellow", "tom", 22);

objA.sayColor();	//输出 "blue"

objB.sayColor();	//输出 "undefined"; 加上ClassA.call(this, sColor)输出red
objB.sayName();		//输出 "John"
objB.sayHi();		//输出 "hi"

objC.sayColor();	//输出 "undefined"; 加上ClassA.call(this, sColor)输出red
objC.sayName();		//输出 "John"
objC.sayHi();		//输出 "hi"
objC.sayHollow();	//运行出错没有此方法

console.log(objB.constructor);
console.log(ClassB.prototype);

console.log(objC.constructor);
console.log(ClassC.prototype);

console.log(objB instanceof ClassA);	//输出 "true"
console.log(objB instanceof ClassB);	//输出 "true"

console.log(objC instanceof ClassA);	//输出 "true"
console.log(objC instanceof ClassB);	//输出 "true"
console.log(objC instanceof ClassC);	//输出 "true"
