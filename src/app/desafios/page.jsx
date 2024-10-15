import { Suspense } from 'react';
import { getChallenges } from "@/services/getChallenges";
import ClientPage from "@/app/desafios/clientPage";
import Loading from "@/app/loading";

export default function MainPage() {
  return (
      <ChallengesWrapper />
  );
}

async function ChallengesWrapper() {
  const challenges = await getChallenges();
  console.log(challenges);
  const categories = challenges.map((challenge) => challenge.category_challenges.map((cat) => cat.name));
  console.log(categories);
  
  return <ClientPage challenges={challenges} />;
}