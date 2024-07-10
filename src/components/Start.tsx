import { useQuestionsStore } from "../store/questions";
import { Button } from "./ui/button";

const LIMIT_QUESTIONS = 5

export  function Start() {
  const fetchQuestions = useQuestionsStore( state => state.fetchQuestions)

  const onHandleClick = () => { 
    fetchQuestions(LIMIT_QUESTIONS)
   }
  return (
    <Button onClick={onHandleClick} variant='default'>¡Empezar!</Button>
  )
}
