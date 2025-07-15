
/**
 * Generates a thumbnail image by calling our secure backend API endpoint.
 * @param prompt - The user's prompt (e.g., video title).
 * @returns A promise that resolves to a base64 encoded data URL of the image.
 */
export const generateThumbnail = async (prompt: string): Promise<string> => {
    try {
        const response = await fetch('/api/generate', {
            method: 'POST',
            headers: {
                'Content-Type': 'application/json',
            },
            body: JSON.stringify({ prompt }),
        });

        if (!response.ok) {
            const errorData = await response.json();
            throw new Error(errorData.error || `Request failed with status ${response.status}`);
        }

        const data = await response.json();
        return data.imageUrl;

    } catch (error) {
        console.error("Error fetching from /api/generate:", error);
        if (error instanceof Error) {
            // Propagate a user-friendly message.
            throw new Error(`Failed to generate image: ${error.message}`);
        }
        throw new Error("An unknown error occurred while communicating with the server.");
    }
};
