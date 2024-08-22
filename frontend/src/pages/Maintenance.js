import FixError from "../assets/maintenance.png";

export default function Maintenance() {
  return (
    <div className="flex min-h-[100dvh] flex-col items-center justify-center bg-background px-4 py-12 sm:px-6 lg:px-8">
      <div className="mx-auto max-w-md text-center">
        <img
          src={FixError}
          alt="Maintenance"
          width={400}
          height={400}
          className="mx-auto h-40 w-40 text-primary"
          style={{ aspectRatio: "400/400", objectFit: "cover" }}
        />
        <h1 className="mt-4 text-3xl font-bold tracking-tight text-foreground sm:text-4xl">
          Site Under Maintenance
        </h1>
        <p className="mt-4 text-muted-foreground">
          We're currently performing scheduled maintenance on our website.
          Please check back soon for updates.
        </p>
        <div className="mt-6 flex flex-col gap-4 sm:flex-row">
          <input
            type="email"
            placeholder="Enter your email"
            className="max-w-lg flex-1 px-2 border border-slate-300 rounded-md"
          />
          <button
            className="inline-flex items-center rounded-md bg-black px-4 py-2 text-sm font-medium text-white shadow-sm transition-colors hover:bg-primary/90 focus:outline-none focus:ring-2 focus:ring-primary focus:ring-offset-2"
            type="submit"
          >
            Subscribe for Updates
          </button>
        </div>
      </div>
    </div>
  );
}
