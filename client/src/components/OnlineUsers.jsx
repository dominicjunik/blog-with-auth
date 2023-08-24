import axios from "axios"
import { useEffect, useState } from "react"

export default function OnlineUsers() {
  
    const [users, setUsers] = useState([])

   

    async function getUsers() {
        const response = await axios.get('/api/users/list', {
            headers: {
              Authorization: `Bearer ${localStorage.getItem('token')}`
            }
          })
        console.log(response.data)
        setUsers(response.data)
    }

    useEffect(() => {
        getUsers()
    }, [])

    return (
            <>
                <h1>Users</h1>
                <div id="users">

                        {users.map((user, index) => 
                            <div className="a-post" key={index}>
                                <p>{user.username}</p>
                            </div>
                        )}
            
             
                   
               
                </div>
            </>
    )
}
