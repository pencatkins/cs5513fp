import { getInfo } from '../lib/process-contact';
import Link from "Next/Link";

export async function getStaticProps() {
  // set variable to hold data
  const allInfo = await getInfo();
  // console.log(allInfo);
  return {
    props: {
      // make data available as props
      allInfo,
    },
    revalidate: 10, // In seconds
  };
}

export default function Home({allInfo}) {
  return (
    <div className="text-center">
    <h2 className="display-5 bg-dark text-uppercase py-2"><strong>ALL PEOPLE</strong></h2>
      <main className="bg-light py-3 my-0">
      {
        allInfo.map(({params}) => {
          return (
              <div className="card bg-success col-sm-12 col-md-5 col-lg-3 mx-3 my-2" key={params.id}>
                <div className="card-body">
                  <h3 className="card-header">{params.title}</h3>
                  <p className="mt-4">Name: {params.fname}&nbsp;{params.lname}</p>
                      <Link href={`/people/${params.id}`}><a className="reach-out btn btn-secondary mt-3">More info</a></Link>
                </div>
              </div>
          )
        })
      }
      </main>
    </div>
  )
}