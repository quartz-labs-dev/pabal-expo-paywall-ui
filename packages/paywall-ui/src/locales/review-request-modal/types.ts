export interface ReviewRequestModalLocaleText {
  title: (developerName: string) => string;
  message: string;
  satisfiedButton: string;
  feedbackButton: string;
  laterButton: string;
  profileImageAccessibilityLabel: string;
}

export interface ReviewRequestModalCopyOptions {
  developerName?: string;
}
