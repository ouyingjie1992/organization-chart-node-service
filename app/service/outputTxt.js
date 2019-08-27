/**
 * 向指定目录输出txt文件
 * fileName:输出目标文件名
 * data：文件写入内容
 * outPath:输出目标
 */
const Service = require('egg').Service;
const fs = require("fs");
const path = require("path");
const mkdirp = require('mkdirp');

// 写入到文件
const saveData = (data, file, outFileName) => {
    fs.createWriteStream(file)
    .end(data, () => {
        console.log(`Success! ${file}:\t${outFileName}`);
    });
};
class OutputTxtService extends Service {
    async output(data, fileName, outPath) {
        // 创建输出目录
        let outPathReal = path.resolve(outPath);
        let outFileName = `${fileName}.txt`;
        let outFile = path.join(outPathReal, outFileName);
        if (fs.existsSync(outPathReal)) {
            saveData(data, outFile, outFileName);
        } else {
            mkdirp(outPathReal, () => {
                saveData(base64, outFile, outFileName);
            });
        }
    }
}
module.exports = OutputTxtService;