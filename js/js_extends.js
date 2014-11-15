//参考网址：http://www.w3school.com.cn/js/pro_js_inheritance_implementing.asp
//继承的实现方式

//1.对象冒充 2.call() 方法 3.apply()方法 三者实现方式都一样，只是调用不同方法
//缺点：无法继承ClassA.prototype定义的方法，不是真真意义上的继承
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
	//对象冒充继承
    // this.newMethod = ClassA;
    // this.newMethod(sColor);
    // delete this.newMethod;

    //call方法继承
    // ClassA.call(this, sColor);	//调用call方法 

    //apply方法继承
    ClassA.apply(this, arguments);//调用apply方法

    this.name = sName;
    this.sayName = function () {
    	console.log(this.name);
    };
}


var objA = new ClassA("blue");
var objB = new ClassB("red", "John");
objA.sayColor();	//输出 "blue"
objB.sayColor();	//输出 "red"
objB.sayName();		//输出 "John"
console.log(objB.constructor);
console.log(ClassB.prototype);
objB.sayHi();		//报错