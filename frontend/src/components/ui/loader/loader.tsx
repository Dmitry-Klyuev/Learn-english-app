import './styles.scss'
import {useSelector} from "react-redux";
import type {RootState} from "@/store.ts";

export const Loader = () => {
  const isLoading = useSelector<RootState, string>(state => state.dictionary.loading);

  return (
    <>
      {isLoading === 'loading' ? <div className='w-full'>
          <div className='h-1.5 w-full bg-pink-100 overflow-hidden'>
            <div className='progress w-full h-full bg-blue-500 left-right'></div>
          </div>
        </div>
        :
        <div className='h-1.5 w-full overflow-hidden'></div>
      }
    </>
  )
};
