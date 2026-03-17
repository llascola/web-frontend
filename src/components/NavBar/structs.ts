import type { MessageDescriptor } from "react-intl";
import { messages } from "./messages";
import type { NavLink } from "./types";

const getNavLinkFromMessage = (message: MessageDescriptor): { id: string, message: MessageDescriptor } => {
    return { id: message.id!, message };
}

export const navLinks: NavLink[] = [
    { ...getNavLinkFromMessage(messages.about), to: "/#about" },
    { ...getNavLinkFromMessage(messages.portfolio), to: "/#portfolio" },
    { ...getNavLinkFromMessage(messages.blog), to: "/blog" },
];

export const home: NavLink = { ...getNavLinkFromMessage(messages.home), to: "/" };
export const dashboard: NavLink = { ...getNavLinkFromMessage(messages.dashboard), to: "/dashboard" };