"use client";

import { motion } from "framer-motion";
import { Mail, Phone, MapPin, MessageCircle } from "lucide-react";
import { AppointmentForm } from "@/components/forms/AppointmentForm";
import { GlassCard } from "@/components/ui/GlassCard";

export default function ContactPage() {
  const whatsappNumber =
    process.env.NEXT_PUBLIC_WHATSAPP_NUMBER || "1234567890";

  return (
    <div className="pt-24">
      <section className="section-padding">
        <div className="max-w-7xl mx-auto">
          <motion.div
            initial={{ opacity: 0, y: 30 }}
            animate={{ opacity: 1, y: 0 }}
            className="text-center mb-16"
          >
            <p className="text-xs tracking-[0.3em] uppercase text-champagne mb-4">
              Get in Touch
            </p>
            <h1 className="heading-display text-ivory mb-6">Contact Us</h1>
            <p className="text-silver max-w-2xl mx-auto font-light">
              Whether you&apos;re ready to find your perfect piece or simply
              curious about lab-grown luxury, we&apos;d love to hear from you.
            </p>
          </motion.div>

          <div className="grid grid-cols-1 lg:grid-cols-3 gap-8 mb-16">
            {[
              {
                icon: Mail,
                title: "Email",
                value: "hello@eclora.com",
                href: "mailto:hello@eclora.com",
              },
              {
                icon: Phone,
                title: "Phone",
                value: "+1 (234) 567-890",
                href: "tel:+1234567890",
              },
              {
                icon: MapPin,
                title: "Studio",
                value: "By appointment only",
                href: undefined,
              },
            ].map((item, i) => (
              <GlassCard key={item.title} delay={i * 0.1}>
                <item.icon size={24} className="text-champagne mb-4" />
                <h3 className="text-sm tracking-wider uppercase text-ivory mb-2">
                  {item.title}
                </h3>
                {item.href ? (
                  <a
                    href={item.href}
                    className="text-silver hover:text-champagne transition-colors"
                  >
                    {item.value}
                  </a>
                ) : (
                  <p className="text-silver">{item.value}</p>
                )}
              </GlassCard>
            ))}
          </div>

          <div className="flex flex-col sm:flex-row gap-4 justify-center mb-16">
            <a
              href={`https://wa.me/${whatsappNumber}`}
              target="_blank"
              rel="noopener noreferrer"
              className="btn-primary inline-flex items-center justify-center gap-2"
            >
              <MessageCircle size={18} />
              WhatsApp Us
            </a>
            <a
              href="mailto:hello@eclora.com"
              className="btn-secondary inline-flex items-center justify-center gap-2"
            >
              <Mail size={18} />
              Email Us
            </a>
          </div>

          <div className="max-w-2xl mx-auto">
            <GlassCard hover={false}>
              <h2 className="font-display text-2xl text-ivory mb-2 text-center">
                Book a Consultation
              </h2>
              <p className="text-silver text-sm text-center mb-8">
                Schedule a private appointment with our jewelry specialists.
              </p>
              <AppointmentForm />
            </GlassCard>
          </div>
        </div>
      </section>
    </div>
  );
}
