'use client'

import { Star, StarOff } from "lucide-react"
import { Button } from "../ui/button"

const ContactAction = ({ contactId, action }: { contactId: string, action: 'add' | 'remove' }) => {

  const handleAddContact = async () => {
    if (contactId === '') {
      return
    }

    const res = await fetch('/api/contacts/add', {
      method: 'POST',
      headers: { 'Content-Type': 'application/json' },
      body: JSON.stringify({ contactId })
    })

    console.log(res)

    return

    const data = await res.json()

    console.log(data)

  }

  const handleRemoveContact = () => { }

  return (
    <>
      {
        action === 'add' && <Button onClick={handleAddContact} ><Star /></Button>
      }

      {
        action === 'remove' && <Button onClick={handleRemoveContact} ><StarOff /></Button>
      }
    </>
  )
}

export default ContactAction
