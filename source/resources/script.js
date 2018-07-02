const dataController = (function() {
    let curInput = [],
        inputStorage = [],
        operatorStorage = [],
        regex = /[\d.]/;

    function storeCurInput(dset) {
        if (!regex.test(dset)) {
            // if input is not a digit nor a dot -> therefore an operator or equals
            if (curInput.length === 0 && inputStorage.length === 0) {
                // if no number was provided before the operator, the first term of the operation is missing ->
                return;
            } else {
                // push the input number to the storage and clear it
                inputStorage.push(curInput.join(""));
                curInput = [];
                if (inputStorage[inputStorage.length - 1] === "") {
                    // in the previous passage, if two operators are clicked in a row, an empty value is pushed onto inputStorage -> we remove it, and just update the last value of operatorStorage without adding a new one
                    if (operatorStorage.length === 0) {
                        operatorStorage.push(dset);
                        inputStorage.pop();
                    } else {
                        operatorStorage[operatorStorage.length - 1] = dset;
                        inputStorage.pop();
                    }
                } else {
                    // if instead it's the first operator to be inputted after a number, we just add it to operatorStorage

                    operatorStorage.push(dset);
                }
            }
        } else {
            // if input is a digit or a dot
            if (dset === ".") {
                // if last input is a dot or there's already a dot in the current number, just return
                if (
                    curInput[curInput.length - 1] === "." ||
                    curInput.indexOf(dset) !== -1
                ) {
                    return;
                } else {
                    curInput.push(dset);
                }
            } else {
                if (inputStorage.length > operatorStorage.length) {
                    // this is to reset the calculations after the operations have run, when the first input after a "=" sign is a number
                    curInput = [];
                    inputStorage = [];
                    operatorStorage = [];
                    curInput.push(dset);
                } else {
                    // if input is a number
                    curInput.push(dset);
                }
            }
        }
        console.log(inputStorage, operatorStorage);
    }

    function operations() {
        // we add the last number that was inputted to the inputStorage, so that it can be used in the calculations, and then we reset it
        inputStorage.push(curInput.join(""));
        curInput = [];

        // we set acc to be equal to the first number of the stored input, to act as the starting value and then as the result of each operation
        let acc = Number(inputStorage[0]);
        
        // then we iterate through the various operators, and for each we check its value -> after that, we perform the appropriate operation setting the accumulator as the result
        operatorStorage.forEach((el, curIndex) => {
            if (el === "+") {
                acc += Number(inputStorage[curIndex + 1]);
            } else if (el === "-") {
                acc -= Number(inputStorage[curIndex + 1]);
            } else if (el === "*") {
                acc *= Number(inputStorage[curIndex + 1]);
            } else if (el === "/") {
                acc /= Number(inputStorage[curIndex + 1]);
            }
        });

        // we store the final result as the first element of the inputStorage array, so we can use it again for the subsequent operations, and we reset the operators
        inputStorage = [];
        inputStorage[0] = acc;
        operatorStorage = [];

        // the result is returned, so that it can be displayed by uiCtrl.displayNumber()
        return acc;
    }

    // curInput is returned, so that it can be displayed by uiCtrl.displayNumber()
    function returnCurInput() {
        return curInput.join("");
    }

    // the key "c" resets all memory, to start fresh again, while "ce" only erases the last of the curInput values
    function clearInputs(dset) {
        if (dset === "c") {
            curInput = [];
            inputStorage = [];
            operatorStorage = [];
        } else {
            curInput.pop();
        }
    }

    return {
        storeCurInput,
        operations,
        returnCurInput,
        clearInputs
    };
})();

const uiController = (function() {
    const domElements = {
        display: document.querySelector(".display"),
        keyboard: {
            functions: {
                btnAdd: document.querySelector(".op-add"),
                btnSub: document.querySelector(".op-sub"),
                btnMul: document.querySelector(".op-mul"),
                btnDiv: document.querySelector(".op-div"),
                ce: document.querySelector(".ce"),
                c: document.querySelector(".c"),
                dot: document.querySelector(".dot"),
                equals: document.querySelector(".equals")
            },
            digits: {
                zero: document.getElementById("num-0"),
                one: document.getElementById("num-1"),
                two: document.getElementById("num-2"),
                three: document.getElementById("num-3"),
                four: document.getElementById("num-4"),
                five: document.getElementById("num-5"),
                six: document.getElementById("num-6"),
                seven: document.getElementById("num-7"),
                eight: document.getElementById("num-8"),
                nine: document.getElementById("num-9")
            }
        }
    };

    function displayNumber(num) {
        domElements.display.textContent = num;
    }

    return {
        domElements,
        displayNumber
    };
})();

const generalController = (function(dataCtrl, uiCtrl) {
    const dom = uiCtrl.domElements;
    function setEventListeners() {
        for (let key in dom.keyboard) {
            for (let key2 in dom.keyboard[key]) {
                dom.keyboard[key][key2].addEventListener("click", function(e) {
                    const dset = dom.keyboard[key][key2].dataset;
                    if (dset.key === "=") {
                        uiCtrl.displayNumber(dataCtrl.operations());
                    } else if (dset.key === "ce" || dset.key === "c") {
                        dataCtrl.clearInputs(dset.key);
                        uiCtrl.displayNumber(dataCtrl.returnCurInput());
                    } else {
                        dataCtrl.storeCurInput(dset.key);
                        uiCtrl.displayNumber(dataCtrl.returnCurInput());
                    }
                });
            }
        }
    }

    return {
        init: function() {
            setEventListeners();
        }
    };
})(dataController, uiController);

generalController.init();
