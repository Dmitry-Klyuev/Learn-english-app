import {
  Table,
  TableBody,
  TableCaption,
  TableCell,
  TableHead,
  TableHeader,
  TableRow
} from "@/components/ui/table/table.tsx";
import type {iWord} from "../../../../features/dictionary.slice.ts";
import clsx from "clsx";

type iProps = {
  className?: string
  currentWords: iWord []
}

export const TableWrapper = ({className, currentWords}: iProps) => {
  return (
    <Table className={className}>
      <TableCaption>List of the word for learning</TableCaption>
      <TableHeader>
        <TableRow>
          <TableHead className="text-center w-1/10">Number</TableHead>
          <TableHead className={'text-center w-4/10'}>English world</TableHead>
          <TableHead className={'text-center w-4/10'}>Russian world</TableHead>
        </TableRow>
      </TableHeader>
      <TableBody>
        {currentWords && currentWords.map((word: iWord) => (
          <TableRow key={word.id} className={clsx(
            word.engLearned && 'bg-green-400',
          )}>
            <TableCell>{word.id}</TableCell>
            <TableCell>{word.eng_name}</TableCell>
            <TableCell>{word.rus_name}</TableCell>
          </TableRow>
        ))}
      </TableBody>
    </Table>
  )
};
