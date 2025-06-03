import ExploreHeader from "./components/ExploreHeader";
import SearchHero from "./components/SearchHero";

export default function page() {
  return (
    <div className='h-full flex flex-col p-4 gap-10 border-2'>
      <ExploreHeader/>
      <SearchHero/>


    </div>
  )
}
