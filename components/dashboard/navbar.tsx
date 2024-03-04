'use client'

import { UserButton } from "@clerk/nextjs"

export const Navbar = () => {
    return (
        <nav className="flex items-center gap-x-4 p-5">
            <div className="hidden lg:flex-1">
                {/* TODO: SEARCH BAR */}
            </div>
            <UserButton />
        </nav>
    )
}