import { Datepicker } from '@adibfirman/react-datepicker'

export default function signup({ res }) {
  return (
    <div>
      {res}
    </div>
  )
}

export async function getServerSideProps(context) {

  NEXT_PUBLIC_API_URL = process.env.NEXT_PUBLIC_API_URL;

  
  // Fetch data from APIs
  const apiUrl = NEXT_PUBLIC_API_URL;
  const getLaterEventsEndPoint = "/api/getLaterEvents"

  const res = await fetchData(`${apiUrl}${getLaterEventsEndPoint}`);


  return {
    props: {
      res,
    }
  };
}
