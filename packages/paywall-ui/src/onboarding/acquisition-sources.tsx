import { type ReactNode } from "react";
import { getDefaultOnboardingAcquisitionSourceText } from "../locales/onboarding/acquisition-source";
import {
  AcquisitionSourceImageIcon,
  FriendOrFamilyIcon,
  OtherSourceIcon,
  acquisitionSourceIconSources,
} from "./components/AcquisitionSourceIcons";

export type OnboardingAcquisitionStorePlatform = "appStore" | "playStore";

export type OnboardingAcquisitionSourceId =
  | "instagram"
  | "tiktok"
  | "youtube"
  | "google"
  | "store"
  | "x"
  | "friend-or-family"
  | "other";

export interface OnboardingAcquisitionSourceOption {
  id: OnboardingAcquisitionSourceId;
  icon: ReactNode;
  title: string;
}

export const ONBOARDING_ACQUISITION_SOURCE_TITLE =
  "Where did you hear about us?";

export const createOnboardingAcquisitionSourceOptions = (
  storePlatform: OnboardingAcquisitionStorePlatform,
  locale?: string,
): OnboardingAcquisitionSourceOption[] => {
  const text = getDefaultOnboardingAcquisitionSourceText(locale);

  return [
    {
      id: "instagram",
      icon: (
        <AcquisitionSourceImageIcon
          source={acquisitionSourceIconSources.instagram}
        />
      ),
      title: text.instagram,
    },
    {
      id: "tiktok",
      icon: (
        <AcquisitionSourceImageIcon
          source={acquisitionSourceIconSources.tiktok}
        />
      ),
      title: text.tiktok,
    },
    {
      id: "youtube",
      icon: (
        <AcquisitionSourceImageIcon
          source={acquisitionSourceIconSources.youtube}
        />
      ),
      title: text.youtube,
    },
    {
      id: "google",
      icon: (
        <AcquisitionSourceImageIcon
          source={acquisitionSourceIconSources.google}
        />
      ),
      title: text.google,
    },
    {
      id: "store",
      icon: (
        <AcquisitionSourceImageIcon
          source={
            storePlatform === "playStore"
              ? acquisitionSourceIconSources.playStore
              : acquisitionSourceIconSources.appStore
          }
        />
      ),
      title: storePlatform === "playStore" ? text.playStore : text.appStore,
    },
    {
      id: "x",
      icon: (
        <AcquisitionSourceImageIcon source={acquisitionSourceIconSources.x} />
      ),
      title: text.x,
    },
    {
      id: "friend-or-family",
      icon: <FriendOrFamilyIcon />,
      title: text.friendOrFamily,
    },
    {
      id: "other",
      icon: <OtherSourceIcon />,
      title: text.other,
    },
  ];
};
