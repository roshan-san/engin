import { profiles } from "@/lib/db/schema"
export default function ProfileCard(props:typeof profiles.$inferSelect) {
  return (
    <div>
      profile card , that will be displayed in explore tab etc 
    </div>
  )
}
