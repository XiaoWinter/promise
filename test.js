const Promise = require("./promise.js");

// console.log(1);
// new Promise((resolve, reject) => {
//   console.log("2");
//   resolve(4);
// }).then(
//   (value) => {
//     console.log(value);
//   },
//   (reason) => {
//     console.log(reason);
//   }
// );
// console.log(3);

// new Promise((resolve, reject) => {
//   throw new Error(122);
// }).then(
//   () => {},
//   (reason) => {
//     console.log(reason);
//   }
// );

// new Promise((resolve, reject) => {
//   setTimeout(() => {
//     console.log("定时器");
//     // resolve(1);
//     reject(2);
//   });
// }).then(
//   (value) => {
//     console.log(value);
//   },
//   (reason) => {
//     console.log(reason);
//   }
// );

new Promise((resolve, reject) => {
  console.log(1);
  resolve();
})
  .then((value) => {
    console.log(2);
    return new Promise((resolve, reject) => {
      resolve(
        new Promise((resolve, reject) => {
          console.log(3);
          const temp = {
            then(x) {
              console.log("jojo");
              x("hehe");
            }
          };
          resolve(temp);
        })
      );
      console.log(4);
    });
  })
  .then(() => {
    console.log(5);
  });
