import {TableCell} from "@/components/ui/table/table.tsx";
import {Input} from "@/components/ui/input.tsx";
import clsx from "clsx";
import type {iWord} from "../../../../features/dictionary.slice.ts";

interface iProps {
  en?: boolean
  word: iWord
  register: any
}

export const ModalContent = ({en, word, register}: iProps) => {

  return (
    <>
      <TableCell>{word.id}</TableCell>
      <TableCell>
        {en ?
          <Input
            {...register(String(word.id))}
            placeholder="Введите английское слово"
            className={clsx(
              word.engLearned === null && '',
              word.engLearned === true && 'bg-green-200',
              word.engLearned === false && 'border-red-500',
            )}
          />
          :
          word.eng_name
        }
        </TableCell>
      <TableCell>
        {en ?
        word.rus_name
          :
          <Input
            {...register(String(word.id))}
            placeholder="Введите русское слово"
            className={clsx(
              word.rusLearned === null && '',
              word.rusLearned === true && 'bg-green-200',
              word.rusLearned === false && 'border-red-500',
            )}
          />
        }
      </TableCell>
    </>
  )
};
