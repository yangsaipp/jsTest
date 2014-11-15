//参考网址：http://www.w3school.com.cn/js/pro_js_object_defining.asp
//混合的构造函数/原型方式 好像比较流行
function Car(sColor,iDoors,iMpg) {
  this.color = sColor;
  this.doors = iDoors;
  this.mpg = iMpg;
  //注意这种存放指针变量地址（比如对象、数组）的一定要放到构造方法里面使用this赋值，使用prototype的话会导致该类实例化后的对象共享属性
  this.drivers = new Array("Mike","John");	
}
//建议方法是用prototype进行设置
Car.prototype.showColor = function() {
  alert(this.color);
};

var oCar1 = new Car("red",4,23);
var oCar2 = new Car("blue",3,25);

oCar1.drivers.push("Bill");

alert(oCar1.drivers);	//输出 "Mike,John,Bill"
alert(oCar2.drivers);	//输出 "Mike,John

//动态原型方法 这种更接近oop 比如java 个人比较喜欢
function Car(sColor,iDoors,iMpg) {
  this.color = sColor;
  this.doors = iDoors;
  this.mpg = iMpg;
  this.drivers = new Array("Mike","John");
  
  if (typeof Car._initialized == "undefined") {
    Car.prototype.showColor = function() {
      alert(this.color);
    };
	
    Car._initialized = true;
  }
}