const Controller = require('egg').Controller;

class sendEmailController extends Controller {
    //获取当前机器公网ip地址
    async start() {
        /** 参数说明：
        * addressee: 收件人
        **/
        //获取调用该接口的参数
        const addressee = this.ctx.query.addressee;
        if(addressee==null || addressee==='') {
            this.ctx.body = '参数不能为空';
            this.ctx.status = 200;
        } else {
            await this.ctx.service.sendEmail.init(addressee);
            this.ctx.body = `邮件定时器启动成功`;
            this.ctx.status = 200;
        }
    }
}

module.exports = sendEmailController;