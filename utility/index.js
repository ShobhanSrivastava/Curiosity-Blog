const utility = {
    removeHTML(content) {
        const contentWithoutHTML = content.replaceAll(/<[^>]*>/g, '');
        return contentWithoutHTML;
    },

    shortenContent(content, minLength) {
        const len = content.length;
        const shortenedContent = content.substring(0, Math.min(len, minLength));
        return shortenedContent;
    }
};

export default utility;