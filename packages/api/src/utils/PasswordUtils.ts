export async function hashPassword(password: string) {
    const message = new TextEncoder().encode(password);
    const hash = await crypto.subtle.digest("SHA-256", message);
    return Array
        .from(new Uint8Array(hash))
        .map(b => b.toString(16).padStart(2, "0"))
        .join("");
}