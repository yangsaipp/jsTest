 // 当前是否处于创建类的阶段

 var initializing = false;

 function jClass(baseClass, prop) {

 	// 只接受一个参数的情况 - jClass(prop)

 	if (typeof(baseClass) === "object") {

 		prop = baseClass;

 		baseClass = null;

 	}
 	
 	// 本次调用所创建的类（构造函数）

 	function F() {

 		// 如果当前处于实例化类的阶段，则调用init原型函数

 		if (!initializing) {
 			if(baseClass) {
 				this.base = baseClass.prototype;
 			}
 			this.init.apply(this, arguments);

 		}

 	}

 	// 如果此类需要从其它类扩展

 	if (baseClass) {

 		initializing = true;

 		F.prototype = new baseClass();

 		F.prototype.constructor = F;

 		initializing = false;

 	}

 	// 覆盖父类的同名函数

 	for (var name in prop) {

 		if (prop.hasOwnProperty(name)) {

 			F.prototype[name] = prop[name];

 		}

 	}

 	return F;

 };

 // 使用jClass函数来创建类和继承类的方法：

 var Person = jClass({

 	init: function(name) {

 		this.name = name;

 	},

 	getName: function() {

 		return this.name;

 	}

 });

 console.log(Person.constructor);

 var Employee = jClass(Person, {

 	init: function(name, employeeID) {

 		// 调用父类的原型函数init，注意使用apply函数修改init的this指向

 		this.base.init.apply(this, [name]);
 		this.name = name;
 		this.employeeID = employeeID;

 	},

 	getEmployeeID: function() {

 		return this.employeeID;

 	},

 	getName: function() {

 		// 调用父类的原型函数getName

 		return "Employee name: " + name;

 	}

 });

 var Employee2 = jClass(Employee, {

 	init2: function(name, employeeID) {

 		this.name = name;

 		this.employeeID = employeeID;

 	},

 	getEmployeeID2: function() {

 		return this.employeeID;

 	}

 });

 console.log(Employee.constructor);

 var zhang = new Employee("ZhangSan", "1234");

 console.log(zhang.getName()); // "ZhangSan"
 console.log(zhang.constructor); // "ZhangSan"

 var zhang2 = new Employee2("ZhangSan", "1234");
 console.log(zhang2.getName()); // "ZhangSan"
 console.log(zhang2.constructor); // "ZhangSan"