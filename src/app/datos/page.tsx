'use client'

import { useSession } from 'next-auth/react';
import { client } from '@/sanity/schemas'
import React, { useContext, useEffect } from 'react'
import { BackToHome } from '@/components/BackToHome';
import { UserList } from '@/components/user/UserList';
import { UserAdmin } from '@/components/user/UserAdmin';
import { FormContext } from '@/context/FormProvider';

export default function Page() {

  const { data: session } = useSession();
  
  const {info, setInfo} = useContext(FormContext);
  
  useEffect(() => {
  
      const fetchData = async () => {
    
        const data = await client.fetch('*[_type == "users"]')
      
        console.log(data, session)
      
        return setInfo(data)
      }
    
      fetchData().catch(console.error)
    
  }, [session])
  
  if (!session?.user?.email || !info) {
    return <BackToHome />
  }
  
  return (
    <div className='w-11/12 md:w-8/12 mx-auto'>
    
      <UserAdmin 
        name={session?.user?.name}
        email={session?.user?.email}
        image={session?.user?.image}
      />
            
      <h4 className='mb-4 font-bold'>Registros:</h4>
      
      <div className='w-11/12 flex flex-col md:flex-row flex-wrap gap-5 my-4'>
      { 
        info.map((user: any, id: any) => user.email === session?.user?.email && 
            <UserList 
              id={user.id} 
              key={id}
              adultage={user.adultage} 
              adultname={user.adultname} 
              illnes={user.illnes}
              userphone={user.userphone}
              image={user.image}
              docId={user._id}
            /> 
        )
      }
      </div>
    </div>
  )
}
