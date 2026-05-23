import React from 'react';
import { Button } from '@/components/ui/button';
import { Input } from '@/components/ui/input';
import { Textarea } from '@/components/ui/textarea';
import { Label } from '@/components/ui/label';
import { Checkbox } from '@/components/ui/checkbox';

const defaultSocialLinks = [
  { id: '1', name: 'Instagram', href: 'https://instagram.com' },
  { id: '2', name: 'Behance', href: 'https://behance.net' },
];

const projectTypeOptions = [
  'Wedding Photography',
  'Baby Photoshoot',
  'Maternity Session',
  'Outdoor Portraits',
  'Events',
  'Other',
];

export function ContactSection() {
  const [formData, setFormData] = React.useState({
    name: '',
    email: '',
    message: '',
    projectType: [] as string[],
  });

  const handleChange = (e: React.ChangeEvent<HTMLInputElement | HTMLTextAreaElement>) => {
    const { name, value } = e.target;
    setFormData((prev) => ({ ...prev, [name]: value }));
  };

  const handleCheckboxChange = (type: string, checked: boolean) => {
    setFormData((prev) => ({
      ...prev,
      projectType: checked
        ? [...prev.projectType, type]
        : prev.projectType.filter((t) => t !== type),
    }));
  };

  const handleSubmit = (e: React.FormEvent) => {
    e.preventDefault();
    alert('Thank you! We will get back to you soon.');
    setFormData({ name: '', email: '', message: '', projectType: [] });
  };

  return (
    <section id="contact" className="relative min-h-screen w-full overflow-hidden">
      <div
        className="absolute inset-0 bg-cover bg-center"
        style={{ backgroundImage: "url('/hero.png')" }}
      >
        <div className="absolute inset-0 bg-black/55" />
        <div className="absolute inset-0 z-0 overflow-hidden">
          {Array.from({ length: 12 }).map((_, i) => (
            <div
              key={i}
              className="animate-bubble absolute rounded-full bg-white/20"
              style={{
                width: `${Math.random() * 20 + 10}px`,
                height: `${Math.random() * 20 + 10}px`,
                left: `${Math.random() * 100}%`,
                animationDelay: `${Math.random() * 8}s`,
                animationDuration: `${Math.random() * 14 + 10}s`,
                top: `${Math.random() * 100}%`,
              }}
            />
          ))}
        </div>
      </div>

      <div className="relative z-10 mx-auto grid min-h-screen max-w-7xl grid-cols-1 gap-6 px-4 py-12 sm:gap-8 sm:px-8 sm:py-16 lg:grid-cols-2 lg:items-center lg:gap-8 lg:px-14 lg:py-20">
        <div className="flex flex-col justify-end p-2 sm:p-4 lg:p-8">
          <h2 className="max-w-lg font-serif text-[clamp(1.75rem,6vw,3.75rem)] leading-tight text-white drop-shadow-lg">
            We can turn your dream moments into timeless photographs
          </h2>
          <p className="mt-3 text-base text-white/80 sm:mt-4 sm:text-lg">Let&apos;s talk!</p>
        </div>

        <div className="rounded-lg border border-white/20 bg-white/95 p-5 shadow-xl sm:p-6 md:p-8">
          <h3 className="text-xl font-bold text-black sm:text-2xl">Get in touch</h3>

          <div className="mt-6">
            <p className="mb-1 text-sm text-zinc-500">Mail us at</p>
            <a href="mailto:hello@studio.com" className="font-medium text-black hover:underline">
              hello@studio.com
            </a>
            <div className="mt-4 flex items-center gap-3">
              <span className="text-sm text-zinc-500">OR</span>
              {defaultSocialLinks.map((link) => (
                <Button key={link.id} variant="outline" size="default" asChild>
                  <a href={link.href} target="_blank" rel="noreferrer">
                    {link.name}
                  </a>
                </Button>
              ))}
            </div>
          </div>

          <hr className="my-6 border-zinc-200" />

          <form onSubmit={handleSubmit} className="space-y-5">
            <p className="text-sm text-zinc-500">Leave us a brief message</p>
            <div className="grid grid-cols-1 gap-4 md:grid-cols-2">
              <div className="space-y-2">
                <Label htmlFor="name">Your name</Label>
                <Input id="name" name="name" value={formData.name} onChange={handleChange} required />
              </div>
              <div className="space-y-2">
                <Label htmlFor="email">Email</Label>
                <Input
                  id="email"
                  name="email"
                  type="email"
                  value={formData.email}
                  onChange={handleChange}
                  required
                />
              </div>
            </div>

            <div className="space-y-2">
              <Label htmlFor="message">Your message</Label>
              <Textarea
                id="message"
                name="message"
                className="min-h-[100px]"
                value={formData.message}
                onChange={handleChange}
                required
              />
            </div>

            <div className="space-y-3">
              <p className="text-sm text-zinc-500">I&apos;m looking for...</p>
              <div className="grid grid-cols-1 gap-2 min-[400px]:grid-cols-2 sm:grid-cols-2 md:grid-cols-3">
                {projectTypeOptions.map((option) => (
                  <div key={option} className="flex items-center gap-2">
                    <Checkbox
                      id={option}
                      checked={formData.projectType.includes(option)}
                      onCheckedChange={(checked) => handleCheckboxChange(option, checked)}
                    />
                    <Label htmlFor={option} className="text-xs font-normal">
                      {option}
                    </Label>
                  </div>
                ))}
              </div>
            </div>

            <Button type="submit" className="w-full">
              Send a message
            </Button>
          </form>
        </div>
      </div>

      <style>{`
        @keyframes bubble {
          0% { transform: translateY(0) scale(0.5); opacity: 0; }
          50% { opacity: 0.6; }
          100% { transform: translateY(-100vh) scale(1.1); opacity: 0; }
        }
        .animate-bubble {
          animation: bubble 15s ease-in-out infinite;
        }
      `}</style>
    </section>
  );
}
