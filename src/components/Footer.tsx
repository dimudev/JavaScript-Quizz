import { useQuestionsStore } from "../store/questions"
import { Badge } from "./ui/badge"
import { Button } from "./ui/button"

const Footer = () => {
  const questions = useQuestionsStore(state => state.questions)
  let correct = 0
  let incorrect = 0
  let unanswered = 0
   questions.forEach(q => {
    const {userSelectedAnswer, correctAnswer} = q
    if(userSelectedAnswer == null) unanswered++
    else if (userSelectedAnswer === correctAnswer) correct++
    else incorrect++
   })

   const reset = useQuestionsStore(state => state.reset)

  return (
   <footer className="flex flex-col gap-4">
    <div className="flex gap-4">
    <Badge variant='success'>{correct} Correctas</Badge>
    <Badge variant='destructive'>{incorrect} Incorrectas</Badge>
    <Badge variant='secondary'>{unanswered} Sin responder</Badge>
    </div>
    <Button variant='default' onClick={() => reset()}>Reiniciar Quizz</Button>
   </footer>
  )
}

export default Footer