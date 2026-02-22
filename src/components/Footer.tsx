import { TypographySmall } from "@/components/ui/typography";

const Footer = () => {
    return (
        <footer className="bg-secondary py-8 text-center border-t border-border mt-auto">
            <TypographySmall className="text-secondary-foreground text-sm">
                &copy; {new Date().getFullYear()} Luciano Scola. All rights reserved.
            </TypographySmall>
        </footer>
    );
};

export default Footer;
