function Person(name, sex){
	this.name = name;
	this.sex = sex;
}

//重定义了person的prototyp对象
Person.prototype = {
	getName : function() {
		return this.name;
	},
	getSex : function() {
		return this.sex;
	},
	toString : function(){
		return "name:" + this.name + " sex:" + this.sex + " age:" + this.age + " hobby:" + this.hobby
	}

}
//扩展了person的prototype对象的属性
Person.prototype.age = 20;

var zhangsan = new Person("zhangsan", "man");
console.log(Person.prototype);
console.log(zhangsan.toString());
zhangsan.age = 22;
console.log(zhangsan.toString());
delete zhangsan.age;
console.log(zhangsan.toString());

var lisi = new Person("lisi");
console.log("name:" + lisi.getName() + " sex:" + lisi.getSex() + " age:" + lisi.age);
lisi.hobby = "pingbeng";
console.log(lisi.hobby);