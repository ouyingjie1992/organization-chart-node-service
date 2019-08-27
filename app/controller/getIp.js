const Controller = require('egg').Controller;

class getIpController extends Controller {
    //获取当前机器公网ip地址
    async get() {
        let ip = await this.ctx.service.getIp.get();
        let date = new Date();
        this.ctx.body = `当前机器公网ip地址：${ip} ；    ${date}`;
        this.ctx.status = 200;
    }
}

module.exports = getIpController;