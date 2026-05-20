export default function Loading() {
  return (
    <div className="w-full h-screen flex flex-col items-center justify-center bg-white">
      {/* Brand */}
      <div className="text-4xl font-bold text-[#B30437] mb-2">Charter&apos;s Union</div>
      <div className="text-sm text-gray-600 text-center tracking-wider mb-8">WASHINGTON UNIVERSITY</div>

      {/* Pure CSS spinner — no useState/useEffect needed */}
      <div className="w-16 h-16 rounded-full border-4 border-gray-200 border-t-[#B30437] animate-spin" />

      <div className="mt-6 text-sm text-gray-500">Loading...</div>
    </div>
  );
}