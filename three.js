let display = document.getElementById("display");

function appendToDisplay(value) {
    if (value === "()") {
        const lastChar = display.value.slice(-1);
        if (
            display.value === "" ||
            "+-*/(".includes(lastChar)
        ) {
            display.value += "(";
        } else {
            display.value += ")";
        }
    } else {
        display.value += value;
    }
}

function clearDisplay() {
    display.value = "";
}

function deleteLast() {
    display.value = display.value.slice(0, -1);
}

function calculateResult() {
    try {
        const expression = display.value.replace(/(\d+(\.\d+)?)%/g, "($1/100)");
        const result = eval(expression);
        display.value = result !== undefined ? result : "";
    } catch (e) {
        display.value = "Error";
    }
}

document.addEventListener("keydown", function (event) {
    const key = event.key;

    if ("0123456789+-*/.%".includes(key)) {
        appendToDisplay(key);
    } else if (key === "Enter") {
        event.preventDefault();
        calculateResult();
    } else if (key === "Backspace") {
        deleteLast();
    } else if (key === "Escape") {
        clearDisplay();
    } else if (key === "(" || key === ")") {
        appendToDisplay(key);
    }
});
