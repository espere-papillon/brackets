module.exports = function check(str, bracketsConfig) {
    let chars = str.split(''),
        stack = [],
        open = bracketsConfig.map(i => i[0]),
        close = bracketsConfig.map(i => i[1]),
        closeIndex,
        openIndex,
        count = 0,
        arr = [];

    for (let i = 0; i<open.length;i++)
        arr.push(0);

    // Проходимся по строке, проверяя каждый ее символ (п.4).
    for (let i = 0, len = chars.length; i < len; i++) {
        openIndex = open.indexOf(chars[i]);
        closeIndex = close.indexOf(chars[i]);
        if (openIndex !== -1) {
            // Нашли открывающую скобку. Помещаем ее в стек (п.2).
            if (closeIndex !== -1 && arr[closeIndex] > 0) {
                openIndex = stack.pop();
                count = 0;
                arr[closeIndex] = count;
                if (closeIndex !== openIndex) {
                    return false;
                }
                continue;
            } else if (closeIndex !== -1 && arr[closeIndex] === 0) {
                stack.push(openIndex);
                count++;
                arr[closeIndex] = count;
                continue;
            } else {
                stack.push(openIndex);
                continue;
            }
        }


        if (closeIndex !== -1) {
            // Нашли закрывающую скобку. Проверяем ее соответствие открывающей (п.3).
            openIndex = stack.pop();
            if (closeIndex !== openIndex) {
                return false;
            }
        }
    }

    // Проверяем дисбаланс открытых/закрытых скобок (п.5).
    if (stack.length !== 0) {
        return false;
    }

    return true;
}
