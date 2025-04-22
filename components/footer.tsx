import Link from "next/link"
import { Mail, Linkedin, Github, Phone } from "lucide-react"

export default function Footer() {
  return (
    <footer className="bg-black text-white py-8 relative z-10">
      <div className="container mx-auto px-4">
        <div className="flex flex-col md:flex-row justify-between items-center">
          <div className="mb-6 md:mb-0 bg-[oklch(67.47%_0.1726_259.49)] text-black border-2 border-white p-4 rotate-1 rounded-lg">
            <h3 className="text-xl font-bold">Simone Squillace</h3>
            <p className="font-bold">Software Engineer</p>
          </div>

          <div className="flex flex-wrap gap-4 justify-center">
            <Link
              href="tel:+393490732058"
              className="flex items-center gap-2 bg-[oklch(67.47%_0.1726_259.49)] text-black border-2 border-white px-3 py-2 shadow-[4px_4px_0_0_#FFFFFF] hover:translate-y-1 hover:shadow-none transition-all font-bold rounded-lg"
            >
              <Phone size={18} />
              <span>+39 349 073 2058</span>
            </Link>

            <Link
              href="mailto:simonewe99@gmail.com"
              className="flex items-center gap-2 bg-white text-black border-2 border-white px-3 py-2 shadow-[4px_4px_0_0_#FFFFFF] hover:translate-y-1 hover:shadow-none transition-all font-bold rounded-lg"
            >
              <Mail size={18} />
              <span>simonewe99@gmail.com</span>
            </Link>

            <Link
              href="https://linkedin.com/in/simone-squillace-455abb14b"
              target="_blank"
              className="flex items-center gap-2 bg-[oklch(67.47%_0.1726_259.49)] text-black border-2 border-white px-3 py-2 shadow-[4px_4px_0_0_#FFFFFF] hover:translate-y-1 hover:shadow-none transition-all font-bold rounded-lg"
            >
              <Linkedin size={18} />
              <span>LinkedIn</span>
            </Link>

            <Link
              href="https://github.com/thatsimo"
              target="_blank"
              className="flex items-center gap-2 bg-white text-black border-2 border-white px-3 py-2 shadow-[4px_4px_0_0_#FFFFFF] hover:translate-y-1 hover:shadow-none transition-all font-bold rounded-lg"
            >
              <Github size={18} />
              <span>GitHub</span>
            </Link>
          </div>
        </div>

        <div className="mt-8 text-center text-white text-sm border-t-2 border-white pt-4">
          <p className="font-bold transform -rotate-1">
            &copy; {new Date().getFullYear()} Simone Squillace. All rights reserved.
          </p>
        </div>
      </div>
    </footer>
  )
}
