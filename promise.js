class Promise {
  // Pending
  // Fulfilled
  // Rejected

  // fulfill
  // reject
  // eventual value
  // reason

  constructor(executor) {
    if (!this.isFunction(executor)) {
      throw new TypeError(`Promise resolver ${executors} is not a function`);
    }
    this.initValue();
    try {
      executor(this.resolve, this.reject);
    } catch (e) {
      this.reject(e);
    }
  }
  initValue = () => {
    this.value = null;
    this.reason = null;
    this.state = Promise.PENDING;
    this.onFulfilledCallbacks = [];
    this.onRejectedCallbacks = [];
  };
  resolve = (value) => {
    if (this.state === Promise.PENDING) {
      this.value = value;
      this.state = Promise.FULFILLED;
      this.onFulfilledCallbacks.forEach((fn) => fn(this.value));
    }
  };

  reject = (reason) => {
    if (this.state === Promise.PENDING) {
      this.reason = reason;
      this.state = Promise.REJECTED;
      this.onRejectedCallbacks.forEach((fn) => fn(this.reason));
    }
  };

  then = (onFulfilled, onRejected) => {
    // 参数时可选的，不是函数可以忽略(包装)
    if (!this.isFunction(onFulfilled)) {
      onFulfilled = function (value) {
        return value;
      };
    }

    if (!this.isFunction(onRejected)) {
      onRejected = function (reason) {
        throw reason;
      };
    }

    let promise2 = new Promise((resolve, reject) => {
      if (this.state === Promise.FULFILLED) {
        setTimeout(() => {
          try {
            const x = onFulfilled(this.value);
            Promise.resolvePromise(promise2, x, resolve, reject);
          } catch (e) {
            reject(e);
          }
        });
      }

      if (this.state === Promise.REJECTED) {
        setTimeout(() => {
          try {
            const x = onRejected(this.reason);
            Promise.resolvePromise(promise2, x, resolve, reject);
          } catch (e) {
            reject(e);
          }
        });
      }

      if (this.state === Promise.PENDING) {
        this.onFulfilledCallbacks.push((value) => {
          setTimeout(() => {
            try {
              const x = onFulfilled(value);
              Promise.resolvePromise(promise2, x, resolve, reject);
            } catch (e) {
              reject(e);
            }
          });
        });
        this.onRejectedCallbacks.push((reason) => {
          setTimeout(() => {
            try {
              const x = onRejected(reason);
              Promise.resolvePromise(promise2, x, resolve, reject);
            } catch (e) {
              reject(e);
            }
          });
        });
      }
    });

    return promise2;
  };

  isFunction = (arg) => typeof arg === "function";
}

Promise.PENDING = "pending";
Promise.FULFILLED = "fulfilled";
Promise.REJECTED = "rejected";

// Promise 解决方法
Promise.resolvePromise = (promise2, x, resolve, reject) => {
  // 防止链式调用;
  if (x === promise2) {
    throw new TypeError("Chaining cycle detected for promise");
  }
  try {
    if (x instanceof Promise) {
      x.then(
        (value) => {
          Promise.resolvePromise(promise2, value, resolve, reject);
        },
        (reason) => {
          reject(reason);
        }
      );
    } else if (x && (typeof x === "object" || typeof x === "function")) {
      let called = false;
      try {
        const then = x.then;
        if (typeof then === "function") {
          then.call(
            x,
            (y) => {
              if (called) return;
              called = true;
              Promise.resolvePromise(promise2, y, resolve, reject);
            },
            (r) => {
              if (called) return;
              called = true;
              reject(r);
            }
          );
        } else {
          resolve(x);
        }
      } catch (e) {
        if (called) return;
        reject(e);
      }
    } else {
      resolve(x);
    }
  } catch (e) {
    reject(e);
  }
};

Promise.defer = Promise.deferred = function () {
  let dfd = {};
  dfd.promise = new Promise((resolve, reject) => {
    dfd.resolve = resolve;
    dfd.reject = reject;
  });
  return dfd;
};

module.exports = Promise;
