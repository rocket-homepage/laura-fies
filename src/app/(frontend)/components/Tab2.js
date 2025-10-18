"use client";

import Image from "next/image";
import React, { useState } from "react";

// ✅ Swiper Imports
import { Swiper, SwiperSlide } from "swiper/react";
import { Navigation, Pagination } from "swiper/modules";
import "swiper/css";
import "swiper/css/navigation";
import "swiper/css/pagination";
import Link from "next/link";

const Tab2 = ({ data }) => {
    const [mainTab, setMainTab] = useState(0);
    const [subTab, setSubTab] = useState(0);
    // const prevRef = useRef(null);
    // const nextRef = useRef(null);
    if (!data || !Array.isArray(data.link_title)) return null;

    const currentMainTab = data.link_title[mainTab];
    const currentSubTitles = currentMainTab?.sub_title || [];
    const currentLinks = currentSubTitles?.[0]?.links || [];
    const currentSection = currentLinks[subTab];


    return (
        <section className="py-80 min-h-screen bg-gray-50" id="personalvermittlung">
            <div className="container mx-auto">
                {/* ====== MAIN TABS ====== */}
                <div className="flex justify-center space-x-10 mb-32">
                    {data.link_title.map((tab, tabIdx) => (
                        <button
                            key={tabIdx}
                            aria-label={`Informationen für ${tab?.title?.label} anzeigen`}
                            className={`py-12 px-24 text-base border border-solid transition ${mainTab === tabIdx
                                ? "bg-black text-white font-semibold"
                                : "bg-white text-black"
                                }`}
                            onClick={() => setMainTab(tabIdx)}
                        >
                            {tab?.title?.label || `Tab ${tabIdx + 1}`}
                        </button>
                    ))}
                </div>

                {/* ====== SUB TABS ====== */}
                <div className="flex justify-center gap-6 mb-8">
                    {currentLinks.map((sub, subIdx) => (
                        <button
                            key={subIdx}
                            onClick={() => setSubTab(subIdx)}
                            aria-label={`Zum Tab ${sub.label} wechseln`}
                            className={`py-12 px-24 transition border-b-2 text-base  ${subTab === subIdx
                                    ? "border-black text-black font-medium"
                                    : "border-transparent text-gray-500"
                                }`}
                        >
                            {sub.label}
                        </button>
                    ))}
                </div>

                {/* ====== SWIPER SLIDER SECTION ====== */}
                <div className="relative">
                    <div>
                        <h2 className="text-h2/snug font-jakarta font-normal text-center pt-48">{currentSection.sliderHeading}</h2>
                    </div>
                    {currentSection?.slider?.[0]?.["Slider Item"]?.length > 0 && (
                        <Swiper
                            modules={[Navigation, Pagination]}
                            // navigation={{
                            //     prevEl: prevRef.current,
                            //     nextEl: nextRef.current,
                            //     disabledClass: 'opacity-50 cursor-not-allowed',
                            // }}
                            navigation={true}
                            // FIX: Standardmäßig Paginierung aktivieren. 
                            // Die Breakpoints werden dies für größere Bildschirme überschreiben.
                            pagination={{
                                clickable: true,
                                enabled: true,
                            }}

                            slidesPerView={1}
                            spaceBetween={64}
                            breakpoints={{
                                // Ab 1366px: 3 Slides, Paginierung deaktiviert
                                1366: { slidesPerView: 3, pagination: { enabled: false } },
                                // Ab 1200px: 3 Slides, Paginierung deaktiviert
                                1200: { slidesPerView: 3, spaceBetween: 32, pagination: { enabled: false } },
                                // Ab 1024px: 2 Slides, Paginierung deaktiviert
                                768: { slidesPerView: 2, pagination: { enabled: false } },
                                // Ab 640px: 1 Slide, Paginierung aktiviert (Mobile)
                                640: { slidesPerView: 1, pagination: { enabled: true } },
                            }}
                            // onBeforeInit={(swiper) => {
                            //     // Wichtig für Navigation: Refs müssen nach der Initialisierung zugewiesen werden.
                            //     swiper.params.navigation.prevEl = prevRef.current;
                            //     swiper.params.navigation.nextEl = nextRef.current;
                            //     swiper.navigation.init();
                            //     swiper.navigation.update();
                            // }}
                            className="my-32"
                        >

                            {currentSection.slider[0]["Slider Item"].map((item, index) => (
                                <SwiperSlide key={index} className="!h-auto">
                                    <div className="bg-black text-white rounded shadow-md h-full flex flex-col p-32 relative border-5 border-solid border-black">
                                        <div className="h-full">
                                            {/* Achtung: Bitte stellen Sie sicher, dass /images/location.svg auch auf dem Server existiert */}
                                            {item.sliderImage?.url && (
                                                <Image
                                                    src={item.sliderImage.url}
                                                    alt={item.sliderImage?.alt || "slider image"}
                                                    width={48}
                                                    height={48}
                                                    className="w-48 h-48 mb-32 md:mb-80"
                                                />
                                            )}
                                            <h3 className="font-normal font-jakarta text-h3/snug mb-24">{item.Heading}</h3>
                                            <p className="text-base txt-body">{
                                                item.richText?.root?.children?.[0]?.children?.[0]
                                                    ?.text || ""
                                            }</p>
                                        </div>
                                        <div className="box w-100 h-100 bg-white flex justify-center items-center ml-auto -mr-32 -mb-32">
                                            <span className="font-jakarta font-medium text-4xl text-black">{index + 1}</span>
                                        </div>
                                    </div>
                                </SwiperSlide>
                            ))}
                        </Swiper>)}
                    {/* Custom Navigation Buttons */}
                    {/* <button
                        ref={prevRef}
                        className="absolute top-1/2 left-4 -translate-y-1/2 z-10 bg-white rounded-full p-3 shadow cursor-pointer hidden md:block"
                        aria-label="Previous Slide"
                    >
                        &#8592;
                    </button>
                    <button
                        ref={nextRef}
                        className="absolute top-1/2 right-4 -translate-y-1/2 z-10 bg-white rounded-full p-3 shadow cursor-pointer hidden md:block"
                        aria-label="Next Slide"
                    >
                        &#8594;
                    </button> */}
                </div>



                {/* ====== CTA SECTION ====== */}
                {currentSection?.slider?.[0]?.["CTA Item"]?.length > 0 && (
                    <div className="p-32 my-64 space-y-24 text-center">
                        {currentSection.slider[0]["CTA Item"].map((cta) => (
                            <>
                                <div className='flex justify-center items-center flex-col gap-24'>
                                    <h2 className="text-h2/snug text-center">{cta.CTAHeading}</h2>
                                    <div className='line max-w-225 w-full border-1 border-solid border-grey1'></div>
                                </div>
                                <p> {cta.richText?.root?.children?.[0]?.children?.[0]?.text || ""}</p>
                                <div>
                                    {cta.CTA_link && (
                                        <Link
                                            href={cta.CTA_link.url}
                                            target={cta.CTA_link.target}
                                            className="inline-block px-24 py-12 bg-black text-white hover:bg-gray-800 transition"
                                        >
                                            {cta.CTA_link.label}
                                        </Link>
                                    )}
                                </div>
                            </>
                        ))}
                    </div>
                )}
            </div>
        </section>
    );
};

export default Tab2;
