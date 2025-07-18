'use client';

import { FiChevronDown, FiGlobe, FiMail } from 'react-icons/fi';

export default function FedExFooter() {
	return (
		<footer className="bg-gray-50 border-t border-gray-200">
			{/* Main Footer Content */}
			<div className="max-w-7xl mx-auto px-4 py-12">
				<div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-4 gap-8">
					{/* Our Company Section */}
					<div>
						<h3 className="text-purple-700 font-semibold text-sm uppercase tracking-wider mb-4">
							OUR COMPANY
						</h3>
						<ul className="space-y-3">
							<li>
								<a
									href="#"
									className="text-gray-600 hover:text-purple-700 text-sm transition-colors"
								>
									About FedEx
								</a>
							</li>
							<li>
								<a
									href="#"
									className="text-gray-600 hover:text-purple-700 text-sm transition-colors"
								>
									Our Portfolio
								</a>
							</li>
							<li>
								<a
									href="#"
									className="text-gray-600 hover:text-purple-700 text-sm transition-colors"
								>
									Investor Relations
								</a>
							</li>
							<li>
								<a
									href="#"
									className="text-gray-600 hover:text-purple-700 text-sm transition-colors"
								>
									Careers
								</a>
							</li>
						</ul>
					</div>

					{/* Middle Section */}
					<div>
						<ul className="space-y-3 mt-8">
							<li>
								<a
									href="#"
									className="text-gray-600 hover:text-purple-700 text-sm transition-colors"
								>
									FedEx Blog
								</a>
							</li>
							<li>
								<a
									href="#"
									className="text-gray-600 hover:text-purple-700 text-sm transition-colors"
								>
									Corporate Responsibility
								</a>
							</li>
							<li>
								<a
									href="#"
									className="text-gray-600 hover:text-purple-700 text-sm transition-colors"
								>
									Newsroom
								</a>
							</li>
							<li>
								<a
									href="#"
									className="text-gray-600 hover:text-purple-700 text-sm transition-colors"
								>
									Contact Us
								</a>
							</li>
						</ul>
					</div>

					{/* More From FedEx Section */}
					<div>
						<h3 className="text-purple-700 font-semibold text-sm uppercase tracking-wider mb-4">
							MORE FROM FEDEX
						</h3>
						<ul className="space-y-3">
							<li>
								<a
									href="#"
									className="text-gray-600 hover:text-purple-700 text-sm transition-colors"
								>
									FedEx Compatible
								</a>
							</li>
							<li>
								<a
									href="#"
									className="text-gray-600 hover:text-purple-700 text-sm transition-colors"
								>
									FedEx Developer Portal
								</a>
							</li>
							<li>
								<a
									href="#"
									className="text-gray-600 hover:text-purple-700 text-sm transition-colors"
								>
									FedEx Logistics
								</a>
							</li>
							<li>
								<a
									href="#"
									className="text-gray-600 hover:text-purple-700 text-sm transition-colors"
								>
									ShopRunner
								</a>
							</li>
						</ul>
					</div>

					{/* Language Section */}
					<div>
						<h3 className="text-purple-700 font-semibold text-sm uppercase tracking-wider mb-4">
							LANGUAGE
						</h3>
						<div className="space-y-4">
							{/* Country/Region Selector */}
							<div className="flex items-center text-gray-600 text-sm">
								<FiGlobe className="w-4 h-4 mr-2" />
								<span>United States</span>
							</div>

							{/* Language Dropdown */}
							<div className="relative">
								<select className="appearance-none bg-white border border-gray-300 rounded px-3 py-2 pr-8 text-sm text-gray-600 focus:outline-none focus:ring-2 focus:ring-purple-500 focus:border-transparent w-full">
									<option value="en">English</option>
									<option value="es">Español</option>
									<option value="fr">Français</option>
								</select>
								<FiChevronDown className="absolute right-2 top-1/2 transform -translate-y-1/2 w-4 h-4 text-gray-400 pointer-events-none" />
							</div>
						</div>
					</div>
				</div>

				{/* Divider */}
				<div className="border-t border-gray-300 my-8"></div>

				{/* Social Media Section */}
				<div className="mb-8">
					<h3 className="text-purple-700 font-semibold text-sm uppercase tracking-wider mb-4">
						FOLLOW FEDEX
					</h3>
					<div className="flex space-x-4">
						{/* Email */}
						<a
							href="#"
							className="w-8 h-8 bg-gray-200 rounded-full flex items-center justify-center hover:bg-purple-100 transition-colors"
							aria-label="Email"
						>
							<FiMail className="w-4 h-4 text-gray-600" />
						</a>

						{/* Facebook */}
						<a
							href="#"
							className="w-8 h-8 bg-gray-200 rounded-full flex items-center justify-center hover:bg-purple-100 transition-colors"
							aria-label="Facebook"
						>
							<svg
								className="w-4 h-4 text-gray-600"
								fill="currentColor"
								viewBox="0 0 24 24"
							>
								<path d="M24 12.073c0-6.627-5.373-12-12-12s-12 5.373-12 12c0 5.99 4.388 10.954 10.125 11.854v-8.385H7.078v-3.47h3.047V9.43c0-3.007 1.792-4.669 4.533-4.669 1.312 0 2.686.235 2.686.235v2.953H15.83c-1.491 0-1.956.925-1.956 1.874v2.25h3.328l-.532 3.47h-2.796v8.385C19.612 23.027 24 18.062 24 12.073z" />
							</svg>
						</a>

						{/* Twitter/X */}
						<a
							href="#"
							className="w-8 h-8 bg-gray-200 rounded-full flex items-center justify-center hover:bg-purple-100 transition-colors"
							aria-label="Twitter"
						>
							<svg
								className="w-4 h-4 text-gray-600"
								fill="currentColor"
								viewBox="0 0 24 24"
							>
								<path d="M18.244 2.25h3.308l-7.227 8.26 8.502 11.24H16.17l-5.214-6.817L4.99 21.75H1.68l7.73-8.835L1.254 2.25H8.08l4.713 6.231zm-1.161 17.52h1.833L7.084 4.126H5.117z" />
							</svg>
						</a>

						{/* Instagram */}
						<a
							href="#"
							className="w-8 h-8 bg-gray-200 rounded-full flex items-center justify-center hover:bg-purple-100 transition-colors"
							aria-label="Instagram"
						>
							<svg
								className="w-4 h-4 text-gray-600"
								fill="currentColor"
								viewBox="0 0 24 24"
							>
								<path d="M12.017 0C5.396 0 .029 5.367.029 11.987c0 6.62 5.367 11.987 11.988 11.987 6.62 0 11.987-5.367 11.987-11.987C24.014 5.367 18.637.001 12.017.001zM8.449 16.988c-1.297 0-2.448-.49-3.323-1.297C4.198 14.895 3.708 13.744 3.708 12.447s.49-2.448 1.418-3.323c.875-.807 2.026-1.297 3.323-1.297s2.448.49 3.323 1.297c.928.875 1.418 2.026 1.418 3.323s-.49 2.448-1.418 3.244c-.875.807-2.026 1.297-3.323 1.297zm7.83-9.405c-.315 0-.595-.122-.807-.315-.21-.21-.315-.49-.315-.807 0-.315.105-.595.315-.807.21-.21.49-.315.807-.315.315 0 .595.105.807.315.21.21.315.49.315.807 0 .315-.105.595-.315.807-.21.193-.49.315-.807.315zm-3.832 9.405c-2.5 0-4.532-2.032-4.532-4.532s2.032-4.532 4.532-4.532 4.532 2.032 4.532 4.532-2.032 4.532-4.532 4.532z" />
							</svg>
						</a>

						{/* LinkedIn */}
						<a
							href="#"
							className="w-8 h-8 bg-gray-200 rounded-full flex items-center justify-center hover:bg-purple-100 transition-colors"
							aria-label="LinkedIn"
						>
							<svg
								className="w-4 h-4 text-gray-600"
								fill="currentColor"
								viewBox="0 0 24 24"
							>
								<path d="M20.447 20.452h-3.554v-5.569c0-1.328-.027-3.037-1.852-3.037-1.853 0-2.136 1.445-2.136 2.939v5.667H9.351V9h3.414v1.561h.046c.477-.9 1.637-1.85 3.37-1.85 3.601 0 4.267 2.37 4.267 5.455v6.286zM5.337 7.433c-1.144 0-2.063-.926-2.063-2.065 0-1.138.92-2.063 2.063-2.063 1.14 0 2.064.925 2.064 2.063 0 1.139-.925 2.065-2.064 2.065zm1.782 13.019H3.555V9h3.564v11.452zM22.225 0H1.771C.792 0 0 .774 0 1.729v20.542C0 23.227.792 24 1.771 24h20.451C23.2 24 24 23.227 24 22.271V1.729C24 .774 23.2 0 22.222 0h.003z" />
							</svg>
						</a>

						{/* YouTube */}
						<a
							href="#"
							className="w-8 h-8 bg-gray-200 rounded-full flex items-center justify-center hover:bg-purple-100 transition-colors"
							aria-label="YouTube"
						>
							<svg
								className="w-4 h-4 text-gray-600"
								fill="currentColor"
								viewBox="0 0 24 24"
							>
								<path d="M23.498 6.186a3.016 3.016 0 0 0-2.122-2.136C19.505 3.545 12 3.545 12 3.545s-7.505 0-9.377.505A3.017 3.017 0 0 0 .502 6.186C0 8.07 0 12 0 12s0 3.93.502 5.814a3.016 3.016 0 0 0 2.122 2.136c1.871.505 9.376.505 9.376.505s7.505 0 9.377-.505a3.015 3.015 0 0 0 2.122-2.136C24 15.93 24 12 24 12s0-3.93-.502-5.814zM9.545 15.568V8.432L15.818 12l-6.273 3.568z" />
							</svg>
						</a>

						{/* Pinterest */}
						<a
							href="#"
							className="w-8 h-8 bg-gray-200 rounded-full flex items-center justify-center hover:bg-purple-100 transition-colors"
							aria-label="Pinterest"
						>
							<svg
								className="w-4 h-4 text-gray-600"
								fill="currentColor"
								viewBox="0 0 24 24"
							>
								<path d="M12.017 0C5.396 0 .029 5.367.029 11.987c0 5.079 3.158 9.417 7.618 11.174-.105-.949-.199-2.403.041-3.439.219-.937 1.406-5.957 1.406-5.957s-.359-.72-.359-1.781c0-1.663.967-2.911 2.168-2.911 1.024 0 1.518.769 1.518 1.688 0 1.029-.653 2.567-.992 3.992-.285 1.193.6 2.165 1.775 2.165 2.128 0 3.768-2.245 3.768-5.487 0-2.861-2.063-4.869-5.008-4.869-3.41 0-5.409 2.562-5.409 5.199 0 1.033.394 2.143.889 2.741.097.118.112.222.085.343-.09.375-.293 1.199-.334 1.363-.053.225-.172.271-.402.165-1.495-.69-2.433-2.878-2.433-4.646 0-3.776 2.748-7.252 7.92-7.252 4.158 0 7.392 2.967 7.392 6.923 0 4.135-2.607 7.462-6.233 7.462-1.214 0-2.357-.629-2.75-1.378l-.748 2.853c-.271 1.043-1.002 2.35-1.492 3.146C9.57 23.812 10.763 24.009 12.017 24.009c6.624 0 11.99-5.367 11.99-11.988C24.007 5.367 18.641.001 12.017.001z" />
							</svg>
						</a>
					</div>
				</div>
			</div>

			{/* Bottom Purple Bar */}
			<div className="bg-purple-700 text-white py-4">
				<div className="max-w-7xl mx-auto px-4">
					<div className="flex flex-col md:flex-row justify-between items-center text-sm">
						<div className="mb-2 md:mb-0">© FedEx 1995-2025</div>
						<div className="flex flex-wrap items-center space-x-1 md:space-x-4">
							<a href="#" className="hover:text-purple-200 transition-colors">
								Site Map
							</a>
							<span className="text-purple-300">|</span>
							<a href="#" className="hover:text-purple-200 transition-colors">
								Terms of Use
							</a>
							<span className="text-purple-300">|</span>
							<a href="#" className="hover:text-purple-200 transition-colors">
								Privacy & Security
							</a>
							<span className="text-purple-300">|</span>
							<a href="#" className="hover:text-purple-200 transition-colors">
								Ad Choices
							</a>
						</div>
					</div>
				</div>
			</div>
		</footer>
	);
}
