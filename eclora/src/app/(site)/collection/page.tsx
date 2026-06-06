import { CollectionShowcase } from "@/components/home/CollectionShowcase";
import { Sustainability } from "@/components/home/Sustainability";

export const metadata = {
  title: "Collection | ECLORA",
  description: "Explore our curated collection of lab-grown diamond jewelry.",
};

export default function CollectionPage() {
  return (
    <div className="pt-24">
      <section className="section-padding text-center">
        <p className="text-xs tracking-[0.3em] uppercase text-champagne mb-4">
          ECLORA
        </p>
        <h1 className="heading-display text-ivory mb-6">The Collection</h1>
        <p className="text-silver max-w-2xl mx-auto font-light leading-relaxed">
          Each piece is a celebration of conscious luxury — lab-grown diamonds
          set in meticulously crafted designs for those who value both beauty
          and integrity.
        </p>
      </section>
      <CollectionShowcase />
      <Sustainability />
    </div>
  );
}
