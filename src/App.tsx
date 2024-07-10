import { Game } from "./components/Game"
import { ModeToggle } from "./components/mode-toggle"
import { Start } from "./components/Start"
import { JavascriptLogo } from "./JavascriptLogo"
import { useQuestionsStore } from "./store/questions"

const App = () => {
  const questions = useQuestionsStore(store => store.questions)

  return (
    <div className="h-screen w-screen flex flex-col items-center justify-center gap-4 bg-white dark:bg-slate-900">
      <div className="flex justify-center items-center gap-4 ">
      <JavascriptLogo/>
      <h1 className="text-4xl sm:text-5xl">JavaScript Quizz</h1>
      <ModeToggle/>
      </div>
      {questions.length === 0 && <Start/> }
      {questions.length > 0 && <Game/>}
      
    </div>
  )
}

export default App