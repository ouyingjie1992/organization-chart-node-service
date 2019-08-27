exports.keys = "woaizhongguo";
// 添加 view 配置
exports.view = {
    defaultViewEngine: 'nunjucks',
    mapping: {
        '.tpl': 'nunjucks',
    },
};

exports.security = {
    csrf: {
        enable: false
    }
};