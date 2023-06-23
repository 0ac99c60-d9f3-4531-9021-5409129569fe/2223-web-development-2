export const VALID_USERNAME_REGEX = /^[a-zA-Z0-9]{3,100}$/;
export const STRONG_PASSWORD_REGEX = /^(?=.*[a-z])(?=.*[A-Z])(?=.*[0-9])(?=.{8,})/;
export const MEDIUM_PASSWORD_REGEX = /^(((?=.*[a-z])(?=.*[A-Z]))|((?=.*[a-z])(?=.*[0-9]))|((?=.*[A-Z])(?=.*[0-9])))(?=.{6,})/;
export const MAX_DISPLAY_NAME_LENGTH = 100;
export const VALID_IMAGE_TYPES = ["image/png", "image/jpeg", "image/jpg", "image/webp"];
export const MAX_IMAGE_SIZE = 1024 * 1024 * 2; // 2 MiB
