'use client';
import { useState } from 'react';
import { CheckCircleIcon, ExclamationCircleIcon } from '@heroicons/react/24/solid';

export default function ContactForm() {
  const [form, setForm] = useState({ name: '', email: '', message: '' });
  const [status, setStatus] = useState<'idle' | 'loading' | 'success' | 'error'>('idle');

  const handleChange = (e: React.ChangeEvent<HTMLInputElement | HTMLTextAreaElement>) => {
    setForm({ ...form, [e.target.name]: e.target.value });
  };

  const handleSubmit = async (e: React.FormEvent) => {
    e.preventDefault();
    setStatus('loading');

    const res = await fetch('script.google.com/macros/s/AKfycbzLSs8DKHT0Tpsx-8VpV7_5klaQwS9RiFCySbMlxViAHBvHVbXuyWbZ0y_H01t7uzS0BQ/exec', {
      method: 'POST',
      body: JSON.stringify(form),
    });

    if (res.ok) {
      setStatus('success');
      setForm({ name: '', email: '', message: '' });
    } else {
      setStatus('error');
    }
  };

  return (
    <div className="max-w-xl mx-auto bg-white p-8 rounded-xl shadow-md border border-gray-200">
      <h2 className="text-2xl font-bold text-center text-[#2d38ef] mb-6">تماس با هوش نگار</h2>
      <form onSubmit={handleSubmit} className="space-y-4">
        <input
          name="name"
          value={form.name}
          onChange={handleChange}
          placeholder="نام شما"
          className="w-full px-4 py-2 border rounded-md focus:outline-none focus:ring-2 focus:ring-[#2d38ef]"
          required
        />
        <input
          name="email"
          type="email"
          value={form.email}
          onChange={handleChange}
          placeholder="ایمیل"
          className="w-full px-4 py-2 border rounded-md focus:outline-none focus:ring-2 focus:ring-[#2d38ef]"
          required
        />
        <input 
          name="mobil"
          type="mobil"
          value={form.name}
          onChange={handleChange}
          placeholder="شماره موبایل"
          className="w-full px-4 py-2 border rounded-md focus:outline-none focus:ring-2 focus:ring-[#2d38ef]"
          required
          />
        <textarea
          name="message"
          value={form.message}
          onChange={handleChange}
          placeholder="پیام شما"
          rows={5}
          className="w-full px-4 py-2 border rounded-md focus:outline-none focus:ring-2 focus:ring-[#2d38ef]"
          required
        />
        <button
          type="submit"
          className="w-full bg-[#2d38ef] text-white py-2 rounded-md hover:bg-[#1f28b5] transition"
          disabled={status === 'loading'}
        >
          {status === 'loading' ? 'در حال ارسال...' : 'ارسال پیام'}
        </button>
      </form>

      {status === 'success' && (
        <div className="mt-4 flex items-center text-green-600">
          <CheckCircleIcon className="w-5 h-5 mr-2" />
          پیام شما با موفقیت ارسال شد!
        </div>
      )}
      {status === 'error' && (
        <div className="mt-4 flex items-center text-red-600">
          <ExclamationCircleIcon className="w-5 h-5 mr-2" />
          خطا در ارسال پیام. لطفاً دوباره تلاش کنید.
        </div>
      )}
    </div>
  );
}

