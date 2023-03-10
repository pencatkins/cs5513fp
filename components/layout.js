import Head from "next/head";
import Link from "next/link";

export default function Layout( { children, home } ) {
  return (
    <div>

        <Head>
            <meta name="viewport" content="width=device-width, initial-scale=1" />
            <link rel="shortcut icon" href="/collection-fill.svg" />
        </Head>

    
      <header>
        <nav className="navbar navbar-expand-lg bg-light">
            <div className="container-fluid">
            <Link href="/"><a className="navbar-brand">
            <svg xmlns="http://www.w3.org/2000/svg" width="40" height="40" fill="currentColor" class="bi bi-collection-fill" viewBox="0 0 16 16">
  <path d="M0 13a1.5 1.5 0 0 0 1.5 1.5h13A1.5 1.5 0 0 0 16 13V6a1.5 1.5 0 0 0-1.5-1.5h-13A1.5 1.5 0 0 0 0 6v7zM2 3a.5.5 0 0 0 .5.5h11a.5.5 0 0 0 0-1h-11A.5.5 0 0 0 2 3zm2-2a.5.5 0 0 0 .5.5h7a.5.5 0 0 0 0-1h-7A.5.5 0 0 0 4 1z"/>
</svg> <h1 className="logo-name">MY NOTES</h1>
    </a></Link>
                <button className="navbar-toggler" type="button" data-bs-toggle="collapse" data-bs-target="#navbarTogglerDemo02" aria-controls="navbarTogglerDemo02" aria-expanded="false" aria-label="Toggle navigation">
                <span className="navbar-toggler-icon"></span>
                </button>
                <div className="collapse navbar-collapse" id="navbarTogglerDemo02">
                <ul className="navbar-nav me-auto mb-2 mb-lg-0">
                    <li className="nav-item">
                    <Link href="/"><a className="nav-link active" aria-current="page">Home</a></Link>
                    </li>
                    <li className="nav-item">
                    <Link href="../people"><a className="nav-link active">People</a></Link>
                    </li>
                    <li className="nav-item">
                    <Link href="/goals"><a className="nav-link active">Goals</a></Link>
                    </li>
                    <li className="nav-item">
                    <Link href="/recipes"><a className="nav-link active">Recipes</a></Link>
                    </li>
                </ul>
                </div>
            </div>
            </nav>
      </header>

      <main>{children}</main>

    
    </div>
  );
}