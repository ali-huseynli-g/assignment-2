import Pagination from "react-bootstrap/Pagination";

export default function CitiesPagination({
  totalCities,
  citiesPerPage,
  currentPage,
  setCurrentPage,
}) {
  let items = [];
  for (
    let number = 1;
    number <= Math.ceil(totalCities / citiesPerPage);
    number++
  ) {
    items.push(
      <Pagination.Item
        key={number}
        active={number === currentPage}
        onClick={() => {
          setCurrentPage(number);
        }}
      >
        {number}
      </Pagination.Item>
    );
  }

  return (
    <div>
      <Pagination size="sm">
        <Pagination.First
          onClick={() => {
            setCurrentPage(1);
          }}
          disabled={currentPage === 1}
        />
        <Pagination.Prev
          onClick={() => {
            setCurrentPage(currentPage - 1);
          }}
          disabled={currentPage === 1}
        />
        {items}
        <Pagination.Next
          onClick={() => {
            setCurrentPage(currentPage + 1);
          }}
          disabled={currentPage === Math.ceil(totalCities / citiesPerPage)}
        />
        <Pagination.Last
          onClick={() => {
            setCurrentPage(Math.ceil(totalCities / citiesPerPage));
          }}
          disabled={currentPage === Math.ceil(totalCities / citiesPerPage)}
        />
      </Pagination>
    </div>
  );
}
