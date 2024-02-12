import { Datepicker } from '@adibfirman/react-datepicker'

export default function signup({ res }) {
  return (
    <div>
      {res}
    </div>
  )
}

export async function getServerSideProps(context) {
  const NEXT_PUBLIC_APP_ENV = process.env.NEXT_PUBLIC_APP_ENV;

  let NEXT_PUBLIC_API_URL;

  switch (NEXT_PUBLIC_APP_ENV) {
    case 'dev':
      NEXT_PUBLIC_API_URL = process.env.NEXT_PUBLIC_DEV_API_URL;
      break;
    case 'test':
      NEXT_PUBLIC_API_URL = process.env.NEXT_PUBLIC_NGROK_API_URL;
      break;
    case 'production':
      NEXT_PUBLIC_API_URL = process.env.NEXT_PUBLIC_API_URL;
      break;
    default:
      console.error('Invalid environment specified in NEXT_PUBLIC_APP_ENV');
      break;
  }
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
