import { useQuestionsStore } from "../store/questions";
import {  type Questions as QuestionType } from "../types";
import { Card, CardContent, CardFooter, CardHeader } from "./ui/card";
import SyntaxHighlighter from 'react-syntax-highlighter';
import { gradientDark } from 'react-syntax-highlighter/dist/esm/styles/hljs';
import { RadioGroup, RadioGroupItem } from "./ui/radio-group";
import { Label } from "./ui/label";
import { Button } from './ui/button';
import { ChevronLeftIcon, ChevronRightIcon } from '@radix-ui/react-icons';
import Footer from "./Footer";

const getBackgroundColor = (info: QuestionType, index: number) => {
  const {userSelectedAnswer, correctAnswer} = info

  // usuario no ha seleccionado nada
  if ( userSelectedAnswer === undefined ) return 'default'
  // si ya selecciono pero la solución es incorrecta
  if ( index !== correctAnswer && index !== userSelectedAnswer ) return 'default'
  // si ya selecciono y la solución es correcta
  if ( index === correctAnswer) return 'success'
  // si esta es la seleccion del usuario pero no es correcta
  if ( index === userSelectedAnswer ) return 'error'

  return 'default'

  
}


const Question = ({ info }: { info: QuestionType }) => {
  const selectAnswer = useQuestionsStore(state => state.selectAnswer);

  const createHandleClick = (answerIndex: number) => () => {
    selectAnswer(info.id, answerIndex);
  };



  return (
    <Card className="min-w-[350px] w-[350px] sm:w-auto">
      <CardHeader>
        <h1>{info.question}</h1>
      </CardHeader>
      <CardContent>
        <SyntaxHighlighter language='javascript' showLineNumbers style={gradientDark}>
          {info.code}
        </SyntaxHighlighter>
      </CardContent>
      <CardFooter>
        <RadioGroup>
          {info.answers.map((answer, index) => (
            <div className="flex items-center space-x-2" key={index}>
              <RadioGroupItem 
                disabled={info.userSelectedAnswer !== undefined} 
                onClick={createHandleClick(index)} 
                value={answer} 
                variant={getBackgroundColor(info, index)} 
              />
              <Label>{answer}</Label>
            </div>
          ))}
        </RadioGroup>
      </CardFooter>
    </Card>
  );
};

export const Game = () => {
  const questions = useQuestionsStore(state => state.questions);
  const currentQuestion = useQuestionsStore(state => state.currentQuestion);
  const goNextQuestion = useQuestionsStore(state => state.goNextQuestion);
  const goPreviousQuestions = useQuestionsStore(state => state.goPreviousQuestion);
  const questionInfo = questions[currentQuestion];
  
  
  return (
    <>
    <div className='flex items-center justify-center gap-4'>
      <Button onClick={goPreviousQuestions} disabled={currentQuestion === 0} size='icon'>
        <ChevronLeftIcon/>
      </Button>
      <Label>{currentQuestion + 1}/{questions.length}</Label>
      <Button onClick={goNextQuestion} disabled={currentQuestion >= questions.length - 1} size='icon'>
        <ChevronRightIcon/>
      </Button>
    </div>
    <Question info={questionInfo} />
    <Footer/>
    </>
  )
};
