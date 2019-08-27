const Controller = require('egg').Controller;
class imgToBase64Controller extends Controller {
    //转化指定目录下的图片并输出
    async output() {
        /** 参数说明：
        * fileName: 输出文件名
        * outputPath: 输出目录
        **/
        //获取调用该接口的参数
        const fileName = this.ctx.query.fileName;
        const outputPath = this.ctx.query.outputPath;
        if(fileName==null || outputPath==null) {
            this.ctx.body = '参数不能为空';
            this.ctx.status = 200;
        } else {
            // 图片转化base64
            let imgList = await this.ctx.service.imgToBase64.init('app/public/img');
            imgList = imgList||{};
            imgList = JSON.stringify(imgList);
            await this.ctx.service.outputTxt.output(imgList, fileName, outputPath);
            this.ctx.body = `文件输出成功！${outputPath}/${fileName}.txt`;
            this.ctx.status = 200;
        }
    }
}

module.exports = imgToBase64Controller;