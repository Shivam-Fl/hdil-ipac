import Link from "next/link"
import { Mountain } from 'lucide-react'
import { Separator } from "@/components/ui/separator"

export function Footer() {
  return (
    <footer className="bg-[#FFF2E5]  mt-auto">
      <div className="max-w-7xl px-4 py-8 mx-auto">
        <div className="grid grid-cols-1 gap-8 md:grid-cols-4">
          {/* Logo and Description Section */}
          <div className="space-y-4">
            <Link href="/" className="flex items-center space-x-2">
              <Mountain className="h-8 w-8 text-red-600" />
              <span className="text-2xl font-bold text-red-600">IRCA</span>
            </Link>
            <p className="text-gray-600 max-w-xs">
              Lorem ipsum dolor sit amet, consectetur adipiscing elit.
              Lorem ipsum dolor sit amet, consectetur adipiscing elit.
            </p>
          </div>

          {/* Main Office Section */}
          <div className="space-y-4">
            <h3 className="text-lg font-semibold">Main Office</h3>
            <p className="text-gray-600">
              Lorem ipsum dolor sit amet, consectetur adipiscing elit.
            </p>
          </div>

          {/* Contact Section */}
          <div className="space-y-4">
            <h3 className="text-lg font-semibold">Contact</h3>
            <div className="space-y-2">
              <p className="text-gray-600">+91 9384340344</p>
              <p className="text-gray-600">loremipsum12@gmail.com</p>
            </div>
          </div>

          {/* Links Section */}
          <div className="space-y-4">
            <h3 className="text-lg font-semibold">Links</h3>
            <nav className="flex flex-col space-y-2">
              <Link href="/" className="text-gray-600 hover:text-red-600 transition-colors">
                Home
              </Link>
              <Link href="/about" className="text-gray-600 hover:text-red-600 transition-colors">
                About
              </Link>
              <Link href="/updates" className="text-gray-600 hover:text-red-600 transition-colors">
                Updates
              </Link>
              <Link href="/directory" className="text-gray-600 hover:text-red-600 transition-colors">
                Business Directory
              </Link>
              <Link href="/helpline" className="text-gray-600 hover:text-red-600 transition-colors">
                Helpline
              </Link>
              <Link href="/contact" className="text-gray-600 hover:text-red-600 transition-colors">
                Contact Us
              </Link>
            </nav>
          </div>
        </div>

        <Separator className="my-8 bg-gray-300" />
        
        <div className="text-center text-gray-600">
          <p>Copyright © 2024 IPCA. All Rights Reserved.</p>
        </div>
      </div>
    </footer>
  )
}

