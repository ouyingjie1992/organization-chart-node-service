
/**
 * 获取当前机器的ip地址
 */
const Service = require('egg').Service;
const os = require('os');

const getLocalIP = () => {
    let address = '';
    let ifaces = os.networkInterfaces();
    console.log(ifaces)
    for(let dev in ifaces) {
        // 网关名称：'WLAN' or '以太网' or 'balabala'
        let ifacesName = 'WLAN';
        if(dev.indexOf(ifacesName) !== -1) {
            /*  
            WLAN:[
                { 
                    address: 'xxxx::xxxx:xxxx:xxx:xxxx',
                    netmask: 'xxxx:xxxx:xxxx:xxxx::',
                    family: 'IPv6',
                    mac: 'xx:xx:xx:xx:xx:xx',
                    scopeid: 2,
                    internal: false,
                    cidr: 'xxxx::xxxx:xxxx:xxx:xxxx/xx' },
                { 
                    address: 'xxx.xxx.xxx.xxx',
                    netmask: 'xxx.xxx.x.x',
                    family: 'IPv4',
                    mac: 'xx:xx:xx:xx:xx:xx',
                    internal: false,
                    cidr: 'xxx.xxx.xxx.xxx/xx'
                } 
            ]
            */
            let ip = null;
            ifaces[dev].forEach((details) => {
                if (details.family == 'IPv4') {
                    ip = details.address;
                }
            });

            address = ip;
        }
    }  
    return address;
}
class GetIpService extends Service {
    async get() {
        // 创建输出目录
        let localIp = getLocalIP();
        return localIp;
    }
}
module.exports = GetIpService;