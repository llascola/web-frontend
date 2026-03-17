import { useState } from "react";
import { Link, useLocation } from "react-router-dom";
import { Menu, X } from "lucide-react";
import { ThemeToggle } from "@/components/ThemeToggle";
import { Button } from "@/components/ui/button/button";
import { scrollToElement } from "@/utils/scroll";
import { FormattedMessage } from "react-intl";
import { navLinks, home } from "./structs";
import { messages } from "./messages";


const Navbar = () => {
    const [isOpen, setIsOpen] = useState(false);
    const location = useLocation();

    const onNavigate = (to: string) => {
        setIsOpen(false);

        if (to.includes("#")) {
            const [path, hash] = to.split("#");

            if (location.pathname === path) {
                scrollToElement(hash);
            }
        }
    }

    return (
        <nav className="fixed top-0 left-0 right-0 z-50 bg-background/80 backdrop-blur-md border-b border-border">
            <div className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8">
                <div className="flex justify-between items-center h-16">
                    {/* Logo */}
                    <div className="flex-shrink-0 flex items-center">
                        <Link
                            to={home.to}
                            onClick={() => onNavigate(home.to)}
                            className="text-xl font-bold text-foreground"
                        >
                            lucianoscola<span className="text-primary">.com</span>
                        </Link>
                    </div>

                    {/* Desktop Menu */}
                    <div className="hidden md:flex items-center space-x-8">
                        {navLinks.map((link) =>
                            <Link
                                key={link.id}
                                to={link.to}
                                onClick={() => onNavigate(link.to)}
                                className="text-muted-foreground hover:text-primary transition-colors font-medium"
                            >
                                <FormattedMessage {...link.message} />
                            </Link>
                        )}
                        <ThemeToggle />
                        <Button asChild variant="default" size="sm">
                            <Link to="/dashboard">
                                <FormattedMessage {...messages.dashboard} />
                            </Link>
                        </Button>
                    </div>

                    {/* Mobile Menu Button  */}
                    <div className="md:hidden flex items-center gap-4">
                        <ThemeToggle />
                        <button
                            onClick={() => setIsOpen(!isOpen)}
                            className="text-muted-foreground hover:text-foreground focus:outline-none"
                        >
                            {isOpen ? <X size={24} /> : <Menu size={24} />}
                        </button>
                    </div>
                </div>
            </div>

            {/* Mobile Menu */}
            {isOpen && (
                <div className="md:hidden bg-background border-b border-border">
                    <div className="px-2 pt-2 pb-3 space-y-1 sm:px-3">
                        {navLinks.map((link) =>
                            <Link
                                key={link.id}
                                to={link.to}
                                className="block px-3 py-2 rounded-md text-base font-medium text-muted-foreground hover:text-primary hover:bg-muted"
                                onClick={() => setIsOpen(false)}
                            >
                                <FormattedMessage {...link.message} />
                            </Link>
                        )}
                        <Link
                            to="/dashboard"
                            className="block px-3 py-2"
                            onClick={() => setIsOpen(false)}
                        >
                            <FormattedMessage {...messages.dashboard} />
                        </Link>
                    </div>
                </div>
            )}
        </nav>
    );
};

export default Navbar;
