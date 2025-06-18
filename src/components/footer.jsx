import { FaFacebookF, FaTwitter, FaGithub, FaDribbble } from 'react-icons/fa';

export default function Footer() {
  return (
    <footer className="bg-white py-4 px-4 h-20 flex justify-center lg:md:w-[75vw] sm:w-[95vw] shadow-sm rounded-lg mx-auto">
      <div className="max-w-5xl w-full h-full flex flex-row items-center justify-between">
        
        {/* Left: Text */}
        <p className="text-sm text-gray-500">
          © 2025 Bewhoop Pvt Ltd. All rights reserved.
        </p>

        {/* Right: Social icons */}
        <div className="flex items-center space-x-4 text-gray-800 text-sm">
          <a href="#" aria-label="Facebook" className="hover:text-blue-600">
            <FaFacebookF size={18} />
          </a>
          <a href="#" aria-label="Twitter" className="hover:text-blue-400">
            <FaTwitter size={18}/>
          </a>
          <a href="#" aria-label="GitHub" className="hover:text-gray-600">
            <FaGithub size={18}/>
          </a>
          <a href="#" aria-label="Dribbble" className="hover:text-pink-500">
            <FaDribbble size={18}/>
          </a>
        </div>
      </div>
    </footer>
  );
}
