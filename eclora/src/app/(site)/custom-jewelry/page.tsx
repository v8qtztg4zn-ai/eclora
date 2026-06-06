import { InquiryForm } from "@/components/forms/InquiryForm";
import { GlassCard } from "@/components/ui/GlassCard";

export const metadata = {
  title: "Custom Jewelry | ECLORA",
  description: "Commission a bespoke piece designed exclusively for you.",
};

export default function CustomJewelryPage() {
  return (
    <div className="pt-24">
      <section className="section-padding">
        <div className="max-w-3xl mx-auto">
          <div className="text-center mb-16">
            <p className="text-xs tracking-[0.3em] uppercase text-champagne mb-4">
              Bespoke
            </p>
            <h1 className="heading-display text-ivory mb-6">
              Custom Jewelry
            </h1>
            <p className="text-silver font-light leading-relaxed">
              Your vision deserves to exist. Share your dream design with us,
              and our master artisans will bring it to life with lab-grown
              diamonds and exceptional craftsmanship.
            </p>
          </div>

          <GlassCard hover={false}>
            <InquiryForm type="custom" showJewelryFields />
          </GlassCard>
        </div>
      </section>
    </div>
  );
}
