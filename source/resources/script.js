const dataController = (function() {
    let numberSwitcher = true, // to switch between tempNumberOne and tempNumberTwo
        tempNumberOne = "",
        tempNumberTwo = "",
        tempResult = 0,
        operatorSwitcher = true,
        operator = "";

    function storeInput(dataset) {
        numberSwitcher
            ? (tempNumberOne += dataset)
            : (tempNumberTwo += dataset);
    }

    function resetNumbers() {
        tempNumberOne = "";
        tempNumberTwo = "";
    }

    function returnNumber() {
        return numberSwitcher ? tempNumberOne : tempNumberTwo;
    }

    function switchNumber() {
        numberSwitcher = !numberSwitcher;
    }

    function operation() {
        if (operator === "+") {
            tempResult = Number(tempNumberOne) + Number(tempNumberTwo);
        } else if (operator === "-") {
            tempResult = Number(tempNumberOne) - Number(tempNumberTwo);
        } else if (operator === "*") {
            tempResult = Number(tempNumberOne) * Number(tempNumberTwo);
        } else if (operator === "/") {
            tempResult = Number(tempNumberOne) / Number(tempNumberTwo);
        }
    }

    function storeOperator(dataset) {
        operator = dataset;
        console.log(operator);
    }

    function returnResult() {
        return tempResult;
    }
    
    return {
        storeInput,
        resetNumbers,
        returnNumber,
        switchNumber,
        operation,
        storeOperator,
        returnResult
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

    function displayStoredNumber(num) {
        domElements.display.textContent = num;
    }

    return {
        domElements,
        displayStoredNumber
    };
})();

const generalController = (function(dataCtrl, uiCtrl) {
    const dom = uiCtrl.domElements;

    function setEventListeners() {
        for (let key in dom.keyboard) {
            for (let key2 in dom.keyboard[key]) {
                dom.keyboard[key][key2].addEventListener("click", function(e) {
                    const dset = dom.keyboard[key][key2].dataset;
                    if (dset.digit) {
                        dataCtrl.storeInput(
                            dom.keyboard[key][key2].dataset.digit
                        );
                        uiCtrl.displayStoredNumber(dataCtrl.returnNumber());
                    } else if (
                        dset.function === "+" ||
                        dset.function === "-" ||
                        dset.function === "*" ||
                        dset.function === "/"
                    ) {
                        dataCtrl.switchNumber();
                        dataCtrl.storeOperator(dset.function);
                    } else if (dset.function === "=") {
                        dataCtrl.operation();
                        dataCtrl.resetNumbers();
                        dataCtrl.switchNumber();
                        uiCtrl.displayStoredNumber(dataCtrl.returnResult());
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
