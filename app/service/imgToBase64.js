/**
 * 图片转 base64
 * file:需转换的目标路径，可以为单个文件或者目录地址
 * 返回以文件名为字段名的base64集合：e.g.{'imgName': 'base64 value'}
 */
const Service = require('egg').Service;
const fs = require("fs");
const mimeType = require('mime-types');
const path = require("path");

// 转换单个图片文件
const parse = (file) => {
    let base64Value = '';
    let filePath = path.resolve(file); // 原始文件地址
    let fileMimeType = mimeType.lookup(filePath); // 获取文件的 memeType
    let fileName = filePath.split('\\').slice(-1)[0].split('/').slice(-1)[0].split('.')[0]; // 提取文件名
    let returnData = {};

    // 如果不是图片文件，则跳过
    if (!fileMimeType.toString().includes("image")) {
        console.log(`Failed! ${filePath}:\tNot image file!`);
    } else {
        // 读取文件数据
        let data = fs.readFileSync(filePath);
        data = new Buffer(data).toString("base64");
        // 转换为 data:image/jpeg;base64,***** 格式的字符串
        base64Value = "data:" + fileMimeType + ";base64," + data;
    }
    // resolve();
    returnData[fileName] = base64Value;
    return returnData;
};
// 转换整个目录下的图片文件
const dirEach = (dir) => {
    let pa = fs.readdirSync(dir);
    let resultData = {};
    pa.forEach((item, index) => {
        let itemPath = path.resolve(dir + '/' + item);
        let stat = fs.statSync(itemPath);
        if (stat.isDirectory()) {
            let itemData = dirEach(itemPath);
            resultData = {...resultData, ...itemData}; // 转换为 base64
        } else {
            let itemData = parse(itemPath);
            resultData = {...resultData, ...itemData}; // 转换为 base64
        }
    });
    return resultData;
};
class ImgToBase64Service extends Service {
    async init(file) {
        let resultData = {};
        // 获取输入的文件地址或目录地址
        const MSG_ERROR_INPUT_EMPTY = 'File or filePath cann not be empty!';
        const MSG_WARN_OPTION_EMPTY = 'No option';
        if (!file) return console.error(new Error(MSG_ERROR_INPUT_EMPTY));

        // 读取文件
        const stat = fs.lstatSync(file);
        // 如果是文件则直接解析
        if (stat.isFile()) {
            resultData = await parse(file);
        }
        // 如果是目录则遍历目录下的图片文件并逐个进行解析
        if (stat.isDirectory()) {
            resultData = await dirEach(file);
        }
        // 无对应操作
        console.log(MSG_WARN_OPTION_EMPTY);
        return resultData;
    }
}
module.exports = ImgToBase64Service;