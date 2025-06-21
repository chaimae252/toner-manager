import { Link } from "@inertiajs/react";

export default function Home() {
  return (
    <div className="min-h-screen flex items-center justify-center bg-[#fef2f2] px-4">
      <div className="max-w-md w-full bg-white shadow-xl rounded-2xl p-10 border border-[#ed1c24]/20">
        <h1 className="text-3xl font-extrabold text-center text-[#ed1c24] mb-6 tracking-tight">
          🖨️ Toner Manager
        </h1>
        <p className="text-center text-gray-600 mb-8">
          Choose an action to get started
        </p>

        <div className="flex flex-col gap-4">
          <Link
            href="/admin-login"
            className="w-full bg-[#ed1c24] hover:bg-[#c71018] text-white font-bold py-2 px-4 rounded-lg shadow-lg text-center transition duration-300"
          >
            Login as Admin
          </Link>

          <Link
            href="/request-toner"
            className="w-full border border-[#ed1c24] text-[#ed1c24] hover:bg-[#ed1c24] hover:text-white font-bold py-2 px-4 rounded-lg shadow-lg text-center transition duration-300"
          >
            Request Toner
          </Link>
        </div>
      </div>
    </div>
  );
}
