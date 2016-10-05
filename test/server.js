var livereload = require("../src/index");


livereload.listen({
    port: 35729
});


setTimeout(function reload() {
    livereload.reload();
    setTimeout(reload, 5000);
});
