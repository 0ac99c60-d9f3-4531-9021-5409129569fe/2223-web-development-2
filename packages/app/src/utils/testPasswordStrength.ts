import { STRONG_PASSWORD_REGEX, MEDIUM_PASSWORD_REGEX } from "@filmeye/common";

export function testPasswordStrength(str: string) {
    let level = 0;

    if (STRONG_PASSWORD_REGEX.test(str)) level = 3;
    else if (MEDIUM_PASSWORD_REGEX.test(str)) level = 2;
    else if (str.length) level = 1;

    return level;
}