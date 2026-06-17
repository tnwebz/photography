import { Mail, MapPin } from "lucide-react";

export function Footer() {
  return (
    <footer className="bg-black py-8 sm:py-12 px-4 sm:px-8 text-white">
      <div className="mx-auto max-w-7xl flex flex-col md:flex-row items-center justify-between gap-6 md:gap-10 text-center md:text-left text-sm">
        
        {/* Brand */}
        <div className="flex flex-col gap-1">
          <h2 className="font-serif text-2xl font-bold tracking-wider">sathyastudio's</h2>
          <p className="text-zinc-400 text-xs mt-1">Timeless photography</p>
        </div>

        {/* Contact Info container */}
        <div className="flex flex-col md:flex-row items-center md:items-start gap-6 md:gap-12">
          
          {/* Email */}
          <div className="flex items-center gap-2 text-zinc-300">
            <Mail className="h-4 w-4 text-orange-500" />
            <a href="mailto:sathyastudio2003@gmail.com" className="hover:text-white transition-colors">
              sathyastudio2003@gmail.com
            </a>
          </div>

          {/* Address */}
          <div className="flex items-center gap-2 text-zinc-300 max-w-xs text-center md:text-left">
            <MapPin className="h-5 w-5 shrink-0 text-orange-500" />
            <span>
              22 Ganthi Nagar, Madambakkam Main Road, <br className="hidden md:block" />
              Jain sudasana apartment, Chennai 600073, TN, India
            </span>
          </div>

          {/* Instagram */}
          <div className="flex items-center gap-2 text-zinc-300">
            <svg
              xmlns="http://www.w3.org/2000/svg"
              width="24"
              height="24"
              viewBox="0 0 24 24"
              fill="none"
              stroke="currentColor"
              strokeWidth="2"
              strokeLinecap="round"
              strokeLinejoin="round"
              className="h-4 w-4 text-orange-500"
            >
              <rect x="2" y="2" width="20" height="20" rx="5" ry="5"></rect>
              <path d="M16 11.37A4 4 0 1 1 12.63 8 4 4 0 0 1 16 11.37z"></path>
              <line x1="17.5" y1="6.5" x2="17.51" y2="6.5"></line>
            </svg>
            <a 
              href="https://www.instagram.com/sathya_studio?utm_source=ig_web_button_share_sheet&igsh=ZDNlZDc0MzIxNw==" 
              target="_blank" 
              rel="noreferrer"
              className="hover:text-white transition-colors"
            >
              @sathya_studio
            </a>
          </div>

        </div>
      </div>

      <div className="mt-8 border-t border-white/10 pt-6 text-center text-xs text-zinc-500">
        &copy; {new Date().getFullYear()} sathyastudio's. All rights reserved.
      </div>
    </footer>
  );
}
