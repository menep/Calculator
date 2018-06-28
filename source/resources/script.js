const dataController = (function() {})();

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

    return {
        domElements
    };
})();

const generalController = (function(dataCtrl, uiCtrl) {
    const dom = uiCtrl.domElements;

    function setEventListeners() {
        for (let key in dom.keyboard) {
            for (let key2 in dom.keyboard[key]) {
                dom.keyboard[key][key2].addEventListener("click", function(e) {
                    const data = dom.keyboard[key][key2].dataset;
                    console.log(data)
                })
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
