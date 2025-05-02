// src/util.ts

export async function copyToClipboard(text: string): Promise<void> {
    try {
        await navigator.clipboard.writeText(text);
        console.log('Copied to clipboard!');
    } catch (err) {
        console.error('Failed to copy:', err);
    }
}
