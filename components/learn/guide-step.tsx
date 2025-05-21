"use client"

export const GuideStep = ({ step, title, description }: { step: string; title: string; description: string }) => {
  return (
    <div className="mb-10 flex flex-col md:flex-row items-start gap-6">
      <div className="flex-shrink-0 w-12 h-12 rounded-full bg-[#22B4C8] text-black flex items-center justify-center text-xl font-bold">
        {step}
      </div>
      <div>
        <h2 className="text-2xl font-light mb-3 text-white">{title}</h2>
        <p className="text-base text-gray-300">{description}</p>
      </div>
    </div>
  )
}
