import NotFoundImg from '../assets/NotFound.svg';
import home from '../assets/homeIcon.svg';
import Return from '../assets/Return.svg';
import { Link } from 'react-router-dom';
import { useNavigate } from 'react-router-dom';

export default function NotFound() {
  const navigate = useNavigate();

  return (
  <div className='flex flex-col items-start justify-center h-[600px]'>
    <img src={NotFoundImg} alt="Not Found Img" />
    <h1 className='text-[40px] font-semibold text-text-primary'>페이지를 찾을 수 없습니다.</h1>
    <h3 className='text-[20px] text-text-primary opacity-50'>지금 이 페이지는 존재하지않거나 제거되었습니다.</h3>
    <button onClick={()=> navigate(-1)} className='flex flex-row items-center justify-center bg-foreground py-1 w-[200px] rounded-[10px] my-2 border-borders border-[1px] '>
      <img src={Return} alt="뒤로가기" />
      <h5 className='ml-3'>뒤로가기</h5>
    </button>
    <Link to="/" className='flex flex-row bg-Accent items-center justify-center rounded-[10px] text-white py-1 w-[300px] hover:opacity-70'>
      <img src={home} alt="메인페이지로 돌아가기" />
      <h5 className='ml-3'>메인페이지로 돌아가기</h5>
    </Link>
  </div>
  );
}
