from langchain.tools import tool
from supabase import create_client
from dotenv import load_dotenv
import os

load_dotenv()

supabase = create_client(
    os.getenv("SUPABASE_URL"),
    os.getenv("SUPABASE_KEY")
)

@tool
def rechercher_logements(ville: str, nb_personnes: int = 2) -> str:
    """
    Recherche des logements disponibles dans une ville.
    
    Args:
        ville: La ville où chercher (ex: "Paris", "Barcelone")
        nb_personnes: Nombre de personnes (défaut: 2)
    """
    try:
        result = supabase.table("logements") \
            .select("titre, ville, prix_par_nuit, capacite") \
            .ilike("ville", f"%{ville}%") \
            .gte("capacite", nb_personnes) \
            .eq("disponible", True) \
            .execute()

        logements = result.data

        if not logements:
            return f"Aucun logement trouvé à {ville}."

        reponse = f"{len(logements)} logement(s) trouvé(s) à {ville} :\n"
        for l in logements:
            reponse += f"- {l['titre']} : {l['prix_par_nuit']}€/nuit\n"

        return reponse

    except Exception as e:
        return f"Erreur : {str(e)}"

tools = [rechercher_logements]