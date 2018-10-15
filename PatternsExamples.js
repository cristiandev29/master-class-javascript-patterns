/************
* Singleton *
*************/

//Example1 Objects
var object1 = {
    name: "Object1"
};

var object2 = {
    name: "Object2"
};

console.log(object1 === object2);
console.log(object1 == object2);

//Example2 Cache

var ExampleClassA = function(){

    if(typeof ExampleClassA.instance === "object"){
        return ExampleClassA.instance;
    }

    this.name = "Example Singleton";
    this.getName = function(){
        console.log(this.name);
    }

    ExampleClassA.instance = this;

};

//Example3 Closure

var ExampleClassB = function(){

    var instance = this;

    this.name = "Example Singleton";
    this.getName = function(){
        console.log(this.name);
    }

    ExampleClassB = function(){
        return instance;
    }

};


/*********
* Facade *
**********/

var SendMailServer = function(body){
    this.body = body;


    this.setTemplate = function(template){
        this.template = template;
    }

    this.setHeader = function(header){
        this.header = header;
    }

    this.setIsHtml5 = function(isHtml5){
        this.isHtml5 = isHtml5;
    }
    this.send = function(){
        var html5;

        this.isHtml5 ? html5 = "with Html5" : html5 = "Send mail without Html5";
        console.log("Send mail" + this.body + " with template " + this.template + " con encabezado " + this.header + ' ' + html5);
    }
}

var SendClientWithoutFacade = function(){
    var shipment1, shipment2, shipment3, shipment4;

    shipment1 = new SendMailServer("Hello 1");
    shipment1.setHeader("Header 1");
    shipment1.setIsHtml5(true);
    shipment1.setTemplate("Template 1");
    shipment1.send();

    shipment2 = new SendMailServer("Hello 2");
    shipment2.setHeader("Header 1");
    shipment2.setIsHtml5(true);
    shipment2.setTemplate("Template 1");
    shipment2.send();

    shipment3 = new SendMailServer("Hello 3");
    shipment3.setHeader("Header 1");
    shipment3.setIsHtml5(true);
    shipment3.setTemplate("Template 1");
    shipment3.send();

    shipment4 = new SendMailServer("Hello 4");
    shipment4.setHeader("Header 2");
    shipment4.setIsHtml5(false);
    shipment4.setTemplate("Template 2");
    shipment4.send();
}

var SendFacade1 = function(body){
    shipmentType1 = new SendMailServer(body);

    shipmentType1.setHeader("Header 1");
    shipmentType1.setIsHtml5(true);
    shipmentType1.setTemplate("Template 1");

    this.send = function(){
        shipmentType1.send();
    }

}

var SendClientWithFacade = function(){

    shipment1 = new SendFacade1("Hello 1");
    shipment1.send();
    shipment2 = new SendFacade1("Hello 2");
    shipment2.send();
    shipment3 = new SendFacade1("Hello 3");
    shipment3.send();

    shipment4 = new SendMailServer("Hello 4");
    shipment4.setHeader("Header 2");
    shipment4.setIsHtml5(false);
    shipment4.setTemplate("Template 2");
    shipment4.send();
}


/**********
* Factory *
***********/

var FundType1 = function(amount){
    this.fundName = "Type 1";
    this.amount = amount;
    this.getProfitability = function(){
        console.log(this.fundName + ' with profitability -> ', 3 * this.amount);
    }
}

var FundType2 = function(amount){
    this.fundName = "Type 2";
    this.amount = amount;
    this.getProfitability = function(){
        console.log(this.fundName + ' with profitability -> ', 7 * this.amount);
    }
}

var FundFactory = function(type, amount){
    var TYPE1 = 1, TYPE2 = 2;
    switch(type){
        case TYPE1:
            return new FundType1(amount);
        break;
        case TYPE2:
            return new FundType2(amount);
        break;
        default:
            return null;
    }
}


var TestFactory = function(userChoice){
    var fund;

    fund = new FundFactory(userChoice, 1000);
    fund.getProfitability();
}

/***********
* Iterator *
************/

var AggregateObject = function(){
    this.collection = [1,2,3,4,5];
    this.index = 0;
    this.length = this.collection.length;

    this.hasNext = function(){
        return this.index < this.length;
    }
    this.next = function(){
        var element;
        if (this.hasNext()) {
            element = this.collection[this.index];
            this.index += 1;
            return element;
        }else{
            return null;
        }

    }

}

var TestIterator1 = function(){
    var element, aggregateObj = new AggregateObject();

    while(element = aggregateObj.next()){
        console.log(element);
    }
}

var TestIterator2 = function(){
    var element, aggregateObj = new AggregateObject();

    while(aggregateObj.hasNext()){
        console.log(element.next());
    }
}


/***********
* Decorator *
************/

var Broker = function(totalAmount){
    this.totalAmount = totalAmount;
    this.decoratorList = [];



    /* Decorators*/
    this.decorators = {
        taxA: {
            getTotalAmount: function(totalAmount){
                return totalAmount + (totalAmount * 0.5);
            }
        },
        taxB: {
            getTotalAmount: function(totalAmount){
                return totalAmount + 10;
            }
        },
        money: {
            getTotalAmount: function(totalAmount){
                return totalAmount + '€';
            }
        }
    }


    this.decorate = function(decorator){
        this.decoratorList.push(decorator);
    }

    this.getTotalAmount = function(){
        var totalAmount = this.totalAmount,
            num_decorators_list = this.decoratorList.length,
            decorator,
            i;

        for(i = 0; i < num_decorators_list; i++){
            decorator = this.decoratorList[i];
            totalAmount = this.decorators[decorator].getTotalAmount(totalAmount);
        }

        return totalAmount;
    }
}

var TestDecorator = function(){
    var broker = new Broker(1000);
    broker.decorate("taxA");
    broker.decorate("taxB");
    broker.decorate("money");
    console.log("Amount ---> ", broker.getTotalAmount());
}

/***********
* Observer *
************/

var ObjectObservable = function() {
    this.observers = [];

    this.subscribe = function(observer) {
        this.observers.push(observer);
    }

    this.unsubscribe = function(observer) {
        this.observers = this.observers.filter(
            function(item) {
                if (item !== observer) {
                    return item;
                }
            }
        );
    }

    this.triggerEvent = function(event, scope) {
        this.observers.forEach(function(item) {
            item.call(scope, event);
        });
    }
}

var TestObserver = function(){
    var objectObservable = new ObjectObservable(),
        logger = "",
        observer;

    observer = function(item) {
        logger+= ("notify: " + item + "\n");
    }

    objectObservable.subscribe(observer);
    objectObservable.triggerEvent('event a', this);
    objectObservable.unsubscribe(observer);
    objectObservable.triggerEvent('event b', this);
    objectObservable.subscribe(observer);
    objectObservable.triggerEvent('event c', this);
    console.log(logger);
}
