import Layout from "@/components/Layout";
import DashboardEvent from "@/components/DashboardEvent";
import  {parseCookies } from '@/helpers/index';
import {useRouter}  from 'next/router'
import { API_URL } from '@/config/index';
import styles from '@/styles/Dashboard.module.css';


export default function DashboardPage({events, token}) {
  const router = useRouter()
  console.log(events)
  const deleteEvent = async (id) => {
    console.log(id);
    console.log(token)
    if (confirm('Are you sure?')) {
      const res = await fetch(`${API_URL}/events/${id}`, {
        method: 'DELETE',
        headers: {
          Authorization: `Bearer ${token}`
        }
      })

      const data = await res.json()

      if (!res.ok) {
        console.error(data.message)
      } else {
        router.push('/events')
      }
    }
  }
  return (
    <Layout title="User Dashboard">
      <div className={styles.dash}>
      <h1>Dashboard</h1>
      <h3>My Events</h3>

      {events.map((evt) => (
       <DashboardEvent key={evt.id} evt={evt}
       handleDelete={deleteEvent}/>
      ))}
      </div>
      
    </Layout>
  );
}


export async function getServerSideProps({req}) {
  const { token } = parseCookies(req)
  console.log(token);

  const res = await fetch(`${API_URL}/events/me`, {
    method: 'GET',
    headers: {
      Authorization: `Bearer ${token}`
    }
  })
  
  const events = await res.json()

  return {
    props: {
      events,
      token
    },
  }
}