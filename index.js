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
//   console.log(1);
//   resolve(2);
// })
//   .then((value) => {
//     console.log(2);
//   })
//   .then(() => {
//     console.log(3);
//   });

// let p1 = new Promise((resolve, reject) => {
//   resolve(1);
// }).then(() => {
//   return p1;
// });
