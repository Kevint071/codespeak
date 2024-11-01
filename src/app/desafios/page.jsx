import { getChallenges } from "@/services/getChallenges";
import ClientPage from "@/app/desafios/ClientPage";

export default function MainPage() {
  return <ChallengesWrapper />;
}

async function ChallengesWrapper() {
  let challenges = [];
  let error = null;

  try {
    challenges = await getChallenges();
    
    // Verificar si hay challenges
    if (challenges.length === 0) {
      error = new Error("No se encontraron desafíos");
    }
  } catch (fetchError) {
    console.error("Error fetching challenges:", fetchError);
    error = fetchError;
  }

  // Manejar caso de error
  if (error) {
    return (
      <div className="flex justify-center items-center h-screen">
        <output className="bg-red-100 border border-red-400 text-red-700 px-4 py-3 rounded">
          <strong className="font-bold">Error: </strong>
          {error.message || "No se pudieron cargar los desafíos"}
        </output>
      </div>
    );
  }

  // Proceso opcional de categorías (con verificación de seguridad)
  const categories = challenges.flatMap((challenge) => 
    challenge.category_challenges?.map((cat) => cat.name) || []
  );
  console.log(categories);
  
  return <ClientPage challenges={challenges} />;
}