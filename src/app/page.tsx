
import Image from 'next/image';
import GuestServiceHub from '@/app/guest-service-hub/page';

export default function Home() {
  return (
    <div className="min-h-screen p-8">
      <main className="flex flex-col items-center">
        <h1 className="text-4xl font-bold mb-8">Welcome to KFlow Hospitality</h1>
        <p className="text-xl text-gray-600">Select a section from the navigation menu to begin</p>
      </main>
      
      <footer className="mt-8 text-center text-sm text-gray-500">
        © 2024 KFlow. All rights reserved.
      </footer>
    </div>
  );
}