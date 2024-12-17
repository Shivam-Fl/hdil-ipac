"use client"

import * as React from "react"
import Link from "next/link"
import { Mountain } from 'lucide-react'
import { Sheet, SheetContent, SheetTrigger } from "@/components/ui/sheet"
import { Button } from "@/components/ui/button"

export default function Navbar() {
  const [isOpen, setIsOpen] = React.useState(false)

  return (
    <header className="sticky top-0 z-50 w-full border-b bg-white">
      <div className="container  max-w-7xl mx-auto flex h-16 items-center px-4">
        <Link href="/" className="flex items-center space-x-2">
          <Mountain className="h-6 w-6 text-red-600" />
          <span className="text-xl font-bold text-red-600">IRCA</span>
        </Link>
        
        {/* Desktop Navigation */}
        <nav className="hidden md:flex md:flex-1 md:items-center md:justify-center">
          <ul className="flex space-x-8">
            <li>
              <Link href="/" className="text-sm font-medium transition-colors hover:text-red-600">
                Home
              </Link>
            </li>
            <li>
              <Link href="/about" className="text-sm font-medium transition-colors hover:text-red-600">
                About
              </Link>
            </li>
            <li>
              <Link href="/updates" className="text-sm font-medium transition-colors hover:text-red-600">
                Updates
              </Link>
            </li>
            <li>
              <Link href="/directory" className="text-sm font-medium transition-colors hover:text-red-600">
                Business Directory
              </Link>
            </li>
            <li>
              <Link href="/helpline" className="text-sm font-medium transition-colors hover:text-red-600">
                Helpline
              </Link>
            </li>
          </ul>
        </nav>

        {/* Desktop Buttons */}
        <div className="hidden md:flex md:items-center md:space-x-4">
          <Button variant="ghost" asChild>
            <Link href="/contact">
              <span className="flex items-center">
                Contact Us
                <svg
                  className="ml-2 h-4 w-4"
                  xmlns="http://www.w3.org/2000/svg"
                  viewBox="0 0 20 20"
                  fill="currentColor"
                >
                  <path
                    fillRule="evenodd"
                    d="M5.22 14.78a.75.75 0 001.06 0l7.22-7.22v5.69a.75.75 0 001.5 0v-7.5a.75.75 0 00-.75-.75h-7.5a.75.75 0 000 1.5h5.69l-7.22 7.22a.75.75 0 000 1.06z"
                    clipRule="evenodd"
                  />
                </svg>
              </span>
            </Link>
          </Button>
          <Button variant="outline" asChild>
            <Link href="/login">Log In</Link>
          </Button>
        </div>

        {/* Mobile Menu Button */}
        <Sheet open={isOpen} onOpenChange={setIsOpen}>
          <SheetTrigger asChild className="md:hidden">
            <Button variant="ghost" className="ml-auto h-10 px-2">
              <svg
                className="h-6 w-6"
                fill="none"
                stroke="currentColor"
                viewBox="0 0 24 24"
              >
                <path
                  strokeLinecap="round"
                  strokeLinejoin="round"
                  strokeWidth={2}
                  d="M4 6h16M4 12h16M4 18h16"
                />
              </svg>
              <span className="sr-only">Toggle menu</span>
            </Button>
          </SheetTrigger>
          <SheetContent side="right" className="w-[300px] sm:w-[400px]">
            <nav className="flex flex-col space-y-4">
              <Link
                href="/"
                className="text-lg font-medium transition-colors hover:text-red-600"
                onClick={() => setIsOpen(false)}
              >
                Home
              </Link>
              <Link
                href="/about"
                className="text-lg font-medium transition-colors hover:text-red-600"
                onClick={() => setIsOpen(false)}
              >
                About
              </Link>
              <Link
                href="/updates"
                className="text-lg font-medium transition-colors hover:text-red-600"
                onClick={() => setIsOpen(false)}
              >
                Updates
              </Link>
              <Link
                href="/directory"
                className="text-lg font-medium transition-colors hover:text-red-600"
                onClick={() => setIsOpen(false)}
              >
                Business Directory
              </Link>
              <Link
                href="/helpline"
                className="text-lg font-medium transition-colors hover:text-red-600"
                onClick={() => setIsOpen(false)}
              >
                Helpline
              </Link>
              <Link
                href="/contact"
                className="text-lg font-medium transition-colors hover:text-red-600"
                onClick={() => setIsOpen(false)}
              >
                Contact Us
              </Link>
              <Button className="w-full" variant="outline" asChild>
                <Link href="/login" onClick={() => setIsOpen(false)}>
                  Log In
                </Link>
              </Button>
            </nav>
          </SheetContent>
        </Sheet>
      </div>
    </header>
  )
}

