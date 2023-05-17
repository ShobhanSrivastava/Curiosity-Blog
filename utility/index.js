const utility = {
    removeHTML(content) {
        const contentWithoutHTML = content.replaceAll(/<[^>]*>/g, '');
        return contentWithoutHTML;
    },

    shortenContent(content) {
        const len = content.length;
        const shortenedContent = content.substring(0, Math.min(len, 500));
        return shortenedContent;
    }
};

export default utility;