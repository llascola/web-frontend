import type { MessageDescriptor } from "react-intl";

export type NavLink = {
    id: string;
    message: MessageDescriptor;
    to: string;
};