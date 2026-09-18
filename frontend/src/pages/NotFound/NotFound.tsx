function NotFound() {
  return (
    <main className="flex min-h-screen items-center justify-center bg-[#080808] px-6 text-white">
      <div className="text-center">
        <p className="text-[clamp(7rem,20vw,16rem)] font-medium leading-[0.7] tracking-[-0.09em] text-white/10">
          404
        </p>

        <div className="mt-14">
          <h1 className="text-2xl font-medium tracking-[-0.03em] md:text-4xl">
            Page not found.
          </h1>

          <p className="mt-3 text-sm text-white/30">
            The page you're looking for doesn't exist.
          </p>
        </div>
      </div>
    </main>
  );
}

export default NotFound;
