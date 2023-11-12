import EventEmitter from 'events';

const myEmitter = new EventEmitter();

myEmitter.on('myEvent', () => {
    console.log('First event listener');
});

myEmitter.on('myEvent', () => {
    console.log('Second event listener');
});

myEmitter.on('otherEvent', () => console.log('Other event'));

// по дефолту 10 / меняем на другое число
myEmitter.setMaxListeners(25);

//текущее максимальное число событий
console.log(myEmitter.getMaxListeners());

//список событий
console.log(myEmitter.eventNames());

setTimeout(() => myEmitter.emit('myEvent'), 1000);

/* 
25
[ 'myEvent', 'otherEvent' ]
First event listener
Second event listener
 */