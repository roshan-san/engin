import React from 'react'

export default function page() {
  return (
    <div>
        no floating create startup button here.
        it will have a searchbar to search collaborators , creators , and founders  with various filters.
        we will make use of the tags and areas of interest attribute to give them a list of profile cards.
        the profile card will consist information aout the user you can check the schema.js file 
        it has the connect button which will senda connection reuest (append the username to the pendingreq array of that user)
        and the message button which will redirect to the messaging tab with (message/username)
        if we click the person in the card it will redirect to the (profile/username)
    </div>
  )
}
