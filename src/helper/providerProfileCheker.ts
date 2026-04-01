import { providerService } from "@/services/provider/provider.service"

export const hasProviderProfile = async () => {
  const result = await providerService.getMyProfile();
  if (result.data) {
    return true
  }
  else {
    return false
  }
}