import { useParams } from 'react-router-dom';

export default function Reservation() {
  const { id } = useParams<{ id: string }>();

  return(
  <div>
    <h1>좌석예매 페이지</h1>
    <p>{id}</p>
  </div>
  );
}
