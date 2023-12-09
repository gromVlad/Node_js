import EventEmitter from 'events';

const myEmitter = new EventEmitter();

const timeoutListenerFn = (secondsQty) => {
    console.log(`Timeout event in ${secondsQty} seconds!`);
};

//также можно добовлять с помощью addListener... а не on
myEmitter.on('timeout', timeoutListenerFn);

setTimeout(() => myEmitter.emit('timeout', 1), 1000);
setTimeout(() => myEmitter.emit('timeout', 2), 2000);

//однократная реакция события once. 2 раз не сработает
myEmitter.once('singleEvent', () => {
    console.log('Single event occurred');
});

setTimeout(() => myEmitter.emit('singleEvent'), 500);
setTimeout(() => myEmitter.emit('singleEvent'), 1500);

// отключаем событие указывая обязательно ее функцию
setTimeout(() => myEmitter.off('timeout', timeoutListenerFn), 3000);
setTimeout(() => myEmitter.emit('timeout', 4), 4000);

/* 
Single event occurred
Timeout event in 1 seconds!
Timeout event in 2 seconds!
*/