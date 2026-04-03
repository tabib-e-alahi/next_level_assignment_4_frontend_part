"use client";

import { providerService } from "@/services/provider/provider.service";
import { useRouter } from "next/navigation";
import { useState } from "react";
import { toast } from "sonner";

type ProfileFormData = {
  businessName: string;
  businessSubtitle: string;
  businessPhone: string;
  businessAdress: string;
  description: string;
  city: string;
  businessLogo: string;
  isOpen: boolean;
};

export default function CreateProfileForm() {
  const router = useRouter()
  const [formData, setFormData] = useState<ProfileFormData>({
    businessName: "",
    businessSubtitle: "",
    businessPhone: "",
    businessAdress: "",
    description: "",
    city: "",
    businessLogo: "",
    isOpen: true,
  });

  const handleChange = (
    e: React.ChangeEvent<HTMLInputElement | HTMLTextAreaElement>
  ) => {
    const { name, value } = e.target;

    setFormData((prev) => ({
      ...prev,
      [name]: value,
    }));
  };

  const handleOpenChange = (value: boolean) => {
    setFormData((prev) => ({
      ...prev,
      isOpen: value,
    }));
  };

  const handleSubmit = async (e: React.FormEvent) => {
    e.preventDefault();

    console.log("Create profile payload:", formData);

    // call your create profile service here
    const result = await providerService.createProviderProfile(formData)
    console.log(result);
    if(!result.error){
      toast.success("Profile created")
      router.push("/provider-dashboard/profile")
    }
  };

  return (
    <section className="min-h-[70vh] w-full px-6 py-10">
      <div className="mx-auto w-full max-w-4xl rounded-[28px] border border-[#e8a030]/15 bg-[linear-gradient(180deg,rgba(200,80,10,0.10)_0%,rgba(232,160,48,0.05)_100%)] p-8 shadow-[0_20px_60px_rgba(0,0,0,0.35)] backdrop-blur-md md:p-10">
        <p className="mb-4 font-mono text-[11px] uppercase tracking-[0.28em] text-[#e8a030]">
          Provider Setup
        </p>

        <h1 className="font-serif text-3xl text-[#fff7ec] md:text-4xl">
          Create your profile
        </h1>

        <p className="mt-3 max-w-2xl text-sm leading-7 text-[rgba(245,239,230,0.72)]">
          Complete your provider profile to start listing meals and managing
          orders.
        </p>

        <form onSubmit={handleSubmit} className="mt-8 grid gap-5 md:grid-cols-2">
          <div>
            <label className="mb-2 block text-sm text-[#f7ead7]">
              Business Name
            </label>
            <input
              type="text"
              name="businessName"
              value={formData.businessName}
              onChange={handleChange}
              className="h-12 w-full rounded-xl border border-white/10 bg-white/5 px-4 text-sm text-white outline-none placeholder:text-white/30"
              placeholder="BD Home Kitchen"
            />
          </div>

          <div>
            <label className="mb-2 block text-sm text-[#f7ead7]">
              Business Subtitle
            </label>
            <input
              type="text"
              name="businessSubtitle"
              value={formData.businessSubtitle}
              onChange={handleChange}
              className="h-12 w-full rounded-xl border border-white/10 bg-white/5 px-4 text-sm text-white outline-none placeholder:text-white/30"
              placeholder="Fresh homemade meals"
            />
          </div>

          <div>
            <label className="mb-2 block text-sm text-[#f7ead7]">
              Business Phone
            </label>
            <input
              type="text"
              name="businessPhone"
              value={formData.businessPhone}
              onChange={handleChange}
              className="h-12 w-full rounded-xl border border-white/10 bg-white/5 px-4 text-sm text-white outline-none placeholder:text-white/30"
              placeholder="01712345567"
            />
          </div>

          <div>
            <label className="mb-2 block text-sm text-[#f7ead7]">City</label>
            <input
              type="text"
              name="city"
              value={formData.city}
              onChange={handleChange}
              className="h-12 w-full rounded-xl border border-white/10 bg-white/5 px-4 text-sm text-white outline-none placeholder:text-white/30"
              placeholder="Dhaka"
            />
          </div>

          <div className="md:col-span-2">
            <label className="mb-2 block text-sm text-[#f7ead7]">
              Business Address
            </label>
            <input
              type="text"
              name="businessAdress"
              value={formData.businessAdress}
              onChange={handleChange}
              className="h-12 w-full rounded-xl border border-white/10 bg-white/5 px-4 text-sm text-white outline-none placeholder:text-white/30"
              placeholder="Sector-9, Uttara, Dhaka 1230"
            />
          </div>

          <div className="md:col-span-2">
            <label className="mb-2 block text-sm text-[#f7ead7]">
              Business Logo URL
            </label>
            <input
              type="text"
              name="businessLogo"
              value={formData.businessLogo}
              onChange={handleChange}
              className="h-12 w-full rounded-xl border border-white/10 bg-white/5 px-4 text-sm text-white outline-none placeholder:text-white/30"
              placeholder="https://example.com/logo.jpg"
            />
          </div>

          <div className="md:col-span-2">
            <label className="mb-2 block text-sm text-[#f7ead7]">
              Description
            </label>
            <textarea
              name="description"
              value={formData.description}
              onChange={handleChange}
              rows={5}
              className="w-full rounded-xl border border-white/10 bg-white/5 px-4 py-3 text-sm text-white outline-none placeholder:text-white/30"
              placeholder="Daily homemade Bengali meals prepared with fresh local ingredients."
            />
          </div>

          <div className="md:col-span-2 flex items-center justify-between rounded-2xl border border-white/10 bg-white/5 px-4 py-4">
            <div>
              <p className="text-sm font-medium text-[#fff7ec]">Business Status</p>
              <p className="mt-1 text-xs text-white/50">
                Set whether your kitchen is currently open.
              </p>
            </div>

            <button
              type="button"
              onClick={() => handleOpenChange(!formData.isOpen)}
              className={`relative h-8 w-16 rounded-full transition ${
                formData.isOpen ? "bg-[#e8a030]" : "bg-white/15"
              }`}
            >
              <span
                className={`absolute top-1 h-6 w-6 rounded-full bg-white transition ${
                  formData.isOpen ? "left-9" : "left-1"
                }`}
              />
            </button>
          </div>

          <div className="md:col-span-2 flex justify-end">
            <button
              type="submit"
              className="inline-flex items-center justify-center rounded-xl bg-gradient-to-r from-[#c8500a] to-[#e8a030] px-6 py-3 text-sm font-semibold text-[#140d08] transition hover:opacity-95"
            >
              Create Profile
            </button>
          </div>
        </form>
      </div>
    </section>
  );
}