const mytext : string = "Test";
const myfunc = (text:string) : string => `${text} ${text}`;

document.getElementById('output').innerHTML = "Success! Your typescript has just been executed.";

console.log( myfunc(mytext) );

class MyClass {
   //field 
   name:string; 
 
   //constructor 
   constructor(name:string) { 
      this.name = name 
   }  

   //function
   /**
   * @method show
   * @return {void}
   */
   show():void { 
      console.log("MyClass.name is : "+this.name) 
   } 
}

// Array destruction with the spread operator
const arr1 : Array<number> = [ 3,4,5 ];
const arr2: Array<number> = [ ...arr1 ];
console.log( arr2 );

// Map
const arr3 = arr1.map((elem,index) => Math.pow(elem,2));
console.log(arr3);

// Reduce
const sum = arr3.reduce((sum,elem) => sum+elem,0);
console.log(sum);


