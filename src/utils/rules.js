/**
 * 字符校验：只能输入数字、字母
 * @param {string} str
 * @returns {Boolean}
 */
export const checkNumberLetter = (rule, value, callback) => {
  if (!value) {
    callback()
  } else {
    const reg = /^[0-9a-zA-Z]+$/
    if (!reg.test(value)) {
      callback(new Error('只能输入数字、字母'))
    } else {
      callback()
    }
  }
}

/**
 * 字符校验：只能输入数字、字母、下划线
 * @param {string} str
 * @returns {Boolean}
 */
export const checkNumberLetterUnderline = (rule, value, callback) => {
  if (!value) {
    callback()
  } else {
    const reg = /^[0-9a-zA-Z_]+$/
    if (!reg.test(value)) {
      callback(new Error('只能输入数字、字母、下划线'))
    } else {
      callback()
    }
  }
}

/**
 * 字符校验：只能输入数字、字母、汉字
 * @param {string} str
 * @returns {Boolean}
 */
export const checkNumberLetterChinese = (rule, value, callback) => {
  if (!value) {
    callback()
  } else {
    const reg = /^[0-9a-zA-Z\u4e00-\u9fa5]+$/
    if (!reg.test(value)) {
      callback(new Error('只能输入数字、字母、汉字'))
    } else {
      callback()
    }
  }
}
/**
 * 密码校验：密码中必须包含字母（不区分大小写）、数字、特称字符，至少6个字符，最多18个字符
 * @param {string} str
 * @returns {Boolean}
 */
export const checkPwd = (rule, value, callback) => {
  if (!value) {
    callback()
  } else {
    const reg = /^(?=.*[0-9])(?=.*[a-zA-Z])(?=.*[^a-zA-Z0-9]).{6,18}$/
    if (value === "") {
      callback(new Error('请输入密码！'))
    } else if (value.length < 6 || value.length > 18) {
      callback(new Error('密码长度6~18位！'))
    } else if (!reg.test(value)) {
      callback(new Error('密码必须包含字母、数字、特殊字符！'))
    } else {
      callback()
    }
  }
}

