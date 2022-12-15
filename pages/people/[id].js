import { getIds, getFavoriteData } from '../../lib/process-contact';
import Image from 'next/image';

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
          <h2 className="card-header display-6 text-uppercase text-center" key={favoriteData.ID}><strong>{favoriteData.acf_fields.fname}&nbsp;{favoriteData.acf_fields.lname}</strong></h2>
          <p className="card-text text-center px-5 mx-5 my-2"><strong>Favorite Color:</strong> {favoriteData.acf_fields.favcolor}</p>
          <p className="card-text text-center px-5 mx-5 my-2"><strong>Favorite Fruit:</strong> 
          <div className="feat-img">
          <Image
            src={favoriteData.acf_fields.imgurl}
            alt={favoriteData.acf_fields.imgalt}
            width={0}
            height={0}
            sizes="50vw"
            style={{ width: '50%', height: 'auto' }}
          />
          </div>
          </p>      
          <p className="card-text text-center px-5 mx-5 my-2"><strong>Status:</strong> {favoriteData.post_status}</p>
          <p className="card-text text-center px-5 mx-5 my-2"><strong>Post ID:</strong> {favoriteData.ID}</p>
        </div>
      </article>
    </main>
  );
}