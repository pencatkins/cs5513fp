import { getIds, getFavoriteData } from '/lib/process-recipe';
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
  const data = favoriteData.post_content;
  return (
    <main> 
      <article className="card dyn col-12 bg-light px-3">
        <div>
          <h2 className="card-header display-6 text-uppercase text-center" key={favoriteData.ID}><strong>Recipe: {favoriteData.recipe}</strong></h2>
          <p className="card-text px-5 mx-5 my-2"><strong>Ingredients:</strong></p><div className="ingredient-list" dangerouslySetInnerHTML={{__html: data}} />
          <p className="card-text px-5 mx-5 my-2"><strong>Instructions:</strong> {favoriteData.instructions}</p>
          <div className="feat-img">      
          <Image
            src={favoriteData.recipeimg}
            alt={favoriteData.recipealt}
            width={0}
            height={0}
            sizes="50vw"
            style={{ width: '50%', height: 'auto'}}
          />
          </div>
        </div>
      </article>
    </main>
  );
}