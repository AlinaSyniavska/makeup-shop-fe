const regexEnum = {
    PASSWORD: new RegExp('^(?=.*?[A-Z])(?=.*?[a-z])(?=.*?\\d)(?=.*?[#?!@$%^&*-]).{8,}$'),
    EMAIL: /^(([^<>()\\[\].,;:\s@"]+(\.[^<>()\\[\].,;:\s@"]+)*)|(".+"))@((\[\d{1,3}\.\d{1,3}\.\d{1,3}\.\d{1,3})|(([a-zA-Z\-\d]+\.)+[a-zA-Z]{2,}))$/, // eslint-disable-line
    PHONE: new RegExp('^[+]*\\d{5,20}$'),
    NAME_USER: new RegExp(/^(?=.*[a-zA-ZА-яёЁіІїЇ])[a-zA-ZА-яёЁіІїЇ -]{2,30}$/i),
    NAME_PRODUCT: new RegExp(/^(?=.*[a-zA-ZА-яёЁіІїЇ\d])[a-zA-ZА-яёЁіІїЇ\d _&-]{2,100}$/i),
}

export { regexEnum }
