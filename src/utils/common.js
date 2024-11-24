/**
 * 基本工具类  20220311
 */
import contractAbi from '../assets/abi.json';
import erc20Abi from 'erc-20-abi';
import Web3 from 'web3';

export const linkWallet = async () => {
    if (window.ethereum) {
        try {
            // 请求账户权限
            await window.ethereum.enable();
            // 创建web3实例
            window.web3 = new Web3(window.ethereum);
            // 获取合约实例
            // const ether = new Ether();
            // const wallet = ether.create();
            // console.log(wallet)
            // const contractAddress = '0x...'; // 你的合约地址
            // const contract = wallet.createContract(contractAbi, { address: contractAddress });
            // 现在你可以使用instance与合约交互了
            // const contractABI = ...; // 你的合约ABI
            const contractAddress = '0xe2D05075E440b49bC77D6880670F6B05a4396D8B'; // 你的合约地址
            //   this.contract = contract;
            window.contract = new window.web3.eth.Contract(contractAbi, contractAddress)
        } catch (error) {
            // 用户拒绝授权
            console.error(error);
        }
    } else {
        alert('Requires the Ethereum wallet extension to be installed');
    }
}

export const tokenApprove = async (amount) => {
    if (window.contract) {
        try {
            const tokenAddress = '0xa9aa74DF4fea2BE31Bb7B75eddc3D53Dc834D4e0';// 代币合约地址
            const accounts = await window.web3.eth.getAccounts();//钱包账户
            const contractAddress = '0xe2D05075E440b49bC77D6880670F6B05a4396D8B'; // 你的合约地址
            // 授权金额
            // const amount = window.web3.utils.toWei(amount+'000000000000000000', 'wei'); // 以太币单位通常是wei，这里转换为wei
            const tokenContract = new window.web3.eth.Contract(erc20Abi, tokenAddress);
            // 授权
            return tokenContract.methods.approve(contractAddress, '399000000000000000000').send({ from: accounts[0] })
        } catch (error) {
            // 用户拒绝授权
            console.error(error);
        }
    } else {
        alert('Please connect the wallet first');
    }
}
/**
 * 格式化时间
 * 用法 formatTime(time, 'yyyyMMdd') 
 * @param {*} time 
 * @param {*} cFormat 
 * @returns 
 */
export const formatTime = (time, cFormat) => {
    if (!time) return null
    const date = new Date(time)
    let fmt = cFormat || "yyyy-MM-dd hh:mm:ss"
    const formatObj = {
        "M+": date.getMonth() + 1, //月
        "d+": date.getDate(), // 日
        "h+": date.getHours(), // 小时
        "m+": date.getMinutes(), // 分钟
        "s+": date.getSeconds(), // 秒
    }
    if (/((y|Y)+)/.test(fmt)) {
        fmt = fmt.replace(RegExp.$1, (date.getFullYear() + "").substr(4 - RegExp.$1.length));
    }
    for (var k in formatObj) {
        if (new RegExp("(" + k + ")").test(fmt)) {
            fmt = fmt.replace(RegExp.$1, (RegExp.$1.length == 1) ? (formatObj[k]) : (("00" + formatObj[k]).substr(("" + formatObj[k]).length)));
        }
    }
    return fmt
}


/**
 * 防抖 func函数在最后一次调用时刻的wait毫秒之后执行
 * 多用于scroll事件（资源的加载），mousemove事件（拖拽），resize事件（响应式布局样式），keyup事件（输入框文字停止打字后才进行校验） 
 * @param {*} func 
 * @param {*} wait 
 * @param {*} immediate immediate 为true，debounce会在wait 时间间隔的开始调用这个函数
 * @returns 
 */
export const debounce = function (func, wait, immediate) {
    var timeout, args, context, timestamp, result;
    var later = function () {
        var last = new Date().getTime() - timestamp; // timestamp会实时更新
        if (last < wait && last >= 0) {
            timeout = setTimeout(later, wait - last);
        } else {
            timeout = null;
            if (!immediate) {
                result = func.apply(context, args);
                if (!timeout) context = args = null;
            }
        }
    };
    return function () {
        context = this;
        args = arguments;
        timestamp = new Date().getTime();
        var callNow = immediate && !timeout;

        if (!timeout) {
            timeout = setTimeout(later, wait);
        }
        if (callNow) {
            result = func.apply(context, args);
            context = args = null;
        }
        return result;
    };
}

/**
 * 节流 创建并返回一个像节流阀一样的函数，当重复调用函数的时候，最多每隔 wait毫秒调用一次该函数
 * 使用场景 click事件（不停快速点击按钮，减少触发频次），scroll事件（返回顶部按钮出现\隐藏事件触发），keyup事件（输入框文字与显示栏内容复制同步），减少发送ajax请求，降低请求频率
 * @param {*} func 
 * @param {*} wait 
 * @param {*} options 如果你想禁用第一次首先执行的话，传递{leading: false}，如果你想禁用最后一次执行的话，传递{trailing: false}
 * @returns 
 */
export const throttle = function (func, wait, options) {
    var context, args, result;
    var timeout = null;
    var previous = 0;
    if (!options) options = {};
    var later = function () {
        previous = options.leading === false ? 0 : new Date().getTime();
        timeout = null;
        result = func.apply(context, args);
        if (!timeout) context = args = null;
    };
    return function () {
        var now = new Date().getTime();
        if (!previous && options.leading === false) previous = now;
        var remaining = wait - (now - previous);
        context = this;
        args = arguments;
        if (remaining <= 0 || remaining > wait) {
            if (timeout) {
                clearTimeout(timeout);
                timeout = null;
            }
            previous = now;
            result = func.apply(context, args);
            if (!timeout) context = args = null;
        } else if (!timeout && options.trailing !== false) {
            timeout = setTimeout(later, remaining);
        }
        return result;
    };
}
