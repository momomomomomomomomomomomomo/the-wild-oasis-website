function Spinner() {
  return (
    <div className="grid align-middle sm:grid-cols-1 md:grid-cols-2 lg:gap-12 xl:gap-14">
      <div className="col-span-full row-span-full min-h-screen">
        <div className="spinner"></div>
      </div>
    </div>
  );
}

export default Spinner;
