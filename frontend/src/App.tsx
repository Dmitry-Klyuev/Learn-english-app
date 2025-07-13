'use client'
import './App.css'
import {TableWrapper} from "@/components/ui/table/tableWrapper.tsx";
import {countPage, fetchWords} from "../features/dictionary.slice.ts";
import {Loader} from "@/components/ui/loader/loader.tsx";
import {useEffect} from "react";
import {useParams} from "react-router-dom";
import {useAppDispatch, useAppSelector} from "@/lib/hooks.ts";
import {DialogWrapper} from "@/components/ui/dialog/dialogWrapper.tsx";
import {PaginationWrapper} from "@/components/ui/pagination/paginationWrapper.tsx";


function App() {
  const words = useAppSelector(state => state.dictionary.words)
  const {id = 1} = useParams()
  const currentCount = (Number(id) -1) * 10
  const currentWords = words.filter(word => word.id > currentCount && word.id <= currentCount + 10)
  const dispatch = useAppDispatch();

  useEffect(() => {
    dispatch(countPage())
  }, [])

  useEffect(() => {
    dispatch(fetchWords(Number(id)))
  }, [id])

  return (
    <div className='w-full'>
      <Loader/>
      <div className='w-1/2 mx-auto'>
        <h1>English app</h1>
        <TableWrapper className={'my-3'} currentWords={currentWords}/>
        <DialogWrapper className={'flex justify-center mt-10 gap-6'} currentWords={currentWords}/>
        <PaginationWrapper/>
      </div>
    </div>
  )
}

export default App
