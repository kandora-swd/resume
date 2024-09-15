"use strict";

function base64ToString(base64) {
    var binaryString = atob(base64);
    var bytes = new Uint8Array(binaryString.length);
    for (var i = 0; i < binaryString.length; i++)
        bytes[i] = binaryString.charCodeAt(i);
    return new TextDecoder().decode(bytes);
}

window.addEventListener('load', () => {
    let params = new URLSearchParams(window.location.search);

    for (let [name, protocol] of [["phone", "tel"], ["mail", "mailto"], ["hourly-rate", null]]) {
        let encodedValue = params.get(name);

        if (encodedValue === null)
            continue;

        for (let elem of document.getElementsByClassName(name)) {

            let value = base64ToString(encodedValue);

            if (protocol != null) {
                let link = document.createElement('a');
                link.setAttribute('href', protocol + ':' + value);
                link.textContent = value;
                
                elem.replaceChildren(link)

            } else {
                elem.textContent = value;
            }
        }
    }


    for (let elem of document.getElementsByClassName('lang-link')) {
        elem.setAttribute('href', elem.getAttribute('href') + window.location.search);
    }
    
});

console.log("test")