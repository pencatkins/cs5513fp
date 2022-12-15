import { getIds, getFavoriteData } from '/lib/process-goal';

export async function getStaticProps({ params }) {
  const favoriteData = await getFavoriteData(params.id);
  return {
    props: {
      favoriteData,
    },
    revalidate: 10, // In seconds
  };
}

export async function getStaticPaths() {
  const paths = await getIds();
  return {
    paths,
    fallback: false,
  };
}

export default function SelectedID({ favoriteData }) {
  return (
    <main> 
      <article className="card dyn col-12 bg-light px-3">
        <div>
          <h2 className="card-header display-6 text-uppercase text-center" key={favoriteData.ID}><strong>Title: {favoriteData.post_title}</strong></h2>
          <p className="card-text px-5 mx-5 my-2"><strong>Category:</strong> {favoriteData.category}</p>
          <p className="card-text px-5 mx-5 my-2"><strong>Description:</strong> {favoriteData.details}</p>
          <p className="card-text px-5 mx-5 my-2"><strong>Timeframe:</strong> {favoriteData.timeframe}</p>      
          <p className="card-text px-5 mx-5 my-2"><strong>Status:</strong> {favoriteData.post_status}</p>
          <p className="card-text px-5 mx-5 my-2"><strong>Post ID:</strong> {favoriteData.ID}</p>
        </div>
      </article>
    </main>
  );
}