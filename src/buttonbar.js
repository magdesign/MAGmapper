
const ID_BUTTON_BAR = "buttonbar";



export function ButtonBar(){

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
