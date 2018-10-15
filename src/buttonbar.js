
const ID_BUTTON_BAR = "buttonbar";

function init(){

    /**
     * Keylistener for enabling and disabling buttonbar
     */
    window.addEventListener("keydown", (event) => {
        switch (event.key) {
            case "Escape":
                document
                    .getElementById(ID_BUTTON_BAR)
                    .setAttribute("class", getCssClass(document));
        }
    }, true);


    function getCssClass(document) {
        return document
            .getElementById(ID_BUTTON_BAR)
            .getAttribute("class") === "show" ? "hide" : "show"
    }
}
export const ButtonBar = {
    init
};
