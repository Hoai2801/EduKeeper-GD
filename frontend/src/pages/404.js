import { NavLink } from "react-router-dom";
import NotFound from "../assets/404.webp";
export default function NotFound404() {
  return (
    <div className="flex min-h-[100dvh] flex-col items-center justify-center bg-background px-4 sm:px-6 lg:px-8 animate-fade-in">
      <div className="mx-auto max-w-md text-center">
        <img
          src={NotFound}
          alt="Error image"
          width={192}
          height={192}
          className="mx-auto h-48 w-56 text-primary animate-bounce"
          style={{ aspectRatio: "192/192", objectFit: "cover" }}
        />
        <h1 className="mt-2 text-3xl font-bold tracking-tight text-foreground sm:text-4xl animate-fade-up">
          Oops, the page you requested could not be found
        </h1>
        <p className="mt-2 text-muted-foreground animate-fade-up">
          The page you were looking for does not exist or has been moved. Please
          check the URL or try navigating back to the home page.
        </p>
        <div className="mt-6 animate-fade-up">
          <NavLink
            to={"/"}
            className="inline-flex items-center rounded-md bg-black px-4 py-2 text-sm font-medium text-white shadow-sm transition-colors hover:bg-primary/90 focus:outline-none focus:ring-2 focus:ring-primary focus:ring-offset-2"
          >
            Go to Home
          </NavLink>
        </div>
      </div>
    </div>
  );
}
