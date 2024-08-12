"use client";

interface MenuItemProps {
    label: string;
    onClick: () => void;
};

export function MenuItem({ label, onClick }: MenuItemProps) {
    return (
        <div
            className="px-4 py-3 hover:bg-neutral-100 transition font-semibold"
            onClick={onClick}
        >
            {label}
        </div>
    );
}
