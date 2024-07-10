import { create } from 'zustand'
import { type Questions } from '../types'
import confetti from 'canvas-confetti';
import { toast } from '../components/ui/use-toast';
import {persist} from 'zustand/middleware'

interface State {
  questions: Array<Questions>;
  currentQuestion: number;
  fetchQuestions: (limit: number) => Promise<void>;
  selectAnswer: (questionId: number, answerIndex: number) => void;
  goNextQuestion: () => void;
  goPreviousQuestion: () => void;
  reset: () => void
}

export const useQuestionsStore = create<State>()(persist((set, get) => {

  return {
    questions: [],
    currentQuestion: 0,
    fetchQuestions: async (limit: number) => {
      const rest = await fetch('https://raw.githubusercontent.com/dimudev/JavaScript-Quizz/main/public/data.json')
      const json = await rest.json()
      const questions = json.sort(() => Math.random() - 0.5).slice(0, limit)
      set({ questions })
    },

    selectAnswer: (questionId: number, answerIndex: number) => {
      const { questions } = get()
      // usar el structuredClone para clonar el objeto
      const newQuestions = structuredClone(questions)
      // encontramos indice de la pregunta
      const questionIndex = newQuestions.findIndex(q => q.id === questionId)
      //obtenemos la info de la pregunta
      const questionInfo = newQuestions[questionIndex]
      //averiguamos si el susuario ha seleccionado la respuesta correcta
      const isCorrectUserAnswer = questionInfo.correctAnswer === answerIndex
 
      if (isCorrectUserAnswer) {
        confetti({particleCount: 200, spread: 200, origin: {y: 0.6}})
        toast({
          title: '¡Respuesta correcta!',
          description: questionInfo.successMessage,
          variant: 'success'
        })
      } else {
        toast({
          title: 'Respuesta incorrecta',
          description: questionInfo.errorMessage,
          variant: 'destructive'
        }) 
      }


      //cambiar info en la copia de la pregunta
      newQuestions[questionIndex] = {
        ...questionInfo,
        isCorrectUserAnswer,
        userSelectedAnswer: answerIndex
      }
      set({ questions: newQuestions})
    },

    goNextQuestion: () => {
      const {currentQuestion, questions} = get()
      const nexQuestion = currentQuestion +1
      if (nexQuestion < questions.length) {
        set({currentQuestion: nexQuestion})
      }
    },
    
    goPreviousQuestion: () => {
      const {currentQuestion} = get()
      const previousQuestion = currentQuestion - 1
      if (previousQuestion  >= 0) {
        set({currentQuestion: previousQuestion})
      }
    },

    reset: () =>  set({currentQuestion: 0, questions: []}),
  }

}, {
  name: 'questions'
}))