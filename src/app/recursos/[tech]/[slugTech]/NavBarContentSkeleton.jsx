const NavBarSkeleton = () => {
  return (
    <nav className="z-20 w-72 min-w-72 py-16 max-lg:fixed max-lg:left-0 max-lg:top-0 max-lg:h-screen max-lg:w-screen max-lg:bg-[#091625]">
      {/* Contenedor principal que imita la lista de temas */}
      <div className="mx-auto max-h-[calc(100vh-5rem)] w-full overflow-y-auto rounded-lg border-l border-r border-t border-slate-500 bg-slate-900 shadow-lg max-lg:absolute max-lg:left-0 max-lg:top-20 max-lg:w-screen max-lg:rounded-none max-lg:border-slate-700">
        {/* Generamos 4 elementos de skeleton para simular temas */}
        {[...Array(4)].map((_, index) => (
          <div key={_} className="border-b border-gray-800 last:border-b-0">
            {/* Skeleton para el botón del tema */}
            <div className="flex items-center justify-between border-b border-slate-500 px-4 py-4 max-lg:border-slate-700">
              <div className="h-5 w-32 animate-pulse rounded bg-slate-700" />
              <div className="h-5 w-5 animate-pulse rounded bg-slate-700" />
            </div>
            
            {/* Skeleton para los subtemas - alternamos visibilidad para simular algunos abiertos */}
            {index === 1 && (
              <div className="border-b border-slate-500 py-2 max-lg:border-slate-700">
                {[...Array(3)].map((_) => (
                  <div key={_} className="flex items-center py-2 pl-14 pr-6">
                    <div className="h-4 w-40 animate-pulse rounded bg-slate-700" />
                  </div>
                ))}
              </div>
            )}
          </div>
        ))}
      </div>
    </nav>
  );
};

export default NavBarSkeleton;