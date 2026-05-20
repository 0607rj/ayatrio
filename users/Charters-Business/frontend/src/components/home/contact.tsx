import React from 'react'
import Image from 'next/image'

const Contact = () => {
    return (<>

        <div className="text-center mb-8">
            <div
                className="inline-flex items-center bg-[#B30437] text-white px-4 py-2 rounded-full text-xs font-medium mb-4"
                role="status"
            >
                <span>Get Started</span>
            </div>
            <p
                className="text-xs font-semibold text-[#B30437] tracking-wider mb-2"
                role="text"
            >
                READY TO BEGIN?
            </p>
            <h2 className="text-2xl sm:text-3xl md:text-4xl font-light leading-tight text-black">
                Its time to get{" "}
                <span className="italic text-[#B30437]">
                    out there
                </span>
                .
            </h2>
        </div>

        <div className="grid grid-cols-1 lg:grid-cols-2 gap-4">
            <div className="relative bg-gradient-to-r from-orange-600 to-orange-500 text-white p-4 md:p-6 overflow-hidden rounded-lg shadow-sm">
                <div className="absolute inset-0 opacity-30">
                    <Image
                        src="https://images.unsplash.com/photo-1496442226666-8d4d0e62e6e9?ixlib=rb-4.0.3&auto=format&fit=crop&w=800&q=80"
                        alt="NYC Skyline"
                        fill
                        style={{ objectFit: "cover" }}
                    />
                </div>

                <div className="relative z-10">
                    <h3 className="text-base font-bold mb-3">
                        US Mailing Address:
                    </h3>
                    <div className="space-y-1 text-sm">
                        <p>401 Park Ave,</p>
                        <p>New York, NY 10016,</p>
                        <p>United States of America</p>
                    </div>

                    <div className="mt-4 space-y-1 text-xs">
                        <p>
                            <span className="font-semibold">
                                International (Toll):
                            </span>{" "}
                            +12025396151
                        </p>
                        <p>
                            <span className="font-semibold">
                                United States (Toll Free):
                            </span>{" "}
                            +18333829232
                        </p>
                        <p>
                            <span className="font-semibold">
                                United Kingdom (Toll Free):
                            </span>{" "}
                            +448008089010
                        </p>
                        <p>
                            <span className="font-semibold">Mexico (Toll Free):</span>{" "}
                            +528002230302
                        </p>
                        <p>
                            <span className="font-semibold">
                                Argentina (Toll Free):
                            </span>{" "}
                            +548002220302
                        </p>
                    </div>

                    <div className="mt-3 flex items-center gap-2">
                        <div className="w-2 h-2 bg-[#B30437] rounded-full"></div>
                        <span className="text-xs font-semibold">REACH US</span>
                    </div>

                    <div className="mt-2 text-xs">
                        <p className="font-semibold">Operational Hours</p>
                        <p>5 AM UTC - 9 PM UTC</p>
                    </div>
                </div>
            </div>

            <div className="space-y-4">
                <div className="bg-[#0f2922] text-white p-6 md:p-8 relative h-28 md:h-36">
                    <div className="absolute top-4 right-4">
                        <Image src="/Charters-icon/Cancel.svg" alt="icon" width={12} height={12} className="w-4 h-4" />
                    </div>
                    <div className="flex flex-col justify-center h-full">
                        <p className="text-sm mb-1">Write to Us</p>
                        <p className="text-base font-bold">info@tetr.org</p>
                    </div>
                </div>

                <div className="bg-[#B30437] text-white p-6 md:p-8 relative h-28 md:h-36">
                    <div className="absolute top-4 right-4">
                        <Image src="/Charters-icon/Cancel.svg" alt="icon" width={12} height={12} className="w-4 h-4" />
                    </div>
                    <div className="flex flex-col justify-center h-full">
                        <p className="text-base font-bold leading-tight">
                            Schedule a call with our
                            <br />
                            Admissions Counsellor
                        </p>
                    </div>
                </div>
            </div>
        </div></>
    )
}

export default Contact