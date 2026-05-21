export interface OnboardingText {
  continueButton: string;
  doneButton: string;
  landingTitle: string;
  loginLabel: string;
  loginPrompt: string;
  mockTitle: string;
  notificationNowLabel: string;
  notNowButton: string;
  returnButton: string;
  startButton: string;
  tapToContinueButton: string;
}

export interface PermissionPromptText {
  allowButton: string;
  denyButton: string;
}

export interface OnboardingNicknameInputText {
  inputAccessibilityLabel: string;
  inputPlaceholder: string;
  title: string;
  welcomeTitle: string;
}

export interface OnboardingLocaleText {
  text: OnboardingText;
  permissionPrompt: PermissionPromptText;
  nicknameInput: OnboardingNicknameInputText;
}

export const createOnboardingLocaleText = (
  text: OnboardingLocaleText,
): OnboardingLocaleText => text;
