function eval() {
    // Do not use eval!!!
    return;
}

function expressionCalculator(expr) {
  let str = expr.replace(/\s/g, '');
  function splitStringArithmetic(str) {
    var index = 0;
    var splitArray = str.split("").reduce((arr, v, i) => {
      if (isNaN(Number(v))) {
        arr.push(str.slice(index, i));
        arr.push(v);
        index = i + 1;
      }
      return arr;
    }, []);
    splitArray.push(str.slice(index));
    return splitArray;
  }

  function findMultIndex(arr) {
    return arr.findIndex(i => i == "*");
  }

  function findDivIndex(arr) {
    return arr.findIndex(i => i == "/");
  }

  function findAddIndex(arr) {
    return arr.findIndex(i => i == "+");
  }

  function findSubIndex(arr) {
    return arr.findIndex(i => i == "-");
  }

  function multiply(arr) {
    var index = findMultIndex(arr);
    arr[index] = arr[index - 1] * arr[index + 1];
    return arr.filter((c, i) => {
      return i !== index - 1 && i !== index + 1;
    });
  }

  function divide(arr) {
    var index = findDivIndex(arr);
    if (arr[index + 1] == 0) {
      throw "TypeError: Division by zero.";      
    }

    arr[index] = Number(arr[index - 1]) / Number(arr[index + 1]);
    return arr.filter((c, i) => {
      return i !== index - 1 && i !== index + 1;
    });
  }

  function add(arr) {
    var index = findAddIndex(arr);
    arr[index] = Number(arr[index - 1]) + Number(arr[index + 1]);
    return arr.filter((c, i) => {
      return i !== index - 1 && i !== index + 1;
    });
  }

  function subtract(arr) {
    var index = findSubIndex(arr);
    arr[index] = Number(arr[index - 1]) - Number(arr[index + 1]);
    return arr.filter((c, i) => {
      return i !== index - 1 && i !== index + 1;
    });
  }

  function containsMultOrDiv(arr) {
    return arr.some(i => i === "*" || i === "/");
  }

  function containsAddOrSub(arr) {
    return arr.some(i => i === "+" || i === "-");
  }

  function simplify(arr) {
    while (containsMultOrDiv(arr)) {
      if (arr.includes("*")) {
        if (arr.includes("/")) {
          if (findDivIndex(arr) < findMultIndex(arr)) {
            arr = divide(arr);
          } else {
            arr = multiply(arr);
          }
        } else {
          arr = multiply(arr);
        }
      } else {
        arr = divide(arr);
      }
    }
    while (containsAddOrSub(arr)) {
      if (arr.includes("+")) {
        if (arr.includes("-")) {
          if (findSubIndex(arr) < findAddIndex(arr)) {
            arr = subtract(arr);
          } else {
            arr = add(arr);
          }
        } else {
          arr = add(arr);
        }
      } else {
        arr = subtract(arr);
      }
    }
    return Number(arr.join(""));
  }

  var arithmeticArray = splitStringArithmetic(str);

  return simplify(arithmeticArray);
}

module.exports = {
    expressionCalculator
}