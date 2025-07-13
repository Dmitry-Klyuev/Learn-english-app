import {
  Dialog,
  DialogContent, DialogTitle,
  DialogTrigger
} from "@/components/ui/dialog/dialog.tsx";
import {Button} from "@/components/ui/button.tsx";
import {checkWords, type iWord} from "../../../../features/dictionary.slice.ts";
import {Table, TableBody, TableHead, TableHeader, TableRow} from "@/components/ui/table/table.tsx";
import {useForm} from "react-hook-form";
import {useAppDispatch} from "@/lib/hooks.ts";
import {ModalContent} from "@/components/ui/dialog/ModalContent.tsx";


interface IProps {
  className?: string;
  currentWords: iWord[]
}

interface FormValues {
  [key: string]: string;
}

export interface IResult {
  id: number;
  value: string,
}

export const DialogWrapper = ({className, currentWords}: IProps) => {
  const dispatch = useAppDispatch();

  const {register, handleSubmit} = useForm<FormValues>();

  const onSubmit = (data: FormValues) => {
    const result: IResult[] = []
    for (const key in data) {
      result.push({id: Number(key), value: data[key]})
    }
    dispatch(checkWords(result));
  };

  return (
    <div className={className}>
      <Dialog>
        <DialogTrigger asChild>
          <Button>Учить английские слова</Button>
        </DialogTrigger>
        <DialogContent className="w-full" showCloseButton={false}>
          <DialogTitle>Учить английские слова</DialogTitle>
          <form onSubmit={handleSubmit(onSubmit)} className="space-y-4">
            <Table>
              <TableHeader>
                <TableRow>
                  <TableHead className="text-center w-1/5">Number</TableHead>
                  <TableHead className="text-center w-2/5">English world</TableHead>
                  <TableHead className="text-center w-2/5">Russian world</TableHead>
                </TableRow>
              </TableHeader>
              <TableBody>
                {currentWords && currentWords.map((word: iWord) => (
                  <TableRow key={word.id}>
                    <ModalContent en={true} word={word} register={register}/>
                  </TableRow>
                ))}
              </TableBody>
            </Table>
            <Button type="submit" className={'hover:-translate-y-0.5 ease-in-out transition '}>Проверить</Button>
          </form>
        </DialogContent>
      </Dialog>
      <Dialog>
        <form>
          <DialogTrigger asChild>
            <Button>Учить русские слова</Button>
          </DialogTrigger>
          <DialogContent className="w-3xl" showCloseButton={true}>
            <DialogTitle>Учить русские слова</DialogTitle>
            <form onSubmit={handleSubmit(onSubmit)} className="space-y-4">
              <Table>
                <TableHeader>
                  <TableRow>
                    <TableHead className="text-center w-1/5">Number</TableHead>
                    <TableHead className="text-center w-2/5">English world</TableHead>
                    <TableHead className="text-center w-2/5">Russian world</TableHead>
                  </TableRow>
                </TableHeader>
                <TableBody>
                  {currentWords && currentWords.map((word: iWord) => (
                    <TableRow key={word.id}>
                      <ModalContent word={word} register={register}/>
                    </TableRow>
                  ))}
                </TableBody>
              </Table>
              <Button type="submit" className={'hover:-translate-y-0.5 ease-in-out transition '}>Проверить</Button>
            </form>
          </DialogContent>
        </form>
      </Dialog>
    </div>
  )
};
