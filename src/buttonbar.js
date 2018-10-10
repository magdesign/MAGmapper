
const ID_BUTTONBAR = "buttonbar";



/**
 * Keylistener for enabling and disabling buttonbar
 */
window.addEventListener("keydown", (event) => {
    switch (event.key) {
        case "Escape":
            document
                .getElementById(ID_BUTTONBAR)
                .setAttribute("class", getCssClass(document));
    }
}, true);


function getCssClass(document) {
    return document
        .getElementById(ID_BUTTONBAR)
        .getAttribute("class") === "show" ? "hide" : "show"

}