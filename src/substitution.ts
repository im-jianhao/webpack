class Person {
  public gender: string;
  public name: string;
  constructor() {}
  buy() {}
}
class Man extends Person {
  public gender: string;
  public name: string;
  constructor(gender: string, name: string) {
    super();
    this.gender = gender;
    this.name = name;
  }
  buy() {
    console.log("mac");
  }
}

class Woman extends Person {
  public gender: string;
  public name: string;
  constructor(gender: string, name: string) {
    super();
    this.gender = gender;
    this.name = name;
  }
  buy() {
    console.log("tf");
  }
}

const person = new Person();
const man = new Man("男", "张三");
const woman = new Woman("女", "二妮");
person.buy();
man.buy();
woman.buy();

const zs = {
  merry(p: Woman) {
    console.log(`zs和${p.name}结婚`);
  },
};

zs.merry(person);
