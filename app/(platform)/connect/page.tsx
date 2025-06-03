import ConnectHero from './components/ConnectHero'
import Header from '../components/Header'
export default function page() {
  return (
    <div className="h-full flex flex-col p-4 gap-12">
            <Header>Connect</Header>
      <ConnectHero/>
    </div>
  )
}
