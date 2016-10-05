require("socket.io-client")(
    (function() {
        var scripts = document.getElementsByTagName("script"),
            script = scripts[scripts.length - 1],
            a = document.createElement("a");
        a.href = script.src;
        return a.origin;
    }())
).on("reload", function() {
    location.reload();
});
