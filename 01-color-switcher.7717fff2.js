!function(){var t=document.querySelector("button[data-start]"),e=document.querySelector("button[data-stop]");e.disabled=!0,t.addEventListener("click",(function(){e.removeAttribute("disabled"),t.disabled=!0,timerId=setInterval((function(){document.body.style.backgroundColor="#".concat(Math.floor(16777215*Math.random()).toString(16))}),1e3),console.log("start click")})),e.addEventListener("click",(function(){t.removeAttribute("disabled"),e.disabled=!0,clearInterval(timerId),console.log("stop click")}))}();
//# sourceMappingURL=01-color-switcher.7717fff2.js.map
