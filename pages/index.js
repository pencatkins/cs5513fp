import Link from 'next/link';
import { getInfo } from '../lib/process-contact';
import { getInfo2 } from '../lib/process-goal';
import { getInfo3 } from '../lib/process-recipe';

export async function getStaticProps() {
  // set variable to hold data
  const allInfo = await getInfo();
  const allInfo2 = await getInfo2();
  const allInfo3 = await getInfo3();
  // console.log(allInfo);
  return {
    props: {
      // make data available as props
      allInfo,
      allInfo2,
      allInfo3,
    },
    revalidate: 10, // In seconds
  };
}

export default function Home({allInfo, allInfo2, allInfo3}) {
  return (
    <div className="text-center">
    <h2 className="display-5 bg-dark text-uppercase py-2"><strong>ALL NOTES</strong></h2>
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
      {
        allInfo2.map(({params}) => {
          return (
              <div className="card bg-primary col-sm-12 col-md-5 col-lg-3 mx-3 my-2" key={params.id}>
                <div className="card-body">
                  <h3 className="card-header">{params.title}</h3>
                  <p className="mt-4">Category: {params.category}</p>
                      <Link href={`/goals/${params.id}`}><a className="reach-out btn btn-secondary mt-3" >More info</a></Link>
                </div>
              </div>
          )
        })
      }
      {
        allInfo3.map(({params}) => {
          return (
              <div className="card bg-danger col-xm-12 col-sm-12 col-md-5 col-lg-3 mx-3 my-2" key={params.id}>
                <div className="card-body">
                  <h3 className="card-header">{params.title}</h3>
                  <p className="mt-4">Recipe: {params.recipe}</p>
                      <Link href={`/recipes/${params.id}`}><a className="reach-out btn btn-secondary mt-3">More info</a></Link>
                </div>
              </div> 
          )
        })
      }
      </main>
    </div>
  )
}