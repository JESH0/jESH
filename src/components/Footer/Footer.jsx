import React from 'react'
import Logo from '../Logo'
import { Link } from 'react-router-dom'

function Footer() {
  return (
    <section className="relative overflow-hidden text-white"
      style={{
        backgroundImage: "url('https://images.unsplash.com/photo-1639762681057-408e52192e55?q=80&w=2232&auto=format&fit=crop')",
        backgroundSize: "cover",
        backgroundPosition: "center",
        backgroundAttachment: "fixed",
        backgroundBlendMode: "overlay"
      }}>
      <div className="relative mx-auto max-w-7xl flex items-end bg-gray-800/800 backdrop-blur-2xl">
        <div className="m-6 flex flex-wrap">
          <div className="w-1/2 p-6 md:w-1/2 lg:w-5/12">
            <div className="flex h-full flex-col justify-between">
              <div className="mb-4 inline-flex items-center">
                <Logo width="" />
              </div>
              <div>
                <p className="text-sm md:text-base">
                  &copy; Copyright 2023. All Rights Reserved by DevUI.
                </p>
              </div>
            </div>
          </div>

          <div className="w-1/2 p-6 md:w-1/2 lg:w-2/12">
            <div className="h-full">
              <h3 className="tracking-px mb-9 text-xs md:text-sm font-semibold uppercase">
                Company
              </h3>
              <ul>
                <li className="mb-4">
                  <Link className="text-sm md:text-base font-medium hover:text-gray-700" to="/">
                    Features
                  </Link>
                </li>
                <li className="mb-4">
                  <Link className="text-sm md:text-base font-medium hover:text-gray-700" to="/">
                    Pricing
                  </Link>
                </li>
                <li className="mb-4">
                  <Link className="text-sm md:text-base font-medium hover:text-gray-700" to="/">
                    Affiliate Program
                  </Link>
                </li>
                <li>
                  <Link className="text-sm md:text-base font-medium hover:text-gray-700" to="/">
                    Press Kit
                  </Link>
                </li>
              </ul>
            </div>
          </div>

          <div className="w-1/2 p-6 md:w-1/2 lg:w-2/12">
            <div className="h-full">
              <h3 className="tracking-px mb-9 text-xs md:text-sm font-semibold uppercase text-gray-500">
                Support
              </h3>
              <ul>
                <li className="mb-4">
                  <Link className="text-sm md:text-base font-medium hover:text-gray-700" to="/">
                    Account
                  </Link>
                </li>
                <li className="mb-4">
                  <Link className="text-sm md:text-base font-medium hover:text-gray-700" to="/">
                    Help
                  </Link>
                </li>
                <li className="mb-4">
                  <Link className="text-sm md:text-base font-medium hover:text-gray-700" to="/">
                    Contact Us
                  </Link>
                </li>
                <li>
                  <Link className="text-sm md:text-base font-medium hover:text-gray-700" to="/">
                    Customer Support
                  </Link>
                </li>
              </ul>
            </div>
          </div>

          <div className="w-1/2 p-6 md:w-1/2 lg:w-3/12">
            <div className="h-full">
              <h3 className="tracking-px mb-9 text-xs md:text-sm font-semibold uppercase text-gray-500">
                Legals
              </h3>
              <ul>
                <li className="mb-4">
                  <Link className="text-sm md:text-base font-medium hover:text-gray-700" to="/">
                    Terms &amp; Conditions
                  </Link>
                </li>
                <li className="mb-4">
                  <Link className="text-sm md:text-base font-medium hover:text-gray-700" to="/">
                    Privacy Policy
                  </Link>
                </li>
                <li>
                  <Link className="text-sm md:text-base font-medium hover:text-gray-700" to="/">
                    Licensing
                  </Link>
                </li>
              </ul>
            </div>
          </div>

        </div>
      </div>
    </section>
  )
}

export default Footer
