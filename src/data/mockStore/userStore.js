import { memberStore } from "./memberStore";

// Default to the Admin user (Verragio)
export const currentUser = {
  ...memberStore.members[0], // Verragio
  avatarInitial: "V", // Fallback
};
