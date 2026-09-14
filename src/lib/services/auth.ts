import { supabase } from "../supabase";

const INTERNAL_EMAIL_DOMAIN = "auth.mydate.local";

export function usernameToAuthEmail(username: string) {
  const normalized = username.trim().toLowerCase();
  if (!/^[a-z0-9](?:[a-z0-9._-]{1,30}[a-z0-9])?$/.test(normalized))
    throw new Error("invalid_username");
  return `${normalized}@${INTERNAL_EMAIL_DOMAIN}`;
}

export const AuthService = {
  async signIn(username: string, password: string) {
    const { error } = await supabase().auth.signInWithPassword({
      email: usernameToAuthEmail(username),
      password,
    });
    if (error) throw error;
  },
  async signUp(username: string, password: string) {
    const { data, error } = await supabase().auth.signUp({
      email: usernameToAuthEmail(username),
      password,
      options: { data: { username: username.trim().toLowerCase() } },
    });
    if (error) throw error;
    return Boolean(data.session);
  },
  async signOut() {
    const { error } = await supabase().auth.signOut();
    if (error) throw error;
  },
  async requireUser() {
    const { data, error } = await supabase().auth.getUser();
    if (error || !data.user) throw new Error("login_required");
    return data.user;
  },
};
