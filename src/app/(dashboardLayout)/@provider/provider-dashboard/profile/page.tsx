
import CreateProfileForm from "@/components/modules/dashboard/provider/profile/createProfileForm";
import ProfileView from "@/components/modules/dashboard/provider/profile/profileView";
import { hasProviderProfile } from "@/helper/providerProfileCheker";
import { providerService } from "@/services/provider/provider.service";

export default async function ProfilePage() {
  const hasProfile = await hasProviderProfile();
  console.log(hasProfile);
  let profile = null;
  try {
    const result = await providerService.getMyProfile();
    profile = result?.data ?? null;
  } catch (error) {
    profile = null;
  }

  return hasProfile ? (
    <ProfileView profile={profile} />
  ) : (
    <CreateProfileForm />
  );
}