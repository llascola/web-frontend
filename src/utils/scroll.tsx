export const scrollToElement = (hash: string) => {
    // Remove the # if it was passed in
    const cleanHash = hash.replace("#", "");
    const element = document.getElementById(cleanHash);

    if (element) {
        element.scrollIntoView({ behavior: "smooth" });
    }
};

export const scrollToTop = () => {
    window.scrollTo({ top: 0, behavior: "smooth" });
}