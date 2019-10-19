const fs = require("fs");
const path = require('path');

/**
 * 递归调用
 * 文件夹 __dirname
 * @param {*} entry 
 */
const readDir = (entry) => {
    const dirInfo = fs.readdirSync(entry);
    dirInfo.forEach((item) => {
        const location = path.join(entry, item);
        const info = fs.statSync(location);
        if (info.isDirectory()) {
            console.log(`dir: ${location}`);
            // 文件夹 递归调用
            readDir(location);
        } else {
            console.log(`file: ${location}`);
        }
    })
}

readDir(__dirname);
