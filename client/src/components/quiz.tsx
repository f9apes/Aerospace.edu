import { useState } from 'react';
import { Button } from '@/components/ui/button';
import { Card } from '@/components/ui/card';
import { QuizQuestion } from '@/types';
import { useUserProgress } from '@/hooks/use-user-progress';

interface QuizProps {
  questions: QuizQuestion[];
  onComplete: (score: number) => void;
}

export default function Quiz({ questions, onComplete }: QuizProps) {
  const [currentQuestionIndex, setCurrentQuestionIndex] = useState(0);
  const [selectedAnswer, setSelectedAnswer] = useState<number | null>(null);
  const [showFeedback, setShowFeedback] = useState(false);
  const [score, setScore] = useState(0);
  const [answers, setAnswers] = useState<number[]>([]);
  const { awardXP } = useUserProgress();

  const currentQuestion = questions[currentQuestionIndex];
  const isLastQuestion = currentQuestionIndex === questions.length - 1;

  const handleAnswerSelect = (answerIndex: number) => {
    if (showFeedback) return;
    
    setSelectedAnswer(answerIndex);
    setShowFeedback(true);
    
    const isCorrect = answerIndex === currentQuestion.correctAnswer;
    const newAnswers = [...answers, answerIndex];
    setAnswers(newAnswers);
    
    if (isCorrect) {
      setScore(score + 1);
      awardXP(25, `Correct answer in quiz question ${currentQuestionIndex + 1}`);
    }
  };

  const handleNextQuestion = () => {
    if (isLastQuestion) {
      const finalScore = Math.round((score / questions.length) * 100);
      onComplete(finalScore);
    } else {
      setCurrentQuestionIndex(currentQuestionIndex + 1);
      setSelectedAnswer(null);
      setShowFeedback(false);
    }
  };

  return (
    <Card className="glass-effect rounded-xl p-8">
      <div className="mb-6">
        <div className="flex items-center justify-between mb-4">
          <h3 className="font-orbitron text-2xl font-bold text-solar-yellow">
            <i className="fas fa-brain mr-2"></i>
            Knowledge Check
          </h3>
          <div className="text-sm text-gray-300">
            Question {currentQuestionIndex + 1} of {questions.length}
          </div>
        </div>
        
        {/* Progress bar */}
        <div className="w-full bg-gray-700 rounded-full h-2 mb-6">
          <div 
            className="progress-bar h-2 rounded-full transition-all duration-300"
            style={{ width: `${((currentQuestionIndex + 1) / questions.length) * 100}%` }}
          />
        </div>
      </div>

      <div className="bg-gray-800 rounded-lg p-6">
        <h4 className="text-xl font-bold text-neon-cyan mb-6">
          {currentQuestion.question}
        </h4>
        
        <div className="space-y-3 mb-6">
          {currentQuestion.options.map((option, index) => {
            let buttonClasses = "quiz-option p-4 border border-gray-600 rounded-lg cursor-pointer text-left w-full transition-all";
            
            if (showFeedback) {
              if (index === currentQuestion.correctAnswer) {
                buttonClasses += " correct bg-green-500/30 border-green-500";
              } else if (index === selectedAnswer && index !== currentQuestion.correctAnswer) {
                buttonClasses += " incorrect bg-red-500/30 border-red-500";
              }
            } else {
              buttonClasses += " hover:bg-neon-cyan/20 hover:border-neon-cyan";
            }
            
            return (
              <button
                key={index}
                onClick={() => handleAnswerSelect(index)}
                className={buttonClasses}
                disabled={showFeedback}
              >
                <span className="font-medium">
                  {String.fromCharCode(65 + index)}) {option}
                </span>
              </button>
            );
          })}
        </div>
        
        {showFeedback && (
          <div className="bg-gray-700 rounded-lg p-4 mb-6">
            <div className="flex items-start space-x-3">
              <i className={`fas ${selectedAnswer === currentQuestion.correctAnswer ? 'fa-check-circle text-green-400' : 'fa-times-circle text-red-400'} text-xl mt-1`}></i>
              <div>
                <p className={`font-medium mb-2 ${selectedAnswer === currentQuestion.correctAnswer ? 'text-green-400' : 'text-red-400'}`}>
                  {selectedAnswer === currentQuestion.correctAnswer ? 'Correct!' : 'Incorrect'}
                </p>
                <p className="text-gray-300">{currentQuestion.explanation}</p>
              </div>
            </div>
          </div>
        )}
        
        {showFeedback && (
          <Button
            onClick={handleNextQuestion}
            className="w-full bg-gradient-to-r from-neon-cyan to-cosmic-purple py-3 rounded-lg font-bold hover:scale-105 transition-all"
          >
            {isLastQuestion ? (
              <>
                <i className="fas fa-trophy mr-2"></i>
                Complete Quiz
              </>
            ) : (
              <>
                Next Question
                <i className="fas fa-arrow-right ml-2"></i>
              </>
            )}
          </Button>
        )}
      </div>
    </Card>
  );
}
