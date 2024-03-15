'use client'

import { UserButton } from "@clerk/nextjs"
import { SearchInput } from "@/components/common/search-input"

export const Navbar = () => {
    return (
        <nav className="flex items-center gap-x-4 p-5">
            <div className="hidden lg:flex lg:flex-1">
               <SearchInput />
            </div>
            <UserButton />
        </nav>
    )
}