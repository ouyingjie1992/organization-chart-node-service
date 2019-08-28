
/**
 * 获取当前机器的ip地址
 */
const Service = require('egg').Service;
const nodemailer = require('nodemailer');

class SendEmailService extends Service {
    // 初始化邮件程序
    async init(addressee) {
        // 发件人信息
        let sender = null;
        // 邮箱服务器
        let emailHost = null;
        
        sender = {
            user: 'xxx@qq.com',
            pass: 'xxx'
        };
        // sender = {
        //     user: 'xxx@163.com',
        //     pass: 'xxx'
        // };
        emailHost = 'smtp.qq.com';
        
        if(sender == null) {
            // 测试账号
            sender = await nodemailer.createTestAccount();
        }
        if(emailHost == null) {
            // 测试服务器
            emailHost = 'smtp.ethereal.email';
        }

        let transporter = nodemailer.createTransport({
            host: emailHost,
            // service: 'qq',
            port: 465,
            secure: true,
            auth: {
                user: sender.user, 
                pass: sender.pass 
            }
        });

        // 邮件内容
        let mailOptions = {
            from: sender.user, // sender address
            to: addressee, // list of receivers
            subject: 'Hello ✔', // Subject line
            text: 'Hello world?', // plain text body
            html: '<b>Hello world?</b>' // html body
        };

        console.log(mailOptions)
        // send mail with defined transport object
        transporter.sendMail(mailOptions, (error, info) => {
            if(error) {
              return console.log(error);
            }
            console.log('Message sent: %s', info.messageId);
            transporter.close(); // 如果没用，关闭连接池
        });
    }
}
module.exports = SendEmailService;