function promiseAll(promises) {
    async function getValues(promises) {
        const returnValues = [];
        if (promises.length > 0) {
                for (const promise of promises) {
                    returnValues.push(await promise);
                }
        } 
        return returnValues;
    }
    return getValues(promises);  
}



// Kod testowy.
promiseAll([]).then(result => {
    console.log('To powinien być []:', JSON.stringify(result));
  });
  
  promiseAll([futureSuccess(1), futureSuccess(2), futureSuccess(3)]).then(result => {
    console.log('To powinien być [1, 2, 3]:', result);
  });
  
  promiseAll([futureSuccess(1), Promise.reject('X'), futureSuccess(3)])
    .then(() => {
      console.log('WAT?! Nie powinno nas tu być..');
    })
    .catch(error => {
      if (error !== 'X') {
        console.log('Coś poszło nie tak..:', error);
      }
      console.log('To powinien być X:', error);
    });

  function futureSuccess(val) {
    return new Promise((resolve) => {
      setTimeout(() => resolve(val), Math.random() * 500);
    });
  };


  
