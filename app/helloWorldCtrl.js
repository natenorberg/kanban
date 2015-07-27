class HelloWorldCtrl {

  constructor() {
    this.hello = 'Hello';
    this.world = 'World';
  }

  message() {
    return `${this.hello} ${this.world}`;
  }
}

export { HelloWorldCtrl };
