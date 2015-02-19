var livereload = require("../src/index");


livereload.listen({
    port: 35729
});


setTimeout(function reload() {
    livereload.reload();
    livereload.close();
}, 5000);
