"use client";
import Image from "next/image";

const cards = [
  {
    title: "Career councling",
    body: "What make Chater's Union of business distinctive What make Chater's Union of business distinctive",
  },
  {
    title: "Career councling",
    body: "What make Chater's Union of business distinctive What make Chater's Union of business distinctive",
  },
  {
    title: "Career councling",
    body: "What make Chater's Union of business distinctive What make Chater's Union of business distinctive",
  },
  {
    title: "Career councling",
    body: "What make Chater's Union of business distinctive What make Chater's Union of business distinctive",
  },
];

const testimonials = [
  {
    profiles: [
      {
        img: "https://images.unsplash.com/photo-1494790108377-be9c29b29330?w=80&h=80&fit=crop&crop=face",
        name: "Rajat ray",
        role: "Finance analysys",
      },
      {
        img: "https://images.unsplash.com/photo-1507003211169-0a1dd7228f2d?w=80&h=80&fit=crop&crop=face",
        name: "Rajat ray",
        role: "Finance analysys",
      },
      {
        img: "https://images.unsplash.com/photo-1531746020798-e6953c6e8e04?w=80&h=80&fit=crop&crop=face",
        name: "Rajat ray",
        role: "Finance analysys",
      },
    ],
    title: "Career councling",
    body: "What make Chater's Union of business distinctive What make Chater's Union of business distinctive",
  },
  {
    profiles: [
      {
        img: "https://images.unsplash.com/photo-1438761681033-6461ffad8d80?w=80&h=80&fit=crop&crop=face",
        name: "Rajat ray",
        role: "Finance analysys",
      },
      {
        img: "https://images.unsplash.com/photo-1500648767791-00dcc994a43e?w=80&h=80&fit=crop&crop=face",
        name: "Rajat ray",
        role: "Finance analysys",
      },
      {
        img: "https://images.unsplash.com/photo-1544005313-94ddf0286df2?w=80&h=80&fit=crop&crop=face",
        name: "Rajat ray",
        role: "Finance analysys",
      },
    ],
    title: "Career councling",
    body: "What make Chater's Union of business distinctive What make Chater's Union of business distinctive",
  },
];

const AVATAR_SIZE = 80;
const OVERLAP = 10;
const STEP = AVATAR_SIZE - OVERLAP;

export default function AmplifySection() {
  return (
    <section className="pt-12 mx-auto">
      {/* Header */}
      <h1 className="text-4xl font-semibold text-center leading-tight mb-3">
        Amplify instruction with tools that simplify everyday tasks
      </h1>
      <p className="text-center text-gray-500 text-sm mb-10">
        Boost instructional time with tools purpose-built for teaching, productivity, and collaboration.
      </p>

      {/* Feature Cards */}
      <div className="grid grid-cols-1 sm:grid-cols-2 lg:grid-cols-4 bg-gray-200">
        {cards.map((card, i) => (
          <div
            key={i}
            className="relative border-b border-gray-200 rounded-b-xl p-5 text-center flex flex-col items-center gap-3 bg-white first:rounded-bl-none last:border-r-0 last:rounded-br-none"
          >
            {i !== cards.length - 1 && (
              <div className="absolute right-0 top-0 h-full w-[1px] bg-gradient-to-b from-gray-50 to-gray-200" />
            )}
            <div className="w-10 h-10 flex items-center justify-center opacity-60">
              <Image src="/Charters-icon/Cancel.svg" alt="icon" width={40} height={40} />
            </div>
            <h3 className="text-sm font-semibold text-gray-900">{card.title}</h3>
            <p className="text-xs text-gray-500 leading-relaxed">{card.body}</p>
          </div>
        ))}
      </div>

      {/* Testimonial Cards */}
      <div className="grid grid-cols-1 md:grid-cols-2 bg-gray-200">
        {testimonials.map((testimonial, i) => (
          <div
            key={i}
            className="relative rounded-t-xl px-6 py-5 flex flex-col items-center gap-4 bg-white first:rounded-tl-none last:rounded-tr-none"
          >
            {i !== testimonials.length - 1 && (
              <div className="absolute right-0 top-0 h-full w-[1px] bg-gradient-to-b from-gray-200 to-gray-50" />
            )}

            <div className="flex flex-col items-center gap-2">
              <div className="flex">
                {testimonial.profiles.map((profile, j) => (
                  <img
                    key={j}
                    src={profile.img}
                    alt={profile.name}
                    className="rounded-full border-[3px] border-white object-cover"
                    style={{
                      width: AVATAR_SIZE,
                      height: AVATAR_SIZE,
                      marginLeft: j === 0 ? 0 : -OVERLAP,
                    }}
                  />
                ))}
              </div>

              <div
                className="flex"
                style={{
                  width: AVATAR_SIZE + STEP * (testimonial.profiles.length - 1),
                }}
              >
                {testimonial.profiles.map((profile, j) => (
                  <div
                    key={j}
                    className="flex flex-col items-center flex-shrink-0"
                    style={{
                      width: j === testimonial.profiles.length - 1 ? AVATAR_SIZE : STEP,
                    }}
                  >
                    <p className="text-xs font-medium text-gray-900 text-center">{profile.name}</p>
                    <p className="text-[8px] line-clamp-1 text-gray-400 text-left">{profile.role}</p>
                  </div>
                ))}
              </div>
            </div>

            {/* Title & Body */}
            <div className="text-center">
              <h4 className="text-sm font-semibold text-gray-900 mb-1">{testimonial.title}</h4>
              <p className="text-xs text-gray-500 leading-relaxed">{testimonial.body}</p>
            </div>
          </div>
        ))}
      </div>
    </section>
  );
}