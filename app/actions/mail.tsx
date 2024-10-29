import React, { useRef, useState } from 'react';
import emailjs from '@emailjs/browser';
import { Input } from "@/components/ui/input";
import { Button } from "@/components/ui/button";

const Contact: React.FC = () => {
  const form = useRef<HTMLFormElement>(null);
  const [email, setEmail] = useState<string>('');
  const [loading, setLoading] = useState<boolean>(false);
  const [success, setSuccess] = useState<boolean>(false);
  const [error, setError] = useState<string | null>(null);

  const sendEmail = (e: React.FormEvent<HTMLFormElement>) => {
    e.preventDefault();
    setLoading(true);
    setError(null);

    if (form.current) {
      emailjs
        .sendForm('service_ukaha4q', 'template_3f9hyjq', form.current, {
          publicKey: '5mX3CB1njHF_jtdK6',
        })
        .then(
          () => {
            console.log('SUCCESS!');
            setSuccess(true);
            setEmail('');
          },
          (error) => {
            console.log('FAILED...', error.text);
            setError('Failed to send email. Please try again.');
          },
        )
        .finally(() => {
          setLoading(false);
        });
    }
  };

  return (
    <div className="mb-8 w-full max-w-md">
      <form className="flex space-x-2" ref={form} onSubmit={sendEmail}>
        <Input
          type="email"
          name="email"
          placeholder="Enter your email"
          className="bg-gray-800 border-gray-700 text-gray-100"
          value={email}
          onChange={(e) => setEmail(e.target.value)}
          required
        />
        <Button type="submit" className="bg-blue-600 hover:bg-blue-700" disabled={loading}>
          {loading ? "Submitting..." : "Notify Me"}
        </Button>
      </form>

    </div>
  );
};

export default Contact;