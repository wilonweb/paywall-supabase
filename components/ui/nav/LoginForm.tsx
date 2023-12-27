// Indique que ce fichier s'exécute uniquement côté client dans une application Next.js.
"use client";

import { Button } from "../button";
import React from "react";
import { SiGithub } from "react-icons/si";
import { createBrowserClient } from "@supabase/ssr";
import { usePathname } from "next/navigation";

// Définition du composant LoginForm.
export default function LoginForm() {
  // Récupère le chemin actuel avec le hook usePathname pour rediriger l'utilisateur a la meme url apres le log
  const pathname = usePathname();

  // Crée un client Supabase pour l'authentification, en utilisant les variables d'environnement.
  const supabase = createBrowserClient(
    process.env.NEXT_PUBLIC_SUPABASE_URL!,
    process.env.NEXT_PUBLIC_SUPABASE_ANON_KEY!
  );

  // Fonction déclenchée lors du clic sur le bouton. Elle gère l'authentification OAuth avec GitHub.
  const handleLogin = () => {
    supabase.auth.signInWithOAuth({
      provider: "github",
      options: {
        redirectTo: location.origin + "/auth/callback? next=" + pathname,
      },
    });
  };

  return (
    <Button
      variant="outline"
      className="flex items-center gap-2"
      onClick={handleLogin}
    >
      <SiGithub />
      Login2
    </Button>
  );
}
