export default async function StartupPage({ params }: { params: { startupid: string } }) {
  return(
    <div className='h-full lala'>
      yoyo {params.startupid}
    </div>
  )
}
