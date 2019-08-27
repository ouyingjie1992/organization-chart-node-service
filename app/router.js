module.exports = app => {
    const { router, controller } = app;
    if(app.config.env === 'local') {
        // /imgToBase64/output接口仅供本地开发使用
        router.get('/imgToBase64/output', controller.imgToBase64.output);
    };
    router.get('/getIp/get', controller.getIp.get);
};